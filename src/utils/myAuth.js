const TokenKey = 'vue_admin_token'
const userToken = 'vue_admin_userinfo'
export function getToken(){
  return window.localStorage.getItem(TokenKey)
}
export function setToken(val){
  window.localStorage.setItem(TokenKey,val)
}
export function removeToken(){
  window.localStorage.removeItem(TokenKey)
}
// 用户信息
export function getuserToken(){
  if(window.localStorage.getItem(userToken)&&window.localStorage.getItem(userToken)!=="undefined"){
    return JSON.parse(window.localStorage.getItem(userToken))
  }else{
    return null
  }
}
export function setuserToken(val){
  window.localStorage.setItem(userToken,JSON.stringify(val))
}
export function removeuserToken(){
  window.localStorage.removeItem(userToken)
}
export function clearAll(){
  removeToken()
  removeuserToken()
}