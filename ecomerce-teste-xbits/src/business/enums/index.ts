
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
  CreditCard = 0,
  DebitCard = 1,
  Pix = 2,
  Cash = 3,
  BankSlip = 4
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