import { OrderResponse, orderService, PageParams } from '@/business';
import { create } from 'zustand';

interface OrderState {
  orders: OrderResponse[];
  loading: boolean;
  initialized: boolean;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  fetchOrders: (pageParams?: PageParams) => Promise<void>;
  cancelOrder: (orderId: number, reason: string) => Promise<void>;
  initialize: () => Promise<void>;
  setPage: (page: number) => void;
  reset: () => void; // Para limpar ao fazer logout
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,
  initialized: false,
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,

  initialize: async () => {
    // Evita múltiplas inicializações
    if (get().initialized) return;
    
    set({ initialized: true });
    await get().fetchOrders();
  },

  fetchOrders: async (pageParams?: PageParams) => {
    set({ loading: true });
    try {
      const params = pageParams || {
        pageNumber: get().currentPage,
        pageSize: get().pageSize
      };

      const response = await orderService.getMyOrders(params);
      
      set({
        orders: response.items,
        totalPages: response.totalPages,
        currentPage: params.pageNumber,
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      console.error('Error fetching orders:', error);
    }
  },

  cancelOrder: async (orderId: number, reason: string) => {
    await orderService.cancelOrder(orderId, reason);
    // Recarrega a lista após cancelamento
    await get().fetchOrders();
  },

  setPage: (page: number) => {
    set({ currentPage: page });
    get().fetchOrders({ pageNumber: page, pageSize: get().pageSize });
  },

  reset: () => {
    set({
      orders: [],
      loading: false,
      initialized: false,
      currentPage: 1,
      totalPages: 1
    });
  }
}));