<template>
  <div class="header-wrap">
    <el-menu theme="dark"  default-active="1" class="el-menu-demo" mode="horizontal">
      <img class="logo" src="../../src/assets/images/logo.png">
      <h1 class="title">浪客直播管理系统</h1>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
  .header-wrap{
    .logo{
      position: absolute;
      display: block;
      width: 40px;
      margin: 10px 15px;
    }

    .title{
      margin-left: 65px;
      color: #fff;
      font-size: 1.5em;
    }
  }
</style>
