import { ECartStatus } from "@/business/enums";

export interface CartItemResponse {
  id: number;
  productId: number;
  productName: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productImageUrl?: string;
  availableQuantity?: number;
}

export interface CartResponse {
  id: number;
  userId: string;
  status: ECartStatus;
  subtotal: number;
  totalItems: number;
  items: CartItemResponse[];
  createdAt: string;
  updatedAt?: string;
  discount?: number;
  couponCode?: string;
}

export interface CartSummaryResponse {
  id: number;
  totalItems: number;
  subtotal: number;
  itemCount: number;
}

export interface CouponApplicationResponse {
  success: boolean;
  discountAmount: number;
  couponCode: string;
  message: string;
}
