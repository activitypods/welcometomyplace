import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { Alert, Button, Col, Grid, Row, Spin, Tabs } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

import AuthenticatedLayout from '../components/layout/AuthenticatedLayout';
import EventListItem from '../components/event/EventListItem';
import ProfileCard from '../components/event/ProfileCard';
import { APP_DESCRIPTION, ORGANIZATION_NAME, ORGANIZATION_URL } from '../config/env';
import type { EventRecord } from '../types';

const EventListPage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<'coming' | 'finished'>('coming');
  const screens = Grid.useBreakpoint();

  const { result, query } = useList<EventRecord>({
    resource: 'event',
    filters: [
      {
        field: 'apods:hasStatus',
        operator: 'eq',
        value: tab === 'coming' ? 'http://activitypods.org/ns/core#Coming' : 'http://activitypods.org/ns/core#Finished'
      }
    ],
    sorters: [{ field: 'startTime', order: tab === 'coming' ? 'asc' : 'desc' }],
    pagination: { mode: 'off' }
  });

  return (
    <AuthenticatedLayout>
      <div style={{ backgroundColor: '#fff', padding: '24px 24px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 className="ap-font-display" style={{ margin: 0 }}>
            {t('event.my_events')}
          </h1>
          <Link to="/events/create">
            <Button type="primary" icon={<PlusOutlined />}>
              {screens.sm ? t('event.create') : t('event.create_short')}
            </Button>
          </Link>
        </div>
      </div>
      <Tabs
        activeKey={tab}
        onChange={key => setTab(key as 'coming' | 'finished')}
        centered={false}
        style={{ backgroundColor: '#fff', paddingLeft: 0 }}
        tabBarStyle={{ maxWidth: 1100, margin: '0 auto', paddingLeft: 24 }}
        items={[
          { key: 'coming', label: t('event.tab_coming') },
          { key: 'finished', label: t('event.tab_finished') }
        ]}
      />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <Row gutter={24}>
          <Col xs={24} md={16} lg={17}>
            <Alert
              icon={<HomeOutlined />}
              showIcon
              type="warning"
              style={{ marginBottom: 16 }}
              message={
                <>
                  {APP_DESCRIPTION}{' '}
                  {ORGANIZATION_NAME && ORGANIZATION_URL && (
                    <a href={ORGANIZATION_URL} target="_blank" rel="noopener noreferrer">
                      {t('event.backed_by', { organizationName: ORGANIZATION_NAME })}
                    </a>
                  )}
                </>
              }
            />
            {query.isLoading ? (
              <Spin />
            ) : (
              result.data.map((event: EventRecord) => <EventListItem key={event.id} event={event} />)
            )}
          </Col>
          <Col xs={0} md={8} lg={7}>
            <ProfileCard />
          </Col>
        </Row>
      </div>
    </AuthenticatedLayout>
  );
};

export default EventListPage;
