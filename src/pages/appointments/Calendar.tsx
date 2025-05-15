import { useState, useCallback } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  patientName?: string;
  doctorName?: string;
  type?: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
}

const AppointmentCalendar = () => {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  // Mock events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Regular Checkup - John Davis',
      start: new Date(2024, 2, 15, 9, 30),
      end: new Date(2024, 2, 15, 10, 0),
      patientName: 'John Davis',
      doctorName: 'Dr. Sarah Johnson',
      type: 'Regular Checkup',
      status: 'scheduled',
    },
    {
      id: '2',
      title: 'Follow-up - Emma Wilson',
      start: new Date(2024, 2, 15, 10, 15),
      end: new Date(2024, 2, 15, 11, 0),
      patientName: 'Emma Wilson',
      doctorName: 'Dr. Michael Brown',
      type: 'Follow-up',
      status: 'scheduled',
    },
  ];

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView: string) => {
    setView(newView);
  }, []);

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3b82f6'; // primary-500
    let borderColor = '#2563eb'; // primary-600

    switch (event.status) {
      case 'completed':
        backgroundColor = '#22c55e'; // success-500
        borderColor = '#16a34a'; // success-600
        break;
      case 'cancelled':
        backgroundColor = '#ef4444'; // danger-500
        borderColor = '#dc2626'; // danger-600
        break;
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderRadius: '0.375rem',
        opacity: 1,
        color: 'white',
        border: 'none',
      },
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Calendar</h1>
          <p className="text-gray-600">Schedule and manage appointments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => window.location.href = '/appointments/add'}
          >
            New Appointment
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setDate(newDate.getDate() - 7);
                  handleNavigate(newDate);
                }}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setDate(newDate.getDate() + 7);
                  handleNavigate(newDate);
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-2">
              <select
                value={view}
                onChange={(e) => handleViewChange(e.target.value)}
                className="rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={Views.DAY}>Day</option>
                <option value={Views.WEEK}>Week</option>
                <option value={Views.MONTH}>Month</option>
                <option value={Views.AGENDA}>Agenda</option>
              </select>
            </div>
          </div>

          <div className="h-[600px]">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              view={view}
              onView={handleViewChange}
              date={date}
              onNavigate={handleNavigate}
              eventPropGetter={eventStyleGetter}
              tooltipAccessor={(event: CalendarEvent) => `
                Patient: ${event.patientName}
                Doctor: ${event.doctorName}
                Type: ${event.type}
              `}
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
              className="rounded-lg"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;