import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../apollo/queries';
import SpinningLoader from './shared/Loader';
import Redirect from './shared/Redirect';

const PleaseSignin = ({ children, role }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });
  // const user = (data && data.me) || {};
  // console.log(user);
  if ((!loading && !data.me) || error) {
    return <Redirect to="/signin" query={{ message: 'NOT_AUTHENTICATED' }} />;
  }

  if (data && data.me) {
    if (role && !role.includes(data.me.role)) {
      return <Redirect to="/signin" query={{ message: 'NOT_AUTHORIZED' }} />;
    }
    return children;
  }

  return (
    <div className="spinner-container">
      <SpinningLoader variant="large" />;
    </div>
  );
};

export default PleaseSignin;
