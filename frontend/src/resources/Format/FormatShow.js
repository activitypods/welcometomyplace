import React from 'react';
import { ShowBase, useShowContext, Link } from 'react-admin';
import { Box, Container, Typography, Button } from '@mui/material';
import MarkdownField from '../../commons/fields/MarkdownField';
import HelperCard from '../Helper/HelperCard';

const FormatShowView = () => {
  const { record } = useShowContext();
  return (
    <>
      <Box sx={{ backgroundColor: '#FFFFFF', py: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h1" align="center" sx={{ my: 2 }}>
            {record?.name}
          </Typography>
          <Typography variant="body1" align="center" sx={{ fontStyle: 'italic', mb: 4 }}>
            {record?.summary}
          </Typography>
          <Box
            sx={{
              backgroundImage: `url("${record?.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: 300
            }}
          />
          <Box sx={{ pt: 4 }}>
            <Typography variant="h4">Recette 🪄</Typography>
            <MarkdownField source="apods:recipe" />
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center', pb: 4 }}>
            <Link to="/Event/create">
              <Button
                variant="contained"
                color="primary"
                sx={{ px: 5, py: 2, borderRadius: 10, fontSize: 20, fontFamily: 'Chewy' }}
              >
                Proposer ce type de rencontre chez soi
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: '#EAEAEA', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ my: 1 }}>
            Personnes resources
          </Typography>
          <Typography>
            Vous hésitez à vous lancer ? Les personnes suivantes peuvent vous aider, soit en répondant à vos questions,
            soit en venant faciliter votre rencontre (si elles sont suffisamment proches). Contactez-les !
          </Typography>
          <HelperCard />
        </Container>
      </Box>
    </>
  );
};

const FormatShow = () => (
  <ShowBase disableAuthentication>
    <FormatShowView />
  </ShowBase>
);

export default FormatShow;
