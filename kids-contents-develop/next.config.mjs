import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
export default function nextConfig(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    compress: true,
    output: "standalone",
    distDir: isDev ? ".next-dev" : ".next-build",
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "dhhgchgmvweoegnddovm.supabase.co",
        },
      ],
    },
  };
}
