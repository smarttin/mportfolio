import CreatePortfolio from '@/components/portfolio/CreatePortfolio';
import PleaseSignin from '@/components/PleaseSignin';

const NewPortfolioPage = () => {
  return (
    <PleaseSignin role="admin">
      <CreatePortfolio />
    </PleaseSignin>
  );
};

export default NewPortfolioPage;
