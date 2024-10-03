const { PodCollectionsHandlerMixin } = require('@activitypods/app');

module.exports = {
  name: 'attendees',
  mixins: [PodCollectionsHandlerMixin],
  settings: {
    type: 'Event',
    attachPredicate: 'http://activitypods.org/ns/core#attendees',
    collectionOptions: {
      ordered: false,
      summary: 'Event attendees'
    },
    createWacGroup: true
  },
  actions: {
    async addCreator(ctx) {
      const { collectionUri, actorUri } = ctx.params;

      // Add event creator to attendees list
      await this.actions.add(
        {
          collectionUri,
          itemUri: actorUri,
          actorUri
        }, 
        { 
          parentCtx: ctx 
        }
      );
    },
    async giveReadPermissionsToAnnouncesGroup(ctx) {
      const { collectionUri, resourceUri, actorUri } = ctx.params;

      const announcesGroupUri = await ctx.call('events.getAnnouncesGroupUri', { resourceUri });

      // TODO give control permissions ??
      await ctx.call('pod-permissions.add', {
        uri: collectionUri,
        agentPredicate: 'acl:agentGroup',
        agentUri: announcesGroupUri,
        mode: 'acl:Read',
        actorUri
      });
    }
  },
  hooks: {
    after: {
      async createAndAttach(ctx, res) {
        const { resourceUri, actorUri } = ctx.params;
        const collectionUri = res;

        await this.actions.addCreator(
          { collectionUri, actorUri },         
          { parentCtx: ctx }
        );

        await this.actions.giveReadPermissionsToAnnouncesGroup(
          { collectionUri, resourceUri, actorUri },         
          { parentCtx: ctx }
        );

        return res;
      }
    }
  }
};
