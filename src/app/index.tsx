import { Layout, Menu} from 'antd'
import { nav, iconMap } from '@config'
import { Link, useLocation } from 'react-router-dom'
import React, { useState, useCallback, useMemo } from 'react'

const { Sider, Header, Content } = Layout
const { SubMenu } = Menu

import css from './index.less'

interface MenuItem {
  icon?: any
  type: string
  path: string
  title: string
  items?: MenuItem[]
}

export default function singleApp() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const onCollapse = useCallback((bool: boolean) => {
    setCollapsed(bool)
  }, [])

  return (
    <Layout className={css.app}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={css.logo}>
          {collapsed ? 'Leon' : 'Leon的小窝'}
        </div>
        <RenderMenu />
      </Sider>
      <Layout>
        <Header className={css.header} style={{ padding: 0 }} />
        <Content className={css.content}>
          <div id="app" className={css.subAppContainer}/>
        </Content>
      </Layout>
    </Layout>
  )
}

const RenderMenu = () => {
  const { pathname }: { pathname: string } = useLocation()
  const defaultOpenKeys: string[] = pathname.split('/')
  let resultOpenkeys: string[] = defaultOpenKeys.slice(1, defaultOpenKeys.length - 1)
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
      {nav.menu.map((item: MenuItem) => {
        const { type } = item
        if (type === 'mi') {
          return useMemo(() => renderMenuItem(item), [])
        } else if (type === 'sm') {
          return useMemo(() => renderSubMenu(item), [])
        }
      })}
    </Menu>
  )
}

const renderMenuItem = (item: MenuItem) => {
  return (
    <Menu.Item key={item.path} icon={iconMap[item.icon]} onClick={() => {}}>
      <Link to={item.path}>{item.title}</Link>
    </Menu.Item>
  )
}

const renderSubMenu = (item: MenuItem) => {
  return (
    <SubMenu key={item.path} icon={iconMap[item.icon]} title={item.title}>
      {item.items?.map(item => renderMenuItem(item))}
    </SubMenu>
  )
}
