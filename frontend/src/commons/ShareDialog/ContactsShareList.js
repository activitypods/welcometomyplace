import React from "react";
import {
  List,
  makeStyles,
  Box,
  CircularProgress,
  TextField,
  Grid,
  styled,
  ListItem,
} from "@material-ui/core";
import ContactItem from "./ContactItem";
import AllContactsItem from "./AllContactsItem";
import { useListContext, useTranslate } from "react-admin";
import Alert from "@material-ui/lab/Alert";
import { ResourceSelectWithTags } from "@semapps/tag-components";
import GroupContactsItem from "./GroupContactsItem";

/**
 * @typedef {import('./ShareDialog').InvitationState} InvitationState
 */

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

/**
 * @param {Object} props
 * @param {Record<string, InvitationState} props.invitations
 * @param {(invitations: Record<string, InvitationState) => void} props.onChange
 * @param {boolean} props.isOrganizer
 */
const ContactsShareList = ({ invitations, onChange, isOrganizer }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const {
    ids: contactIds,
    data: contactData,
    loading,
    ...rest
  } = useListContext();

  return (
    <List dense className={classes.list}>
      {
        // @sebastien, this condition is from the original PR, is this necessary?
        isOrganizer && (
          <ListItem>
            <AllContactsItem
              contactData={contactData}
              invitations={invitations}
              onChange={onChange}
              isOrganizer={isOrganizer}
            />
          </ListItem>
        )
      }
      <ResourceSelectWithTags
        labelResourcePredicate="vcard:given-name"
        labelTagPredicate="vcard:label"
        relationshipPredicate="vcard:hasMember"
        entityResource="Profile"
        tagResource="Group"
        // Selection is handled and rendered by invitation (render*Option), not by the component.
        // The tags (groups) are rendered in the always-open list, do don't render them in the text area.
        renderTags={() => null}
        // Don't show the option list as popup. Wrap in a grid and adjust style, to avoid two scrollbars.
        PopperComponent={styled(Grid)({
          "& .MuiAutocomplete-listbox": { maxHeight: "unset" },
        })}
        open
        tagName={translate("app.group.group")}
        resourceName={translate("app.group.profile")}
        loading={loading}
        onChange={() => {}}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={translate("app.action.search")}
            fullWidth
          />
        )}
        renderTagOption={(option) => {
          return (
            <GroupContactsItem
              key={option.id}
              group={option}
              onChange={onChange}
              invitations={invitations}
              isOrganizer={isOrganizer}
            />
          );
        }}
        renderResourceOption={(option) => (
          <ContactItem
            key={option.id}
            record={option}
            invitation={invitations[option.describes]}
            onChange={onChange}
            isOrganizer={isOrganizer}
            {...rest}
          />
        )}
      />
      {loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={250}
        >
          <CircularProgress size={60} thickness={6} />
        </Box>
      )}
      {!loading && contactIds.length === 0 && (
        <Alert severity="warning">{translate("app.helper.no_contact")}</Alert>
      )}
    </List>
  );
};

export default ContactsShareList;
