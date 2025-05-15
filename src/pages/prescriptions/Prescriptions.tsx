import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilePlus, Search, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';

const Prescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const prescriptions = [
    {
      id: '1',
      date: '2024-03-15',
      patientName: 'John Davis',
      patientId: 'PAT001',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension',
      status: 'active'
    },
    {
      id: '2',
      date: '2024-03-14',
      patientName: 'Emma Wilson',
      patientId: 'PAT002',
      doctor: 'Dr. Michael Brown',
      diagnosis: 'Upper Respiratory Infection',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-03-13',
      patientName: 'Robert Miller',
      patientId: 'PAT003',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Diabetes Type 2',
      status: 'active'
    }
  ];

  const columns = [
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Patient',
      accessor: (prescription: any) => (
        <div>
          <div className="font-medium text-gray-900">{prescription.patientName}</div>
          <div className="text-sm text-gray-500">ID: {prescription.patientId}</div>
        </div>
      ),
    },
    {
      header: 'Doctor',
      accessor: 'doctor',
    },
    {
      header: 'Diagnosis',
      accessor: 'diagnosis',
    },
    {
      header: 'Status',
      accessor: (prescription: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          prescription.status === 'active' 
            ? 'bg-success-100 text-success-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (prescription: any) => (
        <Link
          to={`/prescriptions/${prescription.id}`}
          className="text-primary-600 hover:text-primary-900"
        >
          View Details
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600">Manage and view patient prescriptions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/prescriptions/add">
            <Button variant="primary" leftIcon={<FilePlus size={16} />}>
              New Prescription
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search prescriptions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <Button
                variant="outline"
                leftIcon={<Filter size={16} />}
              >
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Table
        columns={columns}
        data={prescriptions}
        emptyState={
          <div className="text-center py-8">
            <FilePlus size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Prescriptions</h3>
            <p className="text-gray-500 mb-4">No prescriptions found matching your criteria</p>
            <Link to="/prescriptions/add">
              <Button variant="primary" size="sm" leftIcon={<FilePlus size={16} />}>
                Create Prescription
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Prescriptions;