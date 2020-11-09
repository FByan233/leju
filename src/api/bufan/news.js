import request from './requ'
// 初始化列表
function newList(kvs) {
  return request({
    url:'/admin/xy/news/list',
    method:'get',
    kvs
  })
}
// 更新功能
function updateList(kvs) {
  return request({
    url: '/admin/xy/news/update',
    method:'POST',
    kvs
  })
}
// 删除功能
function delList(kvs) {
  return request({
    url:  '/admin/xy/news/del',
    method:'get',
    kvs
  })
}
// 新闻详情
function detailnews(kvs) {
  return request({
    url: '/admin/xy/news/detail',
    method:'get',
    kvs
  })
}
// 新增新闻
function savenews(kvs) {
  return request({
    url:'/admin/xy/news/save',
    method:'POST',
    kvs
  })
}
export default {
  newList,
  updateList,
  delList,
  detailnews,
  savenews
}