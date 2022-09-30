import React, { useCallback } from 'react';
import { linkToRecord, ShowBase, useTranslate } from 'react-admin';
import { ImageField, ReferenceField } from '@semapps/semantic-data-provider';
import { GridList, AvatarField } from '@semapps/archipelago-layout';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { ReferenceCollectionField } from '@semapps/activitypub-components';
import EventAlert from './EventAlert';
import MarkdownField from '../../commons/fields/MarkdownField';
import HeaderShow from '../../layout/HeaderShow';
import EventJoinCard from '../../commons/cards/EventJoinCard';
import BodyList from '../../commons/lists/BodyList/BodyList';
import EventDetails from './EventDetails';
import EventConditionsField from '../../commons/fields/EventConditionsField';
import EditButton from '../../commons/buttons/EditButton';
import ShareButton from '../../commons/buttons/ShareButton';
import HostLocationField from '../../commons/fields/HostLocationField';
import ContactField from '../../commons/fields/ContactField';

const EventShow = (props) => {
  const { identity } = useCheckAuthenticated();
  const translate = useTranslate();
  const contactFieldLabel = useCallback(record => {
    if (identity?.id === record['dc:creator']) {
      return translate('app.action.contact_attendees')
    } else {
      return translate('app.action.contact_organizer');
    }
  }, [identity, translate]);
  if (!identity?.id) return null;
  return (
    <ShowBase {...props}>
      <>
        <HeaderShow
          type="apods:hasFormat"
          details={<EventDetails />}
          actions={
            <>
              <ShareButton />
              <EditButton />
            </>
          }
        />
        <EventAlert />
        <BodyList
          aside={
            <EventJoinCard>
              <EventDetails orientation="vertical" />
            </EventJoinCard>
          }
        >
          <ImageField source="image" fullWidth />
          <MarkdownField source="content" />
          <EventConditionsField source="name" />
          <ReferenceCollectionField reference="Actor" source="apods:attendees">
            <GridList xs={4} sm={2} linkType={false}>
              <ReferenceField reference="Profile" source="url" link={(record, resource) => linkToRecord('/' + resource, record.url, 'show')}>
                <AvatarField
                  label="vcard:given-name"
                  image="vcard:photo"
                  defaultLabel={translate('app.user.unknown')}
                  labelColor="grey.300"
                />
              </ReferenceField>
            </GridList>
          </ReferenceCollectionField>
          <HostLocationField />
          <ContactField label={contactFieldLabel} source="dc:creator" context="id" />
        </BodyList>
      </>
    </ShowBase>
  );
};

export default EventShow;
