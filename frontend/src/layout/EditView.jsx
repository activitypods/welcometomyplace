import React from 'react';
import { ListButton, ShowButton, useEditContext } from 'react-admin';
import { Box, Typography, Container, Grid, Card, useMediaQuery } from '@mui/material';

const EditView = ({ title, actions, children }) => {
  const { defaultTitle } = useEditContext();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  return (
    <Container disableGutters={xs}>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={8}>
          <Typography variant="h2" component="h1">
            {title || defaultTitle}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="middle" justifyContent="right">
            {actions?.map((action, key) => React.cloneElement(action, { key, color: 'black' }))}
          </Box>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Card>{children}</Card>
      </Box>
    </Container>
  );
};

EditView.defaultProps = {
  actions: [<ListButton />, <ShowButton />]
};

export default EditView;
