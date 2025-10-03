import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTranslate } from 'react-admin';

const Reconnexion = () => {
  const translate = useTranslate();
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: '#FFFFFF' }}>
      <Container>
        <Typography align="center" sx={{ fontSize: { xs: 18, sm: 20 }, color: 'black', marginBottom: 2 }}>
          {translate('app.homepage.app_supported_by')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <a href="https://reconnexion.coop" target="_blank" rel="noreferrer">
            <img src="/images/reconnexion.png" alt="Reconnexion logo" style={{ maxWidth: '500px', width: '100%' }} />
          </a>
          <Typography
            align="center"
            sx={{ fontSize: { xs: 18, sm: 20 }, color: 'black', marginTop: 1, fontStyle: 'italic', maxWidth: '500px' }}
          >
            {translate('app.homepage.reconnexion_tagline')}
          </Typography>
        </Box>
        <Typography align="center" sx={{ fontSize: { xs: 18, sm: 20 }, color: 'black', marginTop: 2 }}>
          <a href="https://reconnexion.coop" target="_blank" rel="noreferrer">
            www.reconnexion.coop
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Reconnexion;
