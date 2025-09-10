/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",

  images: {
    domains: [
      "fakestoreapi.com", // example: allow external product images
      "firebasestorage.googleapis.com"
    ],
  },
};

module.exports = nextConfig;

