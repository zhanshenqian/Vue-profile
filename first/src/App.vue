<template>
  <div class='main'>
    <!-- 网站顶部 -->
    <div class='header' v-if='debug'>
      <main-header></main-header>
    </div>
    <div class='mbody'>
      <!-- 主导航 -->
      <div class='nav' v-if='debug'>
        <main-nav></main-nav>
      </div>
      <!-- 页面内容 -->
      <div class='container'>
        <router-view keep-alive></router-view>
      </div>
      <!-- 视频直播 -->
      <!-- <div class="live-video">
        <live-video></live-video>
      </div> -->
    </div>
  </div>
</div>
</template>
<script>
  const debug = process.env.NODE_ENV !== 'production'
  export default {
    data () {
      return {
        debug: debug
      }
    }
  }
</script>
<style>
  html,body{
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .header{
    height: 60px;
    background-color: #324057;
    border-radius:0;
  }
  body{
    margin: 0;
  }
  .main{
    height: 100%;
  }
  .mbody{
    display: flex;
    height: calc(100% - 60px);
    overflow: hidden;
  }
  .nav {
    width: 200px;
    height: 100%;
  }
  .container {
    flex:1;
    padding:30px;
    height: 100%;
    padding-bottom: 30px;
    overflow: scroll;
  }
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
/*  .live-video{
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
  }*/
</style>
