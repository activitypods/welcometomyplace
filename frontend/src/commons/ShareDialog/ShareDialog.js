import React, { useCallback, useEffect, useState } from "react";
import { useShowContext, useNotify, ListBase, useTranslate } from "react-admin";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { useCheckAuthenticated } from "@semapps/auth-provider";
import ContactsShareList from "./ContactsShareList";
import {
  useCollection,
  useOutbox,
  ACTIVITY_TYPES,
} from "@semapps/activitypub-components";

/**
 * @typedef InvitationState
 * @property {boolean} canView
 * @property {boolean} canShare
 * @property {boolean} viewReadonly
 * @property {boolean} shareReadonly
 */

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    margin: 16,
  },
  title: {
    padding: 24,
    paddingBottom: 8,
    [theme.breakpoints.down("sm")]: {
      padding: 16,
      paddingBottom: 4,
    },
  },
  actions: {
    padding: 15,
    height: 38,
  },
  list: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  listForm: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    marginRight: 24,
    height: 300,
    [theme.breakpoints.down("sm")]: {
      padding: "0px 16px",
      margin: 0,
    },
  },
}));

const ShareDialog = ({ close, resourceUri }) => {
  const classes = useStyles();
  const { identity } = useCheckAuthenticated();
  const { record } = useShowContext();
  const translate = useTranslate();
  const isOrganizer = record?.["dc:creator"] === identity?.id;
  const { items: announces } = useCollection(record?.["apods:announces"]);
  const { items: announcers } = useCollection(record?.["apods:announcers"]);
  /** @type {[Record<string, InvitationState>, (invitations: Record<string, InvitationState>) => void]} */
  const [invitations, setInvitations] = useState({});
  // To keep track of changes...
  /** @type {[Record<string, InvitationState>, (invitations: Record<string, InvitationState>) => void]} */
  const [newInvitations, setNewInvitations] = useState({});
  /** @type {[Record<string, InvitationState>, (invitations: Record<string, InvitationState>) => void]} */
  const [savedInvitations, setSavedInvitations] = useState({});
  const [sendingInvitation, setSendingInvitation] = useState(false);
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"), {
    noSsr: true,
  });
  const outbox = useOutbox();
  const notify = useNotify();

  // To begin, populate present invitations.
  // Announcers and announces that are already in the collection are readonly.
  useEffect(() => {
    const invitations = [...announces, ...announcers].reduce(
      (acc, actorUri) => {
        const canView = announces.includes(actorUri);
        const canShare = announcers.includes(actorUri);
        return {
          ...acc,
          [actorUri]: {
            canView,
            canShare,
            viewReadonly: canView,
            shareReadonly: canShare,
          },
        };
      },
      {}
    );
    setInvitations(invitations);
    setSavedInvitations(invitations);
  }, [announces, announcers]);

  /** @param {Record<string, InvitationState} changedRights */
  const onChange = (changedRights) => {
    // Compare changedRights to invitations, to know where we need to update the collection.
    const newInvitationsUnfiltered = {
      ...newInvitations,
      ...changedRights,
    };
    const changedInvitations = Object.fromEntries(
      Object.entries(newInvitationsUnfiltered).filter(
        ([actorUri, newInvitation]) => {
          const oldInvitation = savedInvitations[actorUri];
          return (
            !!newInvitation.canView !==
              (!!oldInvitation?.canView || !!oldInvitation?.canShare) ||
            !!newInvitation.canShare !== !!oldInvitation?.canShare
          );
        }
      )
    );
    setNewInvitations(changedInvitations);

    setInvitations({
      ...savedInvitations,
      ...changedInvitations,
    });
  };

  const sendInvitations = useCallback(async () => {
    setSendingInvitation(true);
    const actorsWithNewViewRight = Object.keys(newInvitations).filter(
      (actorUri) => newInvitations[actorUri].canView
    );
    if (actorsWithNewViewRight.length > 0) {
      if (isOrganizer) {
        await outbox.post({
          type: ACTIVITY_TYPES.ANNOUNCE,
          actor: outbox.owner,
          object: resourceUri,
          target: actorsWithNewViewRight,
          to: actorsWithNewViewRight,
        });
      } else {
        // Offer the organizer to invite these people
        await outbox.post({
          type: ACTIVITY_TYPES.OFFER,
          actor: outbox.owner,
          object: {
            type: ACTIVITY_TYPES.ANNOUNCE,
            actor: outbox.owner,
            object: resourceUri,
            target: actorsWithNewViewRight,
          },
          target: record["dc:creator"],
          to: record["dc:creator"],
        });
      }
    }

    const actorsWithNewShareRight = Object.keys(newInvitations).filter(
      (actorUri) => newInvitations[actorUri].canShare
    );
    if (actorsWithNewShareRight.length > 0) {
      await outbox.post({
        type: ACTIVITY_TYPES.OFFER,
        actor: outbox.owner,
        object: {
          type: ACTIVITY_TYPES.ANNOUNCE,
          object: resourceUri,
        },
        target: actorsWithNewShareRight,
        to: actorsWithNewShareRight,
      });
    }

    notify("app.notification.invitation_sent", "success", {
      smart_count: Object.keys(newInvitations).length,
    });
    close();
  }, [
    outbox,
    notify,
    newInvitations,
    isOrganizer,
    close,
    record,
    resourceUri,
    setSendingInvitation,
  ]);

  if (!identity) return null;

  return (
    <Dialog
      fullWidth={!xs}
      open={true}
      onClose={close}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle className={classes.title}>
        {translate("app.action.share_event")}
      </DialogTitle>
      <DialogContent className={classes.listForm}>
        <ListBase
          resource="Profile"
          basePath="/Profile"
          perPage={1000}
          sort={{ field: "vcard:given-name", order: "ASC" }}
        >
          <ContactsShareList
            invitations={invitations}
            onChange={onChange}
            isOrganizer={isOrganizer}
          />
        </ListBase>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="text" size="medium" onClick={close}>
          {translate("ra.action.close")}
        </Button>
        {Object.keys(newInvitations).length > 0 && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={sendInvitations}
            disabled={sendingInvitation}
          >
            {translate("app.action.send_invitation", {
              smart_count: Object.keys(newInvitations).length,
            })}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
