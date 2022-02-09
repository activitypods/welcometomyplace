import React, { useState } from 'react';
import { ShowBase, useTranslate } from 'react-admin';
import { ImageField, ReferenceField } from '@semapps/semantic-data-provider';
import { GridList, AvatarField } from '@semapps/archipelago-layout';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { ReferenceCollectionField } from '@semapps/activitypub-components';
import ShareAlert from './EventAlert';
import MarkdownField from '../../commons/fields/MarkdownField';
import HeaderShow from '../../layout/HeaderShow';
import StickyCard from '../../commons/cards/StickyCard';
import BodyList from '../../commons/lists/BodyList/BodyList';
import EventDetails from './EventDetails';
import EventConditionsField from '../../commons/fields/EventConditionsField';
import ShareDialog from '../../commons/ShareDialog/ShareDialog';
import EditButton from '../../commons/buttons/EditButton';
import ShareButton from '../../commons/buttons/ShareButton';
import HostLocationField from '../../commons/fields/HostLocationField';
import ContactField from '../../commons/fields/ContactField';

const EventShow = (props) => {
  const [shareOpen, setShareOpen] = useState(false);
  const { identity } = useCheckAuthenticated();
  const translate = useTranslate();
  if (!identity?.id) return null;
  return (
    <ShowBase {...props}>
      <>
        <HeaderShow
          type="apods:hasFormat"
          details={<EventDetails />}
          actions={
            <>
              <ShareButton onClick={() => setShareOpen(true)} />
              <EditButton />
            </>
          }
        />
        <ShareAlert onShare={() => setShareOpen(true)} />
        <BodyList
          aside={
            <StickyCard>
              <EventDetails orientation="vertical" />
            </StickyCard>
          }
        >
          <ImageField source="image" fullWidth />
          <MarkdownField source="content" />
          <EventConditionsField source="name" />
          <ReferenceCollectionField reference="Actor" source="apods:attendees">
            <GridList xs={4} sm={2} linkType={false}>
              <ReferenceField reference="Profile" source="url" linkType={false}>
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
          <ContactField label={translate('app.action.contact_organizer')} source="dc:creator" context="id" />
        </BodyList>
        {shareOpen && <ShareDialog resourceUri={props.id} close={() => setShareOpen(false)} />}
      </>
    </ShowBase>
  );
};

export default EventShow;
