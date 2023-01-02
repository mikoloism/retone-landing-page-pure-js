/** @type {import('next').NextConfig} */

/**
 * for PWA
 * const withPWA = require('next-pwa');
 * const runtimeCaching = require('next-pwa/cache');
 **/

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
};

/**
 * NOTE : for PWA
 * module.exports = withPWA({
 *  pwa: {
 *    dest: 'public',
 *    runtimeCaching,
 *   },
 *  ...nextConfig,
 * });
 **/

module.exports = nextConfig;
