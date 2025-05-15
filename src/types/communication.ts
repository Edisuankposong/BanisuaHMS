export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachmentUrl?: string;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  status: NotificationStatus;
  scheduledFor?: string;
  sentAt?: string;
  channel: NotificationChannel[];
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type NotificationType = 
  | 'appointment_reminder'
  | 'test_results'
  | 'prescription_ready'
  | 'billing_update'
  | 'general';

export type NotificationStatus = 
  | 'pending'
  | 'sent'
  | 'failed'
  | 'cancelled';

export type NotificationChannel = 
  | 'email'
  | 'sms'
  | 'push';

export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  subject: string;
  content: string;
  variables: string[];
  active: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  appointments: boolean;
  testResults: boolean;
  prescriptions: boolean;
  billing: boolean;
}