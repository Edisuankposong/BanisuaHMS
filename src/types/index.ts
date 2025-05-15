// Add these types to the existing types/index.ts file

export interface PatientDashboardData {
  appointments: {
    upcoming: Appointment[];
    past: Appointment[];
  };
  prescriptions: {
    active: Prescription[];
    past: Prescription[];
  };
  labResults: LabTest[];
  bills: Bill[];
  medicalHistory: MedicalHistory[];
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface PatientNotification extends NotificationType {
  category: 'appointment' | 'prescription' | 'lab_result' | 'billing';
}