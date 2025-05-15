import { useState } from 'react';
import { 
  FileText, Search, Filter, Download, AlertTriangle, 
  CheckCircle, Clock, User, Activity 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { AuditLog, AuditAction, AuditResource } from '../../types';

const AuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<AuditAction | 'all'>('all');
  const [selectedResource, setSelectedResource] = useState<AuditResource | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'success' | 'failure'>('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  // Mock audit logs
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-03-15T10:30:00',
      userId: '1',
      userName: 'Dr. Sarah Johnson',
      userRole: 'doctor',
      action: 'view',
      resource: 'patient',
      resourceId: 'PAT001',
      details: 'Viewed patient medical history',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0',
      status: 'success'
    },
    {
      id: '2',
      timestamp: '2024-03-15T10:15:00',
      userId: '2',
      userName: 'Admin User',
      userRole: 'admin',
      action: 'create',
      resource: 'document',
      resourceId: 'DOC001',
      details: 'Uploaded new hospital policy document',
      ipAddress: '192.168.1.101',
      userAgent: 'Chrome/98.0',
      status: 'success'
    },
    {
      id: '3',
      timestamp: '2024-03-15T10:00:00',
      userId: '3',
      userName: 'John Smith',
      userRole: 'nurse',
      action: 'update',
      resource: 'patient',
      resourceId: 'PAT002',
      details: 'Failed to update patient vitals - Invalid data',
      ipAddress: '192.168.1.102',
      userAgent: 'Firefox/97.0',
      status: 'failure',
      errorMessage: 'Invalid vital signs data format'
    }
  ];

  const columns = [
    {
      header: 'Timestamp',
      accessor: (log: AuditLog) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-2" />
          <div>
            <div className="font-medium text-gray-900">
              {new Date(log.timestamp).toLocaleTimeString()}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(log.timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'User',
      accessor: (log: AuditLog) => (
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-400 mr-2" />
          <div>
            <div className="font-medium text-gray-900">{log.userName}</div>
            <div className="text-xs text-gray-500 capitalize">{log.userRole}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: (log: AuditLog) => (
        <div className="flex items-center">
          <Activity className="h-4 w-4 text-gray-400 mr-2" />
          <span className="capitalize">{log.action}</span>
        </div>
      ),
    },
    {
      header: 'Resource',
      accessor: (log: AuditLog) => (
        <div>
          <span className="capitalize">{log.resource.replace('_', ' ')}</span>
          {log.resourceId && (
            <span className="text-xs text-gray-500 block">ID: {log.resourceId}</span>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (log: AuditLog) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          log.status === 'success'
            ? 'bg-success-100 text-success-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {log.status === 'success' ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <AlertTriangle className="h-3 w-3 mr-1" />
          )}
          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Details',
      accessor: (log: AuditLog) => (
        <div className="max-w-md truncate">
          {log.details}
          {log.errorMessage && (
            <span className="text-danger-600 block text-sm">
              Error: {log.errorMessage}
            </span>
          )}
        </div>
      ),
    },
  ];

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      // Mock export functionality
      console.log(`Exporting audit logs as ${format}`);
    } catch (error) {
      console.error('Error exporting audit logs:', error);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">Track and monitor system activities</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            leftIcon={<FileText size={16} />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <Activity className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Activities</p>
            <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <CheckCircle className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Successful</p>
            <p className="text-2xl font-bold text-gray-900">
              {auditLogs.filter(log => log.status === 'success').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-danger-50 mr-4">
            <AlertTriangle className="h-6 w-6 text-danger-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Failed</p>
            <p className="text-2xl font-bold text-gray-900">
              {auditLogs.filter(log => log.status === 'failure').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <User className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(auditLogs.map(log => log.userId)).size}
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex space-x-2">
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>

            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value as AuditAction | 'all')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Actions</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="view">View</option>
            </select>

            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value as AuditResource | 'all')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Resources</option>
              <option value="patient">Patient</option>
              <option value="appointment">Appointment</option>
              <option value="prescription">Prescription</option>
              <option value="document">Document</option>
              <option value="lab_test">Lab Test</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Audit Logs Table */}
      <Table
        columns={columns}
        data={auditLogs}
        emptyState={
          <div className="text-center py-8">
            <Activity size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Audit Logs</h3>
            <p className="text-gray-500">No audit logs match your search criteria</p>
          </div>
        }
      />
    </div>
  );
};

export default AuditLogs;