import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useList } from '@refinedev/core';
import { Alert, DatePicker, Form, Input, InputNumber, Select, type FormInstance } from 'antd';

import LocationSelect from './LocationSelect';
import ImageUpload from '../common/ImageUpload';
import MarkdownEditor from '../common/MarkdownEditor';
import BodyLabel from '../common/BodyLabel';
import { APP_LANG } from '../../config/env';
import type { FormatRecord } from '../../types';

type Props = {
  form: FormInstance;
};

const toDayjs = (value?: string) => (value ? dayjs(value) : undefined);
const fromDayjs = (value?: Dayjs) => value?.toISOString();

const EventForm = ({ form }: Props) => {
  const { t } = useTranslation();
  const { result: formats } = useList<FormatRecord>({
    resource: 'format',
    pagination: { mode: 'off' },
    sorters: [{ field: 'name', order: 'asc' }]
  });

  return (
    <>
      {APP_LANG === 'fr' && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message={
            <>
              {t('event.first_event_help')}{' '}
              <a href="https://forum.reconnexion.coop" target="_blank" rel="noopener noreferrer">
                {t('event.forum_name')}
              </a>
            </>
          }
        />
      )}

      <Form.Item name="name" label={t('event.title')} rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="startTime"
        label={t('event.start_time')}
        getValueProps={value => ({ value: toDayjs(value) })}
        normalize={fromDayjs}
        rules={[
          { required: true },
          {
            // `value` here is already the normalized ISO string (Form.Item runs rules against
            // the stored value, i.e. post-`normalize`), not the Dayjs object the picker emits.
            validator: async (_, value: string) => {
              if (value && dayjs(value).isBefore(dayjs())) return Promise.reject(t('validation.future_date'));
            }
          }
        ]}
      >
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="endTime"
        label={t('event.end_time')}
        getValueProps={value => ({ value: toDayjs(value) })}
        normalize={fromDayjs}
        dependencies={['startTime']}
        rules={[
          { required: true },
          {
            validator: async (_, value: string) => {
              const startTime = form.getFieldValue('startTime');
              if (value && startTime && !dayjs(value).isAfter(dayjs(startTime))) {
                return Promise.reject(t('validation.after_start_time'));
              }
            }
          }
        ]}
      >
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="location" label={t('event.location')}>
        <LocationSelect />
      </Form.Item>

      <Form.Item name="image" label={t('event.image')}>
        <ImageUpload />
      </Form.Item>

      <Form.Item name="content" label={t('event.content')} rules={[{ required: true }]}>
        <MarkdownEditor />
      </Form.Item>

      <Form.Item name="apods:hasFormat" label={t('event.event_type')} rules={[{ required: true }]}>
        <Select options={formats.data.map((format: FormatRecord) => ({ value: format.id, label: format.name }))} />
      </Form.Item>

      <BodyLabel>{t('event.conditions')}</BodyLabel>

      <Form.Item
        name="apods:closingTime"
        label={t('event.closing_time')}
        getValueProps={value => ({ value: toDayjs(value) })}
        normalize={fromDayjs}
        dependencies={['startTime']}
        rules={[
          {
            validator: async (_, value: string) => {
              const startTime = form.getFieldValue('startTime');
              if (value && startTime && !dayjs(value).isBefore(dayjs(startTime))) {
                return Promise.reject(t('validation.before_start_time'));
              }
            }
          }
        ]}
      >
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="apods:maxAttendees" label={t('event.max_attendees')} help={t('event.max_attendees_help')}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="apods:otherConditions" label={t('event.other_conditions')} help={t('event.other_conditions_help')}>
        <Input.TextArea rows={3} />
      </Form.Item>
    </>
  );
};

export default EventForm;
