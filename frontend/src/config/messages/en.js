// Model https://github.com/marmelab/react-admin/blob/master/packages/ra-language-french/src/index.ts

module.exports = {
  app: {
    action: {
      accept: 'Accept',
      add: 'Add',
      contact_organizer: 'Contact organizer',
      copy: 'Copy to clipboard',
      create_event: 'Add an event',
      create_event_short: 'Add',
      edit_profile: 'Edit my profile',
      ignore: 'Ignore',
      join: "Join",
      leave: 'Leave',
      login: 'Login with an account',
      reject: 'Reject',
      send: 'Send',
      send_invitation: "Send invitation |||| Send %{smart_count} invitations",
      send_message: 'Send message',
      share: 'Share',
      share_event: 'Share event',
      signup: 'Signup',
    },
    page: {
      events: 'My events',
      addresses: 'My addresses',
      network: 'My network',
      profile: 'My profile',
    },
    tab: {
      next_events: 'Coming events',
      finished_events: 'Finished events',
    },
    card: {
      add_contact: 'Add a contact',
      contact_requests: 'Contact requests',
      share_contact: 'My contact link',
    },
    block: {
      contact_requests: 'New contact requests',
    },
    input: {
      about_you: 'A few words about you',
      conditions: 'Conditions',
      date: 'Date',
      duration: 'Duration',
      message: 'Message',
      provider: 'Provider',
      user_id: 'User ID',
    },
    helper: {
      add_contact: 'To add an user to your network, you need to know his ID (format: @bob@server.com).',
      addresses_visibility: 'Your addresses are visible only by people invited to your events',
      event_draft_mode: "You are currently the only one who can see this event. As soon as you are satisfied of its presentation, you can it with your contacts (top-right button).",
      event_join_right: "You have been invited to this event. To accept the invitation, please click on the \"Join\" button.",
      event_share_right: "The organizer has given you the right to share this event with your contacts (top-right button).",
      first_event: "If you have questions or troubles regarding the creation of events, feel free to contact us at ",
      max_attendees: 'Warning: you are counted as an attendee',
      no_contact: 'You must add contacts to your network to be able to invite them',
      no_address: 'You must add at least one address to your profile before creating an event',
      other_conditions: 'You can enter several additional conditions (one by line)',
      profile_visibility: "Your profile is visible only by users you have accepted in your network",
      share_contact: 'To connect with someone you know, you can send him the link below.',
      location_comment: 'Additional information to help attendees to find this place',
    },
    message: {
      copied_to_clipboard: 'Copied !',
      event_closed: 'This event is closed',
      event_finished: 'This event is finished',
      no_condition: 'None',
      you_participated_to_same_event: 'You participated to the same event',
    },
    notification: {
      contact_request_accepted: 'Contact request accepted',
      contact_request_ignored: 'Contact request ignored',
      contact_request_rejected: 'Contact request rejected',
      contact_request_sent: 'Contact request sent',
      event_joined: 'You have joined this event',
      event_left: 'You have left this event',
      invitation_sent: '1 invitation sent |||| %{smart_count} invitations sent',
      login_to_connect_user: 'Please create an account to connect with %{username}',
      login_to_view_event: 'Please connect to your account to view this event',
      message_sent: 'Your message has been sent',
      message_send_error: "Error while sending the message: %{error}",
      profile_data_not_found: "Your profile couldn't be found, please reconnect yourself",
      user_not_found: "User %{username} doesn't exist",
    },
    permission: {
      view: "Allowed to join",
      share: 'Invite own contacts',
    },
    time: {
      hours: '1 hour |||| %{smart_count} hours',
      minutes: '1 minute |||| %{smart_count} minutes',
      days: '1 day |||| %{smart_count} days',
    },
    user: {
      unknown: 'Unknown',
    },
    validation: {
      futureDate: 'Must be in the future',
      afterStartTime: "Must be after the event's start time",
      beforeStartTime: "Must be before the event's start time",
    },
  },
};
