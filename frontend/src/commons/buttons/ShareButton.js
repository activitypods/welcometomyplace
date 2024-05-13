import React, { useState } from 'react';
import { Button, useShowContext, useTranslate } from 'react-admin';
import ShareIcon from '@mui/icons-material/Share';
import { useCollection } from '@semapps/activitypub-components';
import ShareDialog from "../ShareDialog/ShareDialog";

const ShareButton = () => {
  const [shareOpen, setShareOpen] = useState(false);
  const { record } = useShowContext();
  const { error, isLoading } = useCollection(record?.['apods:announces']);
  const translate = useTranslate();
  // If the user can see the list of announces, it means he can share
  if (!isLoading && !error) {
    return (
      <>
        <Button label={translate('app.action.share')} onClick={() => setShareOpen(true)}>
          <ShareIcon />
        </Button>
        {shareOpen && <ShareDialog resourceUri={record.id} close={() => setShareOpen(false)} />}
      </>

    );
  } else {
    return null;
  }
};

export default ShareButton;
