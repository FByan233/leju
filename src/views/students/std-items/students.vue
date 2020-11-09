<template>
  <div class="class">
    <div class="headersearch">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>学生信息查询</span>
        </div>
        <el-row :gutter="90">
          <el-col :span="4">
            <el-input placeholder="请输入姓名" clearable v-model="search.name"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="search.className" placeholder="请选择班级">
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.className"
                :value="item.className"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="search.startTime"
              type="date"
              placeholder="开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="search.endTime"
              type="date"
              placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入宿舍" clearable v-model="search.dormname"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="20" style="text-align:right;margin-top:30px">
            <el-button type="primary" @click="searchtableData">查询</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="container">
      <!-- 弹窗部分 -->
      <el-dialog :visible.sync="dialogFormVisible" :before-close="deldialog" >
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>基本的学生信息</span>
          </div>
          <el-form >
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input
                    placeholder="请输入姓名"
                    v-model="xyUser.name"
                    clearable
                    size="small"
                    style="width:150px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别">
                  <el-select v-model="xyUser.sex" placeholder="性别">
                    <el-option label="男" :value="0"></el-option>
                    <el-option label="女" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话">
                  <el-input
                    placeholder="请输入电话"
                    v-model="xyUser.tel"
                    clearable
                    size="small"
                    style="width:150px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="12">
                <el-form-item label="班级">
                  <el-select v-model="xyUser.classname" placeholder="请选择班级">
                    <el-option
                      v-for="item in classList"
                      :key="item.id"
                      :label="item.className"
                      :value="item.className"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="城市">
                  <el-cascader size="large" :options="options" v-model="cityList"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-date-picker
                  v-model="xyUser.dormStartTime"
                  type="date"
                  placeholder="入驻日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
              <el-col :span="12">
                <el-date-picker
                  v-model="xyUser.dormEndTime"
                  type="date"
                  placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>补充信息</span>
          </div>
          <el-form :model="xyUser">
            <el-row :gutter="20" justify="space-between" type="flex" class="row-bg">
              <el-col :span="6">
                <el-input placeholder="请输入号码" v-model="xyUser.tel2" clearable></el-input>
              </el-col>
              <el-col :span="6">
                <el-input placeholder="请输入qq" v-model="xyUser.qq" clearable></el-input>
              </el-col>
              <el-col :span="6">
                <el-input placeholder="请输入wx" v-model="xyUser.wx" clearable></el-input>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card" v-if="xyUser.id" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>缴费信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="changeflag">添加交费信息+</el-button>
          </div>
          <el-form v-if="flag">
            <el-row>
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-radio-group v-model="xyCostItems.costType">
                    <el-radio :label="0">学费</el-radio>
                    <el-radio :label="1">住宿费</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="金额">
                  <el-input-number v-model="xyCostItems.costValue" size="small"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="缴费日期">
                  <el-date-picker
                    v-model="xyCostItems.costTime"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="xyCostItems.costBak"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-button type="primary" @click="addinfo">确定添加</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>交费记录</span>
          </div>
          <el-table :data="history" border style="width: 100%">
            <el-table-column fixed label="#" type="index" width="50"></el-table-column>
            <el-table-column prop="costType" label="类型" width="150">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.costType==0?"学费":"住宿费" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="costValue" label="金额" width="120"></el-table-column>
            <el-table-column prop="costTime" label="日期" width="120"></el-table-column>
            <el-table-column prop="costBak" label="备注" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope" v-if="scope.row.tempid">
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deldialog">取 消</el-button>
          <el-button type="primary" @click="newlyadded">确 定</el-button>
        </div>
      </el-dialog>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <el-button type="primary" round @click="newadd">新增</el-button>
          </span>
        </div>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column fixed type="index" label="#" width="150"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sexv" label="性别" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cityText" label="地址" width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tel" label="电话" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="classId" label="班级" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dormname" label="宿舍" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="lookClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delClick(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.start"
          :page-sizes="pages.sizes"
          :page-size="pages.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.totalRow"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>
<script>
import ListApi from "@/api/bufan/students";
import axios from "axios";
import _ from "lodash";
import { regionDataPlus, CodeToText } from "element-china-area-data";
export default {
  data() {
    return {
      flag: false,
      dialogFormVisible: false,
      loading: false,
      tableData: [],
      pages: {
        start: 1,
        limit: 10,
        sizes: [10, 20, 30, 40],
        totalRow: 0
      },
      search: {},
      classList: [],
      xyUser: {},
      xyCostItems: {},
      history: [],
      newhistory: [],
      cityList: [],
      options: regionDataPlus
    };
  },
  methods: {
    //删除学院
    delClick(id) {
      ListApi.delstudent({ id });
      this.gettableData();
    },
    //点击取消弹窗
    deldialog() {
      this.xyUser = {};
      this.history = [];
      this.cityList = [];
      this.dialogFormVisible = false;
    },
    // 点击查看
    lookClick(i) {
      console.log(i)
      this.loading=true
      this.dialogFormVisible = true;
      this.xyUser = i;
      this.xyUser.sex = i.sex == "0" ? "男" : "女";
      if (i.city) {
        this.cityList = i.city.split(",");
      } else {
        this.cityList = [];
      }
      ListApi.detail({ id: i.id });
      ListApi.historyList({ userId: i.id }).then(res => {
        this.history = res.data.list;
      this.loading=false
        // this.history=this.history.filter(ele=>ele.id!=i.id)
      });
    },
    // 确认添加或编辑
    newlyadded() {
      let obj = {};
      let xyUser = this.xyUser;
      let citytxt = "";
      let city = this.cityList.join(",");
      for (var i = 0; i < this.cityList.length; i++) {
        citytxt += "," + CodeToText[this.cityList[i]];
      }
      citytxt = citytxt.substr(1);
      xyUser.cityText = citytxt;
      xyUser.city = city;
      obj.xyUser = xyUser;
      this.history = this.newhistory;
      obj._size = this.history.length;
      for (var k = 0; k < this.history.length; k++) {
        obj["xyCostItems_" + k] = {
          costType: this.history[k].costType,
          costTime: this.history[k].costTime,
          costValue: this.history[k].costValue,
          costBak: this.history[k].costBak
        };
      }

      if (this.xyUser.id) {
        ListApi.update(obj).then(() => {
          this.gettableData();
          this.xyUser = {};
          this.newhistory = [];
        });
      } else {
        ListApi.addStd(obj).then(() => {
          this.gettableData();
          this.xyUser = {};
          // this.newhistory=[]
        });
      }
      this.cityList = [];
      this.dialogFormVisible = false;
    },
    //添加缴费列表
    addinfo() {
      let costitem = _.clone(this.xyCostItems);
      //搞一个临时id防止删除冲突
      costitem.tempid = Date.now();
      if (this.xyUser.id) {
        this.newhistory.push(costitem);
      } else {
        this.history.push(costitem);
      }
      this.history = _.concat(this.history, this.newhistory);
      this.xyCostItems = {};
    },
    changeflag() {
      this.flag = true;
    },
    // 新增打开弹窗
    newadd() {
      this.dialogFormVisible = true;
    },
    //初始化班级
    getclassList() {
      // console.log(this.search.valueDate)
      ListApi.classList({
        start: 1,
        limit: 9999999
      }).then(res => {
        this.classList = res.data.list;
        // console.log(this.dormList)
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pages.limit = val;
      this.gettableData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pages.start = val;
      this.gettableData();
    },
    handleClick(row) {
      // console.log(row.tempid);
      this.history = this.history.filter(ele => ele.tempid != row.tempid);
    },
    // 初始化表格
    gettableData() {
      let params = {
        start: this.pages.start,
        limit: this.pages.limit,
        ...this.search
      };
      params = _.pickBy(params, ele => ele);
      ListApi.getStudentList(params).then(res => {
        this.tableData = res.data.list;
        this.pages.totalRow = res.data.totalRow;
        this.loading = false;
      });
    },
    // 查询功能
    searchtableData() {
      this.gettableData();
    }
  },
  created() {
    this.gettableData();
    this.getclassList();
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  margin: 30px 30px;
}
</style>