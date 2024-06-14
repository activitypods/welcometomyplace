const { ACTIVITY_TYPES, OBJECT_TYPES } = require('@semapps/activitypub');
const { PodActivitiesHandlerMixin } = require('@activitypods/app');

module.exports = {
  name: 'registration',
  mixins: [PodActivitiesHandlerMixin],
  activities: {
    join: {
      match: {
        type: ACTIVITY_TYPES.JOIN,
        object: {
          type: OBJECT_TYPES.EVENT
        }
      },
      async onEmit(ctx, activity, actorUri) {
        const event = activity.object;
        const organizerUri = event['dc:creator'];

        const actor = await ctx.call('pod-resources.get', { resourceUri: actorUri, actorUri });

        const contactsGroupUri = await ctx.call('pod-wac-groups.getUriFromCollectionUri', {
          collectionUri: actor['apods:contacts'],
        });

        // Ensure the organizer is in the contacts WebACL group of the emitter so he can see his profile (and write to him)
        await ctx.call('pod-wac-groups.addMember', {
          groupUri: contactsGroupUri,
          memberUri: organizerUri,
          actorUri
        });
      },
      async onReceive(ctx, activity, actorUri) {
        const event = activity.object;

        // if (await ctx.call('events.status.isFinished', { event })) {
        //   throw new MoleculerError('This event is finished', 403, 'FORBIDDEN');
        // } else if (await ctx.call('events.status.isClosed', { event })) {
        //   throw new MoleculerError('Registrations for this event are closed', 403, 'FORBIDDEN');
        // }

        const announces = await ctx.call('pod-collections.getItems', {
          collectionUri: event['apods:announces'],
          actorUri
        });

        if (!announces.includes(activity.actor)) {
          throw new MoleculerError('You have not been invited to this event', 400, 'BAD REQUEST');
        }

        await ctx.call('attendees.add', {
          collectionUri: event['apods:attendees'],
          itemUri: activity.actor,
          actorUri
        });

        // Update the event statut (will tag the event as closed if the max attendees is reached)
        await ctx.call('status.tagUpdatedEvent', { event, actorUri });

        await ctx.call('pod-notifications.send', {
          template: {
            title: {
              en: `{{emitterProfile.vcard:given-name}} is attending your event "{{activity.object.name}}"`,
              fr: `{{emitterProfile.vcard:given-name}} participe à votre rencontre "{{activity.object.name}}"`
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
          context: event.id,
          recipientUri: actorUri
        });
      }
    },
    leave: {
      match: {
        type: ACTIVITY_TYPES.LEAVE,
        object: {
          type: OBJECT_TYPES.EVENT
        }
      },
      async onReceive(ctx, activity, actorUri) {
        const event = activity.object;

        const attendees = await ctx.call('pod-collections.getItems', {
          collectionUri: event['apods:attendees'],
          actorUri
        });

        if (!attendees.includes(activity.actor)) {
          throw new MoleculerError('You are not attending this event', 400);
        }

        const collectionUri = await ctx.call('attendees.getCollectionUriFromResource', {
          resource: event
        });

        await ctx.call('attendees.remove', {
          collectionUri,
          itemUri: activity.actor,
          actorUri
        });

        // Update the event statut (will tag the event as open if the max attendees is not reached anymore)
        await ctx.call('status.tagUpdatedEvent', { event, actorUri });

        await ctx.call('pod-notifications.send', {
          template: {
            title: {
              en: `{{emitterProfile.vcard:given-name}} is not attending anymore your event "{{activity.object.name}}"`,
              fr: `{{emitterProfile.vcard:given-name}} ne participe plus à votre rencontre "{{activity.object.name}}"`
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
          context: event.id,
          recipientUri: actorUri
        });
      }
    }
  }
};
