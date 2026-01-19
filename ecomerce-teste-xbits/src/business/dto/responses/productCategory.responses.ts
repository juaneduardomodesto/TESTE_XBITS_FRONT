import { ProductResponse } from "./product.responses";

export interface ProductCategoryResponse {
  id: number;
  name: string;
  description: string;
  productCategoryCode: string;
  products?: ProductResponse[];
}

export interface ProductCategorySummaryResponse {
  id: number;
  name: string;
  productCategoryCode: string;
  productCount: number;
}

export interface ProductCategoryDetailResponse extends ProductCategoryResponse {
  createdAt: string;
  updatedAt?: string;
  activeProductCount: number;
  totalProductValue: number;
}