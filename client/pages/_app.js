import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/main.scss';

import dynamic from 'next/dynamic';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
import withApollo from '../apollo/withApollo';

const TopProgressBar = dynamic(
  () => {
    return import('../components/shared/TopProgressBar');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopProgressBar />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(MyApp);
