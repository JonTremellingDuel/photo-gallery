// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/server.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'bcrypt': {},
    'kerberos': {},
    'snappy': {},
    'aws4': {},
    'snappy/package.json': {},
    'mongodb-client-encryption': {},
    'nock': {},
    'aws-sdk': {},
    'mock-aws-s3': {},
    'npm': {},
    'node-gyp': {},
    '@mongodb-js/zstd': {},
    '@aws-sdk/credential-providers': {},
    'gcp-metadata': {},
    'socks': {}
  }
};
