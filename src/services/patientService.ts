import { Patient } from '../types';
import { patients } from '../mocks/patientData';

export const patientService = {
  // Get all patients with optional search and filters
  getPatients: async (search?: string, filters?: Record<string, any>): Promise<Patient[]> => {
    try {
      let filteredPatients = [...patients];
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredPatients = filteredPatients.filter(patient => 
          patient.firstName.toLowerCase().includes(searchLower) ||
          patient.lastName.toLowerCase().includes(searchLower) ||
          patient.email.toLowerCase().includes(searchLower)
        );
      }

      if (filters) {
        // Apply filters (status, gender, etc.)
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredPatients = filteredPatients.filter(patient => 
              patient[key as keyof Patient] === value
            );
          }
        });
      }

      return filteredPatients;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  // Get patient by ID
  getPatientById: async (id: string): Promise<Patient | null> => {
    try {
      const patient = patients.find(p => p.id === id);
      return patient || null;
    } catch (error) {
      console.error('Error fetching patient:', error);
      throw error;
    }
  },

  // Create new patient
  createPatient: async (patientData: Omit<Patient, 'id'>): Promise<Patient> => {
    try {
      const newPatient: Patient = {
        id: `PAT${Math.random().toString(36).substr(2, 9)}`,
        ...patientData,
        registrationDate: new Date().toISOString(),
        status: 'active'
      };
      
      // In a real app, this would be an API call
      patients.push(newPatient);
      return newPatient;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  },

  // Update patient
  updatePatient: async (id: string, patientData: Partial<Patient>): Promise<Patient> => {
    try {
      const index = patients.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Patient not found');

      const updatedPatient = {
        ...patients[index],
        ...patientData
      };

      patients[index] = updatedPatient;
      return updatedPatient;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  },

  // Delete patient (soft delete by updating status)
  deletePatient: async (id: string): Promise<void> => {
    try {
      const index = patients.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Patient not found');

      patients[index].status = 'deceased';
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }
};