import React, { useState } from "react";
import {
  Pagination,
  useTranslate,
  useListController,
  ListPaginationContext,
  useListPaginationContext,
  useListParams,
  ListContextProvider,
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

/** List base that does not trigger new queries on pagination changes
 * but servers pages from its memoized state. Sort, filter, order are
 * not affected.
 */
const PageCacheListBase = ({ children, ...props }) => {
  /* We need `useListParams` here, to grab query string filter,
    pagination, etc. options since `syncWithLocation` is false.
    This prevents `useListController` to use the page props
    provided by `useListParams`.
  */
  const [listParams] = useListParams(props);
  // Get props from data provider. Pagination is disabled here.
  const controllerProps = useListController({
    ...listParams,
    ...props,
    page: undefined,
    perPage: undefined,
    syncWithLocation: false,
  });
  // Pagination defaults come from the `useListParams`.
  const [currentPage, setCurrentPage] = useState(listParams.page);
  const [perPage, setPerPage] = useState(listParams.perPage);

  // Here, we intercept, to use the custom pagination.
  const customPaginationContext = {
    ...useListPaginationContext(controllerProps),
    page: currentPage,
    perPage: perPage,
    setPage: setCurrentPage,
    setPerPage: setPerPage,
  };

  const listContext = {
    ...controllerProps,
    ids: controllerProps.ids.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    ),
  };

  return (
    <ListContextProvider value={listContext}>
      <ListPaginationContext.Provider value={customPaginationContext}>
        {children}
      </ListPaginationContext.Provider>
    </ListContextProvider>
  );
};

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
            <PageCacheListBase
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
            </PageCacheListBase>
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
