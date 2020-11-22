import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from './shared/Layout';
import { SIGN_UP, GET_CURRENT_USER } from '../apollo/queries';

const Signup = (props) => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const [signUp, { data, loading }] = useMutation(SIGN_UP, {
    onError: (err) => console.log(err.errors),
    onCompleted: () => router.push('/'),
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const onSubmit = (formData) => {
    signUp({ variables: formData });
  };

  return (
    <Layout>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title pt-5">Sign Up</h1>
            {}
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    ref={register}
                    type="username"
                    className="form-control"
                    id="username"
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    ref={register}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    ref={register}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
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
                    Already have an account?{' '}
                    <Link href="/signin">
                      <a>Sign in</a>
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

export default Signup;
