<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <top-bar></top-bar>
    </el-header>
    <el-main>
      <nav-bar class="left" :username="username"></nav-bar>
      <div class="right">
        <p class="location">
          <img src="../../assets/icon/unfold.png" style="height: 16px">
          <span class="locat-first">字典管理</span>
        </p>

        <div class="tableDiv">
          <el-table
            stripe
            :data="dataBase"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              prop="index"
              label="编号"
              align="center"
              width="80px">
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
              align="center">
            </el-table-column>
            <el-table-column
              prop="size"
              label="大小"
              align="center"
              width="80px">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button
                  class="btn-normal"
                  @click="handleEdit(scope.row)">查看字典</el-button>
              </template>
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
    name: "dictionaryIndex",
    components: {TopBar,NavBar},
    data(){
      return{
        dataBase:[],
        username:'',
      }
    },
    created(){
      this.username=this.$route.query.username;
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
      handleEdit(row) {
        var inputPer;
        switch (row.index) {
          case '1':{
            if(this.$store.state.permissions['1'].indexOf('2')!=-1) inputPer=true;
            else inputPer=false;
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:1,inputPer:inputPer}});
            break;
          }
          case '2':{
            if(this.$store.state.permissions['2'].indexOf('2')!=-1) inputPer=true;
            else inputPer=false;
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:2,inputPer:inputPer}});
            break;
          }
          case '3':{
            if(this.$store.state.permissions['3'].indexOf('2')!=-1) inputPer=true;
            else inputPer=false;
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:3,inputPer:inputPer}});
            break;
          }
          case '4':{
            if(this.$store.state.permissions['4'].indexOf('2')!=-1) inputPer=true;
            else inputPer=false;
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:4,inputPer:inputPer}});
            break;
          }
        }
      },
    }

  }
</script>

<style scoped>
  .tableDiv{
    padding: 10px 100px;
  }

</style>

