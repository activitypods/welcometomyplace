import React, { useEffect } from 'react';
import { Box, Button, Typography, ThemeProvider } from '@mui/material';
import { useGetIdentity, useTranslate, useRedirect } from 'react-admin';
import { Link } from 'react-router-dom';
import AppBar from '../layout/AppBar';
import theme from '../config/theme';

const HomePage = () => {
  const redirect = useRedirect();
  const { data: identity, isLoading } = useGetIdentity();
  const translate = useTranslate();

  useEffect(() => {
    if (!isLoading && identity?.id) {
      redirect('list', 'Event');
    }
  }, [identity, isLoading, redirect]);

  if (isLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: 'url("/images/background.png")',
          backgroundPosition: { xs: 'center bottom -50px', sm: 'center bottom -150px' },
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh'
        }}
      >
        <AppBar title={process.env.REACT_APP_NAME} />
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 100, sm: 150 },
            width: '100%',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            align="center"
            sx={{ fontSize: { xs: 30, sm: 50 }, fontWeight: 'bold', maxWidth: 650, lineHeight: 1.1 }}
          >
            Ouvrez votre maison pour des rencontres simples et enrichissantes
          </Typography>
          <br />
          <Typography align="center" sx={{ fontSize: { xs: 20, sm: 30 }, maxWidth: 650, lineHeight: 1.1 }}>
            ... et contribuez au développement d’un réseau de confiance dans votre région
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', bottom: 50, width: '100%', textAlign: 'center' }}>
          <Link to="/login">
            <Button
              variant="contained"
              color="white"
              sx={{ px: 5, py: 2, borderRadius: 10, color: 'orange', fontSize: 20, fontFamily: 'Chewy' }}
            >
              {translate('auth.action.login')}
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
