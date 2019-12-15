<template>
  <div class="left-nav" ref="navBar">
    <div class="navBar">
      <div class="userInfo">
           <span class="userIcon">
             <img class="userImg" src="../../assets/timg.jpeg" @click="toPersonCenter">
           </span>
        <div class="userInfoRight">
          <p style="text-align: center">{{username}}</p>
          <span class="buttonArea">
              <img class="imgSize" src="../../assets/icon/settings.png" @click="toSetting">
              <img class="imgSize" src="../../assets/icon/fen.png">
              <img class="imgSize" src="../../assets/icon/out.png" @click="logOut">
            </span>
        </div>
      </div>
      <div class="nav-list">
        <ul>
          <li v-for="item in navName" @click="navChange(item.name)">
            <a class="nav-li-a" :class="{'active':isActive==item.name}">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>

    <button class="btn-nav" @click="changeNavBar(show)">
      <img src="../../assets/icon/back.png" width="20px"  ref="foldBtnImg">
    </button>
  </div>

</template>

<script>
  export default {
    name: "nav-bar",
    data(){
      return{
        show:true,
        isActive:'',
        navName:[
          {title:'首页',name:'index'},
          {title:'数据库管理',name:'databaseManage'},
        ],
        username:'',
        userId:'',
      }
    },
    created(){
      this.username=this.$store.state.name;
      this.userId=this.$store.state.id;
      switch (this.$store.state.role) {
        case 'A':{
          this.navName.push({title:'权限管理',name:'authorityManage'},
            {title:'用户管理',name:'userManage'},
            {title:'字典管理',name:'dictionaryManage'},
            {title:'操作日志',name:'operateLog'});
          break;
        }
        case 'B':{
          this.navName.push({title:'权限管理',name:'authorityManage'},
            {title:'用户管理',name:'userManage'},
            {title:'字典管理',name:'dictionaryManage'});
          break;
        }
        case 'C':{
          this.navName.push({title:'字典管理',name:'dictionaryManage'});
          break;
        }
        case 'D':{
          break;
        }
      }
    },
    mounted () {
      this.isActive = window.sessionStorage.getItem('isActive');
    },
    methods:{
      navChange(title){
        switch(title){
          case 'index':{this.$router.push('/Index');break;}
          case 'databaseManage':{this.$router.push('/DataBaseIndex');break;}
          case 'authorityManage':{this.$router.push('/AuthorityManage');break;}
          case 'userManage':{this.$router.push({path:'/UserManage',query:{userId:this.userId}});break;}
          case 'dictionaryManage':{this.$router.push('/DictionaryIndex');break;}
          case 'operateLog':{this.$router.push('/OperateLog');break;}
        }
        this.isActive=title;
        window.sessionStorage.setItem('isActive', this.isActive);
      },
      toPersonCenter(){
        this.$router.push({path:'/PersonCenter',query:{userId:this.userId}});
      },
      toSetting(){
        this.$router.push({path:'/Setting',query:{userId:this.userId}});
      },
      logOut(){
        this.$axios({
          url:'/logout',
          method:'get'
        }).then(response=>{
          if(response.status===200){
            this.$router.push('/');
          }else{
            console.log(response);
          }
        }).catch(error=>console.log(error));
      },
      showNavBar(navBar,foldBtnImg){
        navBar.style['transform'] = 'translateX(0)';
        foldBtnImg.style['transform'] = 'rotate(180deg)';
        this.$data.show = true;
      },
      hideNavBar(navBar,foldBtnImg){
        navBar.style['transform'] = 'translateX(-100%)';
        foldBtnImg.style['transform'] = 'rotate(0deg)';
        this.$data.show = false;
      }
    }
  }
</script>

<style scoped>
  .left-nav{
    width: 220px;
    height: 100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.8s;
  }
  .navBar{
    width: 100%;
    height: 100%;
    background-color: #d3d4e4;
  }
  .userIcon{
    margin-right: 10px;
  }
  .userImg{
    position: relative;
    top: 10px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  .userInfo{
    color:#595959;
    font-size: 20px;
    font-weight: bolder;
    padding: 10px 10px 10px 20px;
  }
  .userInfoRight{
    display: inline-block;
  }

  .imgSize{
    height:20px;
    width: 20px;
  }
  .buttonArea{
    padding-left: 12px;
  }

  .nav-list{margin-top: 30px;height: 100%;}
  .nav-list ul{list-style-type: none;margin: 0;padding: 0;width:100%;}


  .nav-list ul li a{
    display: block;
    padding: 12px 20px;

    text-decoration: none;
    color: #595959;
    font-size: 12px;
    font-family: 微软雅黑;
    font-weight: bold;
  }

  .active{color: #ffffff;background-color: #8084b1;}

  .nav-li-a{
    cursor: pointer;
  }

  .btn-nav{
    height: 60px;
    width: 35px;
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%) rotate(180deg);
    transition: transform 0.8s;
    border-radius: 4px 0 0 4px;
    background: #FFFFFF;
    cursor: pointer;
  }

  .btn-nav > img{
    transform: rotate(180deg);
    transition: transform 1s;
  }

</style>
