/*
  # Inventory Management System

  1. New Tables
    - `inventory_items`: Stores all inventory items (medicines and equipment)
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `type` (text)
      - `quantity` (integer)
      - `unit` (text)
      - `reorder_level` (integer)
      - `expiry_date` (date)
      - `batch_number` (text)
      - `location` (text)
      - `status` (text)
      - Timestamps and audit fields

    - `suppliers`: Stores supplier information
      - `id` (uuid, primary key)
      - `name` (text)
      - `contact_person` (text)
      - `email` (text)
      - `phone` (text)
      - `address` (text)
      - `status` (text)
      - Timestamps and audit fields

    - `purchase_orders`: Tracks purchase orders
      - `id` (uuid, primary key)
      - `supplier_id` (uuid, references suppliers)
      - `status` (text)
      - `total_amount` (numeric)
      - `expected_delivery` (date)
      - Timestamps and audit fields

    - `purchase_order_items`: Individual items in purchase orders
      - `id` (uuid, primary key)
      - `purchase_order_id` (uuid, references purchase_orders)
      - `inventory_item_id` (uuid, references inventory_items)
      - `quantity` (integer)
      - `unit_price` (numeric)
      - `total_price` (numeric)

    - `inventory_transactions`: Tracks all inventory movements
      - `id` (uuid, primary key)
      - `inventory_item_id` (uuid, references inventory_items)
      - `transaction_type` (text)
      - `quantity` (integer)
      - `reference_type` (text)
      - `reference_id` (uuid)
      - Timestamps and audit fields

  2. Security
    - Enable RLS on all tables
    - Add policies for different user roles

  3. Indexes
    - Add appropriate indexes for better query performance
*/

-- Create inventory_items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  type text NOT NULL CHECK (type IN ('medicine', 'equipment')),
  quantity integer NOT NULL DEFAULT 0,
  unit text NOT NULL,
  reorder_level integer NOT NULL,
  expiry_date date,
  batch_number text,
  location text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'discontinued', 'recalled')),
  notes text,
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text,
  phone text,
  address text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  notes text,
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create purchase_orders table
CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES suppliers(id),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'ordered', 'received', 'cancelled')),
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  expected_delivery date,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create purchase_order_items table
CREATE TABLE IF NOT EXISTS purchase_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid REFERENCES purchase_orders(id) ON DELETE CASCADE,
  inventory_item_id uuid REFERENCES inventory_items(id),
  quantity integer NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inventory_transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_item_id uuid REFERENCES inventory_items(id),
  transaction_type text NOT NULL CHECK (transaction_type IN ('received', 'dispensed', 'adjusted', 'returned', 'expired')),
  quantity integer NOT NULL,
  reference_type text NOT NULL CHECK (reference_type IN ('purchase_order', 'prescription', 'adjustment', 'return')),
  reference_id uuid,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Policies for inventory_items
CREATE POLICY "Allow read access to authenticated users"
  ON inventory_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to admin and pharmacist"
  ON inventory_items
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'pharmacist')
  );

-- Policies for suppliers
CREATE POLICY "Allow read access to authenticated users"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to admin and pharmacist"
  ON suppliers
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'pharmacist')
  );

-- Policies for purchase_orders
CREATE POLICY "Allow read access to authenticated users"
  ON purchase_orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to admin and pharmacist"
  ON purchase_orders
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'pharmacist')
  );

-- Policies for purchase_order_items
CREATE POLICY "Allow read access to authenticated users"
  ON purchase_order_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow write access to admin and pharmacist"
  ON purchase_order_items
  FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'pharmacist')
  );

-- Policies for inventory_transactions
CREATE POLICY "Allow read access to authenticated users"
  ON inventory_transactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin and pharmacist"
  ON inventory_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'role' IN ('admin', 'pharmacist')
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_inventory_items_category ON inventory_items(category);
CREATE INDEX IF NOT EXISTS idx_inventory_items_type ON inventory_items(type);
CREATE INDEX IF NOT EXISTS idx_inventory_items_status ON inventory_items(status);
CREATE INDEX IF NOT EXISTS idx_inventory_items_expiry_date ON inventory_items(expiry_date);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier ON purchase_orders(supplier_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders(status);
CREATE INDEX IF NOT EXISTS idx_purchase_order_items_po ON purchase_order_items(purchase_order_id);
CREATE INDEX IF NOT EXISTS idx_purchase_order_items_item ON purchase_order_items(inventory_item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_item ON inventory_transactions(inventory_item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_type ON inventory_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_reference ON inventory_transactions(reference_type, reference_id);