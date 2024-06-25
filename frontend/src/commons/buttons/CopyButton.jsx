import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton, Tooltip } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useTranslate } from 'react-admin';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const translate = useTranslate();
  return (
    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
      <Tooltip title={translate(copied ? 'app.message.copied_to_clipboard' : 'app.action.copy')} placement="top">
        <IconButton>
          <FileCopyOutlinedIcon />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyButton;
