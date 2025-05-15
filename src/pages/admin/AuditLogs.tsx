// Update mock data in component
const auditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-03-15T10:30:00',
    userId: '1',
    userName: 'Dr. Olayinka Adeyemi',
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
    userName: 'Dr. Babajide Ogunleye',
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
    userName: 'Nurse Chidinma Okoro',
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

export default auditLogs