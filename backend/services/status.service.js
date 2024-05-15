const { arrayOf } = require('@semapps/ldp');
const { triple, namedNode } = require('@rdfjs/data-model');

const STATUS_COMING = 'http://activitypods.org/ns/core#Coming';
const STATUS_FINISHED = 'http://activitypods.org/ns/core#Finished';
const STATUS_OPEN = 'http://activitypods.org/ns/core#Open';
const STATUS_CLOSED = 'http://activitypods.org/ns/core#Closed';

module.exports = {
  name: 'status',
  actions: {
    async set(ctx) {
      const { event, statusToAdd, statusToRemove, actorUri } = ctx.params;

      console.log('status.set', ctx.params);

      await ctx.call('events.patch', {
        resourceUri: event.id || event['@id'],
        triplesToAdd: [
          triple(
            namedNode(event.id || event['@id']),
            namedNode('http://activitypods.org/ns/core#hasStatus'),
            namedNode(statusToAdd)
          )
        ],
        triplesToRemove: [
          triple(
            namedNode(event.id || event['@id']),
            namedNode('http://activitypods.org/ns/core#hasStatus'),
            namedNode(statusToRemove)
          )
        ],
        actorUri
      });
    },
    async tagAsOpen(ctx) {
      const { event, actorUri } = ctx.params;
      await this.actions.set({
        event,
        statusToAdd: STATUS_OPEN,
        statusToRemove: STATUS_CLOSED,
        actorUri
      });
    },
    async tagAsClosed(ctx) {
      const { event, actorUri } = ctx.params;
      await this.actions.set({
        event,
        statusToAdd: STATUS_CLOSED,
        statusToRemove: STATUS_OPEN,
        actorUri
      });
    },
    async tagAsComing(ctx) {
      const { event, actorUri } = ctx.params;
      await this.actions.set({
        event,
        statusToAdd: STATUS_COMING,
        statusToRemove: STATUS_FINISHED,
        actorUri
      });
    },
    async tagAsFinished(ctx) {
      const { event, actorUri } = ctx.params;
      await this.actions.set({
        event,
        statusToAdd: STATUS_FINISHED,
        statusToRemove: STATUS_COMING,
        actorUri
      });
      ctx.emit('event.finished', { event, actorUri });
    },
    async tagNewEvent(ctx) {
      const { event, actorUri } = ctx.params;

      await this.actions.tagAsOpen({ event, actorUri });
      await this.actions.tagAsComing({ event, actorUri });

      if (event['apods:closingTime']) {
        await ctx.call('timer.set', {
          key: [event.id, 'closed'],
          time: event['apods:closingTime'],
          actionName: 'status.tagAsClosed',
          params: { event, actorUri }
        });
      }

      await ctx.call('timer.set', {
        key: [event.id, 'finished'],
        time: event.endTime,
        actionName: 'status.tagAsFinished',
        params: { event, actorUri }
      });
    },
    async tagUpdatedEvent(ctx) {
      const { event, actorUri } = ctx.params;
      let maxAttendeesReached = false;
      let closingTimeReached = false;

      console.log('tagUpdatedEvent', ctx.params, this.isPastDate(event.endTime))

      // Reset timer in case the end time was changed
      if (!this.isPastDate(event.endTime)) {
        await ctx.call('timer.set', {
          key: [event.id, 'finished'],
          time: event.endTime,
          actionName: 'status.tagAsFinished',
          params: { event, actorUri }
        });
      }

      if (event['apods:closingTime']) {
        closingTimeReached = this.isPastDate(event['apods:closingTime']);
      }

      if (event['apods:maxAttendees']) {
        const attendeesCollectionUri = await ctx.call('attendees.getCollectionUriFromResource', { 
          resource: event, 
          actorUri 
        });

        const attendeesCollection = await ctx.call('pod-resources.get', {
          resourceUri: attendeesCollectionUri,
          actorUri
        });

        maxAttendeesReached = arrayOf(attendeesCollection.items).length >= event['apods:maxAttendees'];
      }

      console.log('tagUpdatedEvent2', maxAttendeesReached, closingTimeReached)

      if (!this.isClosed(event) && (maxAttendeesReached || closingTimeReached)) {
        await this.actions.tagAsClosed({ event, actorUri });
      } else if (this.isClosed(event) && !maxAttendeesReached && !closingTimeReached) {
        await this.actions.tagAsOpen({ event, actorUri });
        if (event['apods:closingTime']) {
          await ctx.call('timer.set', {
            key: [event.id, 'closed'],
            time: event['apods:closingTime'],
            actionName: 'status.tagAsClosed',
            params: { event, actorUri }
          });
        }
      }
    },
  },
  methods: {
    isPastDate(date) {
      const diff = (new Date()).getTime() - (new Date(date)).getTime();
      return diff > 0;
    },
    isFinished(event) {
      const status = arrayOf(event['apods:hasStatus']);
      return status.includes('apods:Finished'); // We must not use full URI
    },
    isClosed(event) {
      const status = arrayOf(event['apods:hasStatus']);
      return status.includes('apods:Closed'); // We must not use full URI
    },
  }
};