import request from './requ'
function ClassList(kvs){
  return request({
    url:'/admin/xy/clazz/list',
    method:'get',
    kvs
  })
};
// 添加班级信息
function save(kvs){
  return request({
    url:'/admin/xy/clazz/save',
    method:'POST',
    kvs
  })
};
// 删除班级信息
function del(kvs){
  return request({
    url:'/admin/xy/clazz/del',
    method:'get',
    kvs
  })
};
// 班级明细
function detail(kvs){
  return request({
    url:'/admin/xy/clazz/detail',
    method:'get',
    kvs
  })
};
// 更新信息
function updata(kvs){
  return request({
    url:'/admin/xy/clazz/update',
    method:'POST',
    kvs
  })
};
export default {
  ClassList,
  save,
  del,
  detail,
  updata
}