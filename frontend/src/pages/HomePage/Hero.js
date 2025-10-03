import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';

const Hero = () => {
  const translate = useTranslate();
  return (
    <Box
      sx={{
        backgroundImage: 'url("/images/background.png")',
        backgroundPosition: { xs: 'center bottom', sm: 'center bottom' },
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh'
      }}
    >
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
          sx={{ fontSize: { xs: 30, sm: 50 }, fontWeight: 'bold', maxWidth: 650, lineHeight: 1.1, mb: 2 }}
        >
          {translate('app.homepage.title')}
        </Typography>
        <Typography align="center" sx={{ fontSize: { xs: 20, sm: 30 }, maxWidth: 650, lineHeight: 1.1 }}>
          {translate('app.homepage.subtitle')}
        </Typography>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 64, width: '100%', textAlign: 'center' }}>
        <Link to="/login?signup=true">
          <Button
            variant="contained"
            color="white"
            sx={{ px: 5, py: 2, borderRadius: 10, color: 'orange', fontSize: 20, fontFamily: 'Chewy', mr: 2 }}
          >
            {translate('auth.action.signup')}
          </Button>
        </Link>
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
  );
};

export default Hero;
