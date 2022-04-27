import { useParams } from 'react-router-dom';

const OffersPage = () => {
  const params = useParams();
  window.location.href = 'https://lentraide.app/offers/' + encodeURIComponent(params.id) + '/show';
  return null;
};

export default OffersPage;
