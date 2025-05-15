import { useState } from 'react';
import { Calendar, Clock, Plus, Filter, User } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { StaffSchedule, TimeOffRequest } from '../../types';

const StaffScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data for staff schedules
  const schedules: StaffSchedule[] = [
    {
      id: '1',
      userId: '1',
      shiftStart: '08:00',
      shiftEnd: '16:00',
      date: '2024-03-15',
      status: 'scheduled',
      type: 'regular'
    },
    {
      id: '2',
      userId: '2',
      shiftStart: '16:00',
      shiftEnd: '00:00',
      date: '2024-03-15',
      status: 'scheduled',
      type: 'regular'
    }
  ];

  // Mock data for time-off requests
  const timeOffRequests: TimeOffRequest[] = [
    {
      id: '1',
      userId: '1',
      startDate: '2024-03-20',
      endDate: '2024-03-25',
      type: 'vacation',
      status: 'pending',
      notes: 'Annual family vacation'
    }
  ];

  const scheduleColumns = [
    {
      header: 'Staff Member',
      accessor: (schedule: StaffSchedule) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Shift Time',
      accessor: (schedule: StaffSchedule) => (
        <div>
          <div className="font-medium text-gray-900">
            {schedule.shiftStart} - {schedule.shiftEnd}
          </div>
          <div className="text-sm text-gray-500">{schedule.type}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (schedule: StaffSchedule) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          schedule.status === 'scheduled' 
            ? 'bg-primary-100 text-primary-800'
            : schedule.status === 'completed'
            ? 'bg-success-100 text-success-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (schedule: StaffSchedule) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Edit schedule:', schedule.id)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Cancel schedule:', schedule.id)}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  const timeOffColumns = [
    {
      header: 'Staff Member',
      accessor: (request: TimeOffRequest) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Date Range',
      accessor: (request: TimeOffRequest) => (
        <div>
          <div className="font-medium text-gray-900">
            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500 capitalize">{request.type}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (request: TimeOffRequest) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          request.status === 'pending' 
            ? 'bg-warning-100 text-warning-800'
            : request.status === 'approved'
            ? 'bg-success-100 text-success-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (request: TimeOffRequest) => (
        <div className="flex space-x-2">
          {request.status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log('Approve request:', request.id)}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log('Reject request:', request.id)}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Scheduling</h1>
          <p className="text-gray-600">Manage staff schedules and time-off requests</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Plus size={16} />}
            onClick={() => console.log('Create time-off request')}
          >
            Time-off Request
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => console.log('Create new schedule')}
          >
            New Schedule
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Staff on Duty</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <Clock className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Requests</p>
            <p className="text-2xl font-bold text-gray-900">5</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <Calendar className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Upcoming Shifts</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="rounded-lg border-gray-300"
            />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Departments</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="pediatrics">Pediatrics</option>
            </select>
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
            >
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Staff Schedules */}
      <Card title="Today's Schedule">
        <Table
          columns={scheduleColumns}
          data={schedules}
          emptyState={
            <div className="text-center py-8">
              <Clock size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Schedules</h3>
              <p className="text-gray-500 mb-4">No schedules found for the selected date</p>
            </div>
          }
        />
      </Card>

      {/* Time-off Requests */}
      <Card title="Time-off Requests">
        <Table
          columns={timeOffColumns}
          data={timeOffRequests}
          emptyState={
            <div className="text-center py-8">
              <Calendar size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Requests</h3>
              <p className="text-gray-500 mb-4">No pending time-off requests</p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default StaffScheduling;