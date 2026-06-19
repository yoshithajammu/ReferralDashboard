import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top" aria-label="Primary">
      <div className="container">
        <Link to="/" className="navbar-brand" aria-label="Go to dashboard home">
          Go Business
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link-custom d-inline-block ${location.pathname === '/' ? 'active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex mt-2 mt-lg-0">
            <button
              type="button"
              onClick={handleLogout}
              className="logout-btn btn-sm"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
