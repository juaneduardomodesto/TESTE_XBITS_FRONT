export interface DashboardStatisticsResponse {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  lowStockProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  usersGrowth: number;
}

export interface SalesByPeriodResponse {
  period: string;
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
}

export interface TopProductResponse {
  productId: number;
  productName: string;
  productCode: string;
  totalSold: number;
  revenue: number;
  imageUrl?: string;
}

export interface SalesByCategoryResponse {
  categoryId: number;
  categoryName: string;
  totalSales: number;
  orderCount: number;
  percentage: number;
}

export interface RecentActivityResponse {
  id: number;
  type: 'order' | 'user' | 'product';
  description: string;
  timestamp: string;
  userId?: string;
  userName?: string;
}

export interface DashboardResponse {
  statistics: DashboardStatisticsResponse;
  salesByDay: SalesByPeriodResponse[];
  topProducts: TopProductResponse[];
  salesByCategory: SalesByCategoryResponse[];
  recentActivity: RecentActivityResponse[];
}