import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
import {getToken,clearAll} from '@/utils/myAuth'
import router from '@/router'
// create an axios instance
const service = axios.create({
  // baseURL:'', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
      config.headers['bufan-token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if(res.tokenCode=="5001"&&res.tokenCode=="5001"){
      Message({
            message:"登录过期或失效",
            type: 'error',
            duration: 5 * 1000
          })
          clearAll()
          router.push('/')
      return Promise.reject(new Error(res.message || 'Error'))
    }else{
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
function http(config){
  if (config.method.toLowerCase() === 'post') {
    // 序列化
    var params = qs.stringify(config.kvs, { arrayFormat: 'repeat', allowDots: true })
    config.data = params
  } else {
    config.params = config.kvs
  }
  return service(config)
}
export default http
