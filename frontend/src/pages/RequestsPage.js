import { useParams } from 'react-router-dom';

const RequestsPage = () => {
  const params = useParams();
  window.location.href = 'https://lentraide.app/requests/' + encodeURIComponent(params.id);
  return null;
};

export default RequestsPage;
