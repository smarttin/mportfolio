import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { GET_CURRENT_USER, SIGN_OUT } from '../apollo/queries';
import { useRouter } from 'next/router';

const Signout = () => {
  const router = useRouter();
  const [signOut] = useMutation(SIGN_OUT, {
    update: (_, __) => router.push('/'),
    onError: (err) => console.log(err.errors),
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });
  return (
    <Button variant="outline-light" onClick={signOut}>
      Sign out
    </Button>
  );
};

export default Signout;
