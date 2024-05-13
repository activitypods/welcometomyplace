import EventEdit from './EventEdit';
import EventList from './EventList';
import EventShow from './EventShow';
import EventIcon from '@mui/icons-material/Event';
import EventCreate from './EventCreate';

export default {
  config: {
    list: EventList,
    show: EventShow,
    create: EventCreate,
    edit: EventEdit,
    icon: EventIcon,
    options: {
      label: 'Événements',
    },
  },
  dataModel: {
    types: ['as:Event'],
  },
  translations: {
    en: {
      name: 'Event |||| Events',
      fields: {
        name: 'Title',
        image: 'Image',
        startTime: 'Start time',
        endTime: 'End time',
        content: 'About',
        location: 'Location',
        'dc:creator': 'Organizer',
        'apods:hasFormat': "Event type",
        'apods:hasStatus': 'Status',
        'apods:attendees': 'Attendees',
        'apods:maxAttendees': 'Max attendees',
        'apods:closingTime': 'Closing time',
        'apods:otherConditions': 'Other conditions',
      },
    },
    fr: {
      name: 'Evénement |||| Evénements',
      fields: {
        name: 'Titre',
        image: 'Image',
        startTime: 'Date de début',
        endTime: 'Date de fin',
        content: 'Présentation',
        location: 'Adresse',
        'dc:creator': 'Organisateur',
        'apods:hasFormat': "Type d'événement",
        'apods:hasStatus': 'Statut',
        'apods:attendees': 'Participants',
        'apods:maxAttendees': 'Participants maximum',
        'apods:closingTime': 'Fin des inscriptions',
        'apods:otherConditions': 'Autres conditions',
      },
    },
  },
};
