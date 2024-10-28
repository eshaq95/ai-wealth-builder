export interface Asset {
  name: string;
  value: number;
}

export interface Portfolio {
  total_value: number;
  assets: Asset[];
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}
