const fs = require('fs');
const path = require('path');

// 文件夹结构
const folders = [
  'app',
  'app/profile',
  'app/shop',
  'app/shop/[productId]',
  'app/orders',
  'app/orders/[orderId]',
  'components/UI',
  'styles/components',
  'hooks',
  'services',
  'types',
];

// 文件结构及内容
const files = {
  'app/layout.tsx': '// 应用全局布局',
  'app/page.tsx': '// 应用的首页',
  'app/loading.tsx': '// 全局 loading 状态',
  'app/error.tsx': '// 全局 error 状态',
  'app/profile/layout.tsx': '// 个人中心页面的布局',
  'app/profile/page.tsx': '// 个人中心主页',
  'app/profile/qr.tsx': '// 会员二维码页面',
  'app/shop/layout.tsx': '// 线上商城页面的布局',
  'app/shop/page.tsx': '// 商城主页',
  'app/shop/[productId]/page.tsx': '// 商品详情页面',
  'app/orders/layout.tsx': '// 订单页面的布局',
  'app/orders/page.tsx': '// 订单列表页面',
  'app/orders/[orderId]/page.tsx': '// 订单详情页面',
  'components/layout.tsx': '// 导航栏等公共布局组件',
  'styles/globals.css': '/* 全局样式 */',
  'hooks/useFetch.ts': '// 数据获取 Hook',
  'services/api.ts': '// API 请求配置',
  'services/user.ts': '// 用户相关 API 服务',
  'types/user.ts': '// 用户类型定义',
  'types/order.ts': '// 订单类型定义',
};

// 创建文件夹
folders.forEach((folder) => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
});

// 创建文件并写入注释内容
Object.keys(files).forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, files[file]);
  }
});

console.log('项目结构已生成');
