// Model https://github.com/marmelab/react-admin/blob/master/packages/ra-language-french/src/index.ts

module.exports = {
  app: {
    forum_name: 'Forum Réseaux de Vie',
    backed_by_organization: 'Backed by %{organizationName}',
    action: {
      accept: "Accept",
      accept_contact_request: "Accept contact request",
      add: "Add",
      add_location: "Add an address",
      contact_organizer: "Contact organizer",
      contact_attendees: "Contact attendees",
      copy: "Copy to clipboard",
      create_event: "Add an event",
      create_event_short: "Add",
      edit_profile: "Edit my profile",
      ignore: "Ignore",
      ignore_contact_request: "Ignore contact request",
      join: "Join",
      leave: "Leave",
      login: "Login with an account",
      reject: "Reject",
      reject_contact_request: "Reject contact request",
      remove_contact: "Remove contact",
      search: "Search",
      send: "Send",
      send_invitation: "Send invitation |||| Send %{smart_count} invitations",
      send_message: "Send message",
      share: "Share",
      share_event: "Share event",
      signup: "Signup",
      reset_password: "Reset password",
      set_new_password: "Set new password",
    },
    page: {
      events: "My events",
      addresses: "My addresses",
      network: "My network",
      profile: "My profile",
      settings: "My settings",
    },
    tab: {
      next_events: "Coming events",
      finished_events: "Finished events",
    },
    card: {
      add_contact: "Add a contact",
      contact_requests: "Contact requests",
      share_contact: "My contact link",
    },
    block: {
      contact_requests: "New contact requests",
      g1_account: "G1 account",
      organized_events: "Organized events",
    },
    input: {
      about_you: "A few words about you",
      conditions: "Conditions",
      date: "Date",
      duration: "Duration",
      message: "Message",
      provider: "Provider",
      user_id: "User ID",
      email: "Email",
      current_password: "Current password",
      new_password: "New password",
      confirm_new_password: "Confirm new password",
    },
    helper: {
      add_contact:
        "To add an user to your network, you need to know his ID (format: @bob@server.com).",
      addresses_visibility:
        "Your addresses are visible only by people invited to your events",
      event_draft_mode:
        "You are currently the only one who can see this event. As soon as you are satisfied with its presentation, you can share it with your contacts (top-right button).",
      event_join_right:
        'You have been invited to this event. To accept the invitation, please click on the "Join" button.',
      event_share_right:
        "The organizer has given you the right to share this event with your contacts (top-right button).",
      first_event:
        "If you have questions or troubles regarding the creation of events, feel free to contact us",
      max_attendees: "Warning: you are counted as an attendee",
      message_profile_show_right:
        "Sending a message to the organizer will give him/her the right to see your profile, in order to be able to respond.",
      no_contact:
        "You must add contacts to your network to be able to invite them",
      no_address:
        "You must add at least one address to your profile before creating an event",
      other_conditions:
        "You can enter several additional conditions (one by line)",
      profile_visibility:
        "Your profile is visible only by users you have accepted in your network",
      share_contact:
        "To connect with someone you know, you can send him the link below.",
      location_comment:
        "Additional information to help attendees to find this place",
      g1_tipjar_field:
        "To send G1 money to this user, copy his public key below and use it inside the Cesium software.",
      g1_tipjar_input:
        "The public key of your Ğ1 account. This will allow other members to easily send you money.",
    },
    message: {
      copied_to_clipboard: "Copied !",
      event_closed: "This event is closed",
      event_finished: "This event is finished",
      no_condition: "None",
      you_participated_to_same_event: "You participated to the same event",
      event_message_title: `%{username} writes you about "%{event}"`
    },
    notification: {
      contact_request_accepted: "Contact request accepted",
      contact_request_ignored: "Contact request ignored",
      contact_request_rejected: "Contact request rejected",
      contact_request_sent: "Contact request sent",
      event_joined: "You have joined this event",
      event_left: "You have left this event",
      invitation_sent: "1 invitation sent |||| %{smart_count} invitations sent",
      login_to_connect_user:
        "Please create an account to connect with %{username}",
      login_to_view_event: "Please connect to your account to view this event",
      message_sent: "Your message has been sent",
      message_send_error: "Error while sending the message: %{error}",
      organized_events_visibility:
        "Below are shown only events you have been invited to",
      profile_data_not_found:
        "Your profile couldn't be found, please reconnect yourself",
      user_not_found: "User %{username} doesn't exist",
      app_not_authorized:
        "Unauthorized app: we cannot redirect to the URL %{url}",
      reset_password_submited:
        "An email has been send with reset password instructions",
      reset_password_error: "An error occurred",
      password_changed: "Password changed successfully",
      new_password_error: "An error occurred",
      invalid_password: "Invalid password",
      get_settings_error: "An error occurred",
      update_settings_error: "An error occurred",
    },
    permission: {
      view: "Allowed to join",
      share: "Invite own contacts",
      contacts: "All contacts",
    },
    time: {
      hours: "1 hour |||| %{smart_count} hours",
      minutes: "1 minute |||| %{smart_count} minutes",
      days: "1 day |||| %{smart_count} days",
    },
    user: {
      unknown: "Unknown",
      location: "At %{surname}'s",
    },
    validation: {
      futureDate: "Must be in the future",
      afterStartTime: "Must be after the event's start time",
      beforeStartTime: "Must be before the event's start time",
      email: "Must be a valid email",
      confirmNewPassword: "Must be the same as new password field",
    },
    group: {
      group: "Group",
      profile: "User",
    },
  },
};
