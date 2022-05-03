import * as path from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SubresourceIntegrityPlugin } from 'webpack-subresource-integrity'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { GitRevisionPlugin } from 'git-revision-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const isDev = process.env.NODE_ENV !== 'production'
const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --tags --long --always',
})

console.log('GIT version:', gitRevisionPlugin.version())
console.log('GIT hash:', gitRevisionPlugin.commithash())

const srcRoot = path.resolve(process.cwd(), 'src')
const distRoot = path.resolve(process.cwd(), isDev ? 'dist' : 'docs')

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval' : 'hidden-source-map',
  entry: {
    main: path.resolve(srcRoot, 'index.tsx'),
  },
  output: {
    path: distRoot,
    publicPath: isDev ? '/' : 'https://katochimoto.github.io/pwgen/',
    clean: true,
    filename: '[contenthash].js',
    chunkFilename: '[contenthash].js',
    assetModuleFilename: 'images/[contenthash][ext][query]',
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    alias: {
      '@': srcRoot,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              import: false,
              modules: {
                auto: true,
                mode: 'local',
                localIdentName: '[local]_[hash:base64:5]',
                localIdentContext: srcRoot,
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4 kB
          },
        },
      },
      {
        test: /\.svg/,
        use: [
          'svg-sprite-loader',
          'svgo-loader',
        ],
      },
    ],
  },
  optimization: {
    nodeEnv: isDev ? 'development' : 'production',
    moduleIds: 'deterministic',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      // @ts-expect-error TS2322
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: false,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 244000, // 244 kB
      minSize: 140000, // 140 kB
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '-',
    },
  },
  // @ts-expect-error TS2322
  plugins: [
    gitRevisionPlugin,

    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: [ '*.LICENSE.txt' ],
    }),

    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(gitRevisionPlugin.version()),
    }),

    isDev ? null : new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),

    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
      chunkFilename: '[contenthash].css',
      ignoreOrder: false,
    }),

    new HtmlWebpackPlugin({
      title: 'Pwgen',
      template: path.resolve(srcRoot, 'index.html'),
      filename: 'index.html',
      excludeChunks: [ 'callback' ],
      cache: false,
      inject: true,
    }),

    new SubresourceIntegrityPlugin({
      hashFuncNames: [ 'sha256', 'sha384', 'sha512' ],
      enabled: !isDev,
    }),
  ].filter(Boolean),

  devServer: {
    open: false,
    hot: false,
    https: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    host: 'localhost',
    port: 9003,
    compress: false,
    static: {
      publicPath: '/',
      directory: distRoot,
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join('/', 'index.html'),
        },
      ],
    },
  },
}

export default config
