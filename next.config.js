const path = require('path');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/v2:path*',
        destination: 'https://exp.host/--/api/v2/push/send',
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};
