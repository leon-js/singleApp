import loader from './loader'
import { Map } from '../types'
import { typeMap } from '../config/const'

type Config = string | number | {value: string, style: Map<any>}
type ConsoleConfig = {
  title: Config
  content: Config
}

export function customConsole(consoleConfig: ConsoleConfig) {
  const consoleValue = {
    title: '请传入正确格式',
    content: '请传入正确格式'
  }
  const styles: string[] = [
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2'
  ]
  Object.keys(consoleConfig).forEach((key: string, index: number) => {
    const config: Config = consoleConfig[key]
    if (typeof config === 'string') {
      consoleValue[key] = config
    } else if (typeof config === 'object') {
      const { value, style } = config
      value && (consoleValue[key] = value)
      if (typeCheck(style, 'object')) {
        let styleString = ''
        Object.keys(style).forEach((key: string) => {
          styleString = styleString + key + ':' + style[key] + ';'
        })
        styles[index] = styleString
      }
    }
  })
  const resultConsoleConfig = [
    Object.keys(consoleValue).reduce((pre, cur) => {
      return `%c ${consoleValue[pre]} %c ${consoleValue[cur]} `
    }),
    ...styles
  ]
  console.log(...resultConsoleConfig)
}

export function typeCheck(value: any, type: string) {
  if (typeof type !== 'string') return false
  return Object.prototype.toString.call(value) === typeMap[type.toUpperCase()]
}

export function deepCopy(obj: any, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const hit: any = cache.filter((c: any) => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }
  const copy: any = Array.isArray(obj) ?  [] :   {}
  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })
  return copy
}

export {
  loader as loadSubApp
}