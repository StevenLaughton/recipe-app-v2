const withTM = require('next-transpile-modules')(
  ['@ionic/react', '@ionic/core', '@stencil/core', 'ionicons']
);
const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
module.exports = withPWA(withTM({
  reactStrictMode: true,
  basePath: '',
  swcMinify: true,
  images: {
    domains: ['recipeappstorage.blob.core.windows.net'],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  }
}));
