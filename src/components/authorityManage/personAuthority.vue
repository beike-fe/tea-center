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
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">{{username}}</span>
        </p>
        <div class="mainDiv">
          <div class="identity">
            <img src="../../assets/icon/personal.png">
            <span>{{username}}</span>
          </div>
          <div class="roleClass">
            <span>用户角色：</span>
            <el-select v-model="role">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label">
              </el-option>
            </el-select>
            <el-button class="btn-normal btnMargin" @click="saveRole()">修改</el-button>
          </div>
          <p class="authorP">
            <span class="selectSpan">详细权限</span>
            <i class="btn-icon el-icon-caret-bottom"></i>
          </p>
          <el-card>
            <div v-for="dataBase in dataBases">
              <div class="baseName">
                <span>{{dataBase.name}}</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <div class="changeInfo">
                <el-checkbox-group v-model="dataBase.authority">
                  <el-checkbox v-for="item in powers" :label="item.label" :key="item.key">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-card>
          <p class="buttonP">
            <el-button class="btn-normal btnMargin" @click="savePermission()">保存</el-button>
            <el-button class="btn-normal btnMargin" @click="back()">返回</el-button>
          </p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  const powerOptions=[{label:'查看数据'},{label:'导入数据'},{label:'导出数据'}];
  export default {
    name: "personAuthority",
    components: {TopBar,NavBar},
    data(){
      return{
        username:'',
        fold:true,
        dataBases:[],
        powers:powerOptions,
        powerChose:[],
        userId:'',
        permissionChanged:{},
        role:'',
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
      }
    },
    created() {
      this.username=this.$route.query.username;
      this.userId=this.$route.query.userId;
      this.getAllAthority();
    },
    methods:{
      getAllAthority(){
        this.$axios({
          url:'/authority/'+this.userId,
          method:'get'
        }).then(res=>{
          this.role=res.data.level;
          this.permissionChanged=res.data.auth;
          this.dataBases.push({name:'乌龙茶品种SNP指纹图谱数据库',authority:this.matchAuthority(res.data.auth['1']),dbId:1});
          this.dataBases.push({name:'乌龙茶品种资源数据库',authority:this.matchAuthority(res.data.auth['2']),dbId:2});
          this.dataBases.push({name:'一带一路贸易数据库',authority:this.matchAuthority(res.data.auth['3']),dbId:3});
          this.dataBases.push({name:'福建省乌龙茶消费者购买行为数据库',authority:this.matchAuthority(res.data.auth['4']),dbId:4});
        }).catch(err=>console.log(err));
      },
      savePermission(){
        var authority=this.reverseAuthority(this.dataBases);
        this.$axios({
          url:'/authority/permission',
          method:'post',
          data:{
            userId:this.userId,
            username:this.username,
            level:this.role,
            auth:authority.auth,
            databaseIds:authority.databaseIds
          }
        }).then(res=>alert('修改成功'))
          .catch(err=>console.log(err));
      },
      saveRole(){
        console.log(this.role);
        this.$axios({
          url:'/authority/'+this.userId+'/role',
          method:'post',
          params:{
            id:this.$store.state.id,
            roleId:this.role
          }
        }).then(res=>{
          alert("修改成功");
        }).catch(err=>{
          alert(err);
        })
      },
      matchAuthority(auth){
        var arr=new Array();
        if(auth){
          for(var i=0;i<auth.length;i++){
            switch (auth[i]) {
              case '1':{
                arr.push('查看数据');
                break;
              }
              case '2':{
                arr.push('导入数据');
                break;
              }
              case '3':{
                arr.push('导出数据');
                break;
              }
            }
          }
        }
        return arr;
      },
      reverseAuthority(obj){
        var authority=new Object();
        authority.databaseIds=[];
        for(var per of obj)
        {
          if(per.authority.length){
            authority.databaseIds.push(per.dbId);
            this.permissionChanged[per.dbId]=this.changePer(per.authority);
          }
        }
        authority.auth=this.permissionChanged;
        return authority;
      },
      changePer(arr){
        var output=new Array();
        for(var per of arr){
          switch (per) {
            case '查看数据':{
              output.push('1');
              break;
            }
            case '导入数据':{
              output.push('2');
              break;
            }
            case '导出数据':{
              output.push('3');
              break;
            }
            default:break;
          }
        }
        return output;
      },
      back(){
        this.$router.go(-1);
      }
    }


  }
</script>

<style scoped>
  .mainDiv{
    padding: 10px 100px;
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
  }
  .authorP{
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
  }
  .el-card{
    border-radius: 20px;
  }
  .roleClass{
    color: #808080;
    font-size: 12px;
    font-weight: bolder;
    margin-top: 20px;
  }
  .btn-icon{
    border:none;
    color: #494e8f;
    background-color: #f3f5fa;
    font-size: 25px;
  }
  .baseName{
    color: #808080;
    font-size: 12px;
    font-weight: bolder;
    margin: 10px 10px;
  }
  .changeInfo{
    background-color: #f3f5fa;
    padding: 15px 10px;
    border-radius: 20px;
  }
  .buttonP{
    margin-top: 30px;
    text-align: center;
  }
  .btnMargin{
    width: 90px;
    margin:0px 80px;
  }
</style>
