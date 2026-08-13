import { useTranslation } from 'react-i18next';
import { useOne, useParsed } from '@refinedev/core';
import { Col, Grid, Image, Row, Space, Spin } from 'antd';

import PageLayout from '../components/layout/PageLayout';
import EventDetails from '../components/event/EventDetails';
import EventAlert from '../components/event/EventAlert';
import EventConditions from '../components/event/EventConditions';
import EventJoinCard from '../components/event/EventJoinCard';
import ContactField from '../components/event/ContactField';
import AttendeeAvatar from '../components/event/AttendeeAvatar';
import HostLocationMap from '../components/event/HostLocationMap';
import MarkdownContent from '../components/common/MarkdownContent';
import BodyLabel from '../components/common/BodyLabel';
import EditButton from '../components/common/EditButton';
import ShareButton from '../components/share/ShareButton';
import JoinButton from '../components/event/JoinButton';
import useActivityCollection from '../hooks/useActivityCollection';
import type { EventRecord, FormatRecord } from '../types';

const { useBreakpoint } = Grid;

const EventShowPage = () => {
  const { t } = useTranslation();
  const { id } = useParsed();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const { result: event, query } = useOne<EventRecord>({ resource: 'event', id });
  const { result: format } = useOne<FormatRecord>({
    resource: 'format',
    id: event?.['apods:hasFormat'],
    queryOptions: { enabled: !!event?.['apods:hasFormat'] }
  });
  const { result: formatParent } = useOne<FormatRecord>({
    resource: 'format',
    id: format?.['skos:broader'],
    queryOptions: { enabled: !!format?.['skos:broader'] }
  });
  const { items: attendeeUris } = useActivityCollection(event?.['apods:attendees']);

  if (query.isLoading || !event) {
    return (
      <PageLayout>
        <div style={{ padding: 48, textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    );
  }

  const image = Array.isArray(event.image) ? event.image[0] : event.image;

  return (
    <PageLayout>
      <div style={{ backgroundColor: '#fff', paddingTop: 16, paddingBottom: 8 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <Row justify="space-between" align="top" gutter={[16, 16]}>
            <Col xs={24} sm={18}>
              {format && (
                <div style={{ fontSize: 14, marginBottom: 4 }}>
                  {formatParent?.name && <>{formatParent.name} &nbsp;&gt;&nbsp; </>}
                  {format.name}
                </div>
              )}
              <h1 className="ap-font-display" style={{ margin: 0, lineHeight: 1.15 }}>
                {event.name}
              </h1>
            </Col>
            <Col xs={24} sm={6}>
              <Space
                style={{ width: '100%', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}
              >
                <ShareButton event={event} />
                <EditButton creatorUri={event['dc:creator']} to={`/events/${encodeURIComponent(event.id)}/edit`} />
              </Space>
            </Col>
          </Row>
          <div style={{ padding: '16px 0' }}>
            <EventDetails event={event} orientation={isMobile ? 'vertical' : 'horizontal'} />
          </div>
          {isMobile && (
            <div style={{ paddingBottom: 16 }}>
              <JoinButton event={event} type="primary" block />
            </div>
          )}
        </div>
      </div>

      <EventAlert event={event} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 80px' }}>
        <Row gutter={24}>
          <Col xs={24} md={16} lg={17}>
            {image && (
              <Image
                src={image}
                alt={event.name}
                style={{ width: '100%', height: 225, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
              />
            )}

            <MarkdownContent>{event.content}</MarkdownContent>

            <BodyLabel>{t('event.conditions')}</BodyLabel>
            <EventConditions event={event} />

            {attendeeUris.length > 0 && (
              <>
                <BodyLabel>{t('event.attendees')}</BodyLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                  {attendeeUris.map(uri => (
                    <AttendeeAvatar key={uri} actorUri={uri} />
                  ))}
                </div>
              </>
            )}

            {event.location && (
              <>
                <BodyLabel>{t('event.location')}</BodyLabel>
                <HostLocationMap locationUri={event.location} />
              </>
            )}

            <div style={{ marginTop: 24 }}>
              <ContactField event={event} />
            </div>
          </Col>

          {!isMobile && (
            <Col md={8} lg={7}>
              <div style={{ position: 'sticky', top: 24 }}>
                <EventJoinCard event={event}>
                  <EventDetails event={event} orientation="vertical" />
                </EventJoinCard>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </PageLayout>
  );
};

export default EventShowPage;
