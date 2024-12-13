import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Static Imports
import Footer from './Footer';
import Logo from './Logo';
import Money from './Money';
import Placeholder from './Placeholder';
import ReturnBtn from './returnBtn';
import StickyTab from './stickyTab';
import SucessSVG from './sucessSVG';
import TopBg from './TopBg';
import staticData from '@/components/staticData.json';
import GlobalNotification from './GlobalNotification';

// Dynamic Imports with Suspense
const AccountBG = dynamic(() => import('./accountBG'), { suspense: true });
const AccountPannel = dynamic(() => import('./accountPannel'), {
  suspense: true,
});
const CardPolicy = dynamic(() => import('./CardPolicy'), { suspense: true });
const CardApply = dynamic(() => import('./CardApply'), { suspense: true });
const HomeTabBar = dynamic(() => import('./HomeTabBar'), { suspense: true });
const HomePannel = dynamic(() => import('./HomePannel'), { suspense: true });
const InputEdit = dynamic(() => import('./inputEdit'), { suspense: true });
const Login = dynamic(() => import('./login/Login'), { suspense: true });
const OptLogin = dynamic(() => import('./login/optLogin'), { suspense: true });
const OrderDetail = dynamic(() => import('./OrderDetail'), { suspense: true });

const OrderPannel = dynamic(() => import('./orderPannel'), { suspense: true });
const PaymentMethod = dynamic(() => import('./PaymentMethod'), {
  suspense: true,
});
const Signup = dynamic(() => import('./Signup'), { suspense: true });
const ShopSelector = dynamic(() => import('./ShopSelector'), {
  suspense: true,
});
const UserCard = dynamic(() => import('./card/userCard'), { suspense: true });
const UserPaymentSummary = dynamic(() => import('./userPaymentSummary'), {
  suspense: true,
});
const VoucherList = dynamic(() => import('./Voucher'), { suspense: true });
const OrderItem = dynamic(() => import('./OrderItem'), { suspense: true });
const Avatar = dynamic(() => import('./avatar'), { suspense: true });
const Transaction = dynamic(() => import('./Transaction'), { suspense: true });

// Components Object
const components = {
  AccountBG,
  AccountPannel,
  Footer,
  HomeTabBar,
  InputEdit,
  Login,
  Logo,
  Money,
  OptLogin,
  OrderDetail,
  OrderItem,
  OrderPannel,
  PaymentMethod,
  Placeholder,
  ReturnBtn,
  Signup,
  StickyTab,
  SucessSVG,
  TopBg,
  UserCard,
  UserPaymentSummary,
  VoucherList,
  staticData,
  HomePannel,
  ShopSelector,
  GlobalNotification,
  CardApply,
  Avatar,
  Transaction,
  CardPolicy,
};

export default components;
