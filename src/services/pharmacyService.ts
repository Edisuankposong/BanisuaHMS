import { Medicine } from '../types';

// Mock medicines data
const medicines: Medicine[] = [];

export const pharmacyService = {
  // Get all medicines
  getMedicines: async (filters?: Record<string, any>): Promise<Medicine[]> => {
    try {
      let filteredMedicines = [...medicines];

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredMedicines = filteredMedicines.filter(medicine => 
              medicine[key as keyof Medicine] === value
            );
          }
        });
      }

      return filteredMedicines;
    } catch (error) {
      console.error('Error fetching medicines:', error);
      throw error;
    }
  },

  // Get medicine by ID
  getMedicineById: async (id: string): Promise<Medicine | null> => {
    try {
      const medicine = medicines.find(m => m.id === id);
      return medicine || null;
    } catch (error) {
      console.error('Error fetching medicine:', error);
      throw error;
    }
  },

  // Add new medicine
  addMedicine: async (medicineData: Omit<Medicine, 'id'>): Promise<Medicine> => {
    try {
      const newMedicine: Medicine = {
        id: `MED${Math.random().toString(36).substr(2, 9)}`,
        ...medicineData
      };

      medicines.push(newMedicine);
      return newMedicine;
    } catch (error) {
      console.error('Error adding medicine:', error);
      throw error;
    }
  },

  // Update medicine
  updateMedicine: async (id: string, medicineData: Partial<Medicine>): Promise<Medicine> => {
    try {
      const index = medicines.findIndex(m => m.id === id);
      if (index === -1) throw new Error('Medicine not found');

      const updatedMedicine = {
        ...medicines[index],
        ...medicineData
      };

      medicines[index] = updatedMedicine;
      return updatedMedicine;
    } catch (error) {
      console.error('Error updating medicine:', error);
      throw error;
    }
  },

  // Update stock
  updateStock: async (id: string, quantity: number): Promise<Medicine> => {
    try {
      const index = medicines.findIndex(m => m.id === id);
      if (index === -1) throw new Error('Medicine not found');

      const updatedMedicine = {
        ...medicines[index],
        stockQuantity: medicines[index].stockQuantity + quantity
      };

      medicines[index] = updatedMedicine;
      return updatedMedicine;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  },

  // Check low stock
  checkLowStock: async (): Promise<Medicine[]> => {
    try {
      return medicines.filter(medicine => 
        medicine.stockQuantity <= medicine.reorderLevel
      );
    } catch (error) {
      console.error('Error checking low stock:', error);
      throw error;
    }
  }
};