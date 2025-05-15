import { Notification, NotificationType, NotificationCategory } from '../types';
import { useNotificationStore } from '../stores/notificationStore';

export const notificationService = {
  // Send a notification
  send: async (
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    category: NotificationCategory,
    actionUrl?: string,
    metadata?: Record<string, any>
  ): Promise<void> => {
    try {
      // Create notification object
      const notification: Omit<Notification, 'id' | 'timestamp' | 'read'> = {
        userId,
        title,
        message,
        type,
        category,
        actionUrl,
        metadata
      };

      // Add to store
      useNotificationStore.getState().addNotification(notification);

      // Send email if enabled
      if (useNotificationStore.getState().preferences.email) {
        await sendEmailNotification(notification);
      }

      // Send browser notification if enabled
      if (useNotificationStore.getState().preferences.browser) {
        await sendBrowserNotification(notification);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  },

  // Get user notifications
  getUserNotifications: async (userId: string): Promise<Notification[]> => {
    try {
      // In a real app, this would fetch from an API
      return useNotificationStore.getState().notifications.filter(n => n.userId === userId);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Update notification preferences
  updatePreferences: async (
    userId: string,
    preferences: Record<string, boolean>
  ): Promise<void> => {
    try {
      useNotificationStore.getState().updatePreferences(preferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  }
};

// Helper function to send email notifications
const sendEmailNotification = async (
  notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
): Promise<void> => {
  // In a real app, this would call your email service
  console.log('Sending email notification:', notification);
};

// Helper function to send browser notifications
const sendBrowserNotification = async (
  notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
): Promise<void> => {
  try {
    if (!('Notification' in window)) {
      console.log('Browser does not support notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.svg'
      });
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.svg'
        });
      }
    }
  } catch (error) {
    console.error('Error sending browser notification:', error);
  }
};