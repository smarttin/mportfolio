import NewPortfolio from '@/components/portfolio/NewPortfolio';
import PleaseSignin from '@/components/PleaseSignin';

const NewPortfolioPage = () => {
  return (
    <PleaseSignin role="admin">
      <NewPortfolio />
    </PleaseSignin>
  );
};

export default NewPortfolioPage;
