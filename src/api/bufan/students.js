import request from './requ'

function getStudentList(kvs){
  return request({
    url:'/admin/xy/student/list',
    method:'get',
    kvs
  })
}
function classList(kvs){
  return request({
    url:'/admin/xy/clazz/list',
    method:'get',
    kvs
  })
}
function addStd(kvs){
  return request({
    url:'/admin/xy/student/save',
    method:'POST',
    kvs
  })
}
// 学员明细查询
function detail(kvs){
  return request({
    url:'/admin/xy/student/detail',
    method:'get',
    kvs
  })
}
// 历史缴费记录
function historyList(kvs){
  return request({
    url:'/admin/xy/cost/list',
    method:'get',
    kvs
  })
}
// 编辑更新
function update(kvs){
  return request({
    url:'/admin/xy/student/update',
    method:'post',
    kvs
  })
}
// 删除学院
function delstudent(kvs){
  return request({
    url:'/admin/xy/student/del',
    method:'get',
    kvs
  })
}
export default {
  getStudentList,
  classList,
  addStd,
  detail,
  historyList,
  update,
  delstudent
}