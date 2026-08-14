import { useTranslation } from 'react-i18next';
import { useGetIdentity, useLogout } from '@refinedev/core';
import { Avatar, Button, Dropdown, Space } from 'antd';
import { AppstoreOutlined, DatabaseOutlined, LogoutOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

import useNodeinfo from '../../hooks/useNodeinfo';
import urlJoin from '../../utils/urlJoin';
import type { Identity } from '../../types';

const UserMenu = () => {
  const { t } = useTranslation();
  const { data: identity, isLoading } = useGetIdentity<Identity>();
  const { mutate: logout } = useLogout();
  // The Pod provider's own frontend (network/apps/data/settings pages all live there, not in
  // this app) is discovered via the standard nodeinfo protocol against the WebID's own host.
  const { data: nodeinfo } = useNodeinfo(identity?.id ? new URL(identity.id).host : undefined);

  if (isLoading) return null;

  if (!identity?.id) {
    return (
      <Link to="/login">
        <Button type="primary">{t('actions.login')}</Button>
      </Link>
    );
  }

  const frontendUrl = nodeinfo?.metadata?.frontend_url;

  return (
    <Dropdown
      menu={{
        items: [
          ...(frontendUrl
            ? [
                {
                  key: 'network',
                  label: (
                    <a href={urlJoin(frontendUrl, 'network')} rel="noopener noreferrer">
                      {t('nav.network')}
                    </a>
                  ),
                  icon: <TeamOutlined />
                },
                {
                  key: 'apps',
                  label: (
                    <a href={urlJoin(frontendUrl, 'apps')} rel="noopener noreferrer">
                      {t('nav.apps')}
                    </a>
                  ),
                  icon: <AppstoreOutlined />
                },
                {
                  key: 'data',
                  label: (
                    <a href={urlJoin(frontendUrl, 'data')} rel="noopener noreferrer">
                      {t('nav.data')}
                    </a>
                  ),
                  icon: <DatabaseOutlined />
                },
                {
                  key: 'settings',
                  label: (
                    <a href={urlJoin(frontendUrl, 'settings')} rel="noopener noreferrer">
                      {t('nav.settings')}
                    </a>
                  ),
                  icon: <SettingOutlined />
                }
              ]
            : []),
          {
            key: 'logout',
            label: t('actions.logout'),
            icon: <LogoutOutlined />,
            onClick: () => logout()
          }
        ]
      }}
      trigger={['click']}
    >
      <Space style={{ cursor: 'pointer', color: 'inherit' }}>
        <Avatar src={identity.avatar} icon={!identity.avatar && <UserOutlined />} />
        <span className="ap-usermenu-name">{identity.name}</span>
      </Space>
    </Dropdown>
  );
};

export default UserMenu;
