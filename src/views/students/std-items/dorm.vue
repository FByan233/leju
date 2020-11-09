<template>
  <div class="dorm">
    <!-- 搜索部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>宿舍查询</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入宿舍" v-model="search.name" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchdorm">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 主体部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="showmask">新增</el-button>
      </div>
      <el-row>
        <el-col :span="24">
          <el-table :data="dormInfo" border style="width: 100%" v-loading="loading">
            <el-table-column fixed prop="name" label="宿舍名称" width="200"></el-table-column>
            <el-table-column prop="type" label="宿舍类型" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.type==0?'男生宿舍 ':(scope.row.type==1?'女生宿舍':'未定') }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed prop="position" label="宿舍地址" width="200"></el-table-column>
            <el-table-column prop="startTime" label="开班时间" width="250">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime?scope.row.startTime.substr(0,10):'时间不明'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="endTime" label="给课时间" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.endTime?scope.row.endTime.substr(0,10):'时间不明'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="bak" label="宿舍描述" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="text-align:right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pages.currentPage4"
            :page-sizes="pages.pagesizes"
            :page-size="pages.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pages.total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <!-- 弹窗部分 -->
    <el-dialog title="宿舍管理" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="宿舍名称" label-width="80px">
              <el-input v-model="xyDormInfo.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="宿舍类型" label-width="80px">
              <el-select v-model="xyDormInfo.type" clearable placeholder="请选择">
                <el-option label="男生宿舍" :value="0"></el-option>
                <el-option label="女生宿舍" :value="1"></el-option>
                <el-option label="未定" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="宿舍地址" label-width="80px">
              <el-input v-model="xyDormInfo.position" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="选择开班日期" label-width="120px">
              <el-date-picker
                v-model="xyDormInfo.startTime"
                type="date"
                placeholder="选择开班日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="选择结束日期" label-width="120px">
              <el-date-picker
                v-model="xyDormInfo.endTime"
                type="date"
                placeholder="选择结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="班级描述" label-width="80px">
              <el-input v-model="xyDormInfo.bak" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dormSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dormapi from "@/api/bufan/dorm.js";
import _ from "lodash";
export default {
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      search: {},
      xyDormInfo: {},
      dormInfo: [],
      pages: {
        start: 1,
        limit: 10,
        currentPage4: 1,
        total: 0,
        pagesizes: [10, 20, 30, 40],
        pagesize: 10
      }
    };
  },
  methods: {
    // 新增功能
    dormSave() {
      let obj = {};
      obj.xyDormInfo = this.xyDormInfo;
      if (this.xyDormInfo.id) {
        dormapi.updatedorm(obj);
      } else {
        dormapi.savedorm(obj);
      }
      this.getDormList();
      this.xyDormInfo = {};
      this.dialogFormVisible = false;
    },
    //初始化表格
    getDormList() {
      let obj = {
        start: this.pages.start,
        limit: this.pages.limit,
        ...this.search
      };
      console.log(obj)
      obj = _.pickBy(obj, ele => ele);
      dormapi.dormList(obj).then(res => {
        this.pages.total = res.data.totalRow;
        this.dormInfo = res.data.list;
        // console.log(res.data)
      });
    },
    handleSizeChange(val) {
      this.pages.limit = val;
      this.getDormList();
    },
    handleCurrentChange(val) {
      this.pages.start = val;
      this.getDormList();
    },
    //搜索功能
    searchdorm() {
      this.getDormList();
    },
    // 关闭弹窗
    handleClose() {
      this.dialogFormVisible = false;
      this.xyDormInfo = {};
    },
    // 展示弹窗
    showmask() {
      this.dialogFormVisible = true;
    },
    // 编辑功能
    handleClick(i) {
      this.loading=true
      this.showmask();
      // console.log(i.id)
      dormapi.detaildorm({ id: i.id }).then(res => {
        this.xyDormInfo = res.data;
        // console.log(res.data)
        this.loading=false
      });
    },
    // 删除功能
    delClick(i) {
      dormapi
        .dormdel({
          id: i.id
        })
        .then(() => {
          this.getDormList();
        });
    }
  },
  created() {
    this.getDormList();
  }
};
</script>
<style lang="scss" scoped>
</style>