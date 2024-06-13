const { ACTIVITY_TYPES, OBJECT_TYPES } = require('@semapps/activitypub');
const { PodActivitiesHandlerMixin } = require('@activitypods/app');

module.exports = {
  name: 'invitation',
  mixins: [PodActivitiesHandlerMixin],
  activities: {
    invite: {
      match: {
        type: ACTIVITY_TYPES.ANNOUNCE,
        object: {
          type: OBJECT_TYPES.EVENT
        }
      },
      async onReceive(ctx, activity, actorUri) {
        await ctx.call('pod-notifications.send', {
          template: {
            title: {
              en: `{{emitterProfile.vcard:given-name}} invites you to an event "{{activity.object.name}}"`,
              fr: `{{emitterProfile.vcard:given-name}} vous invite à une rencontre "{{activity.object.name}}"`
            },
            actions: [
              {
                caption: {
                  en: 'View',
                  fr: 'Voir'
                },
                link: '/Event/{{encodeUri activity.object.id}}/show'
              }
            ]
          },
          activity,
          context: activity.object.id,
          recipientUri: actorUri
        });
      }
    },
  }
};
