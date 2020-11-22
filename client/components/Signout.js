import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { GET_CURRENT_USER, SIGN_OUT } from '../apollo/queries';
import { useRouter } from 'next/router';

const Signout = () => {
  const router = useRouter();
  const [signOut] = useMutation(SIGN_OUT, {
    onError: (err) => console.log(err.errors),
    onCompleted: () => router.push('/'),
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });
  return (
    <Button variant="outline-light" onClick={signOut}>
      Sign out
    </Button>
  );
};

export default Signout;
