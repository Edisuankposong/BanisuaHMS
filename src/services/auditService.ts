import { supabase } from '../lib/supabase';
import { AuditLog, AuditAction, AuditResource } from '../types';

export const auditService = {
  // Log an activity
  logActivity: async (
    action: AuditAction,
    resource: AuditResource,
    resourceId?: string,
    details?: string,
    status: 'success' | 'failure' = 'success',
    errorMessage?: string
  ): Promise<AuditLog> => {
    try {
      const { data, error } = await supabase.rpc('log_activity', {
        p_action: action,
        p_resource: resource,
        p_resource_id: resourceId,
        p_details: details,
        p_status: status,
        p_error_message: errorMessage,
        p_ip_address: window.clientInformation?.platform,
        p_user_agent: window.navigator.userAgent
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error logging activity:', error);
      throw error;
    }
  },

  // Get activity logs with filtering
  getActivityLogs: async (filters?: {
    userId?: string;
    startDate?: string;
    endDate?: string;
    action?: AuditAction;
    resource?: AuditResource;
    status?: 'success' | 'failure';
  }): Promise<AuditLog[]> => {
    try {
      const { data, error } = await supabase.rpc('get_user_activity', {
        p_user_id: filters?.userId,
        p_start_date: filters?.startDate,
        p_end_date: filters?.endDate,
        p_action: filters?.action,
        p_resource: filters?.resource,
        p_status: filters?.status
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  },

  // Export audit logs
  exportLogs: async (format: 'csv' | 'pdf' = 'csv'): Promise<Blob> => {
    try {
      const { data: logs } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (format === 'csv') {
        const headers = [
          'Date',
          'User',
          'Role',
          'Action',
          'Resource',
          'Details',
          'Status',
          'IP Address'
        ].join(',');

        const rows = logs?.map(log => [
          new Date(log.created_at).toISOString(),
          log.user_id,
          log.user_role,
          log.action,
          log.resource,
          `"${log.details || ''}"`,
          log.status,
          log.ip_address
        ].join(','));

        const csv = [headers, ...(rows || [])].join('\n');
        return new Blob([csv], { type: 'text/csv' });
      } else {
        // TODO: Implement PDF export
        throw new Error('PDF export not implemented');
      }
    } catch (error) {
      console.error('Error exporting logs:', error);
      throw error;
    }
  }
};