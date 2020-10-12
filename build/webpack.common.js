const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],                // 引入文件可以省略这四种后缀
    alias: {}                                                  // 设置路径
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
                // 指定特定的ts编译配置，为了区分脚本的ts配置
                configFile: resolve('../tsconfig.json')
            },
          },
        ]
      },
      {
        test: /\.css$/,                                       
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: {                                       // 支持css_modules的引入方式
                localIdentName: '[local]-[hash:5]'
              }
            }
          },
          {loader: 'less-loader'}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/_/wrapper.html'})
  ]
}