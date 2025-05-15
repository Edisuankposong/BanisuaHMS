// Update the routes in App.tsx to include the new components
import Calendar from './pages/appointments/Calendar';
import StaffSchedule from './pages/staff/StaffSchedule';

// Add these routes within the existing routes array:
<Route path="appointments/calendar" element={<Calendar />} />
<Route path="staff/schedule" element={<StaffSchedule />} />

export default StaffSchedule