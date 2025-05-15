/*
  # Security and Audit Logging

  1. New Tables
    - `audit_logs` - Tracks all system activities
      - `id` (uuid, primary key)
      - `user_id` (uuid) - User who performed the action
      - `action` (text) - Type of action performed
      - `resource` (text) - Resource being accessed/modified
      - `details` (text) - Additional details about the action
      - `ip_address` (text) - IP address of the user
      - `user_agent` (text) - Browser/client information
      - `created_at` (timestamp) - When the action occurred

  2. Security
    - Enable RLS on audit_logs table
    - Only allow admins to view all logs
    - Users can only view their own logs
    - No update/delete operations allowed

  3. Functions
    - `log_activity` - Helper function to create audit log entries
    - `get_user_activity` - Get activity logs for a user
*/

-- Audit Logs Table
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  user_role text NOT NULL,
  action text NOT NULL CHECK (
    action = ANY(ARRAY[
      'login',
      'logout',
      'create',
      'read',
      'update',
      'delete',
      'export',
      'import',
      'print'
    ])
  ),
  resource text NOT NULL CHECK (
    resource = ANY(ARRAY[
      'patient',
      'appointment',
      'prescription',
      'lab_test',
      'inventory',
      'billing',
      'user',
      'system'
    ])
  ),
  resource_id uuid,
  details text,
  status text NOT NULL CHECK (
    status = ANY(ARRAY['success', 'failure'])
  ),
  error_message text,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Indexes for better query performance
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_status ON audit_logs(status);

-- Enable RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Admins can view all logs
CREATE POLICY "Admins can view all logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Users can view their own logs
CREATE POLICY "Users can view their own logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity(
  p_action text,
  p_resource text,
  p_resource_id uuid DEFAULT NULL,
  p_details text DEFAULT NULL,
  p_status text DEFAULT 'success',
  p_error_message text DEFAULT NULL,
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS audit_logs AS $$
DECLARE
  v_user_role text;
  new_log audit_logs;
BEGIN
  -- Get user role
  SELECT role INTO v_user_role
  FROM users
  WHERE id = auth.uid();

  -- Create audit log
  INSERT INTO audit_logs (
    user_id,
    user_role,
    action,
    resource,
    resource_id,
    details,
    status,
    error_message,
    ip_address,
    user_agent
  )
  VALUES (
    auth.uid(),
    v_user_role,
    p_action,
    p_resource,
    p_resource_id,
    p_details,
    p_status,
    p_error_message,
    p_ip_address,
    p_user_agent
  )
  RETURNING *
  INTO new_log;

  RETURN new_log;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user activity
CREATE OR REPLACE FUNCTION get_user_activity(
  p_user_id uuid DEFAULT NULL,
  p_start_date timestamptz DEFAULT NULL,
  p_end_date timestamptz DEFAULT NULL,
  p_action text DEFAULT NULL,
  p_resource text DEFAULT NULL,
  p_status text DEFAULT NULL
)
RETURNS SETOF audit_logs AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM audit_logs
  WHERE (p_user_id IS NULL OR user_id = p_user_id)
    AND (p_start_date IS NULL OR created_at >= p_start_date)
    AND (p_end_date IS NULL OR created_at <= p_end_date)
    AND (p_action IS NULL OR action = p_action)
    AND (p_resource IS NULL OR resource = p_resource)
    AND (p_status IS NULL OR status = p_status)
  ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;