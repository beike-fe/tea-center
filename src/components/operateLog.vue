<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <top-bar></top-bar>
    </el-header>
    <el-main>
      <nav-bar class="left"></nav-bar>
      <div class="right">
        <p class="location">
          <img src="../assets/icon/unfold.png" style="height: 16px">
          <span class="locat-first">操作日志</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <span class="dateSpan">
              <el-date-picker
                v-model="dateInterval"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </span>
            <el-button class="btn-normal" @click="selectInfo()">筛选</el-button>
          </p>
          <el-table
            stripe
            :data="operateLog.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              prop="id"
              label="编号"
              width="80px"
              align="center">
            </el-table-column>
            <el-table-column
              prop="details"
              label="操作"
              align="center">
            </el-table-column>
          </el-table>
          <p class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="totalRow">
            </el-pagination>
          </p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import TopBar from "./reuseComponent/topBar"
  import NavBar from "./reuseComponent/navBar"
  export default {
    name: "index",
    components: {TopBar,NavBar},
    data(){
      return{
        operateLog:[],
        dateInterval:'',
        totalRow:0,
        currentPage:1,
        pageSize:8,
      }
    },
    created(){
      this.getInfo();
    },
    methods:{
      getInfo(){
        this.$axios({
          url:'/log',
          method:'get',
        }).then(res=>{
          this.operateLog=res.data;
          this.totalRow=this.operateLog.length;
        }).catch(error=>{
          console.log(error);
        });
      },
      selectInfo(){
        this.$axios({
          url:'/rangelog',
          method:'put',
          params:{
            start:this.dateInterval[0],
            end:this.dateInterval[1]
          }
        }).then(res=>{
          this.operateLog=res.data;
          this.totalRow=this.operateLog.length;
        }).catch(error=>{
          console.log(error);
        });
      },
      handleCurrentChange(val) {
        this.currentPage=val;
      },
    }

  }
</script>

<style scoped>
  .tableDiv{
    padding: 10px 100px;
  }
  .btnP{
    text-align: center;
  }
  .btnP .el-button{
    margin:10px;
    width: 120px;
  }
  .searchBar{
    height: 60px;
    line-height: 60px;
  }
  .searchBar .el-input{
    width: 15%;
  }
  .dateSpan{
    margin-left: 20px;
    width: 50%;
  }
  .searchBar .el-button{
    margin-right: 20px;
    float: right;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
</style>

