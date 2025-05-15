import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import PatientDashboard from './pages/patients/PatientDashboard';
import PharmacistDashboard from './pages/pharmacy/PharmacistDashboard';
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard';
import Patients from './pages/patients/Patients';
import PatientDetails from './pages/patients/PatientDetails';
import AddPatient from './pages/patients/AddPatient';
// ... rest of the imports

function App() {
  const { isAuthenticated, user } = useAuthStore();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  const RoleBasedRoute = ({ 
    children, 
    allowedRoles 
  }: { 
    children: React.ReactNode, 
    allowedRoles: string[] 
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (user && !allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Dashboard Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={
            user?.role === 'patient' ? <PatientDashboard /> :
            user?.role === 'pharmacist' ? <PharmacistDashboard /> :
            user?.role === 'receptionist' ? <ReceptionistDashboard /> :
            <Dashboard />
          } />
          
          {/* Rest of the routes... */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;