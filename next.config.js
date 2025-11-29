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
  images: {
    unoptimized: true, // optional if you want to bypass Next.js image optimization
    domains: ['fakestoreapi.com'], // allow external images
  },
};

module.exports = nextConfig;


