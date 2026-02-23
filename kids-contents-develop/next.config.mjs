/** @type {import('next').NextConfig} */

const nextConfig = {
  compress: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhhgchgmvweoegnddovm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
