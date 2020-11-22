import EditPortfolio from '@/components/portfolio/EditPortfolio';
import PleaseSignin from '@/components/PleaseSignin';

const EditPortfolioPage = () => {
  return (
    <PleaseSignin role="admin">
      <EditPortfolio />
    </PleaseSignin>
  );
};

export default EditPortfolioPage;
