import * as React from 'react';
import { Chip as MuiChip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'unset',
    height: 20
  },
  icon: {
    width: 14,
    height: 14,
    marginLeft: '2px !important',
    marginRight: '0px !important'
  },
  label: {
    paddingLeft: 4,
    '& span': {
      fontSize: 12,
      fontWeight: 'bold'
    }
  }
}));

const Chip = ({ children, ...rest }) => {
  const classes = useStyles();
  return <MuiChip size="small" label={children} classes={classes} {...rest} />;
};

export default Chip;
