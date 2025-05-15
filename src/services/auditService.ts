import { AuditLog, AuditAction, AuditResource } from '../types';

// Mock audit logs data
const auditLogs: AuditLog[] = [];

export const auditService = {
  // Log an action
  logAction: async (
    userId: string,
    userName: string,
    userRole: string,
    action: AuditAction,
    resource: AuditResource,
    resourceId?: string,
    details?: string,
    status: 'success' | 'failure' = 'success',
    errorMessage?: string
  ): Promise<AuditLog> => {
    try {
      const log: AuditLog = {
        id: `LOG${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        userId,
        userName,
        userRole,
        action,
        resource,
        resourceId,
        details,
        ipAddress: '127.0.0.1', // In a real app, this would be the actual IP
        userAgent: navigator.userAgent,
        status,
        errorMessage
      };

      auditLogs.unshift(log);
      return log;
    } catch (error) {
      console.error('Error logging action:', error);
      throw error;
    }
  },

  // Get audit logs with filtering and pagination
  getAuditLogs: async (filters?: {
    startDate?: string;
    endDate?: string;
    userId?: string;
    action?: AuditAction;
    resource?: AuditResource;
    status?: 'success' | 'failure';
    page?: number;
    limit?: number;
  }): Promise<{ logs: AuditLog[]; total: number }> => {
    try {
      let filteredLogs = [...auditLogs];

      if (filters) {
        if (filters.startDate) {
          filteredLogs = filteredLogs.filter(log => 
            new Date(log.timestamp) >= new Date(filters.startDate!)
          );
        }

        if (filters.endDate) {
          filteredLogs = filteredLogs.filter(log => 
            new Date(log.timestamp) <= new Date(filters.endDate!)
          );
        }

        if (filters.userId) {
          filteredLogs = filteredLogs.filter(log => 
            log.userId === filters.userId
          );
        }

        if (filters.action) {
          filteredLogs = filteredLogs.filter(log => 
            log.action === filters.action
          );
        }

        if (filters.resource) {
          filteredLogs = filteredLogs.filter(log => 
            log.resource === filters.resource
          );
        }

        if (filters.status) {
          filteredLogs = filteredLogs.filter(log => 
            log.status === filters.status
          );
        }

        // Pagination
        if (filters.page !== undefined && filters.limit) {
          const start = filters.page * filters.limit;
          filteredLogs = filteredLogs.slice(start, start + filters.limit);
        }
      }

      return {
        logs: filteredLogs,
        total: auditLogs.length
      };
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      throw error;
    }
  },

  // Export audit logs
  exportAuditLogs: async (format: 'csv' | 'pdf' = 'csv'): Promise<string> => {
    try {
      if (format === 'csv') {
        const headers = [
          'Timestamp',
          'User',
          'Role',
          'Action',
          'Resource',
          'Resource ID',
          'Details',
          'Status'
        ].join(',');

        const rows = auditLogs.map(log => [
          log.timestamp,
          log.userName,
          log.userRole,
          log.action,
          log.resource,
          log.resourceId || '',
          log.details || '',
          log.status
        ].join(','));

        return [headers, ...rows].join('\n');
      } else {
        // PDF export would be implemented here
        throw new Error('PDF export not implemented');
      }
    } catch (error) {
      console.error('Error exporting audit logs:', error);
      throw error;
    }
  }
};