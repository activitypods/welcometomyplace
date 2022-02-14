import React, { useState } from 'react';
import { ListBase, useTranslate } from 'react-admin';
import { Container, Grid, Hidden, useMediaQuery, AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from '../../commons/lists/CardsList';
import EventCard from './EventCard';
import HeaderTitle from '../../layout/HeaderTitle';
import ProfileCard from '../../commons/cards/ProfileCard';
import ShareContactCard from '../../commons/cards/ShareContactCard';
import ContactRequestsCard from '../../commons/cards/ContactRequestsCard';
import AddContactCard from '../../commons/cards/AddContactCard';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.grey['300'],
    boxShadow: 'none',
    zIndex: 900,
  },
}));

const EventList = (props) => {
  useCheckAuthenticated();
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const translate = useTranslate();
  return (
    <>
      <HeaderTitle
        actions={{ '/Event/create': translate(xs ? 'app.action.create_event_short' : 'app.action.create_event')}}
      >
        {translate('app.page.events')}
      </HeaderTitle>
      <AppBar position="relative" className={classes.appBar}>
        <Container>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} indicatorColor="primary" textColor="primary">
            <Tab label={translate('app.tab.next_events')} />
            <Tab label={translate('app.tab.finished_events')} />
          </Tabs>
        </Container>
      </AppBar>
      <br />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <ListBase
              filter={{ 'apods:hasStatus': tab === 0 ? 'http://activitypods.org/ns/core#Coming' : 'http://activitypods.org/ns/core#Finished' }}
              perPage={1000}
              sort={{ field: 'startTime', order: tab === 0 ? 'ASC' : 'DESC' }}
              {...props}
            >
              <CardsList CardComponent={EventCard} link="show" />
            </ListBase>
          </Grid>
          <Hidden smDown>
            <Grid item md={4} lg={3}>
              <ProfileCard />
              <ContactRequestsCard />
              <ShareContactCard />
              <AddContactCard />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};

export default EventList;
