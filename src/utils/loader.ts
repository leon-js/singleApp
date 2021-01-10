import { customConsole, typeCheck } from './index'
import { registerApplication, start } from 'single-spa'

import { AppConfig, Map } from '../types'

const SystemJS = (window as any).System

let routeAppNames: string[] = []
let routePaths: string[] = []
let routePathMap: Map<AppConfig> = {}

type Config = Map<AppConfig>
type SubAppConfig = Map<Config>


export default function(subAppConfig: SubAppConfig, options: Map<any>) {
  const NODE_ENV: string = process?.env?.NODE_ENV || 'development'
  const config: Config = subAppConfig[NODE_ENV]
  customConsole({title: '当前环境变量', content: NODE_ENV})
  registerApps(typeCheck(config, 'object') ? config : {}, typeCheck(options, 'object') ? options : {})
}

async function registerApps(config, options) {
  parseConfig(config)
  pageNotFound()
  await Promise.all(
    routeAppNames.map(item => {
      const { src, path, exact } = config[item]
      registerApplication(item, async () => {
        customConsole({title: '开始加载', content: new Date().valueOf()})
        const res = await SystemJS.import(`${src}?v=${new Date().valueOf()}`).then(() => {
          return window[item]
        })
        return res
      }, (location: { hash: string }) => {
        if (exact) {
          return location.hash === path
        } else {
          return location.hash.startsWith(path)
        }
      })
      return true
    })
  )
  start()
}

function parseConfig(config) {
  const pathMap = {}
  const paths: string[] = []
  routeAppNames = Object.keys(config).map((appName: string) => {
    const { path, src, exact } =  config[appName]
    pathMap[path] = { src, exact }
    paths.push(path)
    return appName
  })
  routePathMap = pathMap
  routePaths = paths
}

function pageNotFound() {
  let isNotFound = true
  const hash = location.hash
  Object.keys(routePathMap).forEach(path => {
    if (hash === path || hash.startsWith(path)) {
      const { exact } = routePathMap[path]
      if (exact) {
        if (hash === path) {
          isNotFound = false
        }
      } else {
        isNotFound = false
      }
    }
  })
  if (isNotFound) {
    location.href = routePaths[0]
  }
}