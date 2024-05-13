import React, { useState } from 'react';
import { ListBase, useTranslate } from 'react-admin';
import { Container, Grid, Hidden, useMediaQuery, AppBar, Tabs, Tab, Box, Alert } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from '../../commons/lists/CardsList';
import EventCard from './EventCard';
import HeaderTitle from '../../layout/HeaderTitle';
import ProfileCard from '../../commons/cards/ProfileCard';
import AppIcon from '../../config/AppIcon';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.grey['300'],
    boxShadow: 'none',
    zIndex: 900,
  },
  link: {
    textDecoration: 'underline',
    color: 'white',
    '&:hover': {
      color: 'white'
    }
  },
  mission: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('xs')]: {
      marginTop: 5,
    }
  }
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
            <Box mb={2}>
              <Alert icon={<AppIcon />} variant="filled" className={classes.mission}>
                {translate('app.description_long')}
                {" "}
                {process.env.REACT_APP_ORGANIZATION_NAME &&
                  <a href={process.env.REACT_APP_ORGANIZATION_URL} target="_blank" rel="noopener noreferrer" className={classes.link}>
                    {translate('app.backed_by_organization', { organizationName: process.env.REACT_APP_ORGANIZATION_NAME})}
                  </a>
                }
              </Alert>
            </Box>
            <ListBase
              // filter={{ 'apods:hasStatus': tab === 0 ? 'http://activitypods.org/ns/core#Coming' : 'http://activitypods.org/ns/core#Finished' }}
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
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};

export default EventList;
