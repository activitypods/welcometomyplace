import React from "react";
import {
  makeStyles,
  Avatar,
  Switch,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { LoadingIndicator, useTranslate } from "react-admin";
import PublicIcon from "@material-ui/icons/Public";

/** @typedef {import("./ShareDialog").InvitationState} InvitationState */

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  primaryText: {
    width: "30%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexBasis: "100%",
  },
  secondaryText: {
    textAlign: "center",
    width: "60%",
    fontStyle: "italic",
    color: "grey",
  },
  avatarItem: {
    minWidth: 50,
  },
  avatar: {
    backgroundImage: `radial-gradient(circle at 50% 3em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));

/**
 * @param {Object} props
 * @param {Record<string, InvitationState} props.invitations
 * @param {(invitations: Record<string, InvitationState>) => void} props.onChange
 * @param {boolean} props.isOrganizer
 * @param {Record<string, any>} props.contactData
 */
const AllContactItem = ({
  contactData,
  onChange,
  invitations,
  isOrganizer,
}) => {
  const classes = useStyles();
  const translate = useTranslate();

  const viewChecked =
    contactData &&
    Object.values(contactData).every(
      (contact) =>
        invitations[contact.describes]?.canView ||
        invitations[contact.describes]?.canShare
    );
  const shareChecked =
    contactData &&
    Object.values(contactData).every(
      (contact) => invitations[contact.describes]?.canShare
    );
  const viewSwitchReadonly =
    contactData &&
    Object.values(contactData).every(
      (contact) =>
        invitations[contact.describes]?.viewReadonly ||
        invitations[contact.describes]?.shareReadonly
    );
  const shareSwitchReadonly =
    contactData &&
    Object.values(contactData).every(
      (contact) => invitations[contact.describes]?.shareReadonly
    );

  const switchShare = () => {
    const newInvitations = Object.values(contactData).reduce((acc, contact) => {
      if (invitations[contact.describes]?.shareReadonly) {
        return acc;
      } else {
        const newShareState = !shareChecked;
        return {
          ...acc,
          [contact.describes]: {
            ...invitations[contact.describes],
            canShare: newShareState,
            // If share is enabled, view should be enabled too.
            canView: newShareState || viewChecked,
          },
        };
      }
    }, {});
    onChange(newInvitations);
  };

  const switchView = () => {
    const newInvitations = Object.values(contactData).reduce((acc, contact) => {
      if (invitations[contact.describes]?.viewReadonly) {
        return acc;
      } else {
        const newViewState = !viewChecked;
        return {
          ...acc,
          [contact.describes]: {
            ...invitations[contact.describes],
            canView: newViewState,
            // If view is disabled, share should be disabled too.
            canShare: newViewState && shareChecked,
          },
        };
      }
    }, {});
    onChange(newInvitations);
  };

  return (
    <div className={classes.listItem}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar className={classes.avatar}>
          {!contactData && <LoadingIndicator />}
          {contactData && <PublicIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.primaryText}
        primary={translate("app.permission.contacts")}
      />
      <ListItemText
        className={classes.secondaryText}
        primary={translate("app.permission.view")}
        secondary={
          <Switch
            size="small"
            checked={viewChecked || shareChecked}
            disabled={viewSwitchReadonly || shareSwitchReadonly || !contactData}
            onChange={switchView}
          />
        }
      />
      {isOrganizer && (
        <ListItemText
          className={classes.secondaryText}
          primary={translate("app.permission.share")}
          secondary={
            <Switch
              size="small"
              checked={shareChecked}
              disabled={shareSwitchReadonly || !contactData}
              onChange={switchShare}
            />
          }
        />
      )}
    </div>
  );
};

export default AllContactItem;
