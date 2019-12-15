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
          <span class="locat-first">用户管理</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input type="text" placeholder="输入关键字" class="sortInput" v-model="search"></el-input>
            <el-button class="btn-normal" @click="searchInfo()">筛选</el-button>
            <el-button class="addBtn" @click="addDialogVisible=true">
              <img src="../../assets/icon/add.png">
            </el-button>
          </p>
          <el-table
            stripe
            :data="displayData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              prop="id"
              label="编号"
              sortable>
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              sortable>
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色"
              sortable>
            </el-table-column>
            <el-table-column
              label="操作"
              width="300px"
              align="center">
              <template slot-scope="scope">
                <el-button class="btn-normal" @click="checkInfo(scope.row)">查看</el-button>
                <el-button class="btn-normal" @click="freezeUser(scope.row)">冻结</el-button>
                <el-button class="btn-normal" @click="resetUser(scope.row)">重置</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="30%"
            center>
            <el-form :model="newUser" ref="newUser" label-position='left' :rules="newUserRule">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="newUser.email" clearable></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="newUser.username" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="newUser.password" clearable></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="role">
                <el-select v-model="newUser.role" placeholder="请选择">
                  <el-option
                  v-for="item in roleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作地点" prop="workplace">
                <el-input v-model="newUser.workplace" clearable></el-input>
              </el-form-item>
              <el-form-item label="个人说明" prop="detail">
                <el-input v-model="newUser.detail" clearable></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button class="btn-normal" @click="addUser()">确 定</el-button>
            </span>
          </el-dialog>
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
    name: "userManage",
    components: {TopBar,NavBar},
    data(){
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'));
          }
        }, 100)
      }
      return{
        authorManage:[],
        addDialogVisible:false,
        newUser:{},
        newUserRule:{
          username:[
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          role: [
            {required: true, message: '请选择权限', trigger: 'blur'}
          ],
          workplace:[
            {required: true, message: '请输入工作地点', trigger: 'blur'}
          ],
          email:[
            { validator: checkEmail, trigger: 'blur' }
          ]
        },
        roleOptions:[{
          value:1,
          label:'A'
        },{
          value:2,
          label:'B'
        },{
          value:3,
          label:'C'
        },{
          value:4,
          label:'D'
        },],
        search:'',
        displayData:[],
        totalRow:0,
        currentPage:1,
        pageSize:8,
      }
    },
    created(){
      this.getUserRole();
    },
    methods:{
      searchInfo(){
        var search=this.search;
        if(search){
          this.displayData=this.authorManage.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())||data.role.toLowerCase().includes(search.toLowerCase()));
        }
        else{
          this.displayData=this.authorManage;
        }
      },
      getUserRole(){
        this.$axios({
          method:'get',
          url:'/user',
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          this.authorManage=response.data;
          this.displayData=response.data;
          this.totalRow=this.authorManage.length;
        }).catch(error=>console.log(error));
      },
      addUser(){
        this.$refs['newUser'].validate((valid) => {
          if (valid) {
            alert(this.newUser.role);
            this.$axios({
              url:'/user/adduser',
              method:'post',
              params:{
                email:this.newUser.email,
                username:this.newUser.username,
                password:this.newUser.password,
                detail:this.newUser.detail,
                workplace:this.newUser.workplace,
                role:this.newUser.role
              }
            }).then(response=>{
              if(response.status==200){
                this.$message({
                  message:'添加用户成功',
                  type:'success'
                });
                this.addDialogVisible=false;
                this.getUserRole();
              }else{
                this.$message.error('添加用户失败');
              }
            }).catch(error=>console.log(error));
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      checkInfo(row){
        this.$router.push({path:'/PersonManage',query:{personId:row.id,userId:this.$route.query.userId}});
      },
      freezeUser(row){
        this.$axios({
          method: 'post',
          url:'/user/'+row.id,
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message:'冻结用户成功',
              type:'success'
            });
          }else{
            this.$message.error('冻结用户失败');
          }
        })
          .catch(error=>console.log(error));
      },
      resetUser(row){
        this.$axios({
          method:'put',
          url:'/user/'+this.row.id,
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message:'重置密码成功',
              type:'success'
            })
          }else{
            this.$message.error('重置密码失败');
          }
        })
          .catch(error=>console.log(error));
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
  .searchBar .el-button{
    margin-left: 80px;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
  .addBtn{
    border: none;
    margin-right: 30px;
    background-color: #f3f5fa;
    float: right;
  }
</style>


