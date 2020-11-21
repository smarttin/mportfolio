import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from '../shared/Layout';
import { GET_PORTFOLIO } from '../../apollo/queries';

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
    <Layout>
      <div className="portfolio-detail">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-3">{portfolio.title}</h1>
            <p className="lead">{portfolio.jobTitle}</p>
            <p>
              <a
                className="btn btn-lg btn-success"
                href={portfolio.companyWebsite}
                role="button"
              >
                See Company
              </a>
            </p>
          </div>

          <div className="row marketing">
            <div className="col-lg-6">
              <h4 className="title">Location</h4>
              <p className="text">{portfolio.location}</p>

              <h4 className="title">Start Date</h4>
              <p className="text">{portfolio.startDate}</p>
            </div>

            <div className="col-lg-6">
              {/* TODO: days later... */}
              <h4 className="title">Days</h4>
              {/* <p className="text">{portfolio.daysOfExperience}</p> */}

              <h4 className="title">End Date</h4>
              <p className="text">
                {(portfolio.endDate && portfolio.endDate) || 'Present'}
              </p>
            </div>
            <div className="col-md-12">
              <hr />
              <h4 className="title">Description</h4>
              <p>{portfolio.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PortfolioDetail;
