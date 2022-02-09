import React from 'react';
import { useNotify, useRecordContext, useTranslate } from 'react-admin';
import { Box, TextField, Button } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import SendIcon from '@material-ui/icons/Send';
import { useOutbox, OBJECT_TYPES } from '@semapps/activitypub-components';

const FinalFormTextField = ({ input: { name, onChange, value, ...restInput }, meta, ...rest }) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
    style={{ marginTop: 0 }}
  />
);

const ContactField = ({ source, context, ...rest }) => {
  const record = useRecordContext(rest);
  const notify = useNotify();
  const outbox = useOutbox();
  const translate = useTranslate();

  const onSubmit = async (values) => {
    try {
      await outbox.post({
        type: OBJECT_TYPES.NOTE,
        attributedTo: outbox.owner,
        to: record[source],
        content: values.content,
        context: context ? record[context] : undefined,
      });
      notify('app.notification.message_sent', 'success');
    } catch (e) {
      notify('app.notification.message_send_error', 'error', { error: e.message });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={(event) => handleSubmit(event).then(form.reset)}>
          <Field
            name="content"
            component={FinalFormTextField}
            label={translate('app.input.message')}
            variant="filled"
            margin="dense"
            fullWidth
            multiline
            rows={5}
          />
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
  label: 'Envoyer un message',
};

export default ContactField;
