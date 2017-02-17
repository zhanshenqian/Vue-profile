<template>
  <div class="nav-wrap">
    <el-menu theme="dark" default-active="1" class="left-nav" :router="true">
      <!-- 认证 -->
      <el-submenu index='1'>
        <template slot="title"><i class="fa fa-address-book-o fa-2x fa-fw" aria-hidden="false"></i>登录</template >
        <el-menu-item index="/test"><i class="fa fa-users fa-lg fa-fw" aria-hidden="true"></i>登录界面</el-menu-item>
      </el-submenu>
      <!-- 评论审核管理 -->
      <el-menu-item index="/comment"><i class="el-icon-document" aria-hidden="true"></i>评论审核管理</el-menu-item>
      <!-- 可配置选项 -->
       <el-submenu index='2'>
        <template slot="title"><i class="el-icon-message" aria-hidden="false"></i>可配置选项</template >
        <el-menu-item index="/configurable/system"><i class="el-icon-document" aria-hidden="true"></i>系统消息管理</el-menu-item>
        <el-menu-item index="/configurable/anchor"><i class="el-icon-document" aria-hidden="true"></i>主播弹框消息管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/albumaudit"><i class="fa fa-users fa-lg fa-fw" aria-hidden="true"></i>审核相册 </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  .nav-wrap{
    width: 200px;
    height: 100%;
    .left-nav{
      height: 100%;
      overflow-y: scroll;
    }
  }
</style>
