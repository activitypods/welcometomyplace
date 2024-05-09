const { PodResourcesHandlerMixin } = require('@activitypods/app');

module.exports = {
  name: 'events',
  mixins: [PodResourcesHandlerMixin],
  settings: {
    type: 'Event'
  },
  actions: {
    async getAnnouncesGroupUri(ctx) {
      const { resourceUri, actorUri } = ctx.params;

      const resource = await ctx.call('pod-resources.get', {
        resourceUri,
        actorUri
      });

      const announcesCollectionUri = await ctx.call('pod-collections.getCollectionUriFromResource', { 
        resource, 
        attachPredicate: 'apods:announces' 
      });

      return await ctx.call('pod-wac-groups.getUriFromCollectionUri', {
        collectionUri: announcesCollectionUri,
      });
    }
  },
  methods: {
    async onCreate(ctx, resource, actorUri) {
      await ctx.call('status.tagNewEvent', { event: resource, actorUri });

      await ctx.call('locations.giveReadPermissionsToAnnouncesGroup', { event: resource, actorUri });
    },
    async onUpdate(ctx, resource, actorUri) {
      await ctx.call('status.tagUpdatedEvent', { event: resource, actorUri });
    }
  }
};
