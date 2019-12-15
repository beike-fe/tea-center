<template>
  <el-container style="height: 100%" direction="vertical">
    <el-main>
      <div class="login-main">
        <div class="login-title">
          LOGO
        </div>
        <div class="textlogin">登录</div>
        <el-form :rules="formRule" :model="loginForm" ref="loginForm">
          <el-form-item prop="username">
            <el-input type="text" class="inputcss" placeholder="请输入用户名/邮箱" v-model="loginForm.username"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" class="inputcss" placeholder="请输入密码" v-model="loginForm.password"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="identifyCode">
            <el-col :span="16">
              <el-input class="inputcss" v-model="loginForm.identifyCode" clearable></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="6">
              <div class="code" @click="refreshCode">
                <identity :identifyCode="identifyCode"></identity>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-forget" @click="forgetPassword()">忘记密码?</el-button>
            <el-button class="btn-sample" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          title="忘记密码"
          :visible.sync="forgetDialog"
          width="500px"
          center>
          <el-form>
            <el-form-item>
              <el-col :span="18">
                <el-input type="text" placeholder="请输入邮箱" v-model="emailInForget" class="inputcss"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button class="btn-forget" @click="sendVerify()">发送验证码</el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="18">
                <el-input type="text" placeholder="请输入验证码" v-model="forgetVerify" class="inputcss"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button class="btn-forget" @click="checkVerify()">初始化密码</el-button>
              </el-col>
            </el-form-item>
          </el-form>
          <el-button @click="forgetDialog = false" class="btn-sample">取 消</el-button>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import Identity from './reuseComponent/identity';

  export default {
    name: 'login',
    components: {
      Identity,
    },
    data() {
      return {
        identifyCode: '',
        identifyCodes: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
        loginForm: {
          username: '',
          password: '',
          identifyCode: '',
        },
        formRule: {
          username: [
            { required: true, message: '请输入用户名/邮箱', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          identifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { max: 4, min: 4, message: '长度为4个字符', trigger: 'blur' },
          ],
        },
        forgetDialog: false,
        emailInForget: '',
        forgetVerify: '',
      };
    },
    mounted() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      randomNum( min, max ) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode( o, l ) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[ this.randomNum(0, this.identifyCodes.length) ];
        }
      },

      submitForm( loginForm ) {
        let that = this;
        let formdata = new FormData();
        formdata.append('username', this.loginForm.username);
        formdata.append('password', this.loginForm.password);
        this.$refs[ loginForm ].validate(( valid ) => {
          if (valid) {
            if (that.identifyCode.toLocaleLowerCase() === that.loginForm.identifyCode.toLocaleLowerCase()) {
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              };
              that.$axios.post('/login', formdata, config).then(
                response => {
                  var payload=new Object();
                  var info=response.data.token.split('.');
                  payload.token=response.data.token;
                  payload.name=info[1];
                  payload.id=info[0];
                  payload.role=info[4].substring(1,2);
                  that.getUserPermission(payload.id);
                  that.$store.commit("SET_AUTH",payload);
                  console.log(that.$store.state);
                  that.$router.push('/Index');
                },
              ).catch(
                error => {
                  that.$message.error(error.message);
                  console.log(error);
                });
            } else {
              that.$message.error('验证码错误！');
              that.$refs[ loginForm ].resetFields();
            }
          } else {
            that.$message.error('有必填项未填');
            return false;
          }
        });
      },
      getUserPermission(id){
        this.$axios({
          method:'get',
          url:'/permission',
          params:{
            cid:id
          }
        }).then(response=>{
          this.$store.state.permissions=response.data;
        }).catch(error=>{console.log(error);});
      },
      changeNavBar(show){
        let {navBar, foldBtnImg} = this.$refs;
        if(show){
          this.hideNavBar(navBar,foldBtnImg);
        } else{
          this.showNavBar(navBar,foldBtnImg);
        }
      },
      forgetPassword() {
        this.forgetDialog = true;
      },

      sendVerify() {
        let that = this;
        this.$axios({
          method: 'put',
          url: '/forget',
          params: {
            email: that.emailInForget,
          },
        }).then(response => {
          if (response.status == 200) {
            that.$message({
              message: '发送验证码成功',
              type: 'success',
            });
            that.forgetDialog = false;
          }
        }).catch(error => {
          console.log(error);
          that.$message.error('发送验证码失败');
        });
      },

      checkVerify() {
        let that = this;
        this.$axios({
          method: 'get',
          url: '/confirm/forget',
        }).then(response => {
          if (response.status == 200) {
            that.$message({
              message: '初始化密码成功',
              type: 'success',
            });
          }
        }).catch(error => {
          console.log(error);
          that.$message.error('验证失败');
        });
      },
    },

  };
</script>

<style scoped>
  .el-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-main {
    width: 500px;
    background-color: #fff;
    margin: auto;
    border-radius: 5px;
    border: 3px solid #e2e3e5;
    font-size: 20px;
    padding: 0 50px 30px 50px;
  }

  .login-title {
    position: relative;
    left: 35%;
    top: -30px;
    width: 30%;
    background-color: #494e8f;
    color: #fff;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 5px;

  }

  .textlogin {
    margin-bottom: 20px;
    text-align: center;
    color: #808080;
  }

  .btn-sample {
    height: 50px;
    width: 100%;
    font-size: 20px;
    background-color: #494e8f;
    border-color: #494e8f;
    color: white;
  }

  .btn-sample:hover {
    background-color: #8084b1;
    border-color: #8084b1;
    color: white;
  }

  .btn-sample:focus {
    background-color: #8084b1;
    border-color: #8084b1;
    color: white;
  }

  .code {
    display: inline-block;
    line-height: 50px;
    width: 114px;
    height: 50px;
  }

  .btn-forget {
    border: none;
    background-color: white;
    color: #494e8f;
  }
</style>
<style>
  .inputcss .el-input__inner {
    height: 50px;
  }
</style>
