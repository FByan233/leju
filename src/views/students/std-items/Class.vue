<template>
  <div class="class">
    <!-- 搜索部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>班级查询</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入班级" v-model="search.className" clearable></el-input>
        </el-col>
        <el-col :span="10" style="text-align:center">
          <!-- <el-input placeholder="请输入科目" v-model="search.type " clearable></el-input> -->
          <el-select v-model="search.type" placeholder="请选择" clearable>
            <el-option label="前端" :value="0"></el-option>
            <el-option label="IU" :value="1"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchitem">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 主体部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="showdialog">新增</el-button>
      </div>
      <el-row>
        <el-col :span="24">
          <el-table :data="ClassInfo" border style="width: 100%" v-loading="loading">
            <el-table-column fixed prop="className" label="班级名称" width="200"></el-table-column>
            <el-table-column prop="type" label="班级类型" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.type==0?'前端 ':'IU' }}</span>
              </template>
            </el-table-column>
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
            <el-table-column prop="desc" label="班级描述" width="200"></el-table-column>
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
    <!-- 弹窗功能 -->
    <maskdialog ref="maskdialog" @refresh="getClasslist"></maskdialog>
  </div>
</template>
<script>
import Clazzapi from "@/api/bufan/classapi";
import _ from "lodash";
import maskdialog from "../detail/diolog";
export default {
  components: {
    maskdialog
  },
  data() {
    return {
      search: {},
      ClassInfo: [],
      loading: false,
      pages: {
        start: 1,
        limit: 10,
        currentPage4: 1,
        pagesizes: [10, 20, 30, 40],
        pagesize: 10,
        total: 0
      },
      form: {}
    };
  },
  methods: {
    // 修改更新数据
    handleClick(i) {
      this.$refs.maskdialog.handleClick(i);
    },

    //点击删除
    delClick(val) {
      // console.log(val)
      Clazzapi.del({
        id: val.id
      });
      this.getClasslist();
    },
    // 初始化表格
    getClasslist() {
      this.loading = true;
      let obj = {
        start: this.pages.start,
        limit: this.pages.limit,
        ...this.search
      };
      obj = _.pickBy(obj, ele => ele);
      Clazzapi.ClassList(obj).then(res => {
        // console.log(res.data.list)
        this.ClassInfo = res.data.list;
        this.pages.total = res.data.totalRow;
        // this.xyClassInfo=res.data.list.id
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pages.limit = val;
      this.getClasslist();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pages.start = val;
      this.getClasslist();
      // console.log(`当前页: ${val}`);
    },
    showdialog() {
      this.$refs.maskdialog.showmask();
    },
    //点击查询
    searchitem() {
      for (let i in this.search) {
        if (this.search[i]) {
          this.pages.start = 1;
          this.pages.limit = 999;
        } else {
          this.pages.start = 1;
          this.pages.limit = 10;
        }
      }

      this.getClasslist();
    }
  },
  created() {
    this.getClasslist();
  }
};
</script>
<style lang="scss" scoped>
.class {
  width: 95%;
  margin: 0 auto;
}
.el-card {
  margin-top: 30px;
}
</style>