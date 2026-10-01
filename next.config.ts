import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trang đã gộp song ngữ vào "/" — giữ link /en, /km cũ không bị 404.
  redirects: () => [
    { source: "/en", destination: "/", permanent: false },
    { source: "/km", destination: "/", permanent: false },
  ],
};

export default nextConfig;
