import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MerchantList } from '@/types/merchantList';

const initialState: MerchantList = {
  merchantsData: [
    {
      uid: 1,
      name: "Scott's Hometown",
      address: 'Sichuan, China',
      latitude: 30.67,
      longitude: 104.06,
      created_at: '2024-09-13T07:26:32.059451',
      staff: 2,
      distance: 0,
    },
    {
      uid: 2,
      name: 'Sydney Opera House',
      address: 'Bennelong Point, Sydney NSW 2000',
      latitude: -33.8568,
      longitude: 151.2153,
      created_at: '2024-09-14T08:30:45.021451',
      staff: 200,
      distance: 1.5,
    },
    {
      uid: 3,
      name: 'Great Barrier Reef',
      address: 'Queensland, Australia',
      latitude: -18.2871,
      longitude: 147.6992,
      created_at: '2024-09-15T10:12:15.785612',
      staff: 150,
      distance: 1200,
    },
    {
      uid: 4,
      name: 'Uluru (Ayers Rock)',
      address: 'Uluru, Northern Territory, Australia',
      latitude: -25.3444,
      longitude: 131.0369,
      created_at: '2024-09-16T09:50:32.045120',
      staff: 50,
      distance: 450,
    },
    {
      uid: 5,
      name: 'Bondi Beach',
      address: 'Bondi Beach, NSW, Australia',
      latitude: -33.8908,
      longitude: 151.2743,
      created_at: '2024-09-17T11:22:18.145678',
      staff: 30,
      distance: 8,
    },
    {
      uid: 6,
      name: 'Blue Mountains',
      address: 'Blue Mountains, NSW, Australia',
      latitude: -33.7139,
      longitude: 150.311,
      created_at: '2024-09-18T13:15:42.578913',
      staff: 75,
      distance: 120,
    },
    {
      uid: 7,
      name: 'Kangaroo Island',
      address: 'South Australia, Australia',
      latitude: -35.8013,
      longitude: 137.118,
      created_at: '2024-09-19T12:05:23.512541',
      staff: 40,
      distance: 600,
    },
    {
      uid: 8,
      name: 'Phillip Island',
      address: 'Victoria, Australia',
      latitude: -38.4871,
      longitude: 145.2318,
      created_at: '2024-09-20T14:30:11.325641',
      staff: 35,
      distance: 150,
    },
  ],
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setMerchantsData(state, action: PayloadAction<Array<any>>) {
      state.merchantsData = action.payload;
    },
    clearMerchantsData(state) {
      state.merchantsData = [];
    },
  },
});

export const { setMerchantsData, clearMerchantsData } = merchantSlice.actions;

export default merchantSlice.reducer;
