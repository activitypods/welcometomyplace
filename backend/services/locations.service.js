const urlJoin = require('url-join');
const { PodResourcesHandlerMixin } = require('@activitypods/app');
const CONFIG = require('../config/config');

module.exports = {
  name: 'locations',
  mixins: [PodResourcesHandlerMixin],
  settings: {
    shapeTreeUri: urlJoin(CONFIG.SHAPE_REPOSITORY_URL, 'shapetrees/as/Event'),
    type: 'vcard:Location'
  },
  actions: {
    async giveReadPermissionsToAnnouncesGroup(ctx) {
      const { event, actorUri } = ctx.params;

      // Give read right for the event's location (if it is set)
      if (event.location) {
        const announcesGroupUri = await ctx.call('events.getAnnouncesGroupUri', {
          resourceUri: event.id || event['@id']
        });

        await ctx.call('pod-permissions.add', {
          uri: event.location,
          agentPredicate: 'acl:agentGroup',
          agentUri: announcesGroupUri,
          mode: 'acl:Read',
          actorUri
        });
      }
    }
  }
};
