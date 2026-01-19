import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "@/business/enums";

export interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  productCode?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productImageUrl?: string;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  userId: string;
  status: EOrderStatus;
  paymentMethod: EPaymentMethod;
  paymentStatus: EPaymentStatus;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  items: OrderItemResponse[];
  createdAt: string;
  paidAt?: string;
  notes?: string;
}

export interface OrderSummaryResponse {
  id: number;
  orderNumber: string;
  status: EOrderStatus;
  paymentStatus: EPaymentStatus;
  total: number;
  itemCount: number;
  createdAt: string;
}

export interface OrderDetailResponse extends OrderResponse {
  updatedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  shippedAt?: string;
  deliveredAt?: string;
  trackingCode?: string;
  customerName?: string;
  customerEmail?: string;
  orderNotes: OrderNoteResponse[];
}

export interface OrderNoteResponse {
  id: number;
  orderId: number;
  note: string;
  isInternal: boolean;
  createdBy: string;
  createdAt: string;
}

export interface OrderStatisticsResponse {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}