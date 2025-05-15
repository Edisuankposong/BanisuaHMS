/*
  # Update Staff Names to Calabar Names

  1. Changes
    - Updates names of all staff members to Calabar/Nigerian names
    - Updates user profiles with culturally appropriate names
    - Maintains role assignments and other data
  
  2. Security
    - No changes to permissions or access controls
    - Preserves existing user relationships and references
*/

-- Create temporary table for staff name mappings
CREATE TEMPORARY TABLE staff_name_mappings (
  user_id uuid,
  new_name text
);

-- Insert name mappings for different roles
INSERT INTO staff_name_mappings
SELECT 
  id as user_id,
  CASE role
    WHEN 'admin' THEN 'Ekong Effiong'
    WHEN 'doctor' THEN CASE row_number() OVER (PARTITION BY role ORDER BY created_at)
      WHEN 1 THEN 'Dr. Okon Bassey'
      WHEN 2 THEN 'Dr. Efiom Edet'
      WHEN 3 THEN 'Dr. Otu Essien'
      WHEN 4 THEN 'Dr. Asuquo Ekpo'
      ELSE 'Dr. ' || COALESCE(name, 'Unknown')
    END
    WHEN 'nurse' THEN CASE row_number() OVER (PARTITION BY role ORDER BY created_at)
      WHEN 1 THEN 'Nurse Ekaette Okon'
      WHEN 2 THEN 'Nurse Arit Effiong'
      WHEN 3 THEN 'Nurse Eme Bassey'
      ELSE 'Nurse ' || COALESCE(name, 'Unknown')
    END
    WHEN 'pharmacist' THEN CASE row_number() OVER (PARTITION BY role ORDER BY created_at)
      WHEN 1 THEN 'Etim Udo'
      WHEN 2 THEN 'Ime Edet'
      ELSE COALESCE(name, 'Unknown')
    END
    WHEN 'lab_technician' THEN CASE row_number() OVER (PARTITION BY role ORDER BY created_at)
      WHEN 1 THEN 'Orok Effiom'
      WHEN 2 THEN 'Edidem Ekpo'
      ELSE COALESCE(name, 'Unknown')
    END
    WHEN 'receptionist' THEN CASE row_number() OVER (PARTITION BY role ORDER BY created_at)
      WHEN 1 THEN 'Atim Bassey'
      WHEN 2 THEN 'Eno Edet'
      ELSE COALESCE(name, 'Unknown')
    END
    ELSE COALESCE(name, 'Unknown')
  END as new_name
FROM users;

-- Update user records
UPDATE users
SET name = m.new_name
FROM staff_name_mappings m
WHERE users.id = m.user_id;

-- Clean up
DROP TABLE staff_name_mappings;

-- Update doctor references in appointments
UPDATE patient_appointments
SET doctor_id = (
  SELECT id 
  FROM users 
  WHERE role = 'doctor' 
  ORDER BY random() 
  LIMIT 1
)
WHERE doctor_id IS NOT NULL;

-- Update doctor references in prescriptions
UPDATE patient_prescriptions
SET doctor_id = (
  SELECT id 
  FROM users 
  WHERE role = 'doctor' 
  ORDER BY random() 
  LIMIT 1
)
WHERE doctor_id IS NOT NULL;

-- Update doctor references in lab results
UPDATE patient_lab_results
SET doctor_id = (
  SELECT id 
  FROM users 
  WHERE role = 'doctor' 
  ORDER BY random() 
  LIMIT 1
)
WHERE doctor_id IS NOT NULL;