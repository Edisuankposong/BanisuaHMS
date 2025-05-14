import { LabTest } from '../types';

// Mock lab tests data
const labTests: LabTest[] = [];

export const laboratoryService = {
  // Get all lab tests
  getLabTests: async (filters?: Record<string, any>): Promise<LabTest[]> => {
    try {
      let filteredTests = [...labTests];

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredTests = filteredTests.filter(test => 
              test[key as keyof LabTest] === value
            );
          }
        });
      }

      return filteredTests;
    } catch (error) {
      console.error('Error fetching lab tests:', error);
      throw error;
    }
  },

  // Get lab test by ID
  getLabTestById: async (id: string): Promise<LabTest | null> => {
    try {
      const test = labTests.find(t => t.id === id);
      return test || null;
    } catch (error) {
      console.error('Error fetching lab test:', error);
      throw error;
    }
  },

  // Create new lab test
  createLabTest: async (testData: Omit<LabTest, 'id' | 'status'>): Promise<LabTest> => {
    try {
      const newTest: LabTest = {
        id: `LAB${Math.random().toString(36).substr(2, 9)}`,
        ...testData,
        status: 'requested',
        requestDate: new Date().toISOString()
      };

      labTests.push(newTest);
      return newTest;
    } catch (error) {
      console.error('Error creating lab test:', error);
      throw error;
    }
  },

  // Update lab test
  updateLabTest: async (id: string, testData: Partial<LabTest>): Promise<LabTest> => {
    try {
      const index = labTests.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Lab test not found');

      const updatedTest = {
        ...labTests[index],
        ...testData
      };

      labTests[index] = updatedTest;
      return updatedTest;
    } catch (error) {
      console.error('Error updating lab test:', error);
      throw error;
    }
  },

  // Update test status
  updateTestStatus: async (id: string, status: LabTest['status']): Promise<LabTest> => {
    try {
      const index = labTests.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Lab test not found');

      const updatedTest = {
        ...labTests[index],
        status
      };

      labTests[index] = updatedTest;
      return updatedTest;
    } catch (error) {
      console.error('Error updating test status:', error);
      throw error;
    }
  }
};