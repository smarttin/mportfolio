import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../apollo/queries';
import Redirect from './shared/Redirect';

const PleaseSignin = ({ children, role }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <p>Loading . . .</p>;
  }

  if ((!loading && !data.me) || error) {
    return <Redirect to="/signin" />;
  }

  if (data.me) {
    if (role && !role.includes(data.me.role)) {
      return <Redirect to="/signin" />;
    }
  }
  return children;
};

export default PleaseSignin;
