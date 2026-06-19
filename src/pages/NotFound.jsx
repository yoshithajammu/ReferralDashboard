import { Link } from 'react-router-dom';

/**
 * Public 404 Not Found Page Component
 */
const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div className="text-center">
        {/* Error code display */}
        <div className="not-found-code">404</div>
        
        {/* Message details */}
        <h1 className="not-found-title">Page not found</h1>
        
        <p className="not-found-text">
          The requested page is unavailable. Make sure the URL is typed correctly or return home.
        </p>
        
        {/* Primary redirect link */}
        <div className="mt-4">
          <Link 
            to="/" 
            className="btn-primary-custom d-inline-block w-auto px-4 text-decoration-none"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
