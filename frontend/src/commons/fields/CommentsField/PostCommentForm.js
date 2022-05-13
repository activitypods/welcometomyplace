import React, { useState } from 'react';
import { useGetIdentity, useNotify, useRecordContext, useTranslate } from 'react-admin';
import { RichTextInput, DefaultEditorOptions } from 'ra-richtext-tiptap';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { Form } from 'react-final-form';
import SendIcon from '@material-ui/icons/Send';
import { useOutbox, OBJECT_TYPES } from '@semapps/activitypub-components';
import useSuggestions from "./useSuggestions";
import CustomMention from "./CustomMention";
import { formatUsername } from "../../../utils";
import AvatarField from "../AvatarField";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: -12 // Negative margin to keep the form close to the label
  },
  avatar: {
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
    },
    '& > div > p': {
      marginTop: 12,
      marginBottom: 12
    }
  }
}));

const PostCommentForm = ({ context }) => {
  const record = useRecordContext();
  const { identity } = useGetIdentity();
  const classes = useStyles();
  const notify = useNotify();
  const outbox = useOutbox();
  const translate = useTranslate();
  const suggestion = useSuggestions();
  const [expanded, setExpanded] = useState(false);

  const onSubmit = async (values) => {
    const document = new DOMParser().parseFromString(values.comment, 'text/html');
    const mentions = Array.from(document.body.getElementsByClassName('mention'));
    const mentionedUsersUris = mentions.map(node => node.attributes['data-mention-id'].value);

    mentions.forEach(node => {
      const userId = formatUsername(node.attributes['data-mention-id'].value);
      const link = document.createElement('a');
      link.setAttribute('href', new URL(window.location.href).origin + '/u/' + userId);
      link.textContent = userId;
      node.parentNode.replaceChild(link, node);
    });

    try {
      await outbox.post({
        type: OBJECT_TYPES.NOTE,
        attributedTo: outbox.owner,
        content: document.body.innerHTML,
        inReplyTo: record[context],
        to: mentionedUsersUris,
      });
      notify('app.notification.message_sent', 'success');
    } catch (e) {
      notify('app.notification.message_send_error', 'error', { error: e.message });
    }
  };

  // Don't init the comment field until the suggestion items are loaded, as the suggestion can only be initialized once
  if( !suggestion.items ) return null;

  return (
    <Form
      onSubmit={onSubmit}
      subscription={{ submitting: true, active: true }}
      render={({ handleSubmit, form, submitting, active }) => (
        <form onSubmit={(event) => handleSubmit(event).then(form.reset)} className={classes.form}>
          <Grid container>
            <Grid item xs="1">
              <AvatarField
                record={identity?.profileData}
                src="vcard:photo"
                label="vcard:given-name"
                size={65}
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
                  onFocus() { setExpanded(true) },
                  placeholder: 'Test',
                  extensions: [
                    ...DefaultEditorOptions.extensions,
                    CustomMention.configure({
                      HTMLAttributes: {
                        class: 'mention',
                      },
                      suggestion,
                    })
                  ],
                }}
                helperText="Vos commentaires seront visibles par tous les invités. Taper @ pour mentionner un invité ou tous les participants"
              />
              {expanded &&
                <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={submitting}>
                  {translate('app.action.send')}
                </Button>
              }
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default PostCommentForm;
