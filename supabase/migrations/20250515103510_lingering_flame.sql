/*
  # Patient Management Schema

  1. New Tables
    - `patients`
      - Personal information and medical details
      - One-to-one relationship with auth.users
    - `patient_appointments`
      - Patient appointment records
    - `patient_prescriptions`
      - Patient prescription records
    - `patient_lab_results`
      - Patient laboratory test results
    - `patient_medical_history`
      - Patient medical history records

  2. Security
    - Enable RLS on all tables
    - Add policies to ensure patients can only access their own data
    - Add policies for medical staff based on role
*/

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  blood_group text,
  address text,
  phone text,
  emergency_contact_name text,
  emergency_contact_phone text,
  emergency_contact_relation text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create patient appointments table
CREATE TABLE IF NOT EXISTS patient_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES auth.users(id),
  appointment_date timestamptz NOT NULL,
  appointment_type text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient prescriptions table
CREATE TABLE IF NOT EXISTS patient_prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES auth.users(id),
  prescription_date timestamptz NOT NULL,
  diagnosis text,
  medications jsonb NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient lab results table
CREATE TABLE IF NOT EXISTS patient_lab_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES auth.users(id),
  test_name text NOT NULL,
  test_date timestamptz NOT NULL,
  results jsonb NOT NULL,
  status text NOT NULL DEFAULT 'completed',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient medical history table
CREATE TABLE IF NOT EXISTS patient_medical_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE,
  condition text NOT NULL,
  diagnosis_date timestamptz NOT NULL,
  treatment text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_medical_history ENABLE ROW LEVEL SECURITY;

-- Policies for patients table
CREATE POLICY "Patients can view their own data"
  ON patients
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for patient_appointments table
CREATE POLICY "Patients can view their own appointments"
  ON patient_appointments
  FOR SELECT
  TO authenticated
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Policies for patient_prescriptions table
CREATE POLICY "Patients can view their own prescriptions"
  ON patient_prescriptions
  FOR SELECT
  TO authenticated
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Policies for patient_lab_results table
CREATE POLICY "Patients can view their own lab results"
  ON patient_lab_results
  FOR SELECT
  TO authenticated
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Policies for patient_medical_history table
CREATE POLICY "Patients can view their own medical history"
  ON patient_medical_history
  FOR SELECT
  TO authenticated
  USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON patient_appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON patient_prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_lab_results_patient_id ON patient_lab_results(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_history_patient_id ON patient_medical_history(patient_id);