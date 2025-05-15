import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import PharmacistDashboard from './pages/pharmacy/PharmacistDashboard';
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard';
import PatientDashboard from './pages/patients/PatientDashboard';
import Patients from './pages/patients/Patients';
import PatientDetails from './pages/patients/PatientDetails';
import AddPatient from './pages/patients/AddPatient';
import Appointments from './pages/appointments/Appointments';
import AddAppointment from './pages/appointments/AddAppointment';
import Doctors from './pages/doctors/Doctors';
import DoctorDetails from './pages/doctors/DoctorDetails';
import AddDoctor from './pages/doctors/AddDoctor';
import Prescriptions from './pages/prescriptions/Prescriptions';
import AddPrescription from './pages/prescriptions/AddPrescription';
import PrescriptionDetails from './pages/prescriptions/PrescriptionDetails';
import Billing from './pages/billing/Billing';
import AddBill from './pages/billing/AddBill';
import BillDetails from './pages/billing/BillDetails';
import Pharmacy from './pages/pharmacy/Pharmacy';
import AddMedicine from './pages/pharmacy/AddMedicine';
import Laboratory from './pages/laboratory/Laboratory';
import AddLabTest from './pages/laboratory/AddLabTest';
import LabTestDetails from './pages/laboratory/LabTestDetails';
import Wards from './pages/wards/Wards';
import WardDetails from './pages/wards/WardDetails';
import Reports from './pages/reports/Reports';
import StaffScheduling from './pages/staff/StaffScheduling';
import Documents from './pages/documents/Documents';
import AuditLogs from './pages/admin/AuditLogs';
import UserProfile from './pages/profile/UserProfile';
import NotFoundPage from './pages/errors/NotFoundPage';

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
          
          {/* Patient Routes */}
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="patients/add" element={
            <RoleBasedRoute allowedRoles={['admin', 'receptionist', 'doctor', 'nurse']}>
              <AddPatient />
            </RoleBasedRoute>
          } />
          
          {/* Appointment Routes */}
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={
            <RoleBasedRoute allowedRoles={['admin', 'receptionist', 'doctor', 'patient']}>
              <AddAppointment />
            </RoleBasedRoute>
          } />
          
          {/* Doctor Routes */}
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:id" element={<DoctorDetails />} />
          <Route path="doctors/add" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AddDoctor />
            </RoleBasedRoute>
          } />
          
          {/* Prescription Routes */}
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="prescriptions/:id" element={<PrescriptionDetails />} />
          <Route path="prescriptions/add" element={
            <RoleBasedRoute allowedRoles={['admin', 'doctor']}>
              <AddPrescription />
            </RoleBasedRoute>
          } />
          
          {/* Billing Routes */}
          <Route path="billing" element={<Billing />} />
          <Route path="billing/:id" element={<BillDetails />} />
          <Route path="billing/add" element={
            <RoleBasedRoute allowedRoles={['admin', 'receptionist']}>
              <AddBill />
            </RoleBasedRoute>
          } />
          
          {/* Pharmacy Routes */}
          <Route path="pharmacy" element={
            <RoleBasedRoute allowedRoles={['admin', 'pharmacist']}>
              <Pharmacy />
            </RoleBasedRoute>
          } />
          <Route path="pharmacy/add" element={
            <RoleBasedRoute allowedRoles={['admin', 'pharmacist']}>
              <AddMedicine />
            </RoleBasedRoute>
          } />
          
          {/* Laboratory Routes */}
          <Route path="laboratory" element={
            <RoleBasedRoute allowedRoles={['admin', 'lab_technician', 'doctor']}>
              <Laboratory />
            </RoleBasedRoute>
          } />
          <Route path="laboratory/add" element={
            <RoleBasedRoute allowedRoles={['admin', 'doctor']}>
              <AddLabTest />
            </RoleBasedRoute>
          } />
          <Route path="laboratory/:id" element={<LabTestDetails />} />
          
          {/* Ward Routes */}
          <Route path="wards" element={<Wards />} />
          <Route path="wards/:id" element={<WardDetails />} />
          
          {/* Reports Routes */}
          <Route path="reports" element={
            <RoleBasedRoute allowedRoles={['admin', 'doctor']}>
              <Reports />
            </RoleBasedRoute>
          } />

          {/* Staff Scheduling */}
          <Route path="staff/scheduling" element={
            <RoleBasedRoute allowedRoles={['admin', 'hr']}>
              <StaffScheduling />
            </RoleBasedRoute>
          } />

          {/* Documents */}
          <Route path="documents" element={
            <RoleBasedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
              <Documents />
            </RoleBasedRoute>
          } />

          {/* Audit Logs */}
          <Route path="audit-logs" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AuditLogs />
            </RoleBasedRoute>
          } />
          
          {/* Profile Route */}
          <Route path="profile" element={<UserProfile />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;