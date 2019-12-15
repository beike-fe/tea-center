<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
  html, body, #app {
    height: 100vh;
  }

  .el-container {
    height: 100vh;
  }

  .el-header {
    border: 0;
    padding: 0;
    line-height: 60px;
    background-color: #494e8f;
  }

  .el-main {
    background-color: #f3f5fa;
    padding: 0 !important;
  }

  .left {
    float: left;
  }

  .right {
    overflow: hidden;
  }

  .location {
    padding: 30px 60px;
    height: 30px;
    line-height: 30px;
    margin: 0;
  }

  .locat-first {
    color: #595959;
    font-size: 16px;
    font-weight: bold;
    margin: 0 10px;
  }

  .locat-second {
    color: #595959;
    font-size: 12px;
    font-weight: bold;
    margin: 0 10px;
  }

  .btn-normal {
    font-size: 12px;
    font-weight: bolder;
    background-color: #494e8f;
    border-color: #494e8f;
    color: white;
  }

  .btn-normal:hover {
    background-color: #8084b1;
    border-color: #8084b1;
    color: white;
  }

  .btn-normal:focus {
    background-color: #8084b1;
    border-color: #8084b1;
    color: white;
  }

  .centerDialog .el-button {
    margin-left: 40px;
  }
</style>
