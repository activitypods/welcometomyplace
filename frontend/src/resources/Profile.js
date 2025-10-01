import urlJoin from 'url-join';

export default {
  dataModel: {
    shapeTreeUri: urlJoin(process.env.REACT_APP_SHAPE_REPOSITORY_URL, 'shapetrees/as/Profile')
  }
};
