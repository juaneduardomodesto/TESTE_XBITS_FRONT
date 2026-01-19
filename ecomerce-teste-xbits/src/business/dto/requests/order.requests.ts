import { EPaymentMethod } from "@/business/enums";

export interface CheckoutRequest {
  paymentMethod: EPaymentMethod;
  shippingCost: number;
  discount: number;
  notes?: string;
}

export interface ProcessPaymentRequest {
  orderId: number;
  transactionId?: string;
  paymentDetails?: string;
}

export interface CancelOrderRequest {
  orderId: number;
  reason: string;
}

export interface UpdateOrderStatusRequest {
  orderId: number;
  status: number;
  notes?: string;
}

export interface OrderSearchParams {
  orderNumber?: string;
  status?: number;
  paymentStatus?: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
  pageNumber: number;
  pageSize: number;
}

export interface AddOrderNoteRequest {
  orderId: number;
  note: string;
  isInternal: boolean;
}