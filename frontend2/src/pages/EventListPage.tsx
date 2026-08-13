import { Typography } from 'antd';

import AuthenticatedLayout from '../components/layout/AuthenticatedLayout';

// TODO(milestone 4): tabs (coming/finished), event cards grid, profile sidebar.
const EventListPage = () => (
  <AuthenticatedLayout>
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <Typography.Title level={2}>My events</Typography.Title>
    </div>
  </AuthenticatedLayout>
);

export default EventListPage;
