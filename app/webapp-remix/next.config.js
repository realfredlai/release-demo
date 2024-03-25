//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const withNextIntl = require('next-intl/plugin')();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  swcMinify: true,
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'autbcmlsgr.cloudimg.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rbk-imprint-unity-viewer-dev.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/viewer/**',
      },
      {
        protocol: 'https',
        hostname: 'reebok-unity-stg.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/viewer/**',
      },
      {
        protocol: 'https',
        hostname: 'reebok-pump-engine-dev.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/pfp/**',
      },
      {
        protocol: 'https',
        hostname: 'reebok-pump-engine-stg.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fv-reebok-assets-dev.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fv-reebok-assets-stage.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'reebok-remix-dev.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'reebok-remix-stg.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    loader: 'custom',
    loaderFile: './cloudImgLoader.ts',
  },
  experimental: { esmExternals: 'loose' },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withNextIntl,
];

module.exports = composePlugins(...plugins)(nextConfig);
