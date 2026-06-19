import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signIn } from '../services/api';

/**
 * Public Login Page Component
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // POST payload is always sent on submit
      const response = await signIn(email, password);
      // Success Response contains: responseJson.data.token
      const token = response?.data?.token;
      
      if (token) {
        // Save the JWT token in jwt_token cookie
        Cookies.set('jwt_token', token);
        // Navigate user to protected dashboard home /
        navigate('/', { replace: true });
      } else {
        setError('Token not found in response.');
      }
    } catch (err) {
      // Display backend error response message e.g. "Invalid email or password"
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Brand details */}
        <h1 className="login-brand">Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>
        
        {/* Error alerting region */}
        {error && (
          <div className="error-alert" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.16.16 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.11.11 0 0 1-.066-.017.16.16 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {/* Form controls */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-floating-custom">
            <label htmlFor="emailInput">Email</label>
            <input
              type="email"
              id="emailInput"
              className="form-control-custom"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          
          <div className="form-floating-custom">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              id="passwordInput"
              className="form-control-custom"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          
          {/* Button remains enabled regardless of inputs being empty */}
          <button
            type="submit"
            className="btn-primary-custom d-flex justify-content-center align-items-center gap-2"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
