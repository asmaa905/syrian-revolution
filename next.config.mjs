export default {
  reactStrictMode: true,
  experimental: {
    appDir: true, // If using the app directory
  },
  webpack(config) {
    config.infrastructureLogging = { debug: true };
    return config;
  },
};
