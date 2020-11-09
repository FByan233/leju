import request from './requ'
// 初始化表格
function dormList(kvs) {
  return request({
    url:  '/admin/xy/dorm/list',
    method:'get',
    kvs
  })
}
// 删除功能
function dormdel(kvs) {
  return request({
    url:  '/admin/xy/dorm/del',
    method:'get',
    kvs
  })
}
// 更新功能
function updatedorm(kvs) {
  return request({
    url:  '/admin/xy/dorm/update',
    method:'POST',
    kvs
  })
}
//明细
function detaildorm(kvs) {
  return request({
    url: '/admin/xy/dorm/detail',
    method:'get',
    kvs
  })
}
// 新增功能
function savedorm(kvs) {
  return request({
    url:  '/admin/xy/dorm/save',
    method:'POST',
    kvs
  })
}
export default {
  dormList,
  dormdel,
  updatedorm,
  savedorm,
  detaildorm
}