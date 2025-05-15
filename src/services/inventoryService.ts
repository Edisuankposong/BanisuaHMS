import { supabase } from '../lib/supabase';
import { 
  InventoryItem, Supplier, PurchaseOrder, 
  PurchaseOrderItem, InventoryTransaction 
} from '../types';

export const inventoryService = {
  // Inventory Items
  getInventoryItems: async (filters?: {
    category?: string;
    type?: string;
    status?: string;
    lowStock?: boolean;
    search?: string;
  }) => {
    try {
      let query = supabase
        .from('inventory_items')
        .select('*');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.lowStock) {
        query = query.lte('quantity', supabase.raw('reorder_level'));
      }

      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      throw error;
    }
  },

  createInventoryItem: async (item: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating inventory item:', error);
      throw error;
    }
  },

  updateInventoryItem: async (id: string, updates: Partial<InventoryItem>) => {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating inventory item:', error);
      throw error;
    }
  },

  // Suppliers
  getSuppliers: async (filters?: {
    status?: string;
    search?: string;
  }) => {
    try {
      let query = supabase
        .from('suppliers')
        .select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      throw error;
    }
  },

  createSupplier: async (supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .insert([supplier])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating supplier:', error);
      throw error;
    }
  },

  updateSupplier: async (id: string, updates: Partial<Supplier>) => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating supplier:', error);
      throw error;
    }
  },

  // Purchase Orders
  getPurchaseOrders: async (filters?: {
    status?: string;
    supplierId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      let query = supabase
        .from('purchase_orders')
        .select(`
          *,
          supplier:suppliers(*),
          items:purchase_order_items(
            *,
            inventory_item:inventory_items(*)
          )
        `);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.supplierId) {
        query = query.eq('supplier_id', filters.supplierId);
      }

      if (filters?.startDate) {
        query = query.gte('created_at', filters.startDate);
      }

      if (filters?.endDate) {
        query = query.lte('created_at', filters.endDate);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
      throw error;
    }
  },

  createPurchaseOrder: async (
    order: Omit<PurchaseOrder, 'id' | 'created_at' | 'updated_at'>,
    items: Omit<PurchaseOrderItem, 'id' | 'created_at' | 'updated_at'>[]
  ) => {
    try {
      // Start a transaction
      const { data: purchaseOrder, error: orderError } = await supabase
        .from('purchase_orders')
        .insert([order])
        .select()
        .single();

      if (orderError) throw orderError;

      // Add items
      const itemsWithOrderId = items.map(item => ({
        ...item,
        purchase_order_id: purchaseOrder.id
      }));

      const { error: itemsError } = await supabase
        .from('purchase_order_items')
        .insert(itemsWithOrderId);

      if (itemsError) throw itemsError;

      return purchaseOrder;
    } catch (error) {
      console.error('Error creating purchase order:', error);
      throw error;
    }
  },

  updatePurchaseOrderStatus: async (
    id: string,
    status: PurchaseOrder['status'],
    userId: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .update({
          status,
          updated_by: userId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating purchase order status:', error);
      throw error;
    }
  },

  // Inventory Transactions
  createTransaction: async (transaction: Omit<InventoryTransaction, 'id' | 'created_at'>) => {
    try {
      // Start a transaction
      const { data, error: transactionError } = await supabase
        .from('inventory_transactions')
        .insert([transaction])
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Update inventory item quantity
      const quantityChange = transaction.transaction_type === 'received' ? 
        transaction.quantity : -transaction.quantity;

      const { error: updateError } = await supabase
        .from('inventory_items')
        .update({
          quantity: supabase.raw(`quantity + ${quantityChange}`),
          updated_at: new Date().toISOString(),
          updated_by: transaction.created_by
        })
        .eq('id', transaction.inventory_item_id);

      if (updateError) throw updateError;

      return data;
    } catch (error) {
      console.error('Error creating inventory transaction:', error);
      throw error;
    }
  },

  getTransactions: async (filters?: {
    itemId?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      let query = supabase
        .from('inventory_transactions')
        .select(`
          *,
          inventory_item:inventory_items(*),
          created_by:created_by(*)
        `);

      if (filters?.itemId) {
        query = query.eq('inventory_item_id', filters.itemId);
      }

      if (filters?.type) {
        query = query.eq('transaction_type', filters.type);
      }

      if (filters?.startDate) {
        query = query.gte('created_at', filters.startDate);
      }

      if (filters?.endDate) {
        query = query.lte('created_at', filters.endDate);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching inventory transactions:', error);
      throw error;
    }
  },

  // Reports
  getLowStockItems: async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .lte('quantity', supabase.raw('reorder_level'))
        .eq('status', 'active');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw error;
    }
  },

  getExpiringItems: async (daysThreshold: number = 90) => {
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .lte('expiry_date', supabase.raw(`now() + interval '${daysThreshold} days'`))
        .gt('expiry_date', supabase.raw('now()'))
        .eq('status', 'active');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching expiring items:', error);
      throw error;
    }
  },

  getInventoryValueReport: async () => {
    try {
      const { data, error } = await supabase
        .rpc('calculate_inventory_value');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error generating inventory value report:', error);
      throw error;
    }
  }
};