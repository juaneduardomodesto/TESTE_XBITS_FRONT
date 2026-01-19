import { ERoles } from "@/business/enums";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  cpf: string;
  acceptPrivacyPolicy: boolean;
  acceptTermsOfUse: boolean;
  isActive: boolean;
  role: ERoles;
}

export interface UserSummaryResponse {
  id: number;
  name: string;
  email: string;
  role: ERoles;
}

export interface UserProfileResponse extends UserResponse {
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
}