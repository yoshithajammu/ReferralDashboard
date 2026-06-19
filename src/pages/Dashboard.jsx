import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getReferrals } from '../services/api';
import { formatDate, formatProfit, formatMetricValue } from '../utils/formatters';

const Dashboard = () => {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState([]);
  const [serviceSummary, setServiceSummary] = useState(null);
  const [referralShare, setReferralShare] = useState({ link: '', code: '' });
  const [referralsList, setReferralsList] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchText, setSearchText] = useState('');
  const [sortByDate, setSortByDate] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const fetchData = async (token, search, sort) => {
    setLoading(true);
    setError('');
    try {
      const data = await getReferrals(token, { search, sort });
      
      const parsedData = data.data || data;
      
      setMetrics(parsedData.metrics || []);
      setServiceSummary(parsedData.serviceSummary || null);
      setReferralShare(parsedData.referral || { link: '', code: '' });
      setReferralsList(parsedData.referrals || []);
      
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchData(token, searchText, sortByDate);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchText, sortByDate, navigate]);

  const handleCopyLink = () => {
    if (referralShare?.link) {
      navigator.clipboard.writeText(referralShare.link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1500);
    }
  };

  const handleCopyCode = () => {
    if (referralShare?.code) {
      navigator.clipboard.writeText(referralShare.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1500);
    }
  };

  const itemsPerPage = 10;
  const totalItems = referralsList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedReferrals = referralsList.slice(startIndex, endIndex);

  const displayFrom = totalItems === 0 ? 0 : startIndex + 1;
  const displayTo = endIndex;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="container my-4 py-2">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="h2 mb-1">Referral Dashboard</h1>
          <p className="text-muted mb-0">
            Track your referrals, earnings, and partner activity in one place.
          </p>
        </div>

        {error && (
          <div className="alert-error-custom" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>
            <div>
              <h6 className="fw-bold mb-1">Data Fetch Failure</h6>
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner-custom" role="status">
              <span className="visually-hidden">Loading dashboard data...</span>
            </div>
            <p className="text-muted fw-medium">Updating referral overview...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="mb-4" role="region" aria-label="Overview metrics">
              <h2 className="h5 mb-3">Overview</h2>
              <div className="metrics-grid">
                {metrics.map((metric) => (
                  <div key={metric.id || metric.label} className="metric-card">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value">{formatMetricValue(metric.value)}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="row g-4 mb-4">
              <div className="col-12 col-lg-6">
                <section role="region" aria-label="Service summary" className="h-100">
                  <div className="card-custom h-100">
                    <div className="card-custom-header">
                      <h2 className="h5 mb-0">Service summary</h2>
                    </div>
                    <div className="card-custom-body">
                      <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                          <thead className="table-light">
                            <tr>
                              <th scope="col" className="small fw-bold text-uppercase">Service</th>
                              <th scope="col" className="small fw-bold text-uppercase">Your Referrals</th>
                              <th scope="col" className="small fw-bold text-uppercase">Active Referrals</th>
                              <th scope="col" className="small fw-bold text-uppercase">Total Ref. Earnings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {serviceSummary ? (
                              <tr>
                                <td className="fw-medium">{serviceSummary.service || '-'}</td>
                                <td>{serviceSummary.yourReferrals || 0}</td>
                                <td>{serviceSummary.activeReferrals || 0}</td>
                                <td className="fw-semibold text-primary">
                                  {formatProfit(serviceSummary.totalRefEarnings || 0)}
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center text-muted py-3">
                                  No service summary data.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-12 col-lg-6">
                <section role="region" aria-label="Share referral" className="h-100">
                  <div className="card-custom h-100">
                    <div className="card-custom-header">
                      <h2 className="h5 mb-0">Refer friends and earn more</h2>
                    </div>
                    <div className="card-custom-body">
                      <div className="share-container">
                        <div className="share-group">
                          <div className="share-label">Your Referral Link</div>
                          <div className="share-input-wrapper">
                            <input
                              type="text"
                              readOnly
                              value={referralShare?.link || ''}
                              aria-label="Your Referral Link"
                            />
                            <button
                              type="button"
                              onClick={handleCopyLink}
                              className="btn-copy"
                            >
                              Copy
                            </button>
                          </div>
                          {copiedLink && (
                            <span className="copy-success-tooltip">Copied!</span>
                          )}
                        </div>

                        <div className="share-group">
                          <div className="share-label">Your Referral Code</div>
                          <div className="share-input-wrapper">
                            <input
                              type="text"
                              readOnly
                              value={referralShare?.code || ''}
                              aria-label="Your Referral Code"
                            />
                            <button
                              type="button"
                              onClick={handleCopyCode}
                              className="btn-copy"
                            >
                              Copy
                            </button>
                          </div>
                          {copiedCode && (
                            <span className="copy-success-tooltip">Copied!</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <section className="mb-4" role="region" aria-label="All referrals">
              <div className="card-custom">
                <div className="card-custom-header border-0 pb-0 flex-column flex-md-row gap-3">
                  <h2 className="h5 mb-0">All referrals</h2>
                  
                  <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-3 w-100 w-md-auto">
                    
                    <div className="search-input-group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="search-icon-svg">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                      <input
                        type="text"
                        className="form-control-custom py-1.5"
                        placeholder="Name or service…"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        aria-label="Search referrals"
                      />
                    </div>

                    <div>
                      <label className="sort-group-label">
                        <span>Sort by date</span>
                        <select
                          value={sortByDate}
                          onChange={(e) => setSortByDate(e.target.value)}
                          className="sort-select"
                        >
                          <option value="desc">Newest first</option>
                          <option value="asc">Oldest first</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="card-custom-body pt-3">
                  <div className="table-responsive-custom">
                    <table className="table table-custom table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Service</th>
                          <th scope="col">Date</th>
                          <th scope="col">Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedReferrals.length > 0 ? (
                          displayedReferrals.map((item) => (
                            <tr
                              key={item.id}
                              onClick={() => navigate(`/referral/${item.id}`)}
                            >
                              <td className="fw-semibold">{item.name}</td>
                              <td>{item.serviceName}</td>
                              <td>{formatDate(item.date)}</td>
                              <td className="fw-semibold text-success">
                                {formatProfit(item.profit)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4">
                              <div className="table-empty-state">
                                <h5>No matching entries</h5>
                                <p className="text-muted mb-0">Try adjusting your search criteria</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="pagination-container">
                    <div className="pagination-summary">
                      Showing {displayFrom}–{displayTo} of {totalItems} entries
                    </div>
                    
                    {totalPages > 1 && (
                      <ul className="pagination-custom" aria-label="Pagination">
                       
                        <li className="page-item-custom">
                          <button
                            type="button"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`page-link-custom ${currentPage === 1 ? 'disabled' : ''}`}
                            aria-label="Go to previous page"
                          >
                            Previous
                          </button>
                        </li>

                        {Array.from({ length: totalPages }).map((_, idx) => {
                          const pageNum = idx + 1;
                          return (
                            <li
                              key={pageNum}
                              className={`page-item-custom ${currentPage === pageNum ? 'active' : ''}`}
                            >
                              <button
                                type="button"
                                onClick={() => setCurrentPage(pageNum)}
                                className="page-link-custom"
                                aria-label={`Go to page ${pageNum}`}
                                aria-current={currentPage === pageNum ? 'page' : undefined}
                              >
                                {pageNum}
                              </button>
                            </li>
                          );
                        })}
                        <li className="page-item-custom">
                          <button
                            type="button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`page-link-custom ${currentPage === totalPages ? 'disabled' : ''}`}
                            aria-label="Go to next page"
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
