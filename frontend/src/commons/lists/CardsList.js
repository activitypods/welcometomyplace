import * as React from 'react';
import { useListContext, RecordContextProvider, Loading, useCreatePath, Link, DateField } from 'react-admin';
import { Card, CardMedia, CardContent } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5
  },
  loading: {
    height: '50vh'
  },
  details: {
    display: 'flex',
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  image: {
    width: 180,
    minWidth: 180,
    minHeight: 145,
    backgroundColor: theme.palette.grey['300'],
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  date: {
    width: 180,
    minWidth: 180,
    minHeight: 145,
    backgroundImage: `radial-gradient(circle at 50% 14em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    padding: 0,
    color: 'white'
  },
  day: {
    fontSize: 50,
    lineHeight: 1.3
  },
  content: {
    flex: '1 0 auto',
    flexShrink: 1,
    paddingTop: 10,
    paddingBottom: '16px !important',
    [theme.breakpoints.down('xs')]: {
      padding: 10
    }
  }
}));

const CardsList = ({ CardComponent, link = 'show' }) => {
  const classes = useStyles();
  const { data, resource, isLoading } = useListContext();
  const createPath = useCreatePath();
  return isLoading ? (
    <Loading loadingPrimary="ra.page.loading" loadingSecondary="ra.message.loading" className={classes.loading} />
  ) : (
    data?.map(record => {
      const image = record.image;
      return (
        <RecordContextProvider key={record.id} value={record}>
          <Link to={createPath({ resource, type: link, id: record.id })} className={classes.root}>
            <Card key={record.id} className={classes.details}>
              {record.image ? (
                <CardMedia className={classes.image} image={Array.isArray(image) ? image[0] : image} />
              ) : (
                <CardContent className={classes.date}>
                  <DateField variant="subtitle1" source="startTime" options={{ weekday: 'long' }} />
                  <DateField variant="h4" source="startTime" options={{ day: 'numeric' }} className={classes.day} />
                  <DateField variant="subtitle1" source="startTime" options={{ month: 'long' }} />
                </CardContent>
              )}
              <CardContent className={classes.content}>
                <CardComponent />
              </CardContent>
            </Card>
          </Link>
        </RecordContextProvider>
      );
    })
  );
};

export default CardsList;
