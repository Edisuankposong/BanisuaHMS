// Existing types...

export type AuditAction = 
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'view'
  | 'download'
  | 'upload'
  | 'print'
  | 'export';

export type AuditResource =
  | 'patient'
  | 'appointment'
  | 'prescription'
  | 'document'
  | 'lab_test'
  | 'bill'
  | 'medicine'
  | 'ward'
  | 'staff_schedule'
  | 'system';

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: Role;
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  details?: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure';
  errorMessage?: string;
}