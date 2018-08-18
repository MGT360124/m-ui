'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const md = require('markdown-it')()
const slugify = require('transliteration').slugify
const striptags = require('./strip-tags')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './examples/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('examples'),
      "main": resolve("packages")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.less$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            minimize: true || {/* CSSNano Options */}
          }
        }, 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            minimize: true || {/* CSSNano Options */}
          }
        }, 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('examples'), resolve('test'), resolve('node_modules/webpack-dev-server/client'), resolve('packages')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options:{
          use: [
            [require('markdown-it-container'), 'demo', {
              validate: function (params) {
                return params.trim().match(/^demo\s*(.*)$/);
              },
              render: function (tokens, idx) {

                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

                if (tokens[idx].nesting === 1) {
                  var desc = tokens[idx + 2].content;
                  const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))
                  // 移除描述，防止被添加到代码块
                  tokens[idx + 2].children = [];

                  return `<code-block class="demo-box">
                    <div class="source" slot="source">${html}</div>
                    <div class="highlight" slot="highlight">`;
                }
                return '</div></code-block>\n';
              }
            }]
          ],
          preprocess: function (MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = function () {
              return '<table class="table">';
            };
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
            return source;
          }
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false
  },
}
var wrap = function (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};

module.exports.devtool = '#source-map'
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  })
  ,
  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
])