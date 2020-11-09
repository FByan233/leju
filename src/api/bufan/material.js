import request from './requ'
// 初始化
function materialList(kvs){
  return request({
    url:'/admin/xy/upload/list',
    method:'POST',
    kvs
  })
}
// 删除功能
function delList(kvs){
  return request({
    url:'/admin/xy/upload/del',
    method:'get',
    kvs
  })
}
// 上传图片
function updateImg(kvs){
  return request({
    url:'/admin/xy/upload/uploadImg',
    method:'POST',
    kvs
  })
}
export default {
  materialList,
  delList,
  updateImg
}