export interface Merchant {
  distance: any;
  uid: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  created_at: string;
  staff: number;
}

export interface MerchantList {
  merchantsData: Merchant[];
}
