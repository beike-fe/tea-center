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
          <span class="locat-first">权限管理</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input v-model="search" type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal" @click="searchInfo">筛选</el-button>
          </p>
          <el-table
            stripe
            :data="authorManage.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              align="center"
              sortable>
            </el-table-column>
            <el-table-column
              prop="roleDescription"
              label="角色"
              sortable>
              <template slot-scope="scope">
                <a class="aLabel">{{scope.row.roleDescription}}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="level"
              label="权限"
              sortable>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button class="btn-normal" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
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
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "index",
    components: {TopBar,NavBar},
    data(){
      return{
        authorManage:[],
        authorManageCopy:[],
        totalRow:0,
        currentPage:1,
        pageSize:8,
        search:'',
      }
    },
    created(){
      this.getUserRole();
    },
    methods:{
      getUserRole(){
        this.$axios({
          method:'get',
          url:'/authority',
          params:{
            id:this.$store.state.id
          }
        }).then(response=>{
          this.authorManage=response.data;
          this.authorManageCopy=response.data;
          this.totalRow=this.authorManage.length;
        }).catch(error=>console.log(error));
      },
      handleEdit(row){
        this.$router.push({path:'/PersonAuthority',query:{username:row.username,role:row.description,userId:row.id}});
      },
      // goRoleManage(row){
      //   this.$router.push({path:'/RoleManage',query:{roleDiscription:row.description}});
      // },
      handleCurrentChange(val) {
        this.currentPage=val;
      },
      searchInfo(){
        var search=this.search;
        if(search){
          this.authorManage=this.authorManageCopy.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())||data.description.toLowerCase().includes(search.toLowerCase()));
        }else{
          this.authorManage=this.authorManageCopy;
        }
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
  .searchBar .el-button{
    margin-left: 80px;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
  .aLabel{
    text-decoration: underline;
    color: #494e8f;
  }
</style>

