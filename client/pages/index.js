import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  return <h1>Index page</h1>;
};

LandingPage.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser');
  return response.data;
};

export default LandingPage;
