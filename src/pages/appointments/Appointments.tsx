import { useState } from 'react';
import { Calendar, Link } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
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
  resourceId?: string;
  type: 'appointment' | 'surgery' | 'consultation';
  patient: {
    name: string;
    id: string;
  };
  doctor: {
    name: string;
    id: string;
  };
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

interface Resource {
  id: string;
  title: string;
  type: 'doctor' | 'room' | 'equipment';
}

const Appointments = () => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Mock data for calendar events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'General Checkup - John Davis',
      start: new Date(2024, 2, 15, 9, 30),
      end: new Date(2024, 2, 15, 10, 0),
      resourceId: 'doc1',
      type: 'appointment',
      patient: {
        name: 'John Davis',
        id: 'PAT001'
      },
      doctor: {
        name: 'Dr. Sarah Johnson',
        id: 'DOC001'
      },
      status: 'scheduled'
    },
    // Add more mock events...
  ];

  // Mock data for resources
  const resources: Resource[] = [
    {
      id: 'doc1',
      title: 'Dr. Sarah Johnson',
      type: 'doctor'
    },
    {
      id: 'doc2',
      title: 'Dr. Michael Brown',
      type: 'doctor'
    },
    // Add more resources...
  ];

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '';
    switch (event.type) {
      case 'appointment':
        backgroundColor = '#3b82f6';
        break;
      case 'surgery':
        backgroundColor = '#ef4444';
        break;
      case 'consultation':
        backgroundColor = '#22c55e';
        break;
      default:
        backgroundColor = '#6b7280';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: event.status === 'cancelled' ? 0.5 : 1,
        border: 'none',
        color: 'white',
      }
    };
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    const newDate = new Date(date);
    switch (action) {
      case 'PREV':
        newDate.setMonth(date.getMonth() - 1);
        break;
      case 'NEXT':
        newDate.setMonth(date.getMonth() + 1);
        break;
      case 'TODAY':
        newDate.setTime(new Date().getTime());
        break;
    }
    setDate(newDate);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage and schedule appointments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/appointments/add">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              New Appointment
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('TODAY')}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('PREV')}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('NEXT')}
              >
                <ChevronRight size={16} />
              </Button>
              <h2 className="text-lg font-medium text-gray-900">
                {format(date, 'MMMM yyyy')}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={view === 'month' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                Month
              </Button>
              <Button
                variant={view === 'week' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button
                variant={view === 'day' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setView('day')}
              >
                Day
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            resources={resources}
            resourceIdAccessor="id"
            resourceTitleAccessor="title"
            view={view}
            onView={setView as any}
            date={date}
            onNavigate={setDate}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventClick}
            selectable
            resizable
            step={15}
            timeslots={4}
            className="h-[600px]"
          />
        </div>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">
                  {format(selectedEvent.start, 'PPp')} - {format(selectedEvent.end, 'p')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-medium">{selectedEvent.patient.name}</p>
                <p className="text-sm text-gray-500">ID: {selectedEvent.patient.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{selectedEvent.doctor.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedEvent.status === 'scheduled' 
                    ? 'bg-primary-100 text-primary-800'
                    : selectedEvent.status === 'completed'
                    ? 'bg-success-100 text-success-800'
                    : selectedEvent.status === 'cancelled'
                    ? 'bg-danger-100 text-danger-800'
                    : 'bg-warning-100 text-warning-800'
                }`}>
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
              <Link to={`/appointments/${selectedEvent.id}`}>
                <Button variant="primary">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;