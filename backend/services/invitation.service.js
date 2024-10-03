const { ACTIVITY_TYPES, OBJECT_TYPES } = require('@semapps/activitypub');
const { PodActivitiesHandlerMixin } = require('@activitypods/app');
const { arrayOf } = require('@semapps/ldp');

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
      async onEmit(ctx, activity, emitterUri) {
        if (emitterUri !== activity.object['dc:creator']) {
          throw new Error('Only the creator has the right to share the object ' + activity.object.id);
        }

        // We send the notification directly to the recipients, in case they haven't installed the app yet
        for (const recipientUri of arrayOf(activity.target)) {
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
            recipientUri
          });
        }
      }
    },
  }
};
