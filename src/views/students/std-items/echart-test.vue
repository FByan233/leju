<template>
  <div class="echarts">
    <div class="box1"></div>
    <div class="box2"></div>
  </div>
</template>
<script>
// import echarts from 'echarts'
export default {
  data(){
    return{

    }
  },
  mounted(){
    this.initEcharts()
    this.initEcharts2()
  },
  methods:{
    initEcharts(){
      var echarts = require('echarts');
      var myChart = echarts.init(document.querySelector('.box1'));
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    initEcharts2(){
      var echarts = require('echarts');
        var myChart = echarts.init(document.querySelector('.box2'));
        var option = {
            title: {
                text: 'ECharts测试2'
            },
            tooltip: {},
            legend: {
                data:['销售']
            },
            xAxis: {
                data: ["123","222","雪333纺衫","裤333子","高跟33鞋","袜子"],
            },
            yAxis: {},
            series: [{
                name: '销售',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>
.echarts{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  .box1,.box2{
    margin-top: 20px;
    width: 500px;
    height: 400px;
    border: 1px solid #ccc;
  }
}
</style>