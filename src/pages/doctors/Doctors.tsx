import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Stethoscope, Calendar, Clock, User } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock doctors data
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      department: 'Cardiology',
      experience: 12,
      status: 'active',
      appointments: 24,
      rating: 4.8,
      availability: 'Available',
      nextAvailable: '2024-03-16 10:00 AM'
    },
    {
      id: '2',
      name: 'Dr. Michael Brown',
      specialization: 'Neurologist',
      department: 'Neurology',
      experience: 15,
      status: 'active',
      appointments: 18,
      rating: 4.9,
      availability: 'In Surgery',
      nextAvailable: '2024-03-16 02:00 PM'
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrician',
      department: 'Pediatrics',
      experience: 8,
      status: 'on-leave',
      appointments: 0,
      rating: 4.7,
      availability: 'On Leave',
      nextAvailable: '2024-03-20 09:00 AM'
    }
  ];

  const departments = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Oncology',
    'Dermatology'
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'on-leave':
        return 'bg-warning-100 text-warning-800';
      case 'unavailable':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Doctor',
      accessor: (doctor: any) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={`https://images.pexels.com/photos/${doctor.id === '1' ? '5452201' : doctor.id === '2' ? '5407206' : '5407213'}/pexels-photo-${doctor.id === '1' ? '5452201' : doctor.id === '2' ? '5407206' : '5407213'}.jpeg?auto=compress&cs=tinysrgb&w=150`}
              alt={doctor.name}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{doctor.name}</div>
            <div className="text-sm text-gray-500">{doctor.specialization}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      accessor: 'department'
    },
    {
      header: 'Experience',
      accessor: (doctor: any) => `${doctor.experience} years`
    },
    {
      header: 'Status',
      accessor: (doctor: any) => (
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
            {doctor.availability}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            Next available: {doctor.nextAvailable}
          </div>
        </div>
      )
    },
    {
      header: 'Performance',
      accessor: (doctor: any) => (
        <div>
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{doctor.rating}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {doctor.appointments} appointments this month
          </div>
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (doctor: any) => (
        <div className="flex space-x-2">
          <Link to={`/doctors/${doctor.id}`}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<User size={14} />}
            >
              View Profile
            </Button>
          </Link>
          <Link to={`/appointments/add?doctor=${doctor.id}`}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Calendar size={14} />}
            >
              Schedule
            </Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-600">Manage and view doctor information</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/doctors/add">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Add Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <Stethoscope className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Doctors</p>
            <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <User className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Available</p>
            <p className="text-2xl font-bold text-gray-900">
              {doctors.filter(d => d.status === 'active').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <Clock className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">On Leave</p>
            <p className="text-2xl font-bold text-gray-900">
              {doctors.filter(d => d.status === 'on-leave').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-secondary-50 mr-4">
            <Calendar className="h-6 w-6 text-secondary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Appointments Today</p>
            <p className="text-2xl font-bold text-gray-900">42</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search doctors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept.toLowerCase()}>{dept}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Status</option>
              <option value="active">Available</option>
              <option value="on-leave">On Leave</option>
              <option value="unavailable">Unavailable</option>
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

      {/* Doctors Table */}
      <Table
        columns={columns}
        data={doctors}
        emptyState={
          <div className="text-center py-8">
            <Stethoscope size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Doctors Found</h3>
            <p className="text-gray-500 mb-4">No doctors match your search criteria</p>
            <Link to="/doctors/add">
              <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                Add Doctor
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Doctors;