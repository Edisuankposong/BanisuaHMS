import { Bill, BillItem } from '../types';

// Mock bills data
const bills: Bill[] = [];

export const billingService = {
  // Get all bills
  getBills: async (filters?: Record<string, any>): Promise<Bill[]> => {
    try {
      let filteredBills = [...bills];

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredBills = filteredBills.filter(bill => 
              bill[key as keyof Bill] === value
            );
          }
        });
      }

      return filteredBills;
    } catch (error) {
      console.error('Error fetching bills:', error);
      throw error;
    }
  },

  // Get bill by ID
  getBillById: async (id: string): Promise<Bill | null> => {
    try {
      const bill = bills.find(b => b.id === id);
      return bill || null;
    } catch (error) {
      console.error('Error fetching bill:', error);
      throw error;
    }
  },

  // Create new bill
  createBill: async (billData: Omit<Bill, 'id' | 'subtotal' | 'total'>): Promise<Bill> => {
    try {
      const subtotal = billData.items.reduce((acc, item) => acc + item.total, 0);
      const tax = subtotal * 0.1; // 10% tax
      const total = subtotal + tax - (billData.discount || 0);

      const newBill: Bill = {
        id: `BILL${Math.random().toString(36).substr(2, 9)}`,
        ...billData,
        subtotal,
        tax,
        total,
        status: 'pending',
        date: new Date().toISOString()
      };

      bills.push(newBill);
      return newBill;
    } catch (error) {
      console.error('Error creating bill:', error);
      throw error;
    }
  },

  // Update bill
  updateBill: async (id: string, billData: Partial<Bill>): Promise<Bill> => {
    try {
      const index = bills.findIndex(b => b.id === id);
      if (index === -1) throw new Error('Bill not found');

      const updatedBill = {
        ...bills[index],
        ...billData
      };

      bills[index] = updatedBill;
      return updatedBill;
    } catch (error) {
      console.error('Error updating bill:', error);
      throw error;
    }
  },

  // Process payment
  processPayment: async (id: string, paymentMethod: Bill['paymentMethod']): Promise<Bill> => {
    try {
      const index = bills.findIndex(b => b.id === id);
      if (index === -1) throw new Error('Bill not found');

      const updatedBill = {
        ...bills[index],
        status: 'paid',
        paymentMethod
      };

      bills[index] = updatedBill;
      return updatedBill;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }
};