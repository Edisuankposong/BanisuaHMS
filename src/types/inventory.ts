export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  type: 'medicine' | 'equipment';
  quantity: number;
  unit: string;
  reorder_level: number;
  expiry_date?: string;
  batch_number?: string;
  location?: string;
  status: 'active' | 'discontinued' | 'recalled';
  notes?: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive';
  notes?: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrder {
  id: string;
  supplier_id: string;
  status: 'draft' | 'pending' | 'approved' | 'ordered' | 'received' | 'cancelled';
  total_amount: number;
  expected_delivery?: string;
  notes?: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  inventory_item_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryTransaction {
  id: string;
  inventory_item_id: string;
  transaction_type: 'received' | 'dispensed' | 'adjusted' | 'returned' | 'expired';
  quantity: number;
  reference_type: 'purchase_order' | 'prescription' | 'adjustment' | 'return';
  reference_id: string;
  notes?: string;
  created_by: string;
  created_at: string;
}