import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_PORTFOLIOS } from '../../apollo/queries';
import Layout from '../shared/Layout';
import PortfolioCard from './PortfolioCard';

const Portfolios = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIOS, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
    onCompleted: () => console.log(data),
  });

  const portfolios = (data && data.getPortfolios) || [];

  return (
    <Layout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio.id}`}>
                <a className="card-link mb-2">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolios;
