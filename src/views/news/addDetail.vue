<template>
  <div class="detail">
    <el-card class="box-card">
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="标题" label-width="80">
              <el-input v-model="xyNews.title" placeholder="请输入标题" size="mini" style="width:200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="内容描述" label-width="80">
              <el-input v-model="xyNews.desc" placeholder="请输入内容描述" size="mini" style="width:200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" label-width="80">
              <el-input v-model="xyNews.author" placeholder="请输入作者" size="mini" style="width:200px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="文本格式" label-width="80">
              <el-switch
                v-model="xyNews.type"
                active-text="富文本"
                inactive-text="markdown"
                active-value="0"
                inactive-value="1"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否hot" label-width="80">
              <!-- v-model="xyNews.hot" -->
              <el-switch 
               v-model="xyNews.hot"
              active-text="是" inactive-text="否" active-value=1 inactive-value=0></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="封面" label-width="80">
              <el-upload
                class="upload-demo"
                :headers="headers"
                action="/admin/xy/upload/uploadImg"
                :show-file-list="false"
                :on-success="imgSucc"
              >
                <el-button size="small" type="primary">上传封面</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="xyNews.type==0" class="box-card">
      <tinytxt
        ref="tinytxt"
        v-model="xyNews.content1"
        urldate="/admin/xy/upload/uploadImg"
      ></tinytxt>
    </el-card>
    <el-card v-else class="box-card">
      <MarkdownEditor class="markdown" v-model="xyNews.content1" height="500px" ref="markdown"></MarkdownEditor>
    </el-card>
    <el-card>
      <el-button type="danger" @click="addNews">确认新增</el-button>
    </el-card>
  </div>
</template>
<script>
import newsApi from "@/api/bufan/news";
import tinytxt from "@/components/Tinymce/index";
import MarkdownEditor from "@/components/MarkdownEditor";
import { getToken } from "@/utils/myAuth";

export default {
  components: {
    tinytxt,
    MarkdownEditor
  },
  data() {
    return {
      xyNews: {},
      headers: {
        "bufan-token": getToken()
      }
    };
  },
  methods: {
    // 上传封面
    imgSucc(response, file, fileList) {
      this.xyNews.cover = "http://bufantec.com/" + response.url;
      // console.log(this.xyNews.cover)
    },
    // 新增新闻
    addNews() {
      // newsApi
      let obj = {};
      obj.xyNews = this.xyNews;
      if(this.xyNews.type==1){

        obj.xyNews.content2 = this.$refs.markdown.getHtml();
      }else{
        obj.xyNews.content2={}
      }
      newsApi.savenews(obj).then(res => {
        console.log(res);
        this.$router.push({ name: "News" });
      });
    }
  },
  mounted() {},
  created() {
    // console.log(this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.markdown ::v-deep .te-md-splitter {
  width: 50%;
  overflow: hidden;
  .te-preview {
    height: 100%;
    width: 100%;
  }
}
</style>