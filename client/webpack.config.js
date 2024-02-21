const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');


module.exports = env => {
  const
    outDir = path.resolve(__dirname, "./dist"),
    isDevelopment = env.mode === "development";

  /** @type {import("webpack").Configuration} */
  return ({
    entry: './src/index.tsx',
    mode: isDevelopment 
      ? "development"
      : "production",
    output: {
      path: outDir,
      pathinfo: !isDevelopment,
      filename: isDevelopment ? "scripts/[name].js" : "scripts/[name].[contenthash].js",
      chunkFilename: isDevelopment ? "scripts/[name].js" : "scripts/[name].[contenthash].js",
      publicPath: "/",
      clean: !isDevelopment && { keep: /\.ico$/i }
    },
    devtool: "inline-source-map",
    externalsPresets: {
      web: true,
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx", ".json"],
      fallback: {
        path: require.resolve("path-browserify")
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: false,
        inject: "head",
        favicon: "",
        minify: {
          removeAttributeQuotes: false,
          collapseWhitespace: false,
          html5: true,
          minifyCSS: true,
          removeComments: true,
          removeEmptyAttributes: true,
        },
        template: "./src/index.html",
        filename: './index.html' //relative to output root
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          use: 'ts-loader', // Use ts-loader for JS and JSX files
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: 'json-loader', // Use json-loader for JSON files
          type: 'javascript/auto', // Specify the type
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ],
        },
      ],
    },
    devServer: {
      port: 3001,
      hot: true,
      historyApiFallback: true,
      allowedHosts: "all",
      https: true,
      http2: true,
      open: "/",
      client: {
        progress: false,
        overlay: true,
        logging: "info"
      }
    },
    optimization: {
      moduleIds: "named",
      chunkIds: "named",
      removeAvailableModules: env.mode !== "development",
      removeEmptyChunks: env.mode !== "development",
      concatenateModules: env.mode !== "development",
      minimize: env.mode !== "development",
      nodeEnv: env.mode === "development" ? "development" : "production",
      splitChunks: {
        name: false,
        cacheGroups: {
          vendor: {
            name: "vendor",
            chunks: "initial",
            test: path.resolve(process.cwd(), "node_modules"),
            reuseExistingChunk: true,
            enforce: true
          },
          default: false
        }
      },
      runtimeChunk: {
        name: ({ name }) => `runtime-${name}`
      },
    },
  });
};
