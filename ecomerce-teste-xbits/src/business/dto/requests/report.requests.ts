export interface SalesReportRequest {
  startDate: string;
  endDate: string;
  groupBy?: 'day' | 'week' | 'month' | 'year';
  categoryId?: number;
  productId?: number;
}

export interface StockReportRequest {
  categoryId?: number;
  lowStockOnly?: boolean;
  outOfStockOnly?: boolean;
}

export interface UserReportRequest {
  startDate?: string;
  endDate?: string;
  role?: number;
  isActive?: boolean;
}

export interface FinancialReportRequest {
  startDate: string;
  endDate: string;
  groupBy?: 'day' | 'week' | 'month' | 'year';
  paymentMethod?: number;
}

export interface ExportReportRequest {
  reportType: 'sales' | 'stock' | 'users' | 'financial';
  format: 'pdf' | 'excel' | 'csv';
  filters: any;
}