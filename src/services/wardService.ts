import { Ward, Bed, Admission } from '../types';

// Mock data
const wards: Ward[] = [];
const beds: Bed[] = [];
const admissions: Admission[] = [];

export const wardService = {
  // Get all wards
  getWards: async (): Promise<Ward[]> => {
    try {
      return wards;
    } catch (error) {
      console.error('Error fetching wards:', error);
      throw error;
    }
  },

  // Get ward by ID
  getWardById: async (id: string): Promise<Ward | null> => {
    try {
      const ward = wards.find(w => w.id === id);
      return ward || null;
    } catch (error) {
      console.error('Error fetching ward:', error);
      throw error;
    }
  },

  // Get beds by ward
  getBedsByWard: async (wardId: string): Promise<Bed[]> => {
    try {
      return beds.filter(bed => bed.wardId === wardId);
    } catch (error) {
      console.error('Error fetching beds:', error);
      throw error;
    }
  },

  // Get bed by ID
  getBedById: async (id: string): Promise<Bed | null> => {
    try {
      const bed = beds.find(b => b.id === id);
      return bed || null;
    } catch (error) {
      console.error('Error fetching bed:', error);
      throw error;
    }
  },

  // Get available beds
  getAvailableBeds: async (wardId?: string): Promise<Bed[]> => {
    try {
      let availableBeds = beds.filter(bed => bed.status === 'available');
      if (wardId) {
        availableBeds = availableBeds.filter(bed => bed.wardId === wardId);
      }
      return availableBeds;
    } catch (error) {
      console.error('Error fetching available beds:', error);
      throw error;
    }
  },

  // Admit patient
  admitPatient: async (admissionData: Omit<Admission, 'id' | 'status'>): Promise<Admission> => {
    try {
      // Check if bed is available
      const bed = beds.find(b => b.id === admissionData.bedId);
      if (!bed || bed.status !== 'available') {
        throw new Error('Bed is not available');
      }

      // Create admission
      const newAdmission: Admission = {
        id: `ADM${Math.random().toString(36).substr(2, 9)}`,
        ...admissionData,
        status: 'admitted'
      };

      // Update bed status
      const bedIndex = beds.findIndex(b => b.id === admissionData.bedId);
      beds[bedIndex] = {
        ...beds[bedIndex],
        status: 'occupied',
        patientId: admissionData.patientId,
        admissionDate: admissionData.admissionDate
      };

      // Update ward occupancy
      const wardIndex = wards.findIndex(w => w.id === admissionData.wardId);
      wards[wardIndex] = {
        ...wards[wardIndex],
        occupiedBeds: wards[wardIndex].occupiedBeds + 1
      };

      admissions.push(newAdmission);
      return newAdmission;
    } catch (error) {
      console.error('Error admitting patient:', error);
      throw error;
    }
  },

  // Discharge patient
  dischargePatient: async (admissionId: string, dischargeDate: string): Promise<Admission> => {
    try {
      const admissionIndex = admissions.findIndex(a => a.id === admissionId);
      if (admissionIndex === -1) throw new Error('Admission not found');

      const admission = admissions[admissionIndex];
      
      // Update admission
      const updatedAdmission: Admission = {
        ...admission,
        status: 'discharged',
        dischargeDate
      };

      // Update bed status
      const bedIndex = beds.findIndex(b => b.id === admission.bedId);
      beds[bedIndex] = {
        ...beds[bedIndex],
        status: 'available',
        patientId: undefined,
        admissionDate: undefined
      };

      // Update ward occupancy
      const wardIndex = wards.findIndex(w => w.id === admission.wardId);
      wards[wardIndex] = {
        ...wards[wardIndex],
        occupiedBeds: wards[wardIndex].occupiedBeds - 1
      };

      admissions[admissionIndex] = updatedAdmission;
      return updatedAdmission;
    } catch (error) {
      console.error('Error discharging patient:', error);
      throw error;
    }
  }
};