import React from 'react';
import { Button, useShowContext, useTranslate } from 'react-admin';
import ShareIcon from '@material-ui/icons/Share';
import { useCollection } from '@semapps/activitypub-components';

const ShareButton = ({ onClick }) => {
  const { record } = useShowContext();
  const { loaded, error } = useCollection(record?.['apods:invitees']);
  const translate = useTranslate();
  // If the user can see the list of invitees, it means he can share
  if (loaded && !error) {
    return (
      <Button label={translate('app.action.share')} onClick={onClick}>
        <ShareIcon />
      </Button>
    );
  } else {
    return null;
  }
};

export default ShareButton;
