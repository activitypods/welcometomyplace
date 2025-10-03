import urlJoin from 'url-join';

const Group = {
  dataModel: {
    shapeTreeUri: urlJoin(process.env.REACT_APP_SHAPE_REPOSITORY_URL, 'shapetrees/vcard/Group'),
    list: {
      blankNodes: ['vcard:hasMember']
    }
  }
};

export default Group;
