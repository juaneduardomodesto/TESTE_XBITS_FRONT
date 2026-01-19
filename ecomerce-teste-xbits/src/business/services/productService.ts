import { apiClient } from "..";
import { ProductResponse, PageList, ProductRegisterRequest, ProductUpdateRequest, ProductDeleteRequest } from "../dto";

export class ProductService {
  private basePath = '/Product';

  async getById(productId: number): Promise<ProductResponse | null> {
    return await apiClient.get<ProductResponse | null>(`${this.basePath}/get_by_id`, { productId });
  }

  async getAll(params: {
    namePrefix?: string;
    descriptionPrefix?: string;
    pricePrefix?: number;
    productCodePrefix?: string;
    hasValidadeDatePrefix?: boolean;
    expirationDate?: string;
    productCategoryIdPrefix?: number;
    pageNumber: number;
    pageSize: number;
  }): Promise<PageList<ProductResponse>> {
    return await apiClient.get<PageList<ProductResponse>>(
      `${this.basePath}/list_products_paginated`,
      params
    );
  }

  async create(request: ProductRegisterRequest): Promise<boolean> {
    return await apiClient.post<boolean>(`${this.basePath}/register_product`, request);
  }

  async update(request: ProductUpdateRequest): Promise<boolean> {
    return await apiClient.put<boolean>(`${this.basePath}/update_product`, request);
  }

  async delete(request: ProductDeleteRequest): Promise<boolean> {
    return await apiClient.delete<boolean>(`${this.basePath}/delete_product`, request);
  }
}

export const productService = new ProductService();