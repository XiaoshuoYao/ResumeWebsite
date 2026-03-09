/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/unity-builds/:path*",
        headers: [
          {
            key: "Content-Encoding",
            value: "gzip",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
