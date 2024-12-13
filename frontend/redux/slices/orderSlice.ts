import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderState, Customization } from '@/types/order';

// Sample order data, assuming types have been defined in '@/types/order'
const initialOrder: Order[] = [
  {
    id: '202404010010010001',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 1,
        name: 'Dark Chocolate with apple slices',
        image:
          'https://violetchocolates.com/wp-content/uploads/2020/05/PYRAMID-scaled.jpg',
        customizations: [
          { optionId: 'sugar', choice: 'Less sugar' },
          { optionId: 'milk', choice: 'No milk' },
        ],
        quantity: 1,
        originalPrice: 32.0,
        price: 30.5,
      },
      {
        id: 2,
        name: 'Normal Chocolate with leechee slices',
        image:
          'https://violetchocolates.com/wp-content/uploads/2022/01/IMG_8956-e1648165951992.jpeg',
        customizations: [
          { optionId: 'sugar', choice: 'More sugar' },
          { optionId: 'milk', choice: 'No milk' },
        ],
        quantity: 1,
        originalPrice: 22.0,
        price: 20.0,
      },
    ],
    subtotal: 54.0,
    discount: 3.5, // 新增：折扣金额
    vocher: 0.0, // 新增：优惠券金额
    deliveryFee: 0.0, // 新增：配送费
    total: 50.5,
    status: 'Processing',
    paymentMethod: 'Credit Card', // 新增：支付方式
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012896',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 6,
        name: 'Matcha Chocolate',
        image: null,
        customizations: [{ optionId: 'sugar', choice: 'Normal sugar' }],
        quantity: 2,
        originalPrice: 45.0,
        price: 42.0,
      },
    ],
    subtotal: 90.0,
    total: 84.0,
    status: 'Processing',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,

    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012897',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 7,
        name: 'Hazelnut Chocolate',
        image: null,
        customizations: [
          { optionId: 'sugar', choice: 'Less sugar' },
          { optionId: 'nuts', choice: 'Extra hazelnut' },
        ],
        quantity: 3,
        originalPrice: 60.0,
        price: 55.0,
      },
    ],
    subtotal: 180.0,
    total: 165.0,
    status: 'Confirmed',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,

    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012898',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 8,
        name: 'Caramel Chocolate',
        image:
          'https://violetchocolates.com/wp-content/uploads/2022/02/matcha-chocolate.jpeg',
        customizations: [{ optionId: 'caramel', choice: 'Extra caramel' }],
        quantity: 1,
        originalPrice: 40.0,
        price: 37.5,
      },
    ],
    subtotal: 40.0,
    total: 37.5,
    status: 'Ready to pick up',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,
    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012899',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 9,
        name: 'Mint Chocolate',
        image:
          'https://violetchocolates.com/wp-content/uploads/2022/02/matcha-chocolate.jpeg',
        customizations: [{ optionId: 'mint', choice: 'No mint' }],
        quantity: 4,
        originalPrice: 35.0,
        price: 33.0,
      },
    ],
    subtotal: 140.0,
    total: 132.0,
    status: 'Delivering',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,
    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012900',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 10,
        name: 'Peanut Butter Chocolate',
        image:
          'https://violetchocolates.com/wp-content/uploads/2022/02/matcha-chocolate.jpeg',
        customizations: [{ optionId: 'nuts', choice: 'No peanuts' }],
        quantity: 2,
        originalPrice: 55.0,
        price: 50.0,
      },
    ],
    subtotal: 110.0,
    total: 100.0,
    status: 'Completed',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,
    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012901',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 11,
        name: 'Almond Chocolate',
        image:
          'https://violetchocolates.com/wp-content/uploads/2022/02/matcha-chocolate.jpeg',
        customizations: [{ optionId: 'nuts', choice: 'Extra almonds' }],
        quantity: 1,
        originalPrice: 48.0,
        price: 45.0,
      },
    ],
    subtotal: 48.0,
    total: 45.0,
    status: 'Cancelled',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,
    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012902',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 12,
        name: 'Dark Chocolate with Berries',
        image:
          'https://violetchocolates.com/wp-content/uploads/2022/02/matcha-chocolate.jpeg',
        customizations: [{ optionId: 'berries', choice: 'Extra berries' }],
        quantity: 1,
        originalPrice: 55.0,
        price: 52.0,
      },
    ],
    subtotal: 55.0,
    total: 52.0,
    status: 'Processing',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,
    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
  {
    id: '202404011734279012903',
    store: 'Violet Chocolate',
    location: '123 Main St, Kinsford, 2000, Sydney',
    items: [
      {
        id: 13,
        name: 'Spicy Dark Chocolate',
        image:
          'https://violetchocolates.com/wp-content/uploads/2022/02/matcha-chocolate.jpeg',
        customizations: [{ optionId: 'spice', choice: 'Extra spice' }],
        quantity: 1,
        originalPrice: 47.0,
        price: 45.0,
      },
    ],
    subtotal: 47.0,
    total: 45.0,
    status: 'Confirmed',
    discount: 0,
    vocher: 0,
    deliveryFee: 0,
    paymentMethod: 'Credit Card',
    credit: 10.0, // 新增：用户信用额度
    growth: 5, // 新增：成长值（积分或奖励点数）
    pickupNumber: '12345', // 新增：取货号码
    orderTime: '2024-03-01 10:34', // 新增：订单时间
    paymentTime: '2024-03-01 10:35', // 新增：支付时间
    deliveryStatus: 'Pending', // 新增：配送状态
    orderComment: 'Leave at the door', // 新增：订单备注
    customerInfo: {
      id: '1234567890', //memberId
      name: 'John Doe', // 新增：顾客姓名
      contact: 'john.doe@example.com', // 新增：顾客联系信息
      phone: '123-456-7890', // 新增：顾客电话
    },
  },
];
// const initialOrder: Order[] = [];

const initialState: OrderState = {
  orders: initialOrder,
  currentTab: 'All',
};

const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setCurrentTab: (
      state,
      action: PayloadAction<'All' | 'Review' | 'Support'>,
    ) => {
      state.currentTab = action.payload;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; newStatus: string }>,
    ) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.orderId,
      );
      if (order) {
        order.status = action.payload.newStatus;
      }
    },
    updateItemCustomization: (
      state,
      action: PayloadAction<{
        orderId: string;
        itemId: number;
        customizations: Customization[];
      }>,
    ) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.orderId,
      );
      if (order) {
        const item = order.items.find(
          (item) => item.id === action.payload.itemId,
        );
        if (item) {
          item.customizations = action.payload.customizations;
        }
      }
    },
  },
});

export const {
  setOrders,
  setCurrentTab,
  updateOrderStatus,
  updateItemCustomization,
} = userOrderSlice.actions;
export default userOrderSlice.reducer;
