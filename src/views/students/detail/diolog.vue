<template>
  <div class="dialog">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :before-close="deldialog">
      <el-form v-loading="loading">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="班级名称" label-width="80px">
              <el-input v-model="xyClassInfo.className" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级类型" label-width="80px">
              <el-select v-model="xyClassInfo.type" placeholder="请选择" clearable>
                <el-option label="前端" :value="0"></el-option>
                <el-option label="IU" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="开班时间" label-width="80px">
              <el-date-picker
                v-model="xyClassInfo.startTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="开班日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结课时间" label-width="80px">
              <el-date-picker
                v-model="xyClassInfo.endTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="结课时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级描述" label-width="80px">
              <el-input v-model="xyClassInfo.desc" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deldialog">取 消</el-button>
        <el-button type="primary" @click="clazzSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Clazzapi from "@/api/bufan/classapi";
export default {
  data() {
    return {
      loading:false,
      dialogFormVisible: false,
      xyClassInfo:{}
    };
  },
  props:['xyClassInfoes'],
  methods: {
    // 关闭dialog弹窗
    deldialog() {
      this.xyClassInfo = {};
      this.dialogFormVisible = false;
    },
    //展示弹窗
    showmask() {
      if(!this.xyClassInfo.id){
        this.xyClassInfo = {};
      }
      this.dialogFormVisible = true;
    },
        // 修改更新数据
    handleClick(i){
      this.showmask()
      this.loading=true
      Clazzapi.detail({id:i.id})
      .then(res=>{
          this.xyClassInfo=res.data
          this.loading=false
      })
      
    },
    // 发送添加数据
    clazzSave() {
      let obj = {};
      obj.xyClassInfo = this.xyClassInfo;
      if (this.xyClassInfo.id) {
        // 编辑数据
        Clazzapi.updata(obj);
      } else {
        // 添加数据
        Clazzapi.save(obj);
      }
      // this.getClasslist();
      this.$emit('refresh')
      this.dialogFormVisible = false;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>