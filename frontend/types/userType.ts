import { Voucher } from '@/types/userVoucher';
import { userAddress } from '@/types/userAddress';
import { Transaction } from '@/types/transaction';
export interface userType {
  name: string;
  avatar: string;
  email: string;
  gender: string;
  birthday: string;
  pronoun: string;
  growth: number;
  isLoggedIn: boolean;
  balance: number;
  credit: number;
  type: string;
  card_creatAt: boolean;
  member_id: number;
  status: 'active' | 'inactive';
  phone: string;
  location: userAddress[];
  voucher: Voucher[];
  transaction: Transaction[];
  userLocation: {
    lat: number;
    lng: number;
  };
}
