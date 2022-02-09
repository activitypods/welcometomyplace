import React from 'react';
import { ListBase, useTranslate } from 'react-admin';
import { Button, Container, Grid, Hidden, useMediaQuery } from '@material-ui/core';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { GridList, AvatarField } from '@semapps/archipelago-layout';
import HeaderTitle from '../../layout/HeaderTitle';
import ShareContactCard from '../../commons/cards/ShareContactCard';
import ContactRequestsBlock from '../../commons/blocks/ContactRequestsBlock';
import AddContactCard from '../../commons/cards/AddContactCard';

const ProfileList = () => {
  const { identity } = useCheckAuthenticated();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const translate = useTranslate();
  if (!identity?.id) return null;
  return (
    <>
      <HeaderTitle actions={xs ? [<Button to="/Profile/create">{translate('app.action.add')}</Button>] : null}>
        {translate('app.page.network')}
      </HeaderTitle>
      <br />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <ContactRequestsBlock />
            <ListBase
              resource="Profile"
              basePath="/Profile"
              perPage={1000}
              sort={{ field: 'vcard:given-name', order: 'ASC' }}
            >
              <GridList xs={4} sm={2} linkType="show">
                <AvatarField
                  label="vcard:given-name"
                  image="vcard:photo"
                  defaultLabel={translate('app.user.unknown')}
                  labelColor="grey.300"
                />
              </GridList>
            </ListBase>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Hidden smDown>
              <AddContactCard />
            </Hidden>
            <ShareContactCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfileList;
