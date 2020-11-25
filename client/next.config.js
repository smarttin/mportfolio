const path = require('path');
const { config } = require('process');
const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  env: {
    BASE_URL: dev ? 'http://localhost:4000' : 'https://onyeka-g.herokuapp.com/',
  },
};
