<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <top-bar>

      </top-bar>

    </el-header>
    <!--<el-container>-->
    <!--<el-aside width="240px">-->

    <!--</el-aside>-->
    <el-main>
      <nav-bar class="left"></nav-bar>
      <div class="right">
        <p class="location">
          <img src="../assets/icon/unfold.png" style="height: 16px">
          <span class="locat-first">设置</span>
        </p>
        <el-card class="mainCard">
          <div class="changePart">
            <p class="titleP">修改账户信息</p>
            <p><label>用户名:</label><span>{{userName}}</span></p>
            <p>
              <label>绑定邮箱:</label><span>{{email}}</span>
              <el-button class="btn-normal" @click="visible=true">修改绑定邮箱</el-button>
            </p>

          </div>
          <div class="changePart">
            <p class="titleP">修改密码</p>
            <p>
              <label>旧密码:</label>
              <el-input type="password" class="inputText" v-model="oldPassword"></el-input>
              <img src="../assets/icon/√.png" v-if="passwordCorrect">
            </p>
            <label>新密码:</label>
            <el-input type="password" class="inputText" v-model="newPassword"></el-input>
            <el-button class="btn-normal" @click="changePassword()">修改密码</el-button>
          </div>
          <div class="btnDiv">
            <el-button class="btn-normal">保存</el-button>
            <el-button class="btn-normal">返回</el-button>
          </div>
          <el-dialog
            title="修改邮箱地址"
            :visible.sync="visible"
            width="500px">
            <el-form :model="emailChange">
              <el-form-item label="输入密码" label-width="120px">
                <el-input class="changeInput" v-model="emailChange.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="绑定新邮箱" label-width="120px">
                <el-input class="changeInput" v-model="emailChange.email"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialog-footer">
              <el-button class="btn-normal" @click="sendNewEmail()">确定</el-button>
              <el-button class="btn-normal" @click="visible = false">取消</el-button>
            </div>
          </el-dialog>
          <el-dialog
            title="验证验证码"
            :visible.sync="emailVerifyDialog"
            width="500px"
            center>
            <el-input type="text" placeholder="请输入验证码" v-model="emailVerify" class="inputcss"></el-input>
            <el-button class="btn-normal" @click="checkEmailVerify()">修改邮箱</el-button>
            <el-button @click="emailVerifyDialog = false" class="btn-sample">取  消</el-button>
          </el-dialog>
        </el-card>
      </div>
    </el-main>
    <!--</el-container>-->

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
        userName:'',
        email:'',
        visible:false,
        emailChange:{},
        passwordCorrect:false,
        oldPassword:'',
        newPassword:'',
        emailVerifyDialog:false,
        emailVerify:'',
        newEmail:'',
      }
    },
    created(){
      this.getOriginalInfo();
    },
    methods:{
      getOriginalInfo(){
        let that=this;
        this.$axios({
          method:'get',
          url:'/settings',
          params:{
            id:this.$route.query.userId
          }
        }).then(response=>{
          that.userName=response.data.username;
          that.email=response.data.email;
        }).catch(error=>console.log(error));
      },
      changePassword(){
        this.$axios({
          method:'put',
          url:'/settings/password',
          params:{
            id:this.$route.query.userId,
            oldPassword:this.oldPassword,
            newPassword:this.newPassword
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message: '修改密码成功',
              type: 'success'
            });
            that.passwordCorrect=true;
          }else{
            this.$message.error('修改失败');
          }
        })
          .catch(error=>{
            console.log(error);
            this.$message.error('修改失败');
          });
      },
      sendNewEmail(){
        this.newEmail=this.emailChange.email;
        console.log(this.newEmail);
        this.$axios({
          method:'put',
          url:'/settings/email',
          params:{
            id:3,
            password:this.emailChange.password,
            email:this.emailChange.email
          }
        }).then(response=>{
          if(response.status==200){
            this.emailVerifyDialog=true;
          }else{
            this.$message.error('失败');
          }
        }).catch(error=>{
          console.log(error);
          this.$message.error('失败');
        });
      },
      checkEmailVerify(){
        this.$axios({
          method:'put',
          url:'/confirm/email',
          params:{
            code:this.emailVerify,
            new:this.newEmail
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message: '修改邮箱成功',
              type: 'success'
            });
            this.emailVerifyDialog=false;
          }else{
            this.$message.error('失败');
          }
        }).catch(error=>{
          console.log(error);
          this.$message.error('失败');
        })
      }
    }

  }
</script>

<style scoped>

  .mainCard{
    margin: 10px auto;
    width: 700px;
    height: 600px;
    text-align: center;
  }
  .changePart{
    margin: 50px 100px;
    text-align: left;
  }
  .titleP{
    color: #595959;
    font-size: 16px;
    font-weight: bolder;
  }
  .changePart label{
    color: #595959;
    font-size: 12px;
    padding: 10px 10px 10px 0px;
  }

  .changePart span{
    color: #808080;
    font-size: 12px;
    padding: 10px 10px 10px 10px;
  }
  .inputText{
    width: 180px;
    margin-right: 50px;
  }
  .btnDiv{
    margin-top: 80px;
  }
  .btnDiv .el-button{
    margin:0px 30px;
  }
  .changeInput{
    width: 200px;
  }
  .dialog-footer{
    text-align: center;
  }
  .dialog-footer .el-button{
    width: 100px;
    margin: 0 50px;
  }
  .btn-check{
    border: none;
    background-color: white;
    color: #494e8f;
  }
</style>
