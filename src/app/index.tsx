import React, { useState, useCallback, useMemo } from 'react'
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // useParams
  useLocation
} from "react-router-dom"
import { Layout, Menu, 
  // Breadcrumb 
} from 'antd'
import { nav, iconMap } from '@config'

const {
   Header, Content, 
  //  Footer,
   Sider } = Layout
const { SubMenu } = Menu

const css = require('./index.less')


// const App = () => {
//   return (
//     <div className={css.app}>hello world App</div>
//   )
// }

interface _menuItem {
  icon?: any
  type: string
  title: string
  path: string
  items?: _menuItem[]
}

export default function singleApp() {
  console.log(1243, process.env.NODE_ENV)
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = useCallback((val) => {
    setCollapsed(val)
  }, [])

  return (
    <Layout className={css.app}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={css.logo} />
        <RenderMenu />
      </Sider>
      <Layout>
        <Header className={css.header} style={{ padding: 0 }} />
        <Content className={css.content}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div> */}
          <div id="app">这里是各个app哦</div>
        </Content>
        {/* {renderContent()} */}
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  )
}

const RenderMenu: any = () => {
  const { pathname } = useLocation()
  const defaultOpenKeys = pathname.split('/')
  let resultOpenkeys = defaultOpenKeys.slice(1, defaultOpenKeys.length - 1)
  if (resultOpenkeys.length) {
    resultOpenkeys = resultOpenkeys.map((item: string) => `/${item}`)
  }
  return (
    <Menu 
      theme="dark"
      selectedKeys={[pathname]}
      defaultOpenKeys={resultOpenkeys}
      mode="inline"
      className={css.menu}
    >
      {nav.menu.map(item => {
        const { type } = item
        if (type === 'mi') {
          return useMemo(() => renderMenuItem(item), [])
          // return renderMenuItem(item)
        } else if (type === 'sm') {
          return useMemo(() => renderSubMenu(item), [])
          // return renderSubMenu(item)
        }
      })}
    </Menu>
  )
}

const renderMenuItem = (item: _menuItem) => {
  return (
    <Menu.Item key={item.path} icon={iconMap[item.icon]} onClick={() => {}}>
      <Link to={item.path}>{item.title}</Link>
    </Menu.Item>
  )

  // return useMemo(() => <Menu.Item key={item.path} icon={iconMap[item.icon]} onClick={() => {}}>
  //   <Link to={item.path}>{item.title}</Link>
  // </Menu.Item>, [])
}

const renderSubMenu = (item: _menuItem) => {
  return (
    <SubMenu key={item.path} icon={iconMap[item.icon]} title={item.title}>
      {item.items?.map(item => renderMenuItem(item))}
    </SubMenu>
  )

  // return useMemo(() => <SubMenu key={item.path} icon={iconMap[item.icon]} title={item.title}>
  //   {item.items?.map(item => renderMenuItem(item))}
  // </SubMenu>, [])
}

// const renderContent = () => {
//   return (
//     <Content className={css.content}>
//       {/* <Breadcrumb style={{ margin: '16px 0' }}>
//         <Breadcrumb.Item>User</Breadcrumb.Item>
//         <Breadcrumb.Item>Bill</Breadcrumb.Item>
//       </Breadcrumb>
//       <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
//         Bill is a cat.
//       </div> */}
//       <div id="app">这里是各个app</div>
//     </Content>
//   )
// }


// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// // This site has 3 pages, all of which are rendered
// // dynamically in the browser (not server rendered).
// //
// // Although the page does not ever refresh, notice how
// // React Router keeps the URL up to date as you navigate
// // through the site. This preserves the browser history,
// // making sure things like the back button and bookmarks
// // work properly.

// export default function BasicExample() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//         </ul>

//         <hr />

//         {/*
//           A <Switch> looks through all its children <Route>
//           elements and renders the first one whose path
//           matches the current URL. Use a <Switch> any time
//           you have multiple routes, but you want only one
//           of them to render at a time
//         */}
//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/dashboard">
//             <Dashboard />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// // You can think of these components as "pages"
// // in your app.

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }
