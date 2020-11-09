import request from './requ'
function login(kvs){
  return request({
    url:'/admin/login/doLogin',
    method:'POST',
    kvs
  })
}
export default{
  login
}