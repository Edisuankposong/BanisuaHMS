// Add these types to the existing types/index.ts file

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: string;
  taxable: boolean;
}

export interface InsuranceDetails {
  provider: string;
  policyNumber: string;
  coveragePercentage: number;
  preAuthorizationNumber?: string;
  expiryDate: string;
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  insuranceCoverage: number;
  total: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'insurance' | 'bank_transfer';
  paymentDate?: string;
  paymentReference?: string;
  insuranceDetails?: InsuranceDetails;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  category: string;
  taxable: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'insurance' | 'bank_transfer';
  enabled: boolean;
  processingFee?: number;
  instructions?: string;
}