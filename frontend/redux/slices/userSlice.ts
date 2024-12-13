import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Voucher } from '@/types/userVoucher';
import { userType } from '@/types/userType';
import { userAddress } from '@/types/userAddress';
import { Transaction } from '@/types/transaction';

// 示例代币数据
const vouchersExample: Voucher[] = [
  {
    id: '1yvr87f597',
    name: '立减100元',
    type: 'fixed',
    description:
      '这张券满500元可用，这张券满500元可用。这张券满500元可用，这张券满500元可用。这张券满500元可用，这张券满500元可用。这张券满500元可用，这张券满500元可用。',
    value: 100,
    minimumSpend: 500,
    available: true,
    expiredAt: '2024-12-31',
    status: 'unused',
  },
  {
    id: '2hbgyh89t78gt7r79g9',
    name: '满100减10%',
    type: 'percentage',
    available: true,
    description:
      '这张券满100元可用，这张券满100元可用。这张券满100元可用，这张券满100元可用。这张券满100元可用，这张券满100元可用。这张券满100元可用，这张券满100元可用。',
    value: 10,
    maxDeducer: 100,
    minimumSpend: 100,
    expiredAt: '2024-12-31',
    status: 'unused',
  },
  {
    id: '3hgruyhvi',
    name: '兑换免费酒店住宿',
    type: 'exchange',
    available: true,
    description:
      '这张券可兑换一晚酒店住宿。这张券可兑换一晚酒店住宿。这张券可兑换一晚酒店住宿。这张券可兑换一晚酒店住宿。这张券可兑换一晚酒店住宿。',
    value: 0,
    exchangeItem: '酒店住宿一晚',
    expiredAt: '2024-12-31',
    status: 'unused',
  },
  {
    id: '4hkjhjvtu',
    name: '兑换免费啤酒一瓶',
    available: true,
    description:
      '这张券可兑换一瓶啤酒。这张券可兑换一瓶啤酒。这张券可兑换一瓶啤酒。这张券可兑换一瓶啤酒。这张券可兑换一瓶啤酒。这张券可兑换一瓶啤酒。',
    type: 'exchange',
    value: 0,
    exchangeItem: '啤酒一瓶',
    expiredAt: '2024-12-31',
    status: 'unused',
  },
  {
    id: '5hgjgj7',
    name: '买一送一',
    available: false,
    type: 'bundle',
    description:
      '这张券可换购啤酒系列和啤酒系列。这张券可换购啤酒系列和啤酒系列。这张券可换购啤酒系列和啤酒系列。这张券可换购啤酒系列和啤酒系列。这张券可换购啤酒系列和啤酒系列。',
    value: 50,
    bundleItems: ['啤酒系列', '咖啡系列'],
    expiredAt: '2024-12-31',
    status: 'unused',
  },
];

const addressExample: userAddress[] = [
  {
    id: '1',
    location: '123 Main St, Kinsford, 2000, Sydney',
    phone: '434344292',
    email: 'scott@example.com',
    isDefault: false,
    is_billing: false,
    is_shipping: false,
    member_id: 5443003,
    address_type: 'billing',
    is_primary: true,
    is_verified: true,
  },
  {
    id: '2',
    location: '136 Boyce Rd, Maroubra, 2035, Sydney',
    phone: '434344292',
    email: 'scott@example.com',
    isDefault: true,
    is_billing: true,
    is_shipping: true,
    deleted_at: null,
    member_id: 5443003,
    address_type: 'Home',
    is_primary: true,
    is_verified: true,
  },
];

// 初始状态
// const initialState: userType = {
//   name: 'Login',
//   avatar: '',
//   email: '',
//   isLoggedIn: false,
//   gender: '',
//   pronoun: '',
//   birthday: '',
//   growth: 0,
//   balance: 0,
//   credit: 0,
//   type: 'normal',
//   member_id: 0,
//   card_creatAt: true,
//   status: 'active',
//   phone: '',
//   location: [],
//   voucher: [],
//   transaction: [],
//   userLocation: { lat: -33.8688, lng: 151.2093 },
// };

const initialState: userType = {
  name: 'Scott Cheung',
  avatar: '/graph/avater.png',
  email: 'scott@example.com',
  isLoggedIn: true,
  gender: 'Male',
  pronoun: 'They',
  birthday: '1997-11-10',
  growth: 6780,
  balance: 700,
  credit: 2034,
  type: 'normal',
  member_id: 5443003,
  card_creatAt: false,
  status: 'active',
  phone: '434344292',
  location: addressExample,
  voucher: vouchersExample,
  userLocation: { lat: -33.8688, lng: 151.2093 },
  transaction: [
    {
      tid: 'a3ec0f89-5938-4f3e-97c5-8630fb0a770e',
      deposit: null,
      withdraw: {
        amount: 1,
        credit: 0.5,
        original: 1,
      },
      created_at: '2024-09-13T09:28:40.988460',
    },
    {
      tid: '06e45c5f-ef2b-4c70-aae6-1bc566e0abe1',
      deposit: null,
      withdraw: {
        amount: 1,
        credit: 0.5,
        original: 1,
      },
      created_at: '2024-09-13T09:28:34.400625',
    },
    {
      tid: 'd63572b0-7b00-4b62-9a37-240ae2ca083f',
      deposit: {
        amount: 500,
      },
      withdraw: null,
      created_at: '2024-09-13T07:33:27.173778',
    },
    {
      tid: '2c00a38d-a9f4-4ec5-b63a-dc9417ee906a',
      deposit: null,
      withdraw: {
        amount: 10,
        credit: 5,
        original: 10,
      },
      created_at: '2024-09-13T07:32:32.252065',
    },
    {
      tid: '5e5cda1a-a72d-4eea-a59b-cab0db8db5f1',
      deposit: {
        amount: 100,
      },
      withdraw: null,
      created_at: '2024-09-13T07:32:22.113941',
    },
  ],
};

// 定义 Redux Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<userType>>) => {
      Object.assign(state, action.payload);
      state.isLoggedIn = true;
    },
    logout: (state) => {
      (state.name = 'Login'),
        (state.avatar = ''),
        (state.email = ''),
        (state.isLoggedIn = false),
        (state.gender = ''),
        (state.pronoun = ''),
        (state.birthday = ''),
        (state.growth = 0),
        (state.balance = 0),
        (state.credit = 0),
        (state.type = 'normal'),
        (state.member_id = 0),
        (state.card_creatAt = true),
        (state.status = 'active'),
        (state.phone = ''),
        (state.location = []),
        (state.voucher = []);
      (state.userLocation = { lat: -33.8688, lng: 151.2093 }),
        (state.transaction = []);
    },
    setTransaction: (state, action: PayloadAction<Transaction[]>) => {
      state.transaction = action.payload; // 设置交易数据
    },
    setUserLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>,
    ) => {
      state.userLocation = action.payload;
    },
  },
});

export const { login, logout, setTransaction, setUserLocation } =
  userSlice.actions;
export default userSlice.reducer;
