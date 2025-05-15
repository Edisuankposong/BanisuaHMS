import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarClock, Users, Bed, Clock, Search, Plus, 
  CheckCircle, AlertTriangle, ArrowRight, UserPlus 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'today'>('today');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for today's appointments
  const appointments = [
    {
      id: '1',
      patientName: 'John Davis',
      patientId: 'PAT001',
      time: '09:30 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Regular Checkup',
      status: 'checked-in',
      room: '101'
    },
    {
      id: '2',
      patientName: 'Emma Wilson',
      patientId: 'PAT002',
      time: '10:15 AM',
      doctor: 'Dr. Michael Brown',
      type: 'Follow-up',
      status: 'scheduled'
    },
    {
      id: '3',
      patientName: 'Robert Miller',
      patientId: 'PAT003',
      time: '11:00 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Consultation',
      status: 'waiting'
    }
  ];

  // Mock data for room assignments
  const rooms = [
    { id: '101', doctor: 'Dr. Sarah Johnson', status: 'occupied', patient: 'John Davis' },
    { id: '102', doctor: 'Dr. Michael Brown', status: 'available' },
    { id: '103', doctor: 'Dr. Emily White', status: 'cleaning' },
    { id: '104', doctor: 'Dr. David Clark', status: 'maintenance' }
  ];

  // Mock data for waiting list
  const waitingList = [
    {
      id: '1',
      patientName: 'Robert Miller',
      patientId: 'PAT003',
      doctor: 'Dr. Sarah Johnson',
      waitingSince: '10:45 AM',
      priority: 'normal'
    },
    {
      id: '2',
      patientName: 'Alice Thompson',
      patientId: 'PAT004',
      doctor: 'Dr. Michael Brown',
      waitingSince: '10:30 AM',
      priority: 'urgent'
    }
  ];

  const appointmentColumns = [
    {
      header: 'Time',
      accessor: 'time'
    },
    {
      header: 'Patient',
      accessor: (appointment: any) => (
        <div>
          <div className="font-medium text-gray-900">{appointment.patientName}</div>
          <div className="text-sm text-gray-500">ID: {appointment.patientId}</div>
        </div>
      )
    },
    {
      header: 'Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Type',
      accessor: 'type'
    },
    {
      header: 'Status',
      accessor: (appointment: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          appointment.status === 'checked-in'
            ? 'bg-success-100 text-success-800'
            : appointment.status === 'waiting'
            ? 'bg-warning-100 text-warning-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Room',
      accessor: (appointment: any) => appointment.room || '-'
    },
    {
      header: 'Actions',
      accessor: (appointment: any) => (
        <div className="flex space-x-2">
          {appointment.status === 'scheduled' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => console.log('Check in:', appointment.id)}
            >
              Check In
            </Button>
          )}
          {appointment.status === 'waiting' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Assign room:', appointment.id)}
            >
              Assign Room
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('View details:', appointment.id)}
          >
            Details
          </Button>
        </div>
      )
    }
  ];

  const roomColumns = [
    {
      header: 'Room',
      accessor: 'id'
    },
    {
      header: 'Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Status',
      accessor: (room: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          room.status === 'available'
            ? 'bg-success-100 text-success-800'
            : room.status === 'occupied'
            ? 'bg-primary-100 text-primary-800'
            : room.status === 'cleaning'
            ? 'bg-warning-100 text-warning-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Patient',
      accessor: (room: any) => room.patient || '-'
    },
    {
      header: 'Actions',
      accessor: (room: any) => (
        <div className="flex space-x-2">
          {room.status === 'available' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Assign patient:', room.id)}
            >
              Assign Patient
            </Button>
          )}
          {room.status === 'occupied' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Mark available:', room.id)}
            >
              Mark Available
            </Button>
          )}
        </div>
      )
    }
  ];

  const waitingListColumns = [
    {
      header: 'Patient',
      accessor: (patient: any) => (
        <div>
          <div className="font-medium text-gray-900">{patient.patientName}</div>
          <div className="text-sm text-gray-500">ID: {patient.patientId}</div>
        </div>
      )
    },
    {
      header: 'Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Waiting Since',
      accessor: 'waitingSince'
    },
    {
      header: 'Priority',
      accessor: (patient: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          patient.priority === 'urgent'
            ? 'bg-danger-100 text-danger-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: (patient: any) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Assign room:', patient.id)}
          >
            Assign Room
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Update priority:', patient.id)}
          >
            Update Priority
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reception Dashboard</h1>
          <p className="text-gray-600">Manage appointments and patient check-ins</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link to="/patients/add">
            <Button
              variant="outline"
              leftIcon={<UserPlus size={16} />}
            >
              New Patient
            </Button>
          </Link>
          <Link to="/appointments/add">
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
            >
              New Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <CalendarClock className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
            <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <Clock className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Waiting Patients</p>
            <p className="text-2xl font-bold text-gray-900">{waitingList.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <CheckCircle className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Checked In</p>
            <p className="text-2xl font-bold text-gray-900">
              {appointments.filter(a => a.status === 'checked-in').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-danger-50 mr-4">
            <AlertTriangle className="h-6 w-6 text-danger-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
        </Card>
      </div>

      {/* Room Status */}
      <Card title="Room Status">
        <Table
          columns={roomColumns}
          data={rooms}
          emptyState={
            <div className="text-center py-8">
              <Bed size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Rooms</h3>
              <p className="text-gray-500">No rooms are currently available</p>
            </div>
          }
        />
      </Card>

      {/* Appointments */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                className={`py-2 px-4 text-sm font-medium rounded-lg ${
                  activeTab === 'today'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('today')}
              >
                Today's Appointments
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium rounded-lg ${
                  activeTab === 'upcoming'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <Table
          columns={appointmentColumns}
          data={appointments}
          emptyState={
            <div className="text-center py-8">
              <CalendarClock size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Appointments</h3>
              <p className="text-gray-500">No appointments scheduled for today</p>
            </div>
          }
        />
      </Card>

      {/* Waiting List */}
      <Card title="Waiting List">
        <Table
          columns={waitingListColumns}
          data={waitingList}
          emptyState={
            <div className="text-center py-8">
              <Users size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Waiting Patients</h3>
              <p className="text-gray-500">No patients are currently waiting</p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ReceptionistDashboard;