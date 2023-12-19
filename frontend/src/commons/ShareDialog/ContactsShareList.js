import React, { useMemo, useState } from "react";
import {
  List,
  makeStyles,
  Box,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import ContactItem from "./ContactItem";
import { useGetList, useListContext, useTranslate } from "react-admin";
import Alert from "@material-ui/lab/Alert";
import GroupContactsItem from "./GroupContactsItem";
import { formatUsername } from "../../utils";

/**
 * @typedef {import('./ShareDialog').InvitationState} InvitationState
 */

const useStyles = makeStyles((theme) => ({
  list: {
    width: "98%",
    maxWidth: "98%",
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
  const [searchText, setSearchText] = useState("");

  const {
    ids: profileIds,
    data: profileData,
    loading: loadingProfiles,
  } = useListContext();

  const { data: groupData, isLoading: loadingGroups } = useGetList("Group");

  const groupsSorted = useMemo(() => {
    return Object.values(groupData).sort((g1, g2) =>
      (g1["vcard:label"] || "").localeCompare(g2["vcard:label"])
    );
  }, [groupData]);
  const groupsFiltered = useMemo(
    () =>
      groupsSorted.filter((group) =>
        (group["vcard:label"] || "")
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
      ),
    [groupsSorted, searchText]
  );

  const profilesSorted = useMemo(() => {
    return Object.values(profileData).sort((p1, p2) =>
      (p1["vcard:given-name"] || "").localeCompare(p2["vcard:given-name"])
    );
  }, [profileData]);
  const profilesFiltered = useMemo(
    () =>
      profilesSorted.filter(
        (profile) =>
          (profile["vcard:given-name"] || "")
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          formatUsername(profile.describes)
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
      ),
    [profilesSorted, searchText]
  );

  return (
    <List dense className={classes.list}>
      <TextField
        type="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        label={translate("app.action.search")}
        fullWidth
        variant="filled"
        margin="dense"
      />
      {groupsFiltered.map((group) => (
        <GroupContactsItem
          key={group.id}
          group={group}
          invitations={invitations}
          onChange={onChange}
          isOrganizer={isOrganizer}
        />
      ))}
      {profilesFiltered.map((profile) => (
        <ContactItem
          key={profile.id}
          record={profile}
          invitation={invitations[profile.describes]}
          onChange={onChange}
          isOrganizer={isOrganizer}
        />
      ))}
      {(loadingProfiles || loadingGroups) && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={250}
        >
          <CircularProgress size={60} thickness={6} />
        </Box>
      )}
      {!loadingProfiles && profileIds.length === 0 && (
        <Alert severity="warning">{translate("app.helper.no_contact")}</Alert>
      )}
    </List>
  );
};

export default ContactsShareList;
