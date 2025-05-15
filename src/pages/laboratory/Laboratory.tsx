import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FlaskConical, Search, Filter, Plus, AlertTriangle, 
  Clock, CheckCircle, FileText, Download 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

const Laboratory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Mock data for lab tests
  const labTests = [
    {
      id: '1',
      patientName: 'John Davis',
      patientId: 'PAT001',
      testName: 'Complete Blood Count (CBC)',
      type: 'Blood Test',
      requestedBy: 'Dr. Sarah Johnson',
      requestDate: '2024-03-15',
      priority: 'urgent',
      status: 'completed',
      results: 'Normal',
      completedDate: '2024-03-15'
    },
    {
      id: '2',
      patientName: 'Emma Wilson',
      patientId: 'PAT002',
      testName: 'Lipid Panel',
      type: 'Blood Test',
      requestedBy: 'Dr. Michael Brown',
      requestDate: '2024-03-15',
      priority: 'normal',
      status: 'in-progress',
      results: null,
      completedDate: null
    },
    {
      id: '3',
      patientName: 'Robert Miller',
      patientId: 'PAT003',
      testName: 'Chest X-Ray',
      type: 'Radiology',
      requestedBy: 'Dr. Sarah Johnson',
      requestDate: '2024-03-15',
      priority: 'urgent',
      status: 'pending',
      results: null,
      completedDate: null
    }
  ];

  const testTypes = [
    'Blood Test',
    'Urine Analysis',
    'Radiology',
    'Pathology',
    'Microbiology',
    'Immunology'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'in-progress':
        return 'bg-warning-100 text-warning-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-danger-100 text-danger-800';
      case 'high':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      header: 'Patient',
      accessor: (test: any) => (
        <div>
          <div className="font-medium text-gray-900">{test.patientName}</div>
          <div className="text-sm text-gray-500">ID: {test.patientId}</div>
        </div>
      )
    },
    {
      header: 'Test Details',
      accessor: (test: any) => (
        <div>
          <div className="font-medium text-gray-900">{test.testName}</div>
          <div className="text-sm text-gray-500">{test.type}</div>
        </div>
      )
    },
    {
      header: 'Requested By',
      accessor: (test: any) => (
        <div>
          <div className="font-medium text-gray-900">{test.requestedBy}</div>
          <div className="text-sm text-gray-500">{test.requestDate}</div>
        </div>
      )
    },
    {
      header: 'Priority',
      accessor: (test: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(test.priority)}`}>
          {test.priority.charAt(0).toUpperCase() + test.priority.slice(1)}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (test: any) => (
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
            {test.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
            {test.status === 'in-progress' && <Clock className="w-3 h-3 mr-1" />}
            {test.status === 'pending' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
          </span>
          {test.completedDate && (
            <div className="text-xs text-gray-500 mt-1">
              Completed: {test.completedDate}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (test: any) => (
        <div className="flex space-x-2">
          <Link to={`/laboratory/${test.id}`}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FileText size={14} />}
            >
              View
            </Button>
          </Link>
          {test.status === 'completed' && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download size={14} />}
              onClick={() => console.log('Download results:', test.id)}
            >
              Results
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laboratory Tests</h1>
          <p className="text-gray-600">Manage and track laboratory tests</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/laboratory/add">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              New Test Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <FlaskConical className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tests</p>
            <p className="text-2xl font-bold text-gray-900">{labTests.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <Clock className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-gray-900">
              {labTests.filter(test => test.status === 'in-progress').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-danger-50 mr-4">
            <AlertTriangle className="h-6 w-6 text-danger-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Urgent</p>
            <p className="text-2xl font-bold text-gray-900">
              {labTests.filter(test => test.priority === 'urgent').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <CheckCircle className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completed Today</p>
            <p className="text-2xl font-bold text-gray-900">
              {labTests.filter(test => test.status === 'completed' && test.completedDate === '2024-03-15').length}
            </p>
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
                placeholder="Search tests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Types</option>
              {testTypes.map(type => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
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
      </Card>

      {/* Lab Tests Table */}
      <Table
        columns={columns}
        data={labTests}
        emptyState={
          <div className="text-center py-8">
            <FlaskConical size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Tests Found</h3>
            <p className="text-gray-500 mb-4">No laboratory tests match your search criteria</p>
            <Link to="/laboratory/add">
              <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                New Test Request
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Laboratory;