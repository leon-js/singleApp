const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin



module.exports = {
  externals: [{
    'React': 'React',
    'react': 'React',
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    },
    'antd': 'antd',
    '@ant-design/icons': 'icons',
  }],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],                // 引入文件可以省略这四种后缀
    alias: {}                                                  // 设置路径
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react'  // jsx支持
                //['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
              ],
              plugins: [
                ['@babel/plugin-proposal-class-properties', {'loose': true}] // class中的箭头函数中的this指向组件
              ],
              cacheDirectory: true // 加快编译速度
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        //include: [pathSrc, testSrc],
        use: [
          // {
          //   loader: './config/test-loader'
          // },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react'  // jsx支持
                //['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }]
              ],
              plugins: [
                // ["import",{
                //   "libraryName":"antd",
                //   "libraryDirectory":"es",
                //   "style":"css"
                //   }],
                // ["import", {
                //   "libraryName": "@ant-design/icons",
                //   "style": false,
                //   "libraryDirectory": "es/icons",
                //   "camel2DashComponentName": false
                // }, "@ant-design/icons"],
                ['@babel/plugin-proposal-class-properties', {'loose': true}]
              ],
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              silent: true,
              transpileOnly: true
            }
          }
        ]
      },

      // {
      //   test: /\.tsx?$/,
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //           // 指定特定的ts编译配置，为了区分脚本的ts配置
      //           configFile: resolve('../tsconfig.json')
      //       },
      //     },
      //   ]
      // },
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
    new HtmlWebpackPlugin({template: './src/_/wrapper.html'}),
    new BundleAnalyzerPlugin()
  ]
}