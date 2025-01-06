import HelperCreate from './HelperCreate';

export default {
  config: {
    create: HelperCreate
  },
  dataModel: {
    types: ['apods:Helper'],
    list: {
      fetchContainer: true
    },
    create: {
      server: 'app'
    }
  },
  translations: {
    // en: {
    //   name: 'Event |||| Events',
    //   fields: {
    //     name: 'Title',
    //     image: 'Image',
    //     startTime: 'Start time',
    //     endTime: 'End time',
    //     content: 'About',
    //     location: 'Location',
    //     'dc:creator': 'Organizer',
    //     'apods:hasFormat': 'Event type',
    //     'apods:hasStatus': 'Status',
    //     'apods:attendees': 'Attendees',
    //     'apods:maxAttendees': 'Max attendees',
    //     'apods:closingTime': 'Closing time',
    //     'apods:otherConditions': 'Other conditions'
    //   }
    // },
    fr: {
      name: 'Personne ressource |||| Personnes ressource',
      fields: {
        'apods:eventFormat': 'Types de rencontres',
        location: 'Ville',
        radius: 'Rayon',
        'apods:availableForCall': 'Disponible pour appel avant la réunion',
        'apods:availableForFacilitation': 'Disponible pour venir (co-)faciliter sur place',
        'apods:validated': 'Validé',
        description: 'Commentaire'
      }
    }
  }
};
