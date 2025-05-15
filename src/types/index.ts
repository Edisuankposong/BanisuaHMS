export type Role = 
  | 'admin'
  | 'doctor'
  | 'nurse'
  | 'receptionist'
  | 'pharmacist'
  | 'lab_technician'
  | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  bloodGroup?: string;
  address: string;
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  status: 'active' | 'discharged' | 'deceased';
  registrationDate: string;
  medicalHistory?: MedicalHistory[];
  appointments?: Appointment[];
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  condition: string;
  diagnosisDate: string;
  treatment: string;
  notes?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  specialization: string;
  qualification: string;
  experience: number;
  fee: number;
  availability: Availability[];
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'regular' | 'follow-up' | 'emergency';
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  medicines: Medicine[];
  labTests?: LabTest[];
  notes?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface LabTest {
  id: string;
  name: string;
  patientId: string;
  doctorId: string;
  requestDate: string;
  status: 'requested' | 'collected' | 'in-progress' | 'completed';
  results?: string;
  resultFile?: string;
  notes?: string;
}

export interface Bill {
  id: string;
  patientId: string;
  date: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'insurance' | 'other';
}

export interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  stockQuantity: number;
  unitPrice: number;
  expiryDate: string;
  reorderLevel: number;
}

export interface Ward {
  id: string;
  name: string;
  type: 'general' | 'private' | 'semi-private' | 'icu' | 'emergency';
  capacity: number;
  occupiedBeds: number;
}

export interface Bed {
  id: string;
  wardId: string;
  number: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  patientId?: string;
  admissionDate?: string;
}

export interface Admission {
  id: string;
  patientId: string;
  bedId: string;
  wardId: string;
  admissionDate: string;
  dischargeDate?: string;
  status: 'admitted' | 'discharged';
  doctorId: string;
  diagnosis: string;
  notes?: string;
}

export interface StaffSchedule {
  id: string;
  userId: string;
  shiftStart: string;
  shiftEnd: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'regular' | 'overtime' | 'on-call';
}

export interface TimeOffRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  type: 'vacation' | 'sick' | 'personal';
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}