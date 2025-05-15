// Existing types...

export type AuditAction = 
  | 'create'
  | 'update'
  | 'delete'
  | 'view'
  | 'login'
  | 'logout'
  | 'download'
  | 'upload'
  | 'print'
  | 'export'
  | 'import';

export type AuditResource =
  | 'patient'
  | 'appointment'
  | 'prescription'
  | 'document'
  | 'lab_test'
  | 'medicine'
  | 'bill'
  | 'user'
  | 'system';

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: AuditAction;
  resource: AuditResource;
  resourceId?: string;
  details?: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure';
  errorMessage?: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
  accessLevel: 'public' | 'private' | 'restricted';
  allowedRoles?: string[];
  tags?: string[];
}

export interface StaffSchedule {
  id: string;
  userId: string;
  shiftStart: string;
  shiftEnd: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'regular' | 'overtime' | 'on-call';
}

export interface TimeOffRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'sick' | 'personal' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}