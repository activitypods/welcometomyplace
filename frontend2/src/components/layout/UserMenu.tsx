import { useTranslation } from 'react-i18next';
import { useGetIdentity, useLogout } from '@refinedev/core';
import { Avatar, Button, Dropdown, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

import useOpenExternalApp from '../../hooks/useOpenExternalApp';
import type { Identity } from '../../types';

const UserMenu = () => {
  const { t } = useTranslation();
  const { data: identity, isLoading } = useGetIdentity<Identity>();
  const { mutate: logout } = useLogout();
  const openExternalApp = useOpenExternalApp();

  if (isLoading) return null;

  if (!identity?.id) {
    return (
      <Link to="/login">
        <Button type="primary">{t('actions.login')}</Button>
      </Link>
    );
  }

  const profileUrl = openExternalApp('as:Profile', identity.id, 'edit');

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'profile',
            label: (
              <a href={profileUrl} rel="noopener noreferrer">
                {t('nav.my_profile')}
              </a>
            ),
            icon: <UserOutlined />
          },
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
