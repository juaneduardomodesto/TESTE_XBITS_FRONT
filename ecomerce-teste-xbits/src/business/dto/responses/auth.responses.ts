export interface LoginResponse {
  userIdentifier: string;
  name: string,
  role: string,
  token: string;
  expireIn: number;
}

export interface TokenResponse {
  accessToken: string;
  userIdentifier: string;
  expireIn: number;
}