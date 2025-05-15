import { Route } from 'react-router-dom';
import Calendar from './pages/appointments/Calendar';
import StaffSchedule from './pages/staff/StaffSchedule';

const App = () => {
  return (
    <>
      <Route path="appointments/calendar" element={<Calendar />} />
      <Route path="staff/schedule" element={<StaffSchedule />} />
    </>
  );
};

export default App;