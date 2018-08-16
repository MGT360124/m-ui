'use strict'
const path = require('path')
const webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.conf')
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextWebpackPlugin("styles/[name]-one.css");
const extractSCSS = new ExtractTextWebpackPlugin("styles/[name]-two.scss");
function resolve(dir) {
    return path.resolve(__dirname, dir); // path.resolve(__dirname,"")当前的文件所在的绝对路径
}
module.exports = {
    entry: {
        mui: path.resolve(__dirname, "../packages/index.js") // mui 为chunk 名称
    },
    output: {
        path: resolve("../dist"),
        publicPath: '/',
        filename: "js/[name].js", // 多页功能打包，输出的是文件的名称是entry入口的chunk的mui
        library: 'mui',
        libraryTarget: 'amd'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.css$/,
                use: extractCSS.extract(["css-loader", "postcss-loader"])
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract(["css-loader", "scss-loader"])
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: "/packages/", //处理packages下面的js文件
                loader: "babel-loader",
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }
        ]
    },
    plugins: [
        new uglify(),
        extractCSS,
        extractSCSS,
    ],
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "packages")],
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