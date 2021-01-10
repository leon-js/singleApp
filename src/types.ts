/**
* 子应用配置
* @param {string} src - 子应用地址
* @param {string} path - 路径
* @param {boolean} exact - 是否精确匹配路径
*/
export type AppConfig = {
  src: string
  path: string
  exact?: boolean
}

export type Map<Data> = {
  [key in string | number]: Data
}