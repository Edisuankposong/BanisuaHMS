/*
  # Update Patient Registration Dates

  1. Changes
    - Sets all patient registration dates to current date in 2025
    - Updates medical history dates to maintain logical chronology
    - Ensures consistent date formatting across all records

  2. Details
    - Registration dates set to May 15, 2025
    - Medical history dates adjusted relative to registration
*/

-- Update patient registration dates
UPDATE patients
SET 
  created_at = '2025-05-15 10:00:00+00',
  updated_at = '2025-05-15 10:00:00+00';

-- Update medical history dates to maintain chronological order
UPDATE patient_medical_history
SET 
  diagnosis_date = '2025-05-15 10:00:00+00',
  created_at = '2025-05-15 10:00:00+00',
  updated_at = '2025-05-15 10:00:00+00';