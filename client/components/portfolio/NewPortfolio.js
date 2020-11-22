import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../shared/Layout';
import { CREATE_PORTFOLIO, GET_PORTFOLIOS } from '../../apollo/queries';
import PortfolioForm from './PortfolioForm';

const NewPortfolio = () => {
  const router = useRouter();

  const [createPortfolio, { loading }] = useMutation(CREATE_PORTFOLIO, {
    update: (cache, { data: { createPortfolio } }) => {
      const { getPortfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { getPortfolios: [...getPortfolios, createPortfolio] },
      });
    },
    onError: (err) => console.log(err),
    onCompleted: () => router.push('/portfolios'),
  });

  const handleOnSubmit = (formData) => {
    createPortfolio({ variables: formData });
  };

  return (
    <Layout>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h3 className="page-title">Create New Portfolio Project</h3>
            <PortfolioForm onSubmit={handleOnSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewPortfolio;
