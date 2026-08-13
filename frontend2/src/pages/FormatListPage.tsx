import { useTranslation } from 'react-i18next';
import { useGetIdentity, useList } from '@refinedev/core';
import { Button, Col, Row, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

import PageLayout from '../components/layout/PageLayout';
import FormatCard from '../components/format/FormatCard';
import type { FormatRecord, Identity } from '../types';

const FormatListPage = () => {
  const { t } = useTranslation();
  const { data: identity } = useGetIdentity<Identity>();
  const { result, query } = useList<FormatRecord>({
    resource: 'format',
    pagination: { mode: 'off' },
    sorters: [{ field: 'name', order: 'asc' }]
  });

  return (
    <PageLayout>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 className="ap-font-display">{t('format.all_formats')}</h1>
          {identity?.id && (
            <Link to="/formats/create">
              <Button type="primary" icon={<PlusOutlined />}>
                {t('format.create')}
              </Button>
            </Link>
          )}
        </div>
        {query.isLoading ? (
          <Spin />
        ) : (
          <Row gutter={[24, 24]}>
            {result.data.map((format: FormatRecord) => (
              <Col xs={24} sm={12} md={8} key={format.id}>
                <FormatCard format={format} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </PageLayout>
  );
};

export default FormatListPage;
