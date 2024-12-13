export interface userAddress {
  id: string;
  location: string;
  phone: '434344292';
  email: string;
  isDefault: boolean;
  is_billing: boolean;
  is_shipping: boolean;
  deleted_at?: string | null;
  member_id: number;
  address_type: string;
  is_primary: boolean;
  is_verified: boolean;
}
