/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Remove all console logs
    // removeConsole: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  crossOrigin: "anonymous",
  reactStrictMode: false,

  redirects: async () => {
    return [];
  },

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `https://api.amtalek.com/api/web/:path*`,
      },
    ];
  },

  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  images: {
    // images: {
    // formats: ["image/avif", "image/webp"],
    // },
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "amtalek.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "amtalek.amtalek.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.amtalek.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dmlygcfpc782j.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://dmlygcfpc782j.cloudfront.net/media/*",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "amtalek.codersdev.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.amtalek.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "amtalek.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    // تخصيصات إضافية هنا
    return config;
  },
};

// تعطيل console.logs في بيئة الإنتاج
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

export default nextConfig;
