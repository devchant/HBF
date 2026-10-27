import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  agentRules: false,
  async redirects() {
    return [
      { source: "/about.html", destination: "/about", permanent: false },
      { source: "/programs.html", destination: "/programs", permanent: false },
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/about", destination: "/ng/about", permanent: false },
      { source: "/programs", destination: "/ng/programs", permanent: false },
      { source: "/donate-nigeria", destination: "/ng/donate", permanent: false },
    ];
  },
};

export default nextConfig;
