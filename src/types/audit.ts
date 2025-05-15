export type AuditAction = 
  | 'login'
  | 'logout'
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'export'
  | 'import'
  | 'print';

export type AuditResource =
  | 'patient'
  | 'appointment'
  | 'prescription'
  | 'lab_test'
  | 'inventory'
  | 'billing'
  | 'user'
  | 'system';

export interface AuditLog {
  id: string;
  userId: string;
  userRole: string;
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  details?: string;
  status: 'success' | 'failure';
  errorMessage?: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}