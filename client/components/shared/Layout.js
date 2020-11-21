import Navbar from './Navbar';

const Layout = ({ children, navClass = 'with-bg' }) => {
  return (
    <>
      <Navbar className={navClass} />
      <div className="main-section">
        <div className="container">{children}</div>
      </div>
    </>
  );
};

export default Layout;
