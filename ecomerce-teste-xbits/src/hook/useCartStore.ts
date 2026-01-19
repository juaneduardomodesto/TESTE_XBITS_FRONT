import { AddToCartRequest, CartResponse, cartService, UpdateCartItemRequest } from '@/business';
import { create } from 'zustand';

interface CartState {
  cart: CartResponse | null;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (request: AddToCartRequest) => Promise<void>;
  updateCartItem: (request: UpdateCartItemRequest) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const cart = await cartService.getMyCart();
      set({ cart, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addToCart: async (request: AddToCartRequest) => {
    await cartService.addToCart(request);
    await get().fetchCart();
  },

  updateCartItem: async (request: UpdateCartItemRequest) => {
    await cartService.updateCartItem(request);
    await get().fetchCart();
  },

  removeFromCart: async (cartItemId: number) => {
    await cartService.removeFromCart({ cartItemId });
    await get().fetchCart();
  },

  clearCart: async () => {
    await cartService.clearCart();
    set({ cart: null });
  }
}));