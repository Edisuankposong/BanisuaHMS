/*
  # Update Patient Names to Calabar Names

  1. Changes
    - Updates patient first and last names to traditional Calabar names
    - Updates emergency contact names to match cultural context
  
  2. Implementation
    - Uses a temporary mapping table to handle ordered updates
    - Maintains data integrity with proper UUID handling
*/

-- Create temporary table for name mappings
CREATE TEMPORARY TABLE name_mappings (
  patient_id uuid,
  new_first_name text,
  new_last_name text,
  new_emergency_contact text
);

-- Insert name mappings
INSERT INTO name_mappings
SELECT 
  id as patient_id,
  CASE row_number() OVER (ORDER BY created_at)
    WHEN 1 THEN 'Effiong'
    WHEN 2 THEN 'Arit'
    WHEN 3 THEN 'Okon'
    WHEN 4 THEN 'Ekanem'
    WHEN 5 THEN 'Etim'
  END as new_first_name,
  CASE row_number() OVER (ORDER BY created_at)
    WHEN 1 THEN 'Bassey'
    WHEN 2 THEN 'Ekpo'
    WHEN 3 THEN 'Edet'
    WHEN 4 THEN 'Effiom'
    WHEN 5 THEN 'Essien'
  END as new_last_name,
  CASE row_number() OVER (ORDER BY created_at)
    WHEN 1 THEN 'Emem Bassey'
    WHEN 2 THEN 'Otu Ekpo'
    WHEN 3 THEN 'Ime Edet'
    WHEN 4 THEN 'Eno Effiom'
    WHEN 5 THEN 'Orok Essien'
  END as new_emergency_contact
FROM patients;

-- Update patient records using the mappings
UPDATE patients
SET 
  first_name = m.new_first_name,
  last_name = m.new_last_name,
  emergency_contact_name = m.new_emergency_contact
FROM name_mappings m
WHERE patients.id = m.patient_id;

-- Clean up
DROP TABLE name_mappings;