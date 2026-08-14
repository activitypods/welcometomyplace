import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetIdentity, useInvalidate } from '@refinedev/core';
import { App, Button, Modal } from 'antd';

import ContactsShareList from './ContactsShareList';
import useOutbox from '../../hooks/useOutbox';
import useActivityCollection from '../../hooks/useActivityCollection';
import type { EventRecord, Identity, InvitationState } from '../../types';

type Props = {
  event: EventRecord;
  open: boolean;
  onClose: () => void;
};

const ShareDialog = ({ event, open, onClose }: Props) => {
  const { t } = useTranslation();
  const { message: toast } = App.useApp();
  const { data: identity } = useGetIdentity<Identity>();
  const outbox = useOutbox();

  const creatorUri = event['dc:creator'];
  const isCreator = creatorUri === identity?.id;

  const { items: announces, refetch: refetchAnnounces } = useActivityCollection(event['apods:announces']);
  const { items: announcers, refetch: refetchAnnouncers } = useActivityCollection(
    isCreator ? event['apods:announcers'] : undefined
  );
  const invalidate = useInvalidate();

  const [invitations, setInvitations] = useState<Record<string, InvitationState>>({});
  const [savedInvitations, setSavedInvitations] = useState<Record<string, InvitationState>>({});
  const [newInvitations, setNewInvitations] = useState<Record<string, InvitationState>>({});
  const [sending, setSending] = useState(false);

  // Populate present invitations: anyone already in `announces`/`announcers` is readonly.
  useEffect(() => {
    const initial: Record<string, InvitationState> = {};
    [...announces, ...announcers].forEach(actorUri => {
      const canView = announces.includes(actorUri);
      const canShare = announcers.includes(actorUri);
      initial[actorUri] = { canView, canShare, viewReadonly: canView, shareReadonly: canShare };
    });
    setInvitations(initial);
    setSavedInvitations(initial);
  }, [announces, announcers]);

  const onChange = useCallback(
    (changedRights: Record<string, InvitationState>) => {
      const merged = { ...newInvitations, ...changedRights };
      const changed: Record<string, InvitationState> = {};
      Object.entries(merged).forEach(([actorUri, next]) => {
        const previous = savedInvitations[actorUri];
        const viewChanged = !!next.canView !== (!!previous?.canView || !!previous?.canShare);
        const shareChanged = !!next.canShare !== !!previous?.canShare;
        if (viewChanged || shareChanged) changed[actorUri] = next;
      });
      setNewInvitations(changed);
      setInvitations({ ...savedInvitations, ...changed });
    },
    [newInvitations, savedInvitations]
  );

  const sendInvitations = async () => {
    setSending(true);
    try {
      // Matches @activitypods/react's ShareDialog exactly (the pod-provider backend's
      // `announcer` service only understands these two shapes, not an `interop:delegationAllowed`
      // flag on a plain Announce — a plain Announce from a non-creator is rejected outright):
      // - View-only invites: the creator posts `Announce` directly; a delegate instead posts
      //   `Offer{Announce}` addressed to the creator, whose Pod does the actual Announce itself
      //   (see `announcer.ts`'s `offerAnnounce.onReceive`) since only the creator may grant access.
      // - Share (delegation) rights: always `Offer{Announce}` addressed directly to the new
      //   delegates — only the creator can send this (gated by the "share" toggle being
      //   creator-only in ContactItem/GroupContactsItem).
      const actorsWithNewViewRight = Object.keys(newInvitations).filter(
        uri => newInvitations[uri].canView && !savedInvitations[uri]?.canView
      );
      if (actorsWithNewViewRight.length > 0) {
        if (isCreator) {
          await outbox.post({
            type: 'Announce',
            actor: outbox.owner,
            object: event.id,
            target: actorsWithNewViewRight,
            to: actorsWithNewViewRight
          });
        } else {
          await outbox.post({
            type: 'Offer',
            actor: outbox.owner,
            object: { type: 'Announce', actor: outbox.owner, object: event.id, target: actorsWithNewViewRight },
            target: creatorUri,
            to: creatorUri
          });
        }
      }

      const actorsWithNewShareRight = Object.keys(newInvitations).filter(uri => newInvitations[uri].canShare);
      if (actorsWithNewShareRight.length > 0) {
        await outbox.post({
          type: 'Offer',
          actor: outbox.owner,
          object: { type: 'Announce', object: event.id },
          target: actorsWithNewShareRight,
          to: actorsWithNewShareRight
        });
      }

      toast.success(t('share.invitation_sent', { count: Object.keys(newInvitations).length }));

      // The Pod may have just attached apods:announces/apods:announcers to the event for the
      // first time (if this was the first share ever) — refetch the event itself so its props
      // pick up the new collection URIs, and refetch the collections directly for immediate
      // feedback next time this dialog opens rather than waiting on the event refetch to land.
      invalidate({ resource: 'event', id: event.id, invalidates: ['detail'] });
      refetchAnnounces();
      refetchAnnouncers();

      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
    setSending(false);
  };

  if (!identity) return null;

  return (
    <Modal
      title={t('actions.share')}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          {t('actions.close')}
        </Button>,
        Object.keys(newInvitations).length > 0 && (
          <Button key="send" type="primary" onClick={sendInvitations} loading={sending}>
            {t('share.send_invitation', { count: Object.keys(newInvitations).length })}
          </Button>
        )
      ]}
    >
      <ContactsShareList invitations={invitations} organizerUri={creatorUri} isCreator={isCreator} onChange={onChange} />
    </Modal>
  );
};

export default ShareDialog;
