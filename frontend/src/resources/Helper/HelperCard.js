import React from 'react';
import { Link, useCreatePath, useRecordContext } from 'react-admin';
import { Typography, Box, Avatar, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';

const HelperCard = () => {
  const record = useRecordContext();
  const createPath = useCreatePath();

  return (
    <Box p={2} sx={{ backgroundColor: '#FFFFFF', my: 2, position: 'relative', pl: '112px', minHeight: 112 }}>
      <Avatar
        alt="Remy Sharp"
        src="/images/background.png"
        sx={{ position: 'absolute', top: 16, left: 16, width: 80, height: 80 }}
      />
      <Typography variant="h4" sx={{ lineHeight: 1 }}>
        Alex
      </Typography>
      <Typography sx={{ fontStyle: 'italic', my: 1.5 }}>"Je suis ravi de vous aider. Contactez-moi !"</Typography>
      <Typography variant="body2">
        <PhoneIcon sx={{ height: 14, width: 14, position: 'relative', top: 3, mr: 0.5 }} />
        Disponible pour appel avant la réunion
      </Typography>
      <Typography variant="body2">
        <PersonIcon sx={{ height: 14, width: 14, position: 'relative', top: 3, mr: 0.5 }} />
        Disponible pour venir (co-)faciliter sur place
      </Typography>
      <Typography variant="body2">
        <MapIcon sx={{ height: 14, width: 14, position: 'relative', top: 3, mr: 0.5 }} />
        Peut se déplacer à 30km autour de Lausanne (Suisse)
      </Typography>
      <Link to="/login">
        <Button
          variant="contained"
          color="grey"
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            borderRadius: 10,
            fontSize: 20,
            fontFamily: 'Chewy'
          }}
        >
          Contacter
        </Button>
      </Link>
    </Box>
  );
};

export default HelperCard;
