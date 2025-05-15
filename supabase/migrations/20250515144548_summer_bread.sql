/*
  # Update System Dates

  1. Changes
    - Updates all dates to be between current date and end of 2025
    - Ensures chronological consistency between related dates
    - Maintains realistic time gaps between events
    
  2. Tables Updated
    - patients
    - appointments
    - prescriptions
    - lab_results
    - inventory_items
    - purchase_orders
    - messages
    - notifications
    - audit_logs
*/

-- Function to generate random date between now and end of 2025
CREATE OR REPLACE FUNCTION random_future_date(
  start_date date DEFAULT CURRENT_DATE,
  end_date date DEFAULT '2025-12-31'
) 
RETURNS timestamp AS $$
BEGIN
  RETURN (
    start_date + 
    (random() * (end_date - start_date))::int * 
    INTERVAL '1 day' +
    (random() * 86400)::int * 
    INTERVAL '1 second'
  )::timestamp;
END;
$$ LANGUAGE plpgsql;

-- Update patient registration dates
UPDATE patients
SET 
  created_at = random_future_date('2024-01-01'),
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '30 days'),
    created_at
  );

-- Update appointments
UPDATE patient_appointments
SET 
  appointment_date = random_future_date(),
  created_at = appointment_date - INTERVAL '7 days',
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '2 days'),
    created_at
  );

-- Update prescriptions
UPDATE patient_prescriptions
SET 
  prescription_date = random_future_date(),
  created_at = prescription_date,
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '1 day'),
    created_at
  );

-- Update lab results
UPDATE patient_lab_results
SET 
  test_date = random_future_date(),
  created_at = test_date,
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '3 days'),
    created_at
  );

-- Update inventory items
UPDATE inventory_items
SET 
  created_at = random_future_date('2024-01-01'),
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '30 days'),
    created_at
  ),
  expiry_date = GREATEST(
    CURRENT_DATE + (random() * 365)::int,
    CURRENT_DATE + 30
  );

-- Update inventory transactions
UPDATE inventory_transactions
SET created_at = random_future_date('2024-01-01');

-- Update purchase orders
UPDATE purchase_orders
SET 
  created_at = random_future_date('2024-01-01'),
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '5 days'),
    created_at
  ),
  expected_delivery = GREATEST(
    created_at + (random() * INTERVAL '14 days'),
    created_at + INTERVAL '1 day'
  );

-- Update messages
UPDATE messages
SET 
  created_at = random_future_date('2024-01-01'),
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '1 hour'),
    created_at
  ),
  read_at = CASE 
    WHEN random() > 0.5 
    THEN created_at + (random() * INTERVAL '1 day')
    ELSE NULL 
  END;

-- Update notifications
UPDATE notifications
SET 
  created_at = random_future_date('2024-01-01'),
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '1 hour'),
    created_at
  ),
  scheduled_for = GREATEST(
    created_at + (random() * INTERVAL '7 days'),
    created_at + INTERVAL '1 hour'
  ),
  sent_at = CASE 
    WHEN status = 'sent' 
    THEN scheduled_for + (random() * INTERVAL '5 minutes')
    ELSE NULL 
  END;

-- Update audit logs
UPDATE audit_logs
SET created_at = random_future_date('2024-01-01');

-- Drop the helper function
DROP FUNCTION random_future_date;