// Existing types...

export type NotificationType = 
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type NotificationCategory =
  | 'system'
  | 'appointment'
  | 'prescription'
  | 'lab_result'
  | 'patient'
  | 'billing'
  | 'inventory'
  | 'staff';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  userId: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  userId: string;
  email: boolean;
  browser: boolean;
  categories: {
    [key in NotificationCategory]: {
      enabled: boolean;
      email: boolean;
      browser: boolean;
    };
  };
}