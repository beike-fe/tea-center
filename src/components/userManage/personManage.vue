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
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">{{user.username}}</span>
        </p>

        <div class="mainDiv">
          <div class="identity">
            <img src="../../assets/icon/personal.png">
            <span>{{user.username}}</span>
          </div>
          <p>
            <span class="selectSpan">权限级别：{{user.level}}</span>
            <span class="selectSpan">角色：{{user.role}}</span>
            <el-button class="btn-normal" @click="goAuthority(user)">权限管理</el-button>
          </p>
          <div class="infoDiv">
            <p>工作单位：{{user.workplace}}</p>
            <p>账号创建时间：{{user.registrationDate}}</p>
            <p>用户名：{{user.username}}</p>
            <p>密码：</p>
            <p>邮箱：{{user.email}}</p>
            <p>个人说明：{{user.detail}}</p>
          </div>
          <p class="btnP">
            <el-button class="btn-normal" @click="logoutUser">注销</el-button>
            <el-button class="btn-normal" @click="freezeUser" v-if="!isFrozen">冻结</el-button>
            <el-button class="btn-normal" @click="freezeUser" v-else>解冻</el-button>
            <el-button class="btn-normal" @click="resetUser">重置</el-button>
            <el-button class="btn-normal" @click="back()">返回</el-button>
          </p>
        </div>

      </div>

    </el-main>
    <!--</el-container>-->

  </el-container>

</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "personManage",
    components: {TopBar,NavBar},
    data(){
      return{
        user:{},
        isFrozen:false,
      }
    },
    created() {
      this.getPersonInfo();
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      getPersonInfo(){
        this.$axios({
          url:'/user/'+this.$route.query.personId,
          method:'get',
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          this.user=response.data;
          this.isFrozen=response.data.frozen;
        }).catch(error=>console.log(error));
      },
      freezeUser(){
        this.$axios({
          method: 'post',
          url:'/user/'+this.$route.query.personId,
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message:'操作成功',
              type:'success'
            });
            this.getPersonInfo();
          }else{
            this.$message.error('操作失败');
          }
        })
          .catch(error=>console.log(error));
      },
      resetUser(){
        this.$axios({
          method:'put',
          url:'/user/'+this.$route.query.personId,
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message:'重置密码成功',
              type:'success'
            });

          }else{
            this.$message.error('重置密码失败');
          }
        })
          .catch(error=>console.log(error));
      },
      logoutUser(){
        this.$axios({
          method:'delete',
          url:'/user/'+this.$route.query.personId,
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message:'注销用户成功',
              type:'success'
            })
            this.$router.go(-1);
          }else {
            this.$message.error('注销用户失败');
          }
        })
          .catch(error=>console.log(error));
      },
      goAuthority(user){
        this.$router.push({path:'/PersonAuthority',query:{username:user.username,role:user.detail,userId:user.id}});
      }
    }

  }
</script>

<style scoped>
  .mainDiv{
    padding: 10px 100px;
  }
  .btnP{
    margin-top: 50px;
    text-align: center;
  }
  .btnP .el-button{
    margin:10px;
    width: 100px;
  }
  .identity{
    display: table-cell;
    vertical-align: middle;
    height: 80px;
    width: 200px;
    border-radius:15px;
    text-align: center;
    border-color: #595959;
    border-width: 30px;
    background-color: #ffffff;
    color: #595959;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0px 0px 10px 2px rgba(89,89,89,0.15);
  }
  .identity span{
    margin-left: 10px;
  }
  .selectSpan{
    color: #808080;
    font-weight:bolder;
    font-size: 16px;
    margin-right: 50px;
  }
  .infoDiv{
    margin-top: 30px;
    color: #808080;
    font-weight:bolder;
    font-size: 16px;
  }
</style>
