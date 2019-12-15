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
          <span class="locat-first">个人中心</span>
        </p>

          <el-card class="mainCard">
            <div class="contentDiv">
              <div class="part1">
                <img class="personImg" src="../assets/timg.jpeg">
              </div>
              <div class="part2">
                <div class="identity">
                  <img src="../assets/icon/personal.png" style="height: 30px">
                  <span>{{userInfo.role}}</span>
                </div>
                <el-upload class="upload-btn" action="">
                  <el-button class="btn-normal">
                    修改头像
                  </el-button>
                </el-upload>
              </div>

            </div>
            <p class="workPlace">工作单位:<span>{{userInfo.workplace}}</span></p>
            <table class="tableClass">
              <tr>
                <td class="labeltext">角色:</td><td class="fonttext">{{userInfo.role}}</td>
                <td class="labeltext">权限:</td><td class="fonttext">{{userInfo.level}}</td>
              </tr>
              <tr>
                <td class="labeltext">邮箱:</td><td class="fonttext" name="mail">{{userInfo.email}}</td>
                <td class="labeltext">手机:</td>
                <td class="fonttext">
                  <el-input type="tel" class="inputtext" name="telephone" :placeholder="userInfo.telephone" v-model="telephone"></el-input>
                </td>
              </tr>
              <tr>
                <td class="labeltext">Q Q:</td>
                <td class="fonttext">
                  <el-input type="text" class="inputtext" name="qq" :placeholder="userInfo.QQ" v-model="QQ"></el-input>
                </td>
                <td class="labeltext">微信:</td>
                <td class="fonttext">
                  <el-input type="text" class="inputtext" name="wechat" :placeholder="userInfo.WeChat" v-model="WeChat"></el-input>
                </td>
              </tr>
            </table>
            <span class="labeltext">个人说明：</span>
            <el-input type="textarea" class="personIntro"  :placeholder="userInfo.detail" v-model="detail"></el-input>
            <p class="btnPlace">
              <el-button class="btn-normal" @click="updateInfo()">保存</el-button>
              <el-button class="btn-normal" @click="this.$router.go(-1)">返回</el-button>
            </p>
          </el-card>
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
        userInfo:{},
        QQ:'',
        WeChat: '',
        telephone: '',
        detail: ''
      }
    },
    created(){
      this.getUserInfo();
    },
    methods:{
      getUserInfo(){
        let that=this;
        this.$axios({
          method:'get',
          url:'/information',
          params:{
            id:this.$route.query.userId    //传入用户id
          }
        }).then(response=>{
          that.userInfo=response.data;
        }).catch(error=>console.log(error));
      },
      updateInfo(){
        let that=this;
        this.$axios({
          method:'put',
          url:'/information',
          data:{
            telephone: that.telephone,
            QQ: that.QQ,
            WeChat: that.WeChat,
            detail: that.detail
          }
        }).then(response=>console.log(response))
          .catch(error=>console.log(error));
      }
    }

  }
</script>

<style scoped>

  .mainCard{
    margin: 10px auto;
    width: 700px;
    height: 650px;
    text-align: center;
  }
  .personImg{
    position: relative;
    right: 20px;
    width: 120px;
    height: 120px;
    text-align: center;
  }
  .identity{
    height: 70px;
    width: 150px;
    border-radius:15px;
    text-align: center;
    line-height: 70px;
    border-color: #595959;
    border-width: 30px;
    background-color: #ffffff;
    color: #595959;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0px 0px 10px 2px rgba(89,89,89,0.15);
  }
  .contentDiv{
    margin: 30px auto;
  }
  .tableClass{
    margin: 10px auto;
  }
  .labeltext{
    color: #595959;
    font-size: 12px;
    font-weight: bold;
    padding: 0px 5px 0px 0px;
    width: 50px;
    height: 40px;

  }
  .upload-btn{
    margin-top: 20px;
  }
  .fonttext{
    padding: 0px 5px 0px 0px;
    color: #808080;
    font-size: 12px;
    width: 150px;
  }
  .personIntro{
    width: 400px;
  }
  .tableClass tr{
    height: 60px;
  }
  .tableClass .fonttext{
    width: 200px;
  }
  .tableClass .labeltext{
    padding-left: 20px;
  }
  .btnPlace{
    margin-top: 50px;
  }
  .btnPlace .el-button{
    margin: 0 80px;
  }
  .part1{
    display: inline-block;
    margin-right: 30px;
  }
  .part2{
    display: inline-block;
    margin-left: 30px;
  }
  .workPlace{
    color: #595959;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    margin:0px 70px;
    padding: 0px;
  }
  .workPlace span{
    display: inline-block;
    width: 170px;
    text-align: center;
    color: #808080;
    font-size: 12px;
    width: 150px;
  }
</style>
