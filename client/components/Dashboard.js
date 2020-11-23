import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import Layout from './shared/Layout';
import { ALTER_PORTFOLIO, GET_USER_PORTFOLIOS } from '../apollo/queries';
import { formatDate } from '../utils/functions';

const Dashboard = () => {
  const router = useRouter();

  const { data } = useQuery(GET_USER_PORTFOLIOS, {
    onError: (err) => console.log(err),
    onCompleted: () => console.log('Completed'),
  });

  const [alterPortfolio] = useMutation(ALTER_PORTFOLIO, {
    update: (cache, { data: { alterPortfolio } }) => {
      const { getUserPortfolios } = cache.readQuery({
        query: GET_USER_PORTFOLIOS,
      });
      const updatedUserPortfolio = getUserPortfolios.filter(
        (p) => p.id !== alterPortfolio.id
      );
      cache.writeQuery({
        query: GET_USER_PORTFOLIOS,
        data: { getUserPortfolios: updatedUserPortfolio },
      });
    },
    onError: (err) => console.log(err),
    onCompleted: (res) => console.log('Completed', res),
  });

  const userPortfolios = (data && data.getUserPortfolios) || [];

  return (
    <Layout>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-12">
            <h3 className="page-title">Manage Your Portfolios</h3>
            {userPortfolios.map((p) => (
              <Card key={p.id} className="mb-2">
                <Card.Header>{p.jobTitle}</Card.Header>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>
                    {formatDate(p.startDate)} -{' '}
                    {(p.endDate && formatDate(p.endDate)) || 'Present'}
                  </Card.Text>
                  <Link
                    href={{
                      pathname: '/portfolios/[id]/edit',
                      query: { id: p.id },
                    }}
                    as={{
                      pathname: `/portfolios/${p.id}/edit`,
                      query: { id: p.id },
                    }}
                  >
                    <a className="btn btn-warning mr-1">Update</a>
                  </Link>
                  <Button
                    onClick={() =>
                      alterPortfolio({
                        variables: { id: p.id, action: 'DELETE' },
                      })
                    }
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
