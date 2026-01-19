/**
 * Parâmetros de paginação
 */
export interface PageParams {
  pageNumber: number;
  pageSize: number;
}

/**
 * Lista paginada genérica
 */
export interface PageList<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface DomainNotification {
  key: string;
  value: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  errors?: DomainNotification[];
  message?: string;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: DomainNotification[];
  timestamp: string;
  path?: string;
}

export interface DateRangeFilter {
  startDate?: string;
  endDate?: string;
}

export interface PriceRangeFilter {
  minPrice?: number;
  maxPrice?: number;
}

export interface SortOptions {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

export interface UserCredential {
  userId: string;
  email: string;
  role: string;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}