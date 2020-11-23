import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Layout from './shared/Layout';
import { SIGN_IN, GET_CURRENT_USER } from '../apollo/queries';
import messages from '../variables/messages';
const Signin = () => {
  const disposeId = useRef(null);
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { message } = router.query;
  const [signIn, { loading }] = useMutation(SIGN_IN, {
    // Refetch queries or Update cache
    // update: (cache, { data: { signIn: signedInUser } }) => {
    //   cache.writeQuery({
    //     query: GET_CURRENT_USER,
    //     data: { me: signedInUser },
    //   });
    // },
    onError: (err) => console.log(err.errors),
    onCompleted: () => router.push('/'),
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const disposeMessage = () => {
    router.replace('/signin', '/signin', { shallow: true });
  };

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    return () => {
      clearTimeout(disposeId.current);
    };
  }, [message]);

  const onSubmit = (formData) => {
    signIn({ variables: formData });
  };

  return (
    <Layout>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title pt-5">Sign In</h1>
            {message && (
              <div className={`alert alert-${messages[message].status}`}>
                {messages[message].value}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    ref={register}
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    ref={register}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-main bg-blue py-2 mr-2 ttu"
                  >
                    {loading ? 'Submiting ..' : 'Submit'}
                  </button>
                  <small>
                    Don't have an account?{' '}
                    <Link href="/signup">
                      <a>Sign up</a>
                    </Link>
                  </small>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
