<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <top-bar></top-bar>
    </el-header>
    <el-main>
      <nav-bar class="left"></nav-bar>
      <div class="right">
        <p class="location">
          <img src="../../assets/icon/unfold.png" style="height: 16px">
          <span class="locat-first">数据库管理</span>
        </p>

        <div class="tableDiv">
          <el-table
            stripe
            :data="dataBase"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
            @row-click="openDatabase">
            <el-table-column
              prop="index"
              label="编号"
              width="80px"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="changeDate"
              label="修改时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="uploader"
              label="上传者"
              width="100px"
              align="center">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              align="center">
            </el-table-column>
            <el-table-column
              type="selection"
              width="55px"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "dataBaseIndex",
    components: {TopBar,NavBar},
    data(){
      return{
        dataBase:[],
        permissions:{},
      }
    },
    created(){
      if(this.$store.state.permissions['1']){
        this.dataBase.push({index:'1',name:'乌龙茶品种SNP指纹图谱数据库',changeDate:'2019.06.12 23:54:20',uploader:'叶乃兴',size:''});
      }
      if(this.$store.state.permissions['2']){
        this.dataBase.push({index:'2',name:'乌龙茶品种资源数据库',changeDate:'2019.06.12 23:53:12',uploader:'洪永聪',size:''});
      }
      if(this.$store.state.permissions['3']){
        this.dataBase.push({index:'3',name:'一带一路贸易数据库',changeDate:'2019.06.12 23:50:33',uploader:'杨超英',size:''});
      }
      if(this.$store.state.permissions['4']){
        this.dataBase.push({index:'4',name:'福建省乌龙茶消费者购买行为数据库',changeDate:'2019.06.12 23:55:41',uploader:'林畅',size:''});
      }
    },
    methods:{
      openDatabase(row){
        switch (row.index) {
          case '1':{
            this.$router.push('/SNPManage');
            break;
          }
          case '2':{
            this.$router.push('TeaVarietyDatabase');
            break;
          }
          case '3':{
            this.$router.push('/BeltRoadDatabase');
            break;
          }
          case '4':{
            this.$router.push('/ConsumerDatabase');
            break;
          }
        }
      }
    }

  }
</script>

<style scoped>
  .tableDiv{
    padding: 10px 100px;
  }
  .searchBar{
    height: 60px;
    line-height: 60px;
  }
  .searchBar .el-input{
    width: 15%;
  }
  .btn-output{
    float: right;
  }
  .btn-search{
    margin-left: 5%;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
  .addBtn{
    border: none;
    height: 80px;
    background-color: white;
  }
  .addBtnDiv{
    background-color: white;
  }
</style>

