import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './app'
// import 'antd/dist/antd.css'
import './main.less'

import subAppConfig from './config/basic/app.json'

// import { registerApplication, start } from 'single-spa'
import { loadSubApp } from './utils'

// const SystemJS = (window as any).System

// const Render = () => {
//   return (
//     <HashRouter>
//       <App />
//     </HashRouter>
//   )
// }

const Render = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

const init = async () => {
  loadSubApp(subAppConfig, {})
  // await SystemJS.import(`http://192.168.1.121:8080/bundle.js?v=${new Date()}`).then(res => {
  //   console.log(res, 'res')
  // })

  // console.log(singleSpa, 'singleSpa')

  // 加载react 项目的入口js文件 (模块加载)
  // const loadingFunction = () => SystemJS.import(`http://192.168.1.121:8080/bundle.js?v=${new Date()}`)

  // 当url前缀为 /react的时候.返回 true (底层路由)
  // const activityFunction = location => location.pathname.startsWith('/react')


  // const activityFunction = (location: { hash: string }) => {
  //   return location.hash.startsWith('#/a')
  // }

  

  // 注册应用 
  // registerApplication('react', async () => {
  //   let result
  //   await SystemJS.import(`http://172.17.216.7:8080/bundle.js?v=${new Date()}`).then(res => result = res)

  //   return result
  // }, activityFunction);

  // registerApplication('react', async () => {
  //   // console.log(4444)
    
  //   // return SystemJS.import(`http://localhost:7777/bundle.js?v=${new Date().valueOf()}`).then(res => {
  //   //   console.log(res, 'res')
  //   // })
  //   return {
  //     bootstrap: () => {
  //       return Promise.resolve()
  //     }, //bootstrap function
  //     mount: () => {
  //       // if (document && document.getElementById('app')) {
  //       //   // let dom = document.createElement('div')
  //       //   // dom.innerHTML = '大家好 这里是#/a'
  //       //   // document.getElementById('app').replaceChild(dom)
  //       //   // console.log(document.getElementById('app'), 333)
          
  //       // }

  //       const Dom = () => {
  //         return (
  //           <div>大家好 这里是#/a</div>
  //         )
  //       }
  //       ReactDom.render(<Dom />, document.getElementById('app'))
        
  //       return Promise.resolve()
  //     }, //mount function
  //     unmount: () => {
  //       ReactDom.unmountComponentAtNode(document.getElementById('app'))
  //       return Promise.resolve()
  //     }, //unmount function
  //   }
  //   // return SystemJS.import(`http://172.17.216.7:8080/bundle.js?v=${new Date()}`)
  // }, (location: { hash: string }) => {
  //   return location.hash.startsWith('#/a')
  // });

  // registerApplication('react2', async () => {
  //   // console.log(4444)
    
  //   // return SystemJS.import(`http://localhost:7777/bundle.js?v=${new Date().valueOf()}`).then(res => {
  //   //   console.log(res, 'res')
  //   // })
  //   return {
  //     bootstrap: () => {
  //       return Promise.resolve()
  //     }, //bootstrap function
  //     mount: () => {
  //       // if (document && document.getElementById('app')) {
  //       //   // let dom = document.createElement('div')
  //       //   // dom.innerHTML = 'helloworld 这里是#/b'
  //       //   // document.getElementById('app').replaceWith(dom)
          
  //       // }
        
  //       const Dom = () => {
  //         return (
  //           <div>helloworld 这里是#/b</div>
  //         )
  //       }
  //       ReactDom.render(<Dom />, document.getElementById('app'))

  //       return Promise.resolve(1)
  //     }, //mount function
  //     unmount: () => {
  //       ReactDom.unmountComponentAtNode(document.getElementById('app'))
  //       return Promise.resolve()
  //     }, //unmount function
  //   }
  //   // return SystemJS.import(`http://172.17.216.7:8080/bundle.js?v=${new Date()}`)
  // }, (location: { hash: string }) => {
  //   return location.hash.startsWith('#/b')
  // });

  // registerApplication('react3', async () => {
  //   // console.log(4444)
    
  //   // return SystemJS.import(`http://localhost:7777/bundle.js?v=${new Date().valueOf()}`).then(res => {
  //   //   console.log(res, 'res')
  //   // })

  //   // return SystemJS.import(`http://127.0.0.1:7777/bundle.js?v=${new Date().valueOf()}`).then(res => {
  //   //   // console.log(res, 'res react3')
  //   //   // return res.default
  //   //   return window['react3']
  //   // })

  //   const res = await SystemJS.import(`http://127.0.0.1:7777/bundle.js?v=${new Date().valueOf()}`).then(res => {
  //     // console.log(res, 'res react3')
  //     // return res.default
  //     return window['react3']
  //   })
  //   return res

  // }, (location: { hash: string }) => {
  //   return location.hash.startsWith('#/g/h')
  // });

  // //singleSpa 启动
  // start();

  ReactDom.render(<Render />, document.getElementById('_singleApp'))
}

init()


// ReactDom.render(<Render />, document.getElementById('_singleApp'))

// import React from 'react'
// import ReactDOM from 'react-dom'
// import singleSpaReact from 'single-spa-react'
// import App from './app'

// if (process.env.NODE_ENV === 'development') {
//   // 开发环境直接渲染
//   ReactDOM.render(<App />, document.getElementById('root'))
// }

// //创建生命周期实例
// const reactLifecycles = singleSpaReact({
//   React,
//   ReactDOM,
//   rootComponent: App,
//   domElementGetter: () => document.getElementById('root')
// })

// // 项目启动的钩子
// export const bootstrap = [
//   reactLifecycles.bootstrap,
// ]
// // 项目启动后的钩子
// export const mount = [
//   reactLifecycles.mount,
// ]
// // 项目卸载的钩子
// export const unmount = [
//   reactLifecycles.unmount,
// ]
