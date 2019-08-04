import {AxiosRequestConfig}from './types'
import xhr from './xhr'
function axios(config: AxiosRequestConfig) {
  console.log('config', config)
  xhr(config)
}

export default axios
