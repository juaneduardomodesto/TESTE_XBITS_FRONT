export interface ProductRegisterRequest {
  name: string;
  description?: string;
  price: number;
  code: string;
  hasExpirationDate: boolean;
  expirationDate?: string;
  productCategoryId: number;
}

export interface ProductUpdateRequest extends ProductRegisterRequest {
  productId: number;
}

export interface ProductDeleteRequest {
  productId: number;
}

export interface ProductSearchParams {
  namePrefix?: string;
  descriptionPrefix?: string;
  pricePrefix?: number;
  productCodePrefix?: string;
  hasValidadeDatePrefix?: boolean;
  expirationDate?: string;
  productCategoryIdPrefix?: number;
  pageNumber: number;
  pageSize: number;
}

export interface ProductStockUpdateRequest {
  productId: number;
  quantity: number;
  operation: 'add' | 'subtract' | 'set';
}