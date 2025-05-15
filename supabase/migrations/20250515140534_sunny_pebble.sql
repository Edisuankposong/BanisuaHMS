/*
  # Update System Dates

  Updates all dates in the system to reflect a more recent timeline between December 2024 and May 2025.

  1. Updates
    - Updates patient registration dates
    - Updates appointment dates
    - Updates prescription dates
    - Updates lab test dates
    - Updates inventory dates
    - Updates billing dates
    - Updates audit log dates
    
  2. Changes
    - All dates will be randomly distributed between December 2024 and May 2025
    - Maintains logical order of related dates (e.g., created_at before updated_at)
    - Preserves relative time differences for related records
*/

-- Function to generate random date between Dec 2024 and May 2025
CREATE OR REPLACE FUNCTION random_future_date(
  start_date date DEFAULT '2024-12-01',
  end_date date DEFAULT '2025-05-31'
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
  created_at = random_future_date(),
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

-- Update lab tests
UPDATE patient_lab_results
SET 
  test_date = random_future_date(),
  created_at = test_date,
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '3 days'),
    created_at
  );

-- Update inventory transactions
UPDATE inventory_transactions
SET created_at = random_future_date();

-- Update purchase orders
UPDATE purchase_orders
SET 
  created_at = random_future_date(),
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '5 days'),
    created_at
  ),
  expected_delivery = GREATEST(
    created_at + (random() * INTERVAL '14 days'),
    created_at + INTERVAL '1 day'
  );

-- Update bills
UPDATE bills
SET 
  created_at = random_future_date(),
  updated_at = GREATEST(
    created_at + (random() * INTERVAL '7 days'),
    created_at
  ),
  due_date = created_at + INTERVAL '30 days';

-- Update audit logs
UPDATE audit_logs
SET created_at = random_future_date();

-- Update messages
UPDATE messages
SET 
  created_at = random_future_date(),
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
  created_at = random_future_date(),
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

-- Drop the helper function
DROP FUNCTION random_future_date;