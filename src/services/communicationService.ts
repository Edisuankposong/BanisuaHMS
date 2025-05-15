import { supabase } from '../lib/supabase';
import { 
  Message, 
  Notification, 
  NotificationTemplate,
  NotificationType,
  NotificationChannel 
} from '../types/communication';
import { io, Socket } from 'socket.io-client';

class CommunicationService {
  private socket: Socket | null = null;
  private messageHandlers: Map<string, (message: Message) => void> = new Map();

  constructor() {
    // Initialize WebSocket connection
    this.socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
      auth: {
        token: supabase.auth.session()?.access_token
      }
    });

    this.socket.on('message', (message: Message) => {
      const handler = this.messageHandlers.get(message.receiverId);
      if (handler) {
        handler(message);
      }
    });
  }

  // Messages
  async sendMessage(receiverId: string, content: string, attachmentUrl?: string): Promise<Message> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          receiver_id: receiverId,
          content,
          attachment_url: attachmentUrl
        })
        .select()
        .single();

      if (error) throw error;

      // Emit message via WebSocket
      this.socket?.emit('message', data);

      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getMessages(userId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async markMessageAsRead(messageId: string): Promise<Message> {
    try {
      const { data, error } = await supabase
        .rpc('mark_message_read', { message_id: messageId });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }

  onMessage(userId: string, handler: (message: Message) => void) {
    this.messageHandlers.set(userId, handler);
  }

  // Notifications
  async scheduleNotification(
    userId: string,
    type: NotificationType,
    title: string,
    content: string,
    scheduledFor: Date,
    channels: NotificationChannel[] = ['email']
  ): Promise<Notification> {
    try {
      const { data, error } = await supabase
        .rpc('schedule_notification', {
          p_user_id: userId,
          p_type: type,
          p_title: title,
          p_content: content,
          p_scheduled_for: scheduledFor.toISOString(),
          p_channel: channels
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      throw error;
    }
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  // Templates
  async getNotificationTemplates(): Promise<NotificationTemplate[]> {
    try {
      const { data, error } = await supabase
        .from('notification_templates')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching notification templates:', error);
      throw error;
    }
  }

  async createNotificationTemplate(template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<NotificationTemplate> {
    try {
      const { data, error } = await supabase
        .from('notification_templates')
        .insert(template)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating notification template:', error);
      throw error;
    }
  }

  // Cleanup
  disconnect() {
    this.socket?.disconnect();
    this.messageHandlers.clear();
  }
}

export const communicationService = new CommunicationService();