import { useTranslation } from 'react-i18next';
import { useGetIdentity } from '@refinedev/core';
import { Avatar, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import useOpenExternalApp from '../../hooks/useOpenExternalApp';
import useOwnActor from '../../hooks/useOwnActor';
import useOwnProfile from '../../hooks/useOwnProfile';
import { formatUsername } from '../../utils/formatUsername';
import type { Identity } from '../../types';

/** Sidebar card on the events list page: the logged-in user's own avatar/name/handle, and a
 *  deep link out to the Pod provider's own frontend for profile editing (no in-app profile page). */
const ProfileCard = () => {
  const { t } = useTranslation();
  const { data: identity } = useGetIdentity<Identity>();
  const { data: profile } = useOwnProfile();
  const { data: ownActor } = useOwnActor();
  const openExternalApp = useOpenExternalApp();

  if (!identity) return null;

  return (
    <Card styles={{ body: { padding: 0 } }} style={{ overflow: 'hidden' }}>
      <div className="ap-gradient-surface" style={{ height: 85, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 10, left: 0, right: 0, textAlign: 'center' }}>
          <Avatar size={150} src={profile?.['vcard:photo']} icon={!profile?.['vcard:photo'] && <UserOutlined />} />
        </div>
      </div>
      <div style={{ padding: '80px 24px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'inherit', margin: 0 }}>{profile?.['vcard:given-name']}</h2>
        <div>{formatUsername(identity.id)}</div>
      </div>
      <div style={{ padding: '0 24px 24px' }}>
        <a href={openExternalApp('as:Profile', ownActor?.url, 'edit')}>
          <Button type="primary" block>
            {t('nav.my_profile')}
          </Button>
        </a>
      </div>
    </Card>
  );
};

export default ProfileCard;
