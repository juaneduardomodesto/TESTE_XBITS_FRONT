import { apiClient } from "..";
import { CartResponse, AddToCartRequest, CartItemResponse, UpdateCartItemRequest, RemoveFromCartRequest } from "../dto";

export class CartService {
  private basePath = '/Cart';

  async getMyCart(): Promise<CartResponse | null> {
    return await apiClient.get<CartResponse | null>(`${this.basePath}/list_cart_items_by_user`);
  }

  async addToCart(request: AddToCartRequest): Promise<CartItemResponse | null> {
    return await apiClient.post<CartItemResponse | null>(
      `${this.basePath}/add_product_to_cart`,
      request
    );
  }

  async updateCartItem(request: UpdateCartItemRequest): Promise<boolean> {
    return await apiClient.put<boolean>(
      `${this.basePath}/update_product_from_user_cart`,
      request
    );
  }

  async removeFromCart(request: RemoveFromCartRequest): Promise<boolean> {
    return await apiClient.delete<boolean>(
      `${this.basePath}/remove_product_from_user_cart`,
      request
    );
  }

  async clearCart(): Promise<boolean> {
    return await apiClient.delete<boolean>(`${this.basePath}/clear_user_cart`);
  }
}

export const cartService = new CartService();