import urlJoin from 'url-join';

const Profile = {
  dataModel: {
    shapeTreeUri: urlJoin(process.env.REACT_APP_SHAPE_REPOSITORY_URL, 'shapetrees/as/Profile')
  }
};

export default Profile;
