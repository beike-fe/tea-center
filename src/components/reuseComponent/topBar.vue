<template>
  <div class="top">
    <el-col align="middle"  :span="2">
      <img class="personPhoto" src="../../assets/timg.jpeg">
    </el-col>
    <el-col align="middle" :span="20">
      <span class="titleText">欢迎登录中国乌龙茶产业协同创新中心管理后台</span>
    </el-col>
  </div>
</template>

<script>
    export default {
        name: "topBar"
    }
</script>

<style scoped>
  .top{
    height: 60px;
  }

  .personPhoto{
    position: relative;
    top: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;


  }
  .titleText{
    display: inline-block;
    font-size: 16px;
    color: white;
    font-weight: bolder;
    height: 60px;
    line-height: 60px;
  }
</style>
