<template>
  <div class="news">
    <!-- 搜索部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新闻列表信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入标题" v-model="search.title" clearable></el-input>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入作者" v-model="search.author" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchNews">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 内容主体 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="addnews">新增</el-button>
      </div>
      <el-row>
        <el-col :span="24">
          <el-table :data="newsList" border style="width: 100%">
            <el-table-column type="index" fixed="left" width="50" label="#"></el-table-column>
            <el-table-column fixed prop="author" label="作者" width="150"></el-table-column>
            <el-table-column prop="desc" label="内容描述" width="250"></el-table-column>
            <el-table-column label="封面图片" width="250">
              <template slot-scope="scope">
                <img
                  :src="(scope.row.cover)"
                  style="width: 200px;height: 50px"
                  v-show="scope.row.cover"
                />
              </template>
            </el-table-column>
            <el-table-column prop="hot" label="是否hot" width="120">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.hot"
                  active-text="是"
                  inactive-text="否"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value=1
                  inactive-value=0
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="文本格式" width="220">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.type"
                  active-text="富文本"
                  inactive-text="Markdown"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="0"
                  inactive-value="1"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="addTime" label="上传时间" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small" @click="delClick(scope.row.id)">删除</el-button>
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
    <!-- 弹窗部门 -->
  </div>
</template>
<script>
import newsApi from "@/api/bufan/news";
import _ from "lodash";
export default {
  data() {
    return {
      search: {},
      newsList: [],
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
    // 编辑功能
    handleClick(i) {
      this.$router.push({ name: "detail", params: { id: i.id } });
    },
    // 删除功能
    delClick(id) {
      newsApi.delList({ id }).then(() => {
        this.getNewsList();
      });
    },
    // 新增按钮功能
    addnews() {
      this.$router.push({ name: "addDetail"});
    },
    // 搜索部分
    searchNews() {
      for (let i in this.search) {
        if (this.search[i]) {
          this.pages.start = 1;
          this.pages.limit = 999;
        } else {
          this.pages.start = 1;
          this.pages.limit = 10;
        }
      }
      this.getNewsList();
    },
    //初始化列表
    getNewsList() {
      let obj = {
        start: this.pages.start,
        limit: this.pages.limit,
        ...this.search
      };
      obj = _.pickBy(obj, ele => ele);
      newsApi.newList(obj).then(res => {
        // console.log(res.data.list);
        this.pages.total = res.data.totalRow;
        this.newsList = res.data.list;
      });
    },
    handleSizeChange(val) {
      this.pages.limit = val;
      this.getNewsList();
    },
    handleCurrentChange(val) {
      this.pages.start = val;
      this.getNewsList();
    }
  },
  created() {
    this.getNewsList();
  }
};
</script>
<style lang="scss" scoped>
</style>