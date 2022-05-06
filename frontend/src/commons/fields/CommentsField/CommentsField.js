import React from 'react';
import { useGetIdentity, useNotify, useRecordContext, useTranslate } from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-richtext-tiptap';
import Mention from '@tiptap/extension-mention';
import {Avatar, Box, Button, Grid, makeStyles} from '@material-ui/core';
import { Form } from 'react-final-form';
import SendIcon from '@material-ui/icons/Send';
import { useOutbox, useCollection, OBJECT_TYPES } from '@semapps/activitypub-components';
import Alert from "@material-ui/lab/Alert";
import useSuggestions from "./useSuggestions";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 65,
    height: 65,
    marginTop: 15
  },
  editorContent: {
    '& > div': {
      backgroundColor: 'rgba(0, 0, 0, 0.09)',
      padding: '2px 12px',
      borderWidth: '0px !important',
      borderRadius: 0,
      borderBottom: '1px solid #FFF',
      minHeight: 60
    }
  }
}));

const ContactField = ({ source, context, ...rest }) => {
  const record = useRecordContext(rest);
  const { identity } = useGetIdentity();
  const classes = useStyles();
  const notify = useNotify();
  const outbox = useOutbox();
  const translate = useTranslate();
  const { items: contacts, loaded: contactsLoaded } = useCollection('apods:contacts');
  const suggestion = useSuggestions();

  const onSubmit = async (values) => {
    console.log('values', values);
    // try {
    //   await outbox.post({
    //     type: OBJECT_TYPES.NOTE,
    //     attributedTo: outbox.owner,
    //     to: record[source],
    //     content: values.content,
    //     context: context ? record[context] : undefined,
    //   });
    //   notify('app.notification.message_sent', 'success');
    // } catch (e) {
    //   notify('app.notification.message_send_error', 'error', { error: e.message });
    // }
  };

  // Don't init the comment field until the suggestions are loaded, otherwise it will not work
  if( !suggestion.items ) return null;

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={(event) => handleSubmit(event).then(form.reset)}>
          {contactsLoaded && !contacts.includes(record[source]) &&
            <Box mb={1}>
              <Alert severity="warning">{translate('app.helper.message_profile_show_right', { username: record?.['vcard:given-name']})}</Alert>
            </Box>
          }
          <Grid container>
            <Grid item xs="1">
              <Avatar
                src={identity?.profileData?.['vcard:photo']}
                alt={identity?.profileData?.['vcard:given-name']}
                className={classes.avatar}
              />

            </Grid>
            <Grid item xs="11">
              <RichTextInput
                source="comment"
                label=""
                toolbar={null}
                fullWidth
                classes={{ editorContent: classes.editorContent }}
                editorOptions={{
                  ...DefaultEditorOptions,
                  extensions: [
                    ...DefaultEditorOptions.extensions,
                    Mention.configure({
                      HTMLAttributes: {
                        class: 'mention',
                      },
                      suggestion,
                    })
                  ],
                }}
              />
            </Grid>
          </Grid>
          <Box mt={1}>
            <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />} disabled={submitting}>
              {translate('app.action.send')}
            </Button>
          </Box>
        </form>
      )}
    />
  );
};

ContactField.defaultProps = {
  addLabel: true,
};

export default ContactField;
