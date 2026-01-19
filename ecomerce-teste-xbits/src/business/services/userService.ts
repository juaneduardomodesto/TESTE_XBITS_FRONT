import { apiClient } from "..";
import { UserResponse, PageList, UserRegisterRequest, UserUpdateRequest, UserDeleteRequest } from "../dto";

export class UserService {
  private basePath = '/User';

  async getById(userId: number): Promise<UserResponse | null> {
    return await apiClient.get<UserResponse | null>(`${this.basePath}/get_by_id`, { userId });
  }

  async getAll(params: {
    namePrefix?: string;
    emailPrefix?: string;
    cpfPrefix?: string;
    pageNumber: number;
    pageSize: number;
  }): Promise<PageList<UserResponse>> {
    return await apiClient.get<PageList<UserResponse>>(
      `${this.basePath}/list_users_paginated`,
      params
    );
  }

  async create(request: UserRegisterRequest): Promise<boolean> {
    return await apiClient.post<boolean>(`${this.basePath}/register_user`, request);
  }

  async update(request: UserUpdateRequest): Promise<boolean> {
    return await apiClient.put<boolean>(`${this.basePath}/update_user`, request);
  }

  async delete(request: UserDeleteRequest): Promise<boolean> {
    return await apiClient.delete<boolean>(`${this.basePath}/delete_user`, request);
  }
}

export const userService = new UserService();