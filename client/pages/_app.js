import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/main.scss';
import dynamic from 'next/dynamic';
import apolloClient from '../apollo/apolloClient';

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

export default apolloClient(MyApp);
