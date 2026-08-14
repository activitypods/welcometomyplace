import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

import ShareDialog from './ShareDialog';
import useActivityCollection from '../../hooks/useActivityCollection';
import type { EventRecord } from '../../types';

type Props = {
  event: EventRecord;
};

/** Only rendered if the viewer can actually read the event's `apods:announces` collection —
 *  i.e. they're the organizer, or someone the organizer delegated share rights to. */
const ShareButton = ({ event }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isLoading, error } = useActivityCollection(event['apods:announces']);

  if (isLoading || error) return null;

  return (
    <>
      <Button type="text" className="ap-btn-text-action" icon={<ShareAltOutlined />} onClick={() => setOpen(true)}>
        {t('actions.share')}
      </Button>
      {open && <ShareDialog event={event} open={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default ShareButton;
