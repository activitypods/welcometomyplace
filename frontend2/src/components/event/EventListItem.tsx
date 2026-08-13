import { Card } from 'antd';
import { Link } from 'react-router';

import EventCard from './EventCard';
import type { EventRecord } from '../../types';

type Props = {
  event: EventRecord;
};

const EventListItem = ({ event }: Props) => {
  const image = Array.isArray(event.image) ? event.image[0] : event.image;
  const startDate = new Date(event.startTime);

  return (
    <Link to={`/events/${encodeURIComponent(event.id)}`} style={{ color: 'inherit' }}>
      <Card
        styles={{ body: { display: 'flex', padding: 0 } }}
        style={{ marginBottom: 16, overflow: 'hidden' }}
        hoverable
      >
        {image ? (
          <div
            style={{
              width: 180,
              minWidth: 180,
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ) : (
          <div
            className="ap-gradient-surface"
            style={{
              width: 180,
              minWidth: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ textTransform: 'capitalize' }}>
              {startDate.toLocaleDateString(undefined, { weekday: 'long' })}
            </div>
            <div style={{ fontSize: 50, lineHeight: 1.2 }}>{startDate.getDate()}</div>
            <div style={{ textTransform: 'capitalize' }}>{startDate.toLocaleDateString(undefined, { month: 'long' })}</div>
          </div>
        )}
        <div style={{ padding: 16, flex: 1, minWidth: 0 }}>
          <EventCard event={event} />
        </div>
      </Card>
    </Link>
  );
};

export default EventListItem;
