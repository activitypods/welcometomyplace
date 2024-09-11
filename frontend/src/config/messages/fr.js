// Model https://github.com/marmelab/react-admin/blob/master/packages/ra-language-french/src/index.ts

module.exports = {
  app: {
    forum_name: 'Forum Réseaux de Vie',
    backed_by_organization: 'Proposé par %{organizationName}',
    action: {
      accept: 'Accepter',
      accept_contact_request: 'Accepter la demande',
      add: 'Ajouter',
      add_location: 'Ajouter une adresse',
      contact_organizer: "Contacter l'organisateur",
      contact_attendees: 'Contacter les participants',
      copy: 'Copier dans votre presse-papier',
      create_event: 'Proposer une rencontre',
      create_event_short: 'Proposer',
      edit_profile: 'Éditer mon profil',
      ignore: 'Ignorer',
      ignore_contact_request: 'Ignorer la demande',
      join: "Je m'inscris",
      leave: 'Je me désinscris',
      login: 'Se connecter avec un compte',
      reject: 'Refuser',
      reject_contact_request: 'Rejeter la demande',
      remove_contact: 'Retirer de mes contacts',
      search: 'Rechercher',
      send: 'Envoyer',
      send_invitation: "Envoyer l'invitation |||| Envoyer %{smart_count} invitations",
      send_message: 'Envoyer un message',
      share: 'Partager',
      share_event: 'Partager la rencontre',
      signup: 'Créer un nouveau compte',
      reset_password: 'Réinitialisation du mot de passe',
      set_new_password: 'Definir un nouveau mot de passe'
    },
    page: {
      events: 'Tableau de bord'
    },
    tab: {
      next_events: 'Prochaines rencontres',
      finished_events: 'Rencontres terminées'
    },
    card: {
      add_contact: 'Ajouter un contact',
      contact_requests: 'Demandes de contact',
      share_contact: 'Mon lien de contact'
    },
    block: {
      contact_requests: 'Nouvelles demandes de contact',
      organized_events: 'Rencontres organisées'
    },
    input: {
      about_you: 'Quelques mots sur vous',
      conditions: 'Conditions',
      date: 'Date',
      duration: 'Durée',
      message: 'Message',
      provider: 'Hébergeur',
      user_id: 'Identifiant utilisateur',
      email: 'Email',
      current_password: 'Mot de passe actuel',
      new_password: 'Nouveau mot de passe',
      confirm_new_password: 'Confirmer le nouveau mot de passe'
    },
    helper: {
      add_contact:
        'Pour ajouter un utilisateur à votre réseau, vous devez connaître son identifiant (au format @bob@serveur.com).',
      addresses_visibility: 'Les adresses ne sont visibles que des personnes invité à vos rencontres',
      event_draft_mode:
        "Cette rencontre n'est actuellement visible que par vous. Dès que vous serez satisfait de sa présentation, vous pourrez le partager avec vos contacts (bouton en haut à droite).",
      event_join_right:
        'Vous avez été invité à cette rencontre. Pour accepter l\'invitation, veuillez cliquer sur le bouton "Je m\'inscris".',
      event_share_right:
        "L'organisateur vous a donné le droit de partager cette rencontre avec vos contacts (bouton en haut à droite).",
      first_event:
        "Si vous avez des questions ou difficultés concernant la création de rencontres, n'hésitez pas à poster un message sur le",
      max_attendees: 'Attention: vous êtes compté comme participant',
      message_profile_show_right:
        "Envoyer un message à l'organisateur lui donnera le droit de voir votre profil, pour lui permettre de vous répondre.",
      no_contact: 'Vous devez ajouter des contacts à votre réseau pour pouvoir les inviter',
      no_address: 'Vous devez ajouter au moins une adresse à votre profil avant de pouvoir proposer une rencontre',
      other_conditions: 'Vous pouvez entrer plusieurs conditions supplémentaires (une par ligne)',
      organized_events_visibility: "Seules les rencontres auxquelles vous avez été invité s'affichent ci-dessous",
      profile_visibility: "Votre profil n'est visible que des personnes que vous avez accepté dans votre réseau",
      share_contact:
        'Pour vous connecter avec une personne que vous connaissez, vous pouvez lui envoyer le lien ci-dessous.',
      location_comment: 'Indications supplémentaires pour aider les invités à trouver ce lieu'
    },
    message: {
      copied_to_clipboard: 'Copié !',
      event_closed: 'Les inscriptions sont fermées',
      event_finished: 'Cette rencontre est terminé',
      no_condition: 'Aucune',
      you_participated_to_same_event: 'Vous avez participé à la même rencontre',
      event_message_title: `%{username} vous écrit au sujet de "%{event}"`
    },
    notification: {
      contact_request_accepted: 'Demande de contact acceptée',
      contact_request_ignored: 'Demande de contact ignorée',
      contact_request_rejected: 'Demande de contact refusée',
      contact_request_sent: 'Demande de contact envoyée',
      contact_removed: 'Contact supprimé',
      event_joined: 'Vous vous êtes bien inscrit à cette rencontre',
      event_left: 'Vous vous êtes bien désinscrit de cette rencontre',
      invitation_sent: '1 invitation envoyée |||| %{smart_count} invitations envoyées',
      login_to_connect_user: 'Veuillez vous créer un compte pour vous connecter avec %{username}',
      login_to_view_event: 'Veuillez vous connecter pour voir cette rencontre',
      message_sent: 'Votre message a bien été envoyé',
      message_send_error: "Erreur lors de l'envoi du message: %{error}",
      profile_data_not_found: "Votre profil n'a pas été trouvé, veuillez vous déconnecter et vous reconnecter",
      user_not_found: "L'utilisateur %{username} n'existe pas",
      app_not_authorized: "Application non-autorisée: impossible de rediriger vers l'URL %{url}",
      reset_password_submited: 'Un e-mail a été envoyé avec les instructions de réinitialisation du mot de passe',
      reset_password_error: "Une erreur s'est produite",
      password_changed: 'Le mot de passe a été changé avec succès',
      new_password_error: "Une erreur s'est produite",
      invalid_password: 'Mot de passe incorrect',
      get_settings_error: "Une erreur s'est produite",
      update_settings_error: "Une erreur s'est produite"
    },
    permission: {
      view: "Droit de s'inscrire",
      share: 'Inviter ses contacts'
    },
    time: {
      hours: '1 heure |||| %{smart_count} heures',
      minutes: '1 minute |||| %{smart_count} minutes',
      days: '1 jour |||| %{smart_count} jours'
    },
    user: {
      unknown: 'Inconnu',
      location: 'Chez %{surname}'
    },
    validation: {
      futureDate: 'Doit être dans le futur',
      afterStartTime: 'Doit être après la date de début de la rencontre',
      beforeStartTime: 'Doit être avant la date de début de la rencontre',
      email: 'Doit être un email valide',
      confirmNewPassword: 'Doit être le même que le nouveau champ de mot de passe'
    },
    share: {
      all_contacts: 'Tous mes contacts',
      allow_view: 'Autoriser la vue',
      allow_share: 'Autoriser le partage'
    }
  }
};
