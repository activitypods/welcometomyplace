import React from 'react';
import { Avatar } from '@material-ui/core';

const AvatarField = ({
  record,
  label,
  defaultLabel,
  src,
  fallback,
  size,
  ...rest
}) => {
  if (!record) return null;

  const computedLabel = (typeof label === 'function' ? label(record) : record[label]) || defaultLabel;
  const computedImage = typeof src === 'function' ? src(record) : record[src];
  const computedFallback = typeof fallback === 'function' ? fallback(record) : fallback;

  return (
    <Avatar
      src={computedImage || computedFallback}
      alt={computedLabel}
      fallback={computedFallback}
      style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
      {...rest}
    />
  );
};

AvatarField.defaultProps = {
  size: 40
};

export default AvatarField;
