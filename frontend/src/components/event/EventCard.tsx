import { useOne } from '@refinedev/core';
import { CalendarOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import useActorProfile from '../../hooks/useActorProfile';
import { formatEventDateTime } from '../../utils/formatEventDate';
import type { EventRecord, FormatRecord } from '../../types';

type Props = {
  event: EventRecord;
};

const EventCard = ({ event }: Props) => {
  const { data: organizerProfile } = useActorProfile(event['dc:creator']);
  const { result: format } = useOne<FormatRecord>({
    resource: 'format',
    id: event['apods:hasFormat'],
    queryOptions: { enabled: !!event['apods:hasFormat'] }
  });

  return (
    <>
      <h2 className="ap-font-display" style={{ margin: 0, fontSize: 20, fontWeight: 500, lineHeight: 1.8, color: '#FFA500' }}>
        {event.name}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
        <Tag icon={<CalendarOutlined />} bordered={false}>
          {formatEventDateTime(event.startTime)}
        </Tag>
        {organizerProfile?.['vcard:given-name'] && (
          <Tag icon={<UserOutlined />} bordered={false}>
            {organizerProfile['vcard:given-name']}
          </Tag>
        )}
        {format?.['rdfs:label'] && (
          <Tag icon={<StarOutlined />} bordered={false}>
            {format['rdfs:label']}
          </Tag>
        )}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {event.content}
      </p>
    </>
  );
};

export default EventCard;
