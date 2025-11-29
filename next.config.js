// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output:"export",

//   images: {
//     domains: [
//       "fakestoreapi.com", // example: allow external product images
//       "firebasestorage.googleapis.com"
//     ],
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // for static export
  images: {
    unoptimized: true, // disables Next.js Image Optimization for static export
    domains: ['fakestoreapi.com'], // allow external images
  },
};

module.exports = nextConfig;

