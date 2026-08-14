import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetIdentity } from '@refinedev/core';
import { App, Button, type ButtonProps } from 'antd';

import useOutbox from '../../hooks/useOutbox';
import useActivityCollection from '../../hooks/useActivityCollection';
import { arrayOf } from '@activitypods/refine-providers/utils';
import type { EventRecord, Identity } from '../../types';

type Props = ButtonProps & {
  event: EventRecord;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** Posts `Join`/`Leave` AS2 activities to the organizer, addressed via the logged-in user's own
 *  outbox. `apods:attendees` (read through `useActivityCollection`) is the source of truth for
 *  whether the viewer is currently attending — shared with EventShowPage's attendee grid via the
 *  same react-query cache key, so refetching it here also updates that grid. */
const JoinButton = ({ event, ...buttonProps }: Props) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { data: identity } = useGetIdentity<Identity>();
  const outbox = useOutbox();
  const { items: attendees, refetch } = useActivityCollection(event['apods:attendees']);
  const [pending, setPending] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    setJoined(attendees.includes(identity?.id ?? ''));
  }, [attendees, identity]);

  const isOrganizer = event['dc:creator'] === identity?.id;
  const status = arrayOf(event['apods:hasStatus']);
  const isClosed = status.includes('apods:Closed');
  const isFinished = status.includes('apods:Finished');

  // The organizer's Pod processes Join/Leave asynchronously (real ActivityPub delivery to their
  // inbox, then a collection update) — a single refetch after a fixed delay risks running before
  // that's landed, leaving the attendee list looking stale with nothing to retry it. Poll instead,
  // until the collection actually reflects the expected membership (or we give up).
  const waitForAttendeeUpdate = async (expectMember: boolean) => {
    for (let attempt = 0; attempt < 10; attempt++) {
      await delay(1000);
      const { data } = await refetch();
      if ((data ?? []).includes(identity?.id ?? '') === expectMember) return;
    }
  };

  const post = async (type: 'Join' | 'Leave') => {
    setPending(true);
    try {
      await outbox.post({ type, actor: outbox.owner, object: event.id, to: event['dc:creator'] });
      message.success(t(type === 'Join' ? 'event.event_joined' : 'event.event_left'));
      setJoined(type === 'Join');
      waitForAttendeeUpdate(type === 'Join');
    } catch (e: any) {
      message.error(e.message);
    }
    setPending(false);
  };

  return joined ? (
    <Button onClick={() => post('Leave')} disabled={pending || isOrganizer || isFinished} {...buttonProps}>
      {t('event.leave')}
    </Button>
  ) : (
    <Button onClick={() => post('Join')} disabled={pending || isOrganizer || isClosed || isFinished} {...buttonProps}>
      {t('event.join')}
    </Button>
  );
};

export default JoinButton;
