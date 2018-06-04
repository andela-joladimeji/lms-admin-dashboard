import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
import './tools/env';
import BundleAnalyzer from 'webpack-bundle-analyzer';

const BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin;

const GLOBALS = {
  'process.env.HOST': JSON.stringify(process.env.HOST),
  'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
  'process.env.AUTH_URL': JSON.stringify(process.env.AUTH_URL),
  'process.env.AUTH_LOGOUT_URL': JSON.stringify(process.env.AUTH_LOGOUT_URL),
  'process.env.API_URL': JSON.stringify(process.env.API_URL),
  'process.env.GATEWAY_URL': JSON.stringify(process.env.GATEWAY_URL),
  'process.env.AUTH_LOGGEDIN_URL': JSON.stringify(process.env.AUTH_LOGGEDIN_URL),
  'process.env.AIS_SEGMENT_KEY': JSON.stringify(process.env.AIS_SEGMENT_KEY),
  'process.env.SECRET_KEY': JSON.stringify(process.env.SECRET_KEY),
  'process.env.COOKIE_KEY': JSON.stringify(process.env.COOKIE_KEY),
  __DEV__: true
};

const ALIASES = {
  tools: path.resolve(__dirname, 'tools'),
  config: path.resolve(__dirname, 'tools/config'),
  src: path.resolve(__dirname, 'src'),
  actions: path.resolve(__dirname, 'src/actions'),
  components: path.resolve(__dirname, 'src/components'),
  constant: path.resolve(__dirname, 'src/constants'),
  containers: path.resolve(__dirname, 'src/containers'),
  images: path.resolve(__dirname, 'src/images'),
  reducers: path.resolve(__dirname, 'src/reducers'),
  store: path.resolve(__dirname, 'src/store'),
  styles: path.resolve(__dirname, 'src/styles'),
  utils: path.resolve(__dirname, 'src/utils'),
};

const webpackConfig = {
  resolve: {
    alias: ALIASES,
    extensions: ['*', '.js', '.jsx', '.json', '.css'],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  devtool: 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: [
    // './src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        context: '/',
        postcss: () => [autoprefixer],
      }
    }),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']}
    ]
  }
};

export default webpackConfig;
