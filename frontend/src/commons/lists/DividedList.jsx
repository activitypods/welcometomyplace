import React from 'react';
import { useListContext, Loading, RecordContextProvider } from 'react-admin';
import { Card, List, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
    marginBottom: 20,
  },
  list: {
    padding: 0,
  },
}));

const DividedList = ({ children }) => {
  const { data, isLoading } = useListContext();
  const classes = useStyles();
  return isLoading ? (
    <Loading loadingPrimary="ra.page.loading" loadingSecondary="ra.message.loading" style={{ height: '50vh' }} />
  ) : (
    <Card className={classes.card}>
      <List className={classes.list}>
        {data?.map((record, i) => (
          <RecordContextProvider value={record}>
            {i > 0 && <Divider />}
            {children}
          </RecordContextProvider>
        ))}
      </List>
    </Card>
  );
};

export default DividedList;
