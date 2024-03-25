const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = config => {
  return {
    ...merge(config, {
      devtool: 'inline-source-map',
      entry: './src/index.ts',
      mode: 'production',
      output: {
        filename: '[name].js',
        libraryTarget: 'commonjs',
      },
      module: {
        // add 'ts-loader' so webpack builds dependencies
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
        ],
      },
      stats: {
        errorDetails: true,
      },
      target: 'node',
      resolve: {
        extensions: ['.ts', '.mjs', '.js', '.json', '.d.ts'],
      },
      plugins: [
        new webpack.DefinePlugin({ 'global.GENTLY': false }),
        new webpack.ProvidePlugin({
          WebSocket: 'ws',
          fetch: ['node-fetch', 'default'],
        }),
        new ZipPlugin({
          filename: 'lambdas.zip',
          fileOptions: {
            mtime: new Date(0),
          },
        }),
      ],
    }),
    externals: ['aws-sdk', 'aws-lambda', 'dd-trace', 'datadog-lambda-js']
  }
}
