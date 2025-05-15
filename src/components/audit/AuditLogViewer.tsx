import { useState, useEffect } from 'react';
import { Download, Filter, Search, Activity } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Table from '../ui/Table';
import { auditService } from '../../services/auditService';
import { AuditLog, AuditAction, AuditResource } from '../../types/audit';

interface AuditLogViewerProps {
  userId?: string;
  resource?: AuditResource;
  showFilters?: boolean;
}

const AuditLogViewer = ({ userId, resource, showFilters = true }: AuditLogViewerProps) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    action: '' as AuditAction | '',
    resource: resource || '' as AuditResource | '',
    status: '' as 'success' | 'failure' | ''
  });

  useEffect(() => {
    loadLogs();
  }, [userId, resource]);

  const loadLogs = async () => {
    try {
      setIsLoading(true);
      const data = await auditService.getActivityLogs({
        userId,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        action: filters.action || undefined,
        resource: filters.resource || undefined,
        status: filters.status || undefined
      });
      setLogs(data);
    } catch (error) {
      console.error('Error loading audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const blob = await auditService.exportLogs(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_logs.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting logs:', error);
    }
  };

  const columns = [
    {
      header: 'Timestamp',
      accessor: (log: AuditLog) => (
        <div>
          <div className="font-medium text-gray-900">
            {new Date(log.createdAt).toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(log.createdAt).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      header: 'User',
      accessor: (log: AuditLog) => (
        <div>
          <div className="font-medium text-gray-900">{log.userRole}</div>
          <div className="text-sm text-gray-500">ID: {log.userId}</div>
        </div>
      )
    },
    {
      header: 'Action',
      accessor: (log: AuditLog) => (
        <span className="capitalize">{log.action}</span>
      )
    },
    {
      header: 'Resource',
      accessor: (log: AuditLog) => (
        <div>
          <span className="capitalize">{log.resource}</span>
          {log.resourceId && (
            <div className="text-sm text-gray-500">ID: {log.resourceId}</div>
          )}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (log: AuditLog) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          log.status === 'success' 
            ? 'bg-success-100 text-success-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Details',
      accessor: (log: AuditLog) => (
        <div>
          <div className="text-sm text-gray-900">{log.details}</div>
          {log.errorMessage && (
            <div className="text-sm text-danger-600">{log.errorMessage}</div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {showFilters && (
        <Card>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <select
                value={filters.action}
                onChange={(e) => setFilters({ ...filters, action: e.target.value as AuditAction })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All Actions</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="create">Create</option>
                <option value="read">Read</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  leftIcon={<Filter size={16} />}
                  onClick={loadLogs}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<Download size={16} />}
                  onClick={() => handleExport('csv')}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Table
        columns={columns}
        data={logs}
        isLoading={isLoading}
        emptyState={
          <div className="text-center py-8">
            <Activity size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Audit Logs</h3>
            <p className="text-gray-500">No audit logs found matching your criteria</p>
          </div>
        }
      />
    </div>
  );
};

export default AuditLogViewer;