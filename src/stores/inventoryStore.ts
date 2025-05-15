import { create } from 'zustand';
import { inventoryService } from '../services/inventoryService';
import { 
  InventoryItem, Supplier, PurchaseOrder, 
  PurchaseOrderItem, InventoryTransaction 
} from '../types';

interface InventoryState {
  items: InventoryItem[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  lowStockItems: InventoryItem[];
  expiringItems: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadInventoryItems: (filters?: {
    category?: string;
    type?: string;
    status?: string;
    lowStock?: boolean;
    search?: string;
  }) => Promise<void>;
  
  loadSuppliers: (filters?: {
    status?: string;
    search?: string;
  }) => Promise<void>;
  
  loadPurchaseOrders: (filters?: {
    status?: string;
    supplierId?: string;
    startDate?: string;
    endDate?: string;
  }) => Promise<void>;
  
  createInventoryItem: (item: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => Promise<void>;
  
  createSupplier: (supplier: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateSupplier: (id: string, updates: Partial<Supplier>) => Promise<void>;
  
  createPurchaseOrder: (
    order: Omit<PurchaseOrder, 'id' | 'created_at' | 'updated_at'>,
    items: Omit<PurchaseOrderItem, 'id' | 'created_at' | 'updated_at'>[]
  ) => Promise<void>;
  
  updatePurchaseOrderStatus: (
    id: string,
    status: PurchaseOrder['status'],
    userId: string
  ) => Promise<void>;
  
  createTransaction: (
    transaction: Omit<InventoryTransaction, 'id' | 'created_at'>
  ) => Promise<void>;
  
  checkLowStock: () => Promise<void>;
  checkExpiringItems: (daysThreshold?: number) => Promise<void>;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [],
  suppliers: [],
  purchaseOrders: [],
  lowStockItems: [],
  expiringItems: [],
  isLoading: false,
  error: null,

  loadInventoryItems: async (filters) => {
    try {
      set({ isLoading: true, error: null });
      const items = await inventoryService.getInventoryItems(filters);
      set({ items, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error loading inventory items',
        isLoading: false 
      });
    }
  },

  loadSuppliers: async (filters) => {
    try {
      set({ isLoading: true, error: null });
      const suppliers = await inventoryService.getSuppliers(filters);
      set({ suppliers, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error loading suppliers',
        isLoading: false 
      });
    }
  },

  loadPurchaseOrders: async (filters) => {
    try {
      set({ isLoading: true, error: null });
      const purchaseOrders = await inventoryService.getPurchaseOrders(filters);
      set({ purchaseOrders, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error loading purchase orders',
        isLoading: false 
      });
    }
  },

  createInventoryItem: async (item) => {
    try {
      set({ isLoading: true, error: null });
      await inventoryService.createInventoryItem(item);
      await get().loadInventoryItems();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error creating inventory item',
        isLoading: false 
      });
    }
  },

  updateInventoryItem: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      await inventoryService.updateInventoryItem(id, updates);
      await get().loadInventoryItems();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error updating inventory item',
        isLoading: false 
      });
    }
  },

  createSupplier: async (supplier) => {
    try {
      set({ isLoading: true, error: null });
      await inventoryService.createSupplier(supplier);
      await get().loadSuppliers();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error creating supplier',
        isLoading: false 
      });
    }
  },

  updateSupplier: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      await inventoryService.updateSupplier(id, updates);
      await get().loadSuppliers();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error updating supplier',
        isLoading: false 
      });
    }
  },

  createPurchaseOrder: async (order, items) => {
    try {
      set({ isLoading: true, error: null });
      await inventoryService.createPurchaseOrder(order, items);
      await get().loadPurchaseOrders();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error creating purchase order',
        isLoading: false 
      });
    }
  },

  updatePurchaseOrderStatus: async (id, status, userId) => {
    try {
      set({ isLoading: true, error: null });
      await inventoryService.updatePurchaseOrderStatus(id, status, userId);
      await get().loadPurchaseOrders();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error updating purchase order status',
        isLoading: false 
      });
    }
  },

  createTransaction: async (transaction) => {
    try {
      set({ isLoading: true, error: null });
      await inventoryService.createTransaction(transaction);
      await get().loadInventoryItems();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error creating transaction',
        isLoading: false 
      });
    }
  },

  checkLowStock: async () => {
    try {
      set({ isLoading: true, error: null });
      const lowStockItems = await inventoryService.getLowStockItems();
      set({ lowStockItems, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error checking low stock',
        isLoading: false 
      });
    }
  },

  checkExpiringItems: async (daysThreshold = 90) => {
    try {
      set({ isLoading: true, error: null });
      const expiringItems = await inventoryService.getExpiringItems(daysThreshold);
      set({ expiringItems, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error checking expiring items',
        isLoading: false 
      });
    }
  }
}));