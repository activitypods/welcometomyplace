import { Card, CardMedia, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  box: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#FFC300',
    opacity: 0.7,
    height: 45,
    margin: 0
  },
  label: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    margin: 0,
    padding: 12,
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  }
}));

// To be replaced with FormatCard when formats will be dynamic
const FormatExample = ({ name, image, backgroundPosition }) => {
  const classes = useStyles();
  return (
    <Card sx={{ boxShadow: 0, borderRadius: 0 }}>
      <CardMedia sx={{ height: 280, position: 'relative', backgroundPosition }} image={image} title={name}>
        <Box className={classes.box}></Box>
        <Typography gutterBottom color="primary" component="div" className={classes.label}>
          {name}
        </Typography>
      </CardMedia>
    </Card>
  );
};

export default FormatExample;
