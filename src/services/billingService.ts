import { Bill, BillItem, InsuranceDetails } from '../types';
import { supabase } from '../lib/supabase';

export const billingService = {
  // Create a new bill
  createBill: async (billData: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('bills')
        .insert([{
          ...billData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating bill:', error);
      throw error;
    }
  },

  // Get bill by ID
  getBillById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('bills')
        .select('*, items(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching bill:', error);
      throw error;
    }
  },

  // Get bills with filters
  getBills: async (filters?: {
    patientId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      let query = supabase
        .from('bills')
        .select('*, items(*)', { count: 'exact' });

      if (filters?.patientId) {
        query = query.eq('patientId', filters.patientId);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.startDate) {
        query = query.gte('date', filters.startDate);
      }

      if (filters?.endDate) {
        query = query.lte('date', filters.endDate);
      }

      if (filters?.page !== undefined && filters?.limit) {
        const from = filters.page * filters.limit;
        query = query.range(from, from + filters.limit - 1);
      }

      const { data, error, count } = await query;

      if (error) throw error;
      return { data, count };
    } catch (error) {
      console.error('Error fetching bills:', error);
      throw error;
    }
  },

  // Update bill
  updateBill: async (id: string, billData: Partial<Bill>) => {
    try {
      const { data, error } = await supabase
        .from('bills')
        .update({
          ...billData,
          updatedAt: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating bill:', error);
      throw error;
    }
  },

  // Process payment
  processPayment: async (
    billId: string,
    paymentData: {
      method: Bill['paymentMethod'];
      amount: number;
      reference?: string;
      insuranceDetails?: InsuranceDetails;
    }
  ) => {
    try {
      const { data: bill, error: billError } = await supabase
        .from('bills')
        .select()
        .eq('id', billId)
        .single();

      if (billError) throw billError;

      // Verify payment amount matches bill total
      if (paymentData.amount !== bill.total) {
        throw new Error('Payment amount does not match bill total');
      }

      const { data, error } = await supabase
        .from('bills')
        .update({
          status: 'paid',
          paymentMethod: paymentData.method,
          paymentDate: new Date().toISOString(),
          paymentReference: paymentData.reference,
          insuranceDetails: paymentData.insuranceDetails,
          updatedAt: new Date().toISOString()
        })
        .eq('id', billId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },

  // Generate bill PDF
  generatePDF: async (billId: string) => {
    try {
      const bill = await billingService.getBillById(billId);
      // TODO: Implement PDF generation using jsPDF
      return null;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  },

  // Export bills to Excel
  exportToExcel: async (filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }) => {
    try {
      const { data: bills } = await billingService.getBills(filters);
      // TODO: Implement Excel export using xlsx
      return null;
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw error;
    }
  }
};