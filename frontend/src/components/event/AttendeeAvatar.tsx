import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';

import useActorProfile from '../../hooks/useActorProfile';
import useOpenExternalApp from '../../hooks/useOpenExternalApp';

type Props = {
  actorUri: string;
};

/** Matches the old app's `AvatarWithLabelField`: a full-width circular avatar (scales with the
 *  grid column, so it's larger on wider columns) with a pill-shaped name label overlapping its
 *  bottom edge, instead of a small fixed-size avatar with plain text underneath. */
const AttendeeAvatar = ({ actorUri }: Props) => {
  const { t } = useTranslation();
  const { data: profile } = useActorProfile(actorUri);
  const openExternalApp = useOpenExternalApp();
  const name = profile?.['vcard:given-name'] || t('event.unknown_user');
  const photo = profile?.['vcard:photo'];

  return (
    <a
      href={openExternalApp('as:Profile', actorUri, 'show')}
      style={{ display: 'block', position: 'relative', color: 'inherit', marginBottom: 14 }}
    >
      <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
        {photo ? (
          <img
            src={photo}
            alt={name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* `fontSize` as a percentage resolves against the inherited font-size, not this
                container's actual (fluid) rendered size, so a fixed value is used instead. */}
            <UserOutlined style={{ fontSize: 48, color: 'rgba(0, 0, 0, 0.35)' }} />
          </div>
        )}
      </div>
      <span
        style={{
          position: 'absolute',
          bottom: -10,
          left: 4,
          right: 4,
          textAlign: 'center',
          backgroundColor: '#FFA500',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          padding: '3px 8px',
          borderRadius: 12,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {name}
      </span>
    </a>
  );
};

export default AttendeeAvatar;
