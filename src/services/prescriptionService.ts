import { Prescription } from '../types';

// Mock prescriptions data
const prescriptions: Prescription[] = [];

export const prescriptionService = {
  // Get all prescriptions
  getPrescriptions: async (filters?: Record<string, any>): Promise<Prescription[]> => {
    try {
      let filteredPrescriptions = [...prescriptions];

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredPrescriptions = filteredPrescriptions.filter(prescription => 
              prescription[key as keyof Prescription] === value
            );
          }
        });
      }

      return filteredPrescriptions;
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error;
    }
  },

  // Get prescription by ID
  getPrescriptionById: async (id: string): Promise<Prescription | null> => {
    try {
      const prescription = prescriptions.find(p => p.id === id);
      return prescription || null;
    } catch (error) {
      console.error('Error fetching prescription:', error);
      throw error;
    }
  },

  // Create new prescription
  createPrescription: async (prescriptionData: Omit<Prescription, 'id'>): Promise<Prescription> => {
    try {
      const newPrescription: Prescription = {
        id: `PRE${Math.random().toString(36).substr(2, 9)}`,
        ...prescriptionData,
        date: new Date().toISOString()
      };

      prescriptions.push(newPrescription);
      return newPrescription;
    } catch (error) {
      console.error('Error creating prescription:', error);
      throw error;
    }
  },

  // Update prescription
  updatePrescription: async (id: string, prescriptionData: Partial<Prescription>): Promise<Prescription> => {
    try {
      const index = prescriptions.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Prescription not found');

      const updatedPrescription = {
        ...prescriptions[index],
        ...prescriptionData
      };

      prescriptions[index] = updatedPrescription;
      return updatedPrescription;
    } catch (error) {
      console.error('Error updating prescription:', error);
      throw error;
    }
  }
};