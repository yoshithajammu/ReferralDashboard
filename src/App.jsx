import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReferralDetail from './pages/ReferralDetail';
import NotFound from './pages/NotFound';

/**
 * Main Application Component containing routes.
 * The Routes are wrapped in BrowserRouter inside App.jsx as required.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/referral/:id" 
          element={
            <ProtectedRoute>
              <ReferralDetail />
            </ProtectedRoute>
          } 
        />

        {/* Optional Redirect to Dashboard */}
        <Route 
          path="/dashboard/referrals" 
          element={
            <ProtectedRoute>
              <Navigate to="/" replace />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all Not Found Route (Public, NOT wrapped in ProtectedRoute) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
