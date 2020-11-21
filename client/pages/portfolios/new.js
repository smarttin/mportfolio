import NewPortfolioProject from '../../components/NewPortfolioProject';
import PleaseSignin from '../../components/PleaseSignin';

const NewPortfolioProjectPage = () => {
  return (
    <PleaseSignin role="admin">
      <NewPortfolioProject />
    </PleaseSignin>
  );
};

export default NewPortfolioProjectPage;
