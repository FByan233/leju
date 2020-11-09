<template>
  <div class="material">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <!-- <input type="file"  @change="addImg($event)"> -->
        <el-upload
          class="upload-demo"
          :headers="headers"
          action="/admin/xy/upload/uploadImg"
          :show-file-list="false"
          :on-success="imgSucc"
           >
          <el-button size="small" type="primary">新增素材</el-button>
        </el-upload>
      </div>
      <!-- 内容主体部分 -->
      <div class="main">
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in imgSrcList" :key="item.id">
            <el-tooltip class="item" effect="light" placement="right-start" :value="false">
              <div slot="content">
                <img :src="'http://www.bufantec.com/'+item.dir+'/'+item.fileName" class="imageBig" />
              </div>
              <el-card :body-style="{ padding: '0px' }">
                <img :src="'http://www.bufantec.com/'+item.dir+'/'+item.fileName" class="images" />
                <div style="padding: 14px;">
                  <div class="bottom clearfix">
                    <!-- <el-button type="success">查看</el-button> -->
                    <el-button type="danger" @click="delImg(item.id)">删除</el-button>
                  </div>
                </div>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-row>
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
      </div>
    </el-card>
    <!-- 弹窗部分 -->
  </div>
</template>
<script>
import materialApi from "@/api/bufan/material";
import axios from "axios";
import {getToken} from '@/utils/myAuth'
export default {
  data() {
    return {
      headers:{
        "bufan-token":getToken()
      },
      loading:false,
      imgSrcList: [],
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
    imgSucc(){
      this.loading=true,
      setTimeout(()=>{
        this.getImg()
        this.loading=false
      },1000)
    },
    // 新增上传图片
    // addImg(e) {
    //   let url = "http://bufantec.com/admin/xy/upload/uploadImg";
    //   // console.log(e.target.files[0])
    //   let file = e.target.files[0];
    //   let formDate = new FormData();
    //   formDate.append("file", file);
    //   axios.post(url, formDate).then(res => {
    //     console.log(res);
    //   });
    // },
    // 删除图片
    delImg(i) {
      materialApi.delList({ id: i }).then(() => {
        this.getImg();
      });
    },
    // 初始化列表
    getImg() {
      let obj = {
        start: this.pages.start,
        limit: this.pages.limit
      };
      materialApi.materialList(obj).then(res => {
        // console.log(res.data);
        this.pages.total = res.data.totalRow;
        this.imgSrcList = res.data.list;
        // this.imgSrc=basehost+ res.data.list.dir+ res.data.list.fileName
      });
    },
    handleSizeChange(val) {
      this.pages.limit = val;
      this.getImg();
    },
    handleCurrentChange(val) {
      this.pages.start = val;
      this.getImg();
    }
  },
  created() {
    this.getImg();
  }
};
</script>
<style lang="scss" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
}
.el-col {
  margin-bottom: 30px;
}
.images {
  width: 100%;
  height: 260px;
  display: block;
}
.imageBig {
  width: 800px;
  height: 400px;
}
</style>