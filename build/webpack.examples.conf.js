'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require("./utils.js");
var md = require('markdown-it')()
const striptags = require('./strip-tags')
const uglify = require('uglifyjs-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextWebpackPlugin("styles/[name]-one.css");
const extractSCSS = new ExtractTextWebpackPlugin("styles/[name]-two.scss");
function resolve(dir) {
    return path.resolve(__dirname, dir); // path.resolve(__dirname,"")当前的文件所在的绝对路径
}
function wrap (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};
module.exports = {
    entry: {
        main:resolve("../examples/main.js") // mui 为chunk 名称
    },
    output: {
        path: resolve("../demo"),
        filename: "js/[name].bundle.js", // 多页功能打包，输出的是文件的名称是entry入口的chunk的mui
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
          },
          {
            test:/\.css$/,
            use: extractCSS.extract(["css-loader", "postcss-loader"])
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
            include: [resolve('examples'), resolve('node_modules/webpack-dev-server/client'), resolve('packages')]
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
    plugins: [
        new HtmlWebpackPlugin({
            template:'index.html',
            filename: "demo.html",
            inject: "head" //引入的脚本放在head头部标签中
            // favicon:resolve("../static/imgages/favicon.ico"), //图标
        }),
        new uglify(),
        extractCSS,
    ],
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "packages")], //引入依赖时,比如import balbala 等等之后，通过绝对路径往上一层一层找node_modules文件夹中的依赖项
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
            '@': path.resolve('packages'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录 
            '#': path.resolve('packages/components') //import Table from '#/table'
        },
        extensions: ['.js', '.vue', "json"],//扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
    },
    externals: {
        jquery: "jQuery" //防止将某些import的包package打包到bundle中,而是在运行时runtime再去从外部获取这些扩展依赖项 
    },
    devtool: "source-map",
}