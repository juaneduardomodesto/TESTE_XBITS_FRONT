export enum ERoles {
  Administrator = 1,
  Employee = 2,
  Customer = 3
}

export enum ECartStatus {
  Active = 0,
  CheckedOut = 1,
  Abandoned = 2
}

export enum EOrderStatus {
  Pending = 0,
  Processing = 1,
  Shipped = 2,
  Delivered = 3,
  Cancelled = 4
}

export enum EPaymentMethod {
  CreditCard = 1,
  DebitCard = 2,
  Pix = 3,
  Cash = 4,
  BankSlip = 5
}

export enum EPaymentStatus {
  Pending = 0,
  Paid = 1,
  Failed = 2,
  Refunded = 3
}

export enum EEntityType {
  User = 1,
  Product = 2,
  Client = 3,
  Category = 4
}

export enum EImageType {
  Avatar = 1,
  Profile = 2,
  ProductMain = 3,
  ProductGallery = 4,
  Thumbnail = 5,
  Banner = 6
}

// ===== LABELS =====

export const RoleLabels: Record<ERoles, string> = {
  [ERoles.Administrator]: 'Administrador',
  [ERoles.Employee]: 'Funcionário',
  [ERoles.Customer]: 'Cliente'
};

export const CartStatusLabels: Record<ECartStatus, string> = {
  [ECartStatus.Active]: 'Ativo',
  [ECartStatus.CheckedOut]: 'Finalizado',
  [ECartStatus.Abandoned]: 'Abandonado'
};

export const OrderStatusLabels: Record<EOrderStatus, string> = {
  [EOrderStatus.Pending]: 'Pendente',
  [EOrderStatus.Processing]: 'Processando',
  [EOrderStatus.Shipped]: 'Enviado',
  [EOrderStatus.Delivered]: 'Entregue',
  [EOrderStatus.Cancelled]: 'Cancelado'
};

export const PaymentMethodLabels: Record<EPaymentMethod, string> = {
  [EPaymentMethod.CreditCard]: 'Cartão de Crédito',
  [EPaymentMethod.DebitCard]: 'Cartão de Débito',
  [EPaymentMethod.Pix]: 'PIX',
  [EPaymentMethod.Cash]: 'Dinheiro',
  [EPaymentMethod.BankSlip]: 'Boleto'
};

export const PaymentStatusLabels: Record<EPaymentStatus, string> = {
  [EPaymentStatus.Pending]: 'Pendente',
  [EPaymentStatus.Paid]: 'Pago',
  [EPaymentStatus.Failed]: 'Falhou',
  [EPaymentStatus.Refunded]: 'Reembolsado'
};

// ===== UTILITY FUNCTIONS =====

export function parseOrderStatus(status: string | number): EOrderStatus {
  if (typeof status === 'number') return status;
  
  const statusMap: Record<string, EOrderStatus> = {
    'Pending': EOrderStatus.Pending,
    'Processing': EOrderStatus.Processing,
    'Shipped': EOrderStatus.Shipped,
    'Delivered': EOrderStatus.Delivered,
    'Cancelled': EOrderStatus.Cancelled
  };
  
  return statusMap[status] ?? EOrderStatus.Pending;
}

export function parsePaymentStatus(status: string | number): EPaymentStatus {
  if (typeof status === 'number') return status;
  
  const statusMap: Record<string, EPaymentStatus> = {
    'Pending': EPaymentStatus.Pending,
    'Paid': EPaymentStatus.Paid,
    'Failed': EPaymentStatus.Failed,
    'Refunded': EPaymentStatus.Refunded
  };
  
  return statusMap[status] ?? EPaymentStatus.Pending;
}

export function parsePaymentMethod(method: string | number): EPaymentMethod {
  if (typeof method === 'number') return method;
  
  const methodMap: Record<string, EPaymentMethod> = {
    'CreditCard': EPaymentMethod.CreditCard,
    'DebitCard': EPaymentMethod.DebitCard,
    'Pix': EPaymentMethod.Pix,
    'Cash': EPaymentMethod.Cash,
    'BankSlip': EPaymentMethod.BankSlip
  };
  
  return methodMap[method] ?? EPaymentMethod.CreditCard;
}

export function parseCartStatus(status: string | number): ECartStatus {
  if (typeof status === 'number') return status;
  
  const statusMap: Record<string, ECartStatus> = {
    'Active': ECartStatus.Active,
    'CheckedOut': ECartStatus.CheckedOut,
    'Abandoned': ECartStatus.Abandoned
  };
  
  return statusMap[status] ?? ECartStatus.Active;
}