import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../shared/Layout';
import { ALTER_PORTFOLIO, GET_PORTFOLIO } from '../../apollo/queries';
import PortfolioForm from './PortfolioForm';

const EditPortfolio = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(GET_PORTFOLIO, {
    variables: { id: id },
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
    // onCompleted: (res) => console.log('Completed', res),
  });
  // console.log('initialData', initialData);

  const [alterPortfolio, { loading }] = useMutation(ALTER_PORTFOLIO, {
    // update: (cache, { data: { alterPortfolio } }) => console.log('DONE!'),
    onError: (err) => console.log(err),
    onCompleted: () => (res) => console.log('Completed', res),
  });

  const handleOnSubmit = (formData) => {
    // return console.log('formData', formData);
    alterPortfolio({
      variables: { id: id, ...formData, action: 'EDIT' },
    });
  };

  return (
    <Layout>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h3 className="page-title">Update Portfolio Project</h3>
            {data && data.getPortfolio && (
              <PortfolioForm
                onSubmit={handleOnSubmit}
                initialData={data.getPortfolio}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditPortfolio;
