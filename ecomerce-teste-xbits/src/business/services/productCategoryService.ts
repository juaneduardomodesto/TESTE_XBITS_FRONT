import { apiClient } from "..";
import { ProductCategoryResponse, PageList, ProductCategoryRegisterRequest, ProductCategoryUpdateRequest, ProductCategoryDeleteRequest } from "../dto";

export class ProductCategoryService {
  private basePath = '/ProductCategory';

  async getById(productCategoryId: number): Promise<ProductCategoryResponse | null> {
    return await apiClient.get<ProductCategoryResponse | null>(
      `${this.basePath}/get_by_id`,
      { productCategoryId }
    );
  }

  async getAll(params: {
    namePrefix?: string;
    descriptionPrefix?: string;
    codePrefix?: string;
    pageNumber: number;
    pageSize: number;
  }): Promise<PageList<ProductCategoryResponse>> {
    return await apiClient.get<PageList<ProductCategoryResponse>>(
      `${this.basePath}/list_product_category_paginated`,
      params
    );
  }

  async create(request: ProductCategoryRegisterRequest): Promise<boolean> {
    return await apiClient.post<boolean>(
      `${this.basePath}/register_product_category`,
      request
    );
  }

  async update(request: ProductCategoryUpdateRequest): Promise<boolean> {
    return await apiClient.put<boolean>(
      `${this.basePath}/update_product_category`,
      request
    );
  }

  async delete(request: ProductCategoryDeleteRequest): Promise<boolean> {
    return await apiClient.delete<boolean>(
      `${this.basePath}/delete_product_category`,
      request
    );
  }
}

export const productCategoryService = new ProductCategoryService();