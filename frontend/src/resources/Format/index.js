import FormatCreate from './FormatCreate';
import FormatEdit from './FormatEdit';
import FormatList from './FormatList';
import FormatShow from './FormatShow';

export default {
  config: {
    show: FormatShow,
    create: FormatCreate,
    edit: FormatEdit,
    list: FormatList,
    recordRepresentation: record => record.name
  },
  dataModel: {
    types: ['apods:EventFormat'],
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
      name: 'Format |||| Formats',
      fields: {
        name: 'Nom',
        summary: 'Résumé',
        image: 'Image',
        'apods:recipe': 'Recette'
      }
    }
  }
};
