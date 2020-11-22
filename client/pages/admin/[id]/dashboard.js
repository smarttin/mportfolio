import Dashboard from '@/components/Dashboard';
import PleaseSignin from '@/components/PleaseSignin';

const dashboard = () => {
  return (
    <PleaseSignin role="admin">
      <Dashboard />
    </PleaseSignin>
  );
};

export default dashboard;
