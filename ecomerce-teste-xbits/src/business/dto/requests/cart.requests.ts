export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  cartItemId: number;
  quantity: number;
}

export interface RemoveFromCartRequest {
  cartItemId: number;
}

export interface ApplyCouponRequest {
  couponCode: string;
}

export interface AddMultipleItemsRequest {
  items: AddToCartRequest[];
}