import React from 'react';
import { ListBase, useGetIdentity, useListContext } from 'react-admin';

const HelperListRedirect = () => {
  const { data, isLoading } = useListContext();
  if (isLoading) return true;
  if (data.length === 0) {
    re
  }
};

const HelperList = () => {
  const { data: identity } = useGetIdentity();
  return (
  <ListBase disableAuthentication filter={{ webId: identity?.id }}>
    <HelperListRedirect />
  </ListBase>
)};

export default FormatList;
