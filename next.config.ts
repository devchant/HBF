import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  agentRules: false,
  async redirects() {
    return [
      { source: "/about.html", destination: "/about", permanent: false },
      { source: "/programs.html", destination: "/programs", permanent: false },
      { source: "/index.html", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
