import React, { useState } from "react";
import {
  Pagination,
  useTranslate,
} from "react-admin";
import {
  Container,
  Grid,
  Hidden,
  useMediaQuery,
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  Box,
} from "@material-ui/core";
import { useCheckAuthenticated } from "@semapps/auth-provider";
import CardsList from "../../commons/lists/CardsList";
import EventCard from "./EventCard";
import HeaderTitle from "../../layout/HeaderTitle";
import ProfileCard from "../../commons/cards/ProfileCard";
import Alert from "@material-ui/lab/Alert";
import AppIcon from "../../config/AppIcon";
import { PageCachedListBase } from "../../commons/lists/PageCachedListBase";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.grey["300"],
    boxShadow: "none",
    zIndex: 900,
  },
  mission: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("xs")]: {
      marginTop: 5,
    },
  },
}));

const EventList = (props) => {
  useCheckAuthenticated();
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"), {
    noSsr: true,
  });
  const translate = useTranslate();

  return (
    <>
      <HeaderTitle
        actions={{
          "/Event/create": translate(
            xs ? "app.action.create_event_short" : "app.action.create_event"
          ),
        }}
      >
        {translate("app.page.events")}
      </HeaderTitle>
      <AppBar position="relative" className={classes.appBar}>
        <Container>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={translate("app.tab.next_events")} />
            <Tab label={translate("app.tab.finished_events")} />
          </Tabs>
        </Container>
      </AppBar>
      <br />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Box mb={2}>
              <Alert
                icon={<AppIcon />}
                variant="filled"
                className={classes.mission}
              >
                {translate("app.description_long")}
              </Alert>
            </Box>
            <PageCachedListBase
              filter={{
                "apods:hasStatus":
                  tab === 0
                    ? "http://activitypods.org/ns/core#Coming"
                    : "http://activitypods.org/ns/core#Finished",
              }}
              sort={{ field: "startTime", order: tab === 0 ? "ASC" : "DESC" }}
              {...props}
            >
              <CardsList CardComponent={EventCard} link="show" />

              <Pagination
                rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
                perPage={tab === 0 ? 50 : 10}
              />
            </PageCachedListBase>
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
