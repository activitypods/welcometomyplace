import { useTranslation } from 'react-i18next';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import useActorProfile from '../../hooks/useActorProfile';
import useOpenExternalApp from '../../hooks/useOpenExternalApp';

type Props = {
  actorUri: string;
};

const AttendeeAvatar = ({ actorUri }: Props) => {
  const { t } = useTranslation();
  const { data: profile } = useActorProfile(actorUri);
  const openExternalApp = useOpenExternalApp();
  const name = profile?.['vcard:given-name'] || t('event.unknown_user');

  return (
    <a
      href={openExternalApp('as:Profile', actorUri, 'show')}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'inherit', width: 80 }}
    >
      <Avatar size={56} src={profile?.['vcard:photo']} icon={!profile?.['vcard:photo'] && <UserOutlined />} />
      <span style={{ fontSize: 12, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 80 }}>
        {name}
      </span>
    </a>
  );
};

export default AttendeeAvatar;
