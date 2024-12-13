/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // 主机名
        port: '', // 
        pathname: '/**', // 匹配所有路径
      },
      {
        protocol: 'https',
        hostname: 'violetchocolates.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
