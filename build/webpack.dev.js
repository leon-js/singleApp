const path = require('path')
const { merge } = require("webpack-merge")
const commonCfg = require('./webpack.common')
const resolve = dir => path.resolve(__dirname, dir);

// module.exports = merge(commonCfg, {
//   entry: './src/Main.js',
//   output: {
//     path: path.resolve(__dirname, '../src/_'),
//     filename: './bundle.js',
//     libraryTarget: 'umd'
//   },
//   devServer: {
//     port: 7070,
//     contentBase: path.join(__dirname, '../src/_'),
//     inline: true
//   }
// })

module.exports = merge(commonCfg, {
  entry: './src/main.tsx',
  output: {
    path: resolve('../src/_'),
    filename: './bundle.js',
    libraryTarget: 'umd'
  },
  devServer: {
    port: 7070,
    contentBase: path.join(__dirname, '../src/_'),
    inline: true,
    hot: true
  },
  devtool: 'inline-source-map',
  resolve: {
    // 设置别名
    alias: {
      // '@': resolve('../src'), // 这样配置后 @ 可以指向 src 目录
      // '@config': resolve('../src/config')
      '@': path.resolve('src'), // 这样配置后 @ 可以指向 src 目录
      '@config': path.resolve('src/config')
    }
  }
})