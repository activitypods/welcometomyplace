import { useMemo } from 'react';
import { useRecordContext, useQueryWithStore } from "react-admin";
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import MentionList from './MentionList'
import { useCollection } from '@semapps/activitypub-components';

const render = () => {
  let component
  let popup

  return {
    onStart: props => {
      component = new ReactRenderer(MentionList, {
        props,
        editor: props.editor,
      })

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },

    onUpdate(props) {
      component.updateProps(props)

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },

    onKeyDown(props) {
      if (props.event.key === 'Escape') {
        popup[0].hide()

        return true
      }

      return component.ref?.onKeyDown(props)
    },

    onExit() {
      popup[0].destroy()
      component.destroy()
    },
  }
};

const useSuggestions = () => {
  const record = useRecordContext()
  const { items: attendees, loaded: attendeesLoaded } = useCollection(record['apods:attendees']);

  const { data: profiles, loaded: profilesLoaded } = useQueryWithStore({
    type: 'getList',
    resource: 'Profile'
  });

  const items = useMemo(() => {
    if( attendeesLoaded && profilesLoaded ) {
      return ({ query }) => {
        return profiles
          .filter(profile => attendees.includes(profile.describes))
          .map(profile => ({ id: profile.describes, label: profile['vcard:given-name'] }))
          .filter(({ label }) => label.toLowerCase().startsWith(query.toLowerCase()))
          .slice(0, 5)
      }
    }
  }, [attendeesLoaded, profilesLoaded, attendees, profiles]);

  return ({
    items, render
  });
};

export default useSuggestions;
