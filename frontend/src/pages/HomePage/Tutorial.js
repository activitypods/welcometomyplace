import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useTranslate } from 'react-admin';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupsIcon from '@mui/icons-material/Groups';

const icons = {
  1: AutoFixHighIcon,
  2: MailOutlineIcon,
  3: GroupsIcon
};

const Tutorial = () => {
  const translate = useTranslate();
  return (
    <Box sx={{ color: 'grey', py: 12 }}>
      <Typography
        align="center"
        sx={{ fontSize: { xs: 30, sm: 50 }, fontFamily: 'Chewy', color: 'orange', height: 70 }}
      >
        Comment ça marche ?
      </Typography>
      <Container>
        <Grid container spacing={8}>
          {[1, 2, 3].map(i => {
            const Icon = icons[i];
            return (
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Icon sx={{ fontSize: 60, color: 'orange', mb: 2 }} />
                </Box>
                <Typography align="center" sx={{ fontSize: 20, color: 'black' }}>
                  {translate(`app.homepage.step_${i}.description`)}
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontSize: 24, fontFamily: 'Chewy', color: 'orange', textTransform: 'uppercase', mt: 3 }}
                >
                  {translate(`app.homepage.step_${i}.hashtag`)}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tutorial;
