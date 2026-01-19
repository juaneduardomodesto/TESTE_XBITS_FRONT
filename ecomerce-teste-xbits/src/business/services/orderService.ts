import { apiClient } from "..";
import { CheckoutRequest, OrderResponse, ProcessPaymentRequest, PageParams, PageList } from "../dto";

export class OrderService {
  private basePath = '/Order';

  async checkout(request: CheckoutRequest): Promise<OrderResponse | null> {
    return await apiClient.post<OrderResponse | null>(`${this.basePath}/checkout`, request);
  }

  async processPayment(request: ProcessPaymentRequest): Promise<boolean> {
    return await apiClient.post<boolean>(`${this.basePath}/process-payment`, request);
  }

  async cancelOrder(orderId: number, reason: string): Promise<boolean> {
    return await apiClient.put<boolean>(`${this.basePath}/cancel/${orderId}`, reason);
  }

  async getById(id: number): Promise<OrderResponse | null> {
    return await apiClient.get<OrderResponse | null>(`${this.basePath}/get_order_by_id/${id}`);
  }

  async getByNumber(orderNumber: string): Promise<OrderResponse | null> {
    return await apiClient.get<OrderResponse | null>(
      `${this.basePath}/get_order_by_number/${orderNumber}`
    );
  }

  async getMyOrders(pageParams: PageParams): Promise<PageList<OrderResponse>> {
    return await apiClient.get<PageList<OrderResponse>>(`${this.basePath}/my-orders`, pageParams);
  }
}

export const orderService = new OrderService();