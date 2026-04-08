export interface Product {
  id: string;
  name: string;
  stock: number;
  wholesale_price: number;
  retail_price: number;
  category: string;
  unit: string;
  created_at?: string;
}

export interface Transaction {
  id: string;
  product_id: string;
  type: 'in' | 'out';
  quantity: number;
  price: number;
  total: number;
  date: string;
  note?: string;
  product?: Product;
}

export interface StockOpname {
  id: string;
  product_id: string;
  system_stock: number;
  actual_stock: number;
  difference: number;
  date: string;
  note?: string;
  product?: Product;
}

export type View = 'dashboard' | 'inventory' | 'transactions' | 'reports' | 'stock-opname';
