
export interface ProductCategoryRegisterRequest {
  name: string;
  description: string;
  code: string;
}

export interface ProductCategoryUpdateRequest extends ProductCategoryRegisterRequest {
  id: number;
}

export interface ProductCategoryDeleteRequest {
  id: number;
}

export interface ProductCategorySearchParams {
  namePrefix?: string;
  descriptionPrefix?: string;
  codePrefix?: string;
  pageNumber: number;
  pageSize: number;
}