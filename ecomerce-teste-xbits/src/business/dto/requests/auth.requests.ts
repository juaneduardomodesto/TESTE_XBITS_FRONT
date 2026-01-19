import { ERoles } from "@/business/enums";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  acceptPrivacyPolicy: boolean;
  acceptTermsOfUse: boolean;
  isActive: boolean;
  roles: ERoles;
}