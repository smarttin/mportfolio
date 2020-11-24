import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../shared/Layout';
import { GET_PORTFOLIO } from '@/apollo/queries';
import { formatDetailDate } from '@/utils/functions';

const PortfolioDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_PORTFOLIO, {
    variables: { id: id },
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
    onCompleted: () => console.log(data),
  });

  const portfolio = (data && data.getPortfolio) || {};

  return (
    <div className="portfolio-detail">
      <div className="cover-container d-flex flex-column">
        <Layout navClass="transparent">
          <main role="main" className="inner page-cover">
            <h1 className="cover-heading">{portfolio.title}</h1>
            <p className="lead dates">
              {formatDetailDate(portfolio.startDate)} -{' '}
              {(portfolio.endDate && formatDetailDate(portfolio.endDate)) ||
                'Present'}
            </p>
            <p className="lead info mb-0">
              {/* add company later */}
              {portfolio.jobTitle} | company | {portfolio.location}
            </p>
            <p className="lead">{portfolio.description}</p>
            <p className="lead">
              <a
                href="https://google.com"
                target="_"
                className="btn btn-lg btn-secondary"
              >
                View Project
              </a>
            </p>
          </main>
        </Layout>
      </div>
    </div>
  );
};

export default PortfolioDetail;
