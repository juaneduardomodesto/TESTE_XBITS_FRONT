import { apiClient } from "..";
import { LoginRequest, LoginResponse, UserRegisterRequest } from "../dto";

export class AuthService {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/Login/login', request);
    
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('userIdentifier', response.userIdentifier);
    localStorage.setItem('userName', response.name || '');
    localStorage.setItem('userRole', response.role || '');
  }
    
    return response;
  }

  async register(request: UserRegisterRequest): Promise<boolean> {
    return await apiClient.post<boolean>('/UserRegister/register_user', request);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userIdentifier');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserIdentifier(): string | null {
    return localStorage.getItem('userIdentifier');
  }

  setUserInfo(name: string, email: string): void {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
  }
}

export const authService = new AuthService();