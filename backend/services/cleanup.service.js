const { arrayOf, delay } = require('@semapps/ldp');

module.exports = {
  name: 'cleanup',
  actions: {
    async removeOldEvents(ctx) {
      const actorsUris = ctx.params.actorUri
        ? [ctx.params.actorUri]
        : await ctx.call('app-registrations.getRegisteredPods');

      const limitDate = new Date();
      limitDate.setMonth(limitDate.getMonth() - 18);

      for (const actorUri of actorsUris) {
        this.logger.info(`Cleaning up events of ${actorUri}...`);

        const { body: eventsContainer } = await ctx.call('events.list', { actorUri });

        for (const event of arrayOf(eventsContainer?.['ldp:contains'])) {
          const endTimeDate = new Date(event.endTime);
          if (endTimeDate < limitDate && event['dc:creator'] === actorUri) {
            this.logger.info(`Event ${event.name} finished more than 18 months ago (${endTimeDate}), deleting...`);

            await ctx.call('events.delete', { resourceUri: event.id || event['@id'], actorUri });

            // Wait 1min, to ensure all users have deleted their cache
            await delay(180000);
          }
        }
      }
    },
    async markPastEventsAsFinished(ctx) {
      const actorsUris = ctx.params.actorUri
        ? [ctx.params.actorUri]
        : await ctx.call('app-registrations.getRegisteredPods');

      for (const actorUri of actorsUris) {
        this.logger.info(`Looking for events of ${actorUri}...`);

        const { body: eventsContainer } = await ctx.call('events.list', { actorUri });

        for (const event of arrayOf(eventsContainer?.['ldp:contains'])) {
          const hasFinishedStatus = await ctx.call('status.isFinished', { event });
          if (!hasFinishedStatus && this.isPastDate(event.endTime) && event['dc:creator'] === actorUri) {
            this.logger.info(`Marking event ${event.name} as finished`);
            await ctx.call('status.tagAsFinished', { event, actorUri });
          }
        }
      }
    }
  },
  methods: {
    isPastDate(date) {
      const diff = new Date().getTime() - new Date(date).getTime();
      return diff > 0;
    }
  }
};
