/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.nexon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fco.dn.nexoncdn.co.kr",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
