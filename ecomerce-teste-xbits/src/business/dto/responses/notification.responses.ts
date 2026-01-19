export enum NotificationType {
  OrderCreated = 0,
  OrderCancelled = 1,
  OrderShipped = 2,
  OrderDelivered = 3,
  PaymentReceived = 4,
  PaymentFailed = 5,
  LowStock = 6,
  UserRegistered = 7,
  SystemAlert = 8
}

export interface NotificationResponse {
  id: number;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  link?: string;
  metadata?: Record<string, any>;
}

export interface NotificationCountResponse {
  total: number;
  unread: number;
}

export interface MarkNotificationReadRequest {
  notificationIds: number[];
}