import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import ActiveLink from './ActiveLink';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../apollo/queries';
import Signout from '../Signout';

const AppNavbar = ({ className }) => {
  const { error, loading, data } = useQuery(GET_CURRENT_USER);

  const NavLink = (props) => {
    const { href, title, className = '' } = props;
    return (
      <ActiveLink activeClassName="active" href={href}>
        <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
      </ActiveLink>
    );
  };

  const NavDropdownItem = ({ href, title }) => {
    return (
      <Link activeClassName="active" href={href}>
        <a className="dropdown-item">{title}</a>
      </Link>
    );
  };

  return (
    <Navbar
      expand="md"
      className={`port-navbar port-default absolute ${className}`}
    >
      <Navbar.Brand>
        <Link href="/">
          <a className="navbar-brand port-navbar-brand">Onyeka G</a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item className="port-navbar-item">
            <NavLink title="about" href="/about" />
          </Nav.Item>
          <Nav.Item className="port-navbar-item">
            <NavLink title="Portfolios" href="/portfolios" />
          </Nav.Item>
          <Nav.Item className="port-navbar-item">
            <NavLink title="Blog" href="/blog" />
          </Nav.Item>
          <Nav.Item className="port-navbar-item">
            <NavLink title="q&a" href="/forum/categories" />
          </Nav.Item>
        </Nav>
        <Nav>
          {!loading && data && data.me && (
            <>
              {/* <span className="nav-link port-navbar-link">
                {data.me.username}
              </span> */}
              {data.me.role === 'admin' && (
                <NavDropdown
                  className="mr-2"
                  title="Manage"
                  id="basic-nav-dropdown"
                >
                  <>
                    <NavDropdownItem
                      href="/portfolios/new"
                      title="Create Portfolio"
                    />
                    <NavDropdown.Divider />
                    <NavDropdownItem
                      href={{
                        pathname: '/admin/[id]/dashboard',
                        query: { id: data.me.id },
                      }}
                      as={{
                        pathname: `/admin/${data.me.id}/dashboard`,
                        query: { id: data.me.id },
                      }}
                      title="Dashboard"
                    />
                  </>
                </NavDropdown>
              )}
              <Signout />
            </>
          )}
          {error ||
            (!loading && !data.me && (
              <>
                <Nav.Item className="port-navbar-item">
                  <NavLink title="Sign Up" href="/signup" />
                </Nav.Item>
                <Nav.Item className="port-navbar-item">
                  <NavLink title="Sign In" href="/signin" />
                </Nav.Item>
              </>
            ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
