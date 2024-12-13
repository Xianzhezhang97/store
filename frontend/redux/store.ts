import { configureStore, Middleware } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import merchantReducer from './slices/merchantSlice';

// 自定义日志中间件，类型安全
const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  // console.log('dispatching', action);
  const result = next(action);
  // console.log('next state', storeAPI.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    global: globalReducer,
    language: languageReducer,
    theme: themeReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    merchant: merchantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware), // 添加日志中间件
});

// 类型导出
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
