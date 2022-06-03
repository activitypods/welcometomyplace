import React from 'react';
import {makeStyles, TextField, Typography} from "@material-ui/core";
import { g1UrlToPublicKey } from '../../utils';
import CopyButton from "../buttons/CopyButton";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 480
  },
  input: {
    paddingTop: 6
  },
}));

const G1AccountField = ({ record, source }) => {
  const classes = useStyles();
  const publicKey = record && g1UrlToPublicKey(record[source]);
  return(
    <>
      <Typography>
        Pour envoyer de la monnaie libre à cet utilisateur, copiez sa clé publique ci-dessous et utilisez-la dans le logiciel Cesium.
      </Typography>
      <TextField
        variant="filled"
        margin="dense"
        value={publicKey}
        fullWidth
        InputLabelProps={{ shrink: false }}
        InputProps={{ endAdornment: <CopyButton text={publicKey} />, classes: { root: classes.root, input: classes.input } }}
      />
    </>
  )
}

export default G1AccountField;
