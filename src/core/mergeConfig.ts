import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../utils'
/**
 * 复杂对象合并
 * @param val1 默认配置
 * @param val2 传入配置
 */
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

/**
 *
 * @param config1 默认配置
 * @param config2 自定义配置
 */
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  // 合并结果
  const config = Object.create(null)
  if (!config2) {
    config2 = {}
  }

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // const strat = strats[key] || defaultStrat
    const strat = defaultStrat // todo
    config[key] = strat(config1[key], config2![key])
  }

  return config
}

/**
 * 默认合并策略
 * @param val1 键值1
 * @param val2 键值2
 */
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

/**
 * 只接受自定义配置合并，比如url、params、data，
 * @param val1
 * @param val2
 */
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}
const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(item => {
  // strats[key] = fromVal2Strat[key] // todo???
})
