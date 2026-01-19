import { ImageResponse } from "./image.responses";
import { ProductCategoryResponse } from "./productCategory.responses";

export interface ProductResponse {
  imageUrl: any;
  id: number;
  name: string;
  description?: string;
  price: number;
  code: string;
  hasExpirationDate: boolean;
  expirationDate?: string;
  productCategoryId?: number;
  productCategory?: ProductCategoryResponse;
}

export interface ProductDetailResponse extends ProductResponse {
  images: ImageResponse[];
  mainImage?: ImageResponse;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductSummaryResponse {
  id: number;
  name: string;
  price: number;
  code: string;
  imageUrl?: string;
}

export interface ProductStockResponse {
  productId: number;
  productName: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  availableForSale: boolean;
}