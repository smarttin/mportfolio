import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/main.scss';
import dynamic from 'next/dynamic';
// import { getDataFromTree } from '@apollo/client/react/ssr';
import App from 'next/app';
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
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(MyApp);
