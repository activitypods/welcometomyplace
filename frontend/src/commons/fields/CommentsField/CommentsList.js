import React from 'react';
import {TextField, useRecordContext} from "react-admin";
import { useCollection } from '@semapps/activitypub-components'
import { ReferenceField } from "@semapps/semantic-data-provider";
import { Grid } from "@material-ui/core";
import AvatarField from "../AvatarField";

const CommentsList = () => {
  const record = useRecordContext();
  const { items: replies } = useCollection(record.replies);

  // TODO voir si je peux utiliser ReferenceCollectionList
  return(
    <Grid container>
      {replies && replies.map(reply => (
        <>
          <Grid item xs="1">
            <ReferenceField record={reply} reference="Actor" source="attributedTo" linkType={false}>
              <ReferenceField reference="Profile" source="url" linkType="show">
                <AvatarField
                  src="vcard:photo"
                  label="vcard:given-name"
                  size={65}
                  // defaultLabel={translate('app.user.unknown')}
                />
              </ReferenceField>
            </ReferenceField>
          </Grid>
          <Grid item xs="11">
            <ReferenceField record={reply} reference="Actor" source="attributedTo" linkType={false}>
              <ReferenceField reference="Profile" source="url" linkType="show">
                <TextField variant="body2" source="vcard:given-name" />
              </ReferenceField>
            </ReferenceField>
            <TextField record={reply} variant="body2" source="content" />
          </Grid>
        </>
      ))}
    </Grid>
  )
};

export default CommentsList;
