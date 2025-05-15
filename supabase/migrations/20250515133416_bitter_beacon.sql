/*
  # Communication System Schema

  1. New Tables
    - `users`: Core user information
    - `messages`: Internal staff communication
    - `notifications`: Patient and staff notifications
    - `notification_templates`: Reusable notification templates

  2. Security
    - Enable RLS on all tables
    - Add policies for message access control
    - Add policies for notification management
    
  3. Functions
    - Message management functions
    - Notification scheduling function
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (
    role = ANY(ARRAY['admin', 'doctor', 'nurse', 'pharmacist', 'lab_technician', 'receptionist', 'patient'])
  ),
  profile_image text,
  status text NOT NULL DEFAULT 'active' CHECK (
    status = ANY(ARRAY['active', 'inactive', 'suspended'])
  ),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Messages table for internal staff communication
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES users(id),
  receiver_id uuid NOT NULL REFERENCES users(id),
  content text NOT NULL,
  attachment_url text,
  read_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow users to read messages where they are sender or receiver
CREATE POLICY "Users can read their own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

-- Allow users to send messages
CREATE POLICY "Users can send messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Allow users to update read status of received messages
CREATE POLICY "Users can mark messages as read"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = receiver_id);

-- Notifications table for patient communications
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  type text NOT NULL CHECK (
    type = ANY(ARRAY[
      'appointment_reminder',
      'test_results',
      'prescription_ready',
      'billing_update',
      'general'
    ])
  ),
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (
    status = ANY(ARRAY['pending', 'sent', 'failed', 'cancelled'])
  ),
  scheduled_for timestamptz,
  sent_at timestamptz,
  channel text[] NOT NULL DEFAULT '{email}' CHECK (
    channel <@ ARRAY['email', 'sms', 'push']
  ),
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_scheduled ON notifications(scheduled_for) 
  WHERE status = 'pending';

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow staff to create notifications
CREATE POLICY "Staff can create notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'doctor', 'nurse', 'receptionist')
    )
  );

-- Notification templates
CREATE TABLE notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  type text NOT NULL CHECK (
    type = ANY(ARRAY[
      'appointment_reminder',
      'test_results',
      'prescription_ready',
      'billing_update',
      'general'
    ])
  ),
  subject text NOT NULL,
  content text NOT NULL,
  variables jsonb NOT NULL DEFAULT '[]',
  active boolean DEFAULT true,
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;

-- Only admins can manage templates
CREATE POLICY "Admins can manage templates"
  ON notification_templates
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Allow all staff to view templates
CREATE POLICY "Staff can view templates"
  ON notification_templates
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician')
    )
  );

-- Function to mark message as read
CREATE OR REPLACE FUNCTION mark_message_read(message_id uuid)
RETURNS messages AS $$
DECLARE
  updated_message messages;
BEGIN
  UPDATE messages
  SET read_at = now()
  WHERE id = message_id
    AND receiver_id = auth.uid()
    AND read_at IS NULL
  RETURNING *
  INTO updated_message;
  
  RETURN updated_message;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get unread message count
CREATE OR REPLACE FUNCTION get_unread_message_count()
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM messages
    WHERE receiver_id = auth.uid()
      AND read_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to schedule notification
CREATE OR REPLACE FUNCTION schedule_notification(
  p_user_id uuid,
  p_type text,
  p_title text,
  p_content text,
  p_scheduled_for timestamptz,
  p_channel text[] DEFAULT '{email}'
)
RETURNS notifications AS $$
DECLARE
  new_notification notifications;
BEGIN
  INSERT INTO notifications (
    user_id,
    type,
    title,
    content,
    scheduled_for,
    channel
  )
  VALUES (
    p_user_id,
    p_type,
    p_title,
    p_content,
    p_scheduled_for,
    p_channel
  )
  RETURNING *
  INTO new_notification;
  
  RETURN new_notification;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;