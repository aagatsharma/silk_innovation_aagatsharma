export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  user: User;
  expires_at: string;
}

interface User {
  "latest-version-enabled": boolean;
  name: string;
  email: string;
  mobile_no: string;
  gender: string;
  email_verified_at: string;
  phone_verified_at: string;
  should_change_password: boolean;
  fcm_token: string;
  desktop_fcm: string;
  amount: string;
  balance: number;
  bonus_balance: number;
  bonus: number;
  user_category: string;
  kyc_status: string;
  avatar: string | null;
  pin: boolean;
  pin_status: {
    transaction_pin: boolean;
    login_pin: boolean;
  };
  agent: string;
  agent_type: string;
  lowest_agent_level: boolean;
  agent_code: string;
  sub_agent: null;
  parent_agent: null;
  deduct_agent_balance: boolean;
  prize_code: string | null;
  bank_transfer_commission: null[];
  card_load_commission: {
    from: string | null;
    to: string | null;
    type: string | null;
    value: string | null;
  };
  kyc: {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
  };
  merchant: null;
}
