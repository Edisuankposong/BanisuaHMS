/*
  # Update Patient Names to Calabar Names

  1. Changes
    - Updates existing patient names to Calabar/Cross River names
    - Updates email addresses to match new names
    - Maintains all other patient data
*/

-- Update patient names and contact details
UPDATE patients
SET 
  first_name = CASE id
    WHEN 1 THEN 'Effiong'
    WHEN 2 THEN 'Arit'
    WHEN 3 THEN 'Okon'
    WHEN 4 THEN 'Ekanem'
    WHEN 5 THEN 'Etim'
    ELSE first_name
  END,
  last_name = CASE id
    WHEN 1 THEN 'Bassey'
    WHEN 2 THEN 'Ekpo'
    WHEN 3 THEN 'Edet'
    WHEN 4 THEN 'Effiom'
    WHEN 5 THEN 'Essien'
    ELSE last_name
  END,
  email = CASE id
    WHEN 1 THEN 'effiong.bassey@banisua.com.ng'
    WHEN 2 THEN 'arit.ekpo@banisua.com.ng'
    WHEN 3 THEN 'okon.edet@banisua.com.ng'
    WHEN 4 THEN 'ekanem.effiom@banisua.com.ng'
    WHEN 5 THEN 'etim.essien@banisua.com.ng'
    ELSE email
  END;

-- Update emergency contact names to match cultural context
UPDATE patients
SET emergency_contact_name = CASE id
    WHEN 1 THEN 'Emem Bassey'
    WHEN 2 THEN 'Otu Ekpo'
    WHEN 3 THEN 'Ime Edet'
    WHEN 4 THEN 'Eno Effiom'
    WHEN 5 THEN 'Orok Essien'
    ELSE emergency_contact_name
  END;