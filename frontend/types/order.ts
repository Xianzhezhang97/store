export interface Customization {
  optionId: string;
  choice: string;
}

export interface OrderItem {
  id: number;
  name: string;
  image: string | null;
  customizations: Customization[];
  quantity: number;
  price: number; // 现价
  originalPrice: number; // 原价
}

export interface CustomerInfo {
  id: string | null;
  name: string;
  contact: string;
  phone: string;
}

export interface Order {
  id: string;
  store: string;
  location: string;
  items: OrderItem[];
  subtotal: number; // 小计金额
  discount: number; // 折扣金额
  vocher: number; // 优惠券金额
  deliveryFee: number; // 配送费
  total: number; // 总金额
  status: string; // 订单状态
  paymentMethod: string; // 支付方式
  credit: number; // 用户信用额度
  growth: number; // 成长值（积分或奖励点数）
  pickupNumber: string; // 取货号码
  orderTime: string; // 订单时间
  paymentTime: string; // 支付时间
  deliveryStatus: string; // 配送状态
  orderComment: string; // 订单备注
  customerInfo: CustomerInfo; // 顾客信息
}

export interface OrderState {
  orders: Order[];
  currentTab: 'All' | 'Review' | 'Support';
}
