import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getReferrals } from '../services/api';
import { formatDate, formatProfit } from '../utils/formatters';

/**
 * Protected Referral Detail Page Component
 */
const ReferralDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      setNotFound(false);
      try {
        const response = await getReferrals(token, { id });
        const parsedData = response.data || response;
        
        // Find matching referral object robustly
        let matchedReferral = null;
        
        if (parsedData) {
          // Case 1: The response itself is the referral row object
          if (parsedData.id !== undefined && String(parsedData.id) === String(id)) {
            matchedReferral = parsedData;
          } 
          // Case 2: The response is nested under a referrals list array
          else if (Array.isArray(parsedData.referrals)) {
            matchedReferral = parsedData.referrals.find(
              (r) => String(r.id) === String(id)
            );
          }
          // Case 3: Single nested referral object
          else if (parsedData.referral && String(parsedData.referral.id) === String(id)) {
            matchedReferral = parsedData.referral;
          }
        }

        if (matchedReferral) {
          setReferral(matchedReferral);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        // If API returns 404 or bad request, treat as not found
        if (err.message && err.message.includes('404')) {
          setNotFound(true);
        } else {
          setError(err.message || 'Failed to fetch referral details.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  return (
    <div className="app-container">
      <Navbar />

      <main className="container my-4 py-2">
        {/* Navigation Link back */}
        <div className="mb-3">
          <Link to="/" className="back-link" aria-label="Back to dashboard">
            &larr; Back to dashboard
          </Link>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="loading-container">
            <div className="spinner-custom" role="status">
              <span className="visually-hidden">Loading referral details...</span>
            </div>
            <p className="text-muted fw-medium">Retrieving referral profile...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="alert-error-custom" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
            <div>
              <h6 className="fw-bold mb-1">Retrieval Failed</h6>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Not Found Screen */}
        {!loading && notFound && (
          <div className="text-center py-5">
            <h1 className="h3 mb-3">Referral not found</h1>
            <p className="text-muted mb-4">The requested partner ID does not exist or has been deleted.</p>
            <Link to="/" className="btn btn-primary btn-sm px-4">
              Return to Dashboard
            </Link>
          </div>
        )}

        {/* Data Display Details Card */}
        {!loading && !error && !notFound && referral && (
          <div className="card-custom max-width-800 mx-auto">
            <div className="card-custom-header">
              <div className="detail-header mb-0">
                <h1 className="h4 mb-1">Referral Details</h1>
                <h2 className="h5 text-muted mb-0">{referral.name}</h2>
              </div>
            </div>
            <div className="card-custom-body">
              <dl className="details-list mb-0">
                <div className="details-row">
                  <dt className="details-label">Referral ID</dt>
                  <dd className="details-value">{referral.id}</dd>
                </div>
                <div className="details-row">
                  <dt className="details-label">Service Name</dt>
                  <dd className="details-value">{referral.serviceName}</dd>
                </div>
                <div className="details-row">
                  <dt className="details-label">Date</dt>
                  <dd className="details-value">{formatDate(referral.date)}</dd>
                </div>
                <div className="details-row">
                  <dt className="details-label">Profit</dt>
                  <dd className="details-value">{formatProfit(referral.profit)}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReferralDetail;
