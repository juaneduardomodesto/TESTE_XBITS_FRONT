import { ERoles } from "@/business/enums";

export interface UserUpdateRequest {
  id: number;
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

export interface UserDeleteRequest {
  id: number;
}

export interface UserSearchParams {
  namePrefix?: string;
  emailPrefix?: string;
  cpfPrefix?: string;
  pageNumber: number;
  pageSize: number;
}