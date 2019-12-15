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
          <span class="locat-first">数据库管理</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">价格指数</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal btn-search">筛选</el-button>
            <el-button class="btn-normal btn-output" @click="backOrigin"  v-if="infoEdit||ifExport">返回</el-button>
            <el-button class="btn-normal btn-output" @click="uploadEdit" v-if="infoEdit">完成</el-button>
            <el-button class="btn-normal btn-output" @click="exportSelection" v-if="exportPer&&!infoEdit">导出</el-button>
            <el-button class="btn-normal btn-output" @click="editTable()" v-if="inputPer&&!ifExport&&!infoEdit">编辑</el-button>
            <el-button class="btn-normal btn-output" @click="dialogVisible=!dialogVisible" v-if="inputPer&&!ifExport&&!infoEdit">新增</el-button>
          </p>
          <el-tabs v-model="activeCard" @tab-click="handleClick">
            <el-tab-pane label="95后现制奶茶消费数据库-基本信息" name="basicInfo">
              <el-table
                stripe
                :data="ifExport?basicInfoData:basicInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
                @selection-change="changeFun">
                <el-table-column
                  v-if="ifExport"
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template v-if="inputPer&&!ifExport&&!infoEdit" slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, basicInfoData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in basicInfoCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                  <template slot-scope="scope">
                    <span v-if="!infoEdit">
                      {{scope.row[item.name]}}
                    </span>
                    <el-input v-else v-model="scope.row[item.name]"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="95后现制奶茶消费数据库-因素关注程度" name="factor">
              <el-table
                stripe
                :data="ifExport?factorData:factorData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
                @selection-change="changeFun">
                <el-table-column
                  v-if="ifExport"
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template v-if="inputPer&&!ifExport&&!infoEdit" slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, factorData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in factorCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                  <template slot-scope="scope">
                    <span v-if="!infoEdit">
                      {{scope.row[item.name]}}
                    </span>
                    <el-input v-else v-model="scope.row[item.name]"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="福建省乌龙茶消费者购买行为数据库-消费者的个性特征" name="feature">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="ifExport?featureData:featureData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
                @selection-change="changeFun">
                <el-table-column
                  v-if="ifExport"
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template v-if="inputPer&&!ifExport&&!infoEdit" slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, featureData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in featureCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                  <template slot-scope="scope">
                    <span v-if="!infoEdit">
                      {{scope.row[item.name]}}
                    </span>
                    <el-input v-else v-model="scope.row[item.name]"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="福建省乌龙茶消费者购买行为数据库-消费者的消费习惯和购买情况" name="habits">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="ifExport?habitsData:habitsData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
                @selection-change="changeFun">
                <el-table-column
                  v-if="ifExport"
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template v-if="!ifExport&&!infoEdit" slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, habitsData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in habitsCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                  <template slot-scope="scope">
                    <span v-if="!infoEdit">
                      {{scope.row[item.name]}}
                    </span>
                    <el-input v-else v-model="scope.row[item.name]"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="福建省乌龙茶消费者购买行为数据库-消费者对茶叶的认知度" name="recognition">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="ifExport?recognitionData:recognitionData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
                @selection-change="changeFun">
                <el-table-column
                  v-if="ifExport"
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template v-if="!ifExport&&!infoEdit" slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, recognitionData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in recognitionCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                  <template slot-scope="scope">
                    <span v-if="!infoEdit">
                      {{scope.row[item.name]}}
                    </span>
                    <el-input v-else v-model="scope.row[item.name]"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <p class="pagination" v-if="!ifExport">
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
      <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="400px"
        class="centerDialog"
        center>
        <el-button class="btn-normal" @click="openSingleImport()">单条导入</el-button>
        <el-button class="btn-normal" @click="openMultiImport()">批量导入</el-button>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "consumerDatabase",
    components: {TopBar,NavBar},
    data(){
      this.basicInfoCol=[
        {label:'出生日期',name:'birthday'},{label:'性别',name:'gender'},
        {label:'月可支配收入',name:'income'},{label:'消费现制奶茶的频率',name:'consumeFrequency'},
        {label:'消费现制奶茶的方式',name:'consumeWay'},{label:'消费现制奶茶的单价',name:'consumePrice'},
        {label:'常去的现制奶茶店',name:'shop'},{label:'常去的现制奶茶店位置',name:'shopLocation'}
      ];
      this.factorCol=[
        {label:'产品符合个人口味偏好',name:'personalTaste'},{label:'产品更新速度快',name:'updateFast'},
        {label:'产品可选种类丰富',name:'variety'},{label:'产品是否使用鲜奶',name:'freshMilk'},
        {label:'产品茶基是否使用鲜茶叶',name:'freshTea'},{label:'产品包装设计人性化',name:'packageHumanized'},
        {label:'产品包装时尚、新潮',name:'packageFashion'},{label:'店内设座',name:'seat'},
        {label:'店内装修风格',name:'decorateStyle'},{label:'卫生状况',name:'healthCondition'},
        {label:'店员服务态度',name:'serviceAttitude'},{label:'等餐时间',name:'waitingTime'},
        {label:'产品口碑',name:'evaluation'},{label:'品牌知名度',name:'profile'},
        {label:'社交平台上他人的推荐',name:'socialRecommend'},{label:'亲朋好友的推荐',name:'friendRecommend'},
        {label:'商家或商品的平面广告',name:'advertisement'},{label:'是否为网红产品',name:'ispopular'},
        {label:'茶点、甜点',name:'dessert'},{label:'周边产品（如手机壳、卡贴）',name:'peripheralProduct'},
        {label:'常去该现制奶茶品牌的原因',name:'reason'}
      ];
      this.featureCol=[
        {label:'地区',name:'district'},{label:'性别',name:'gender'},
        {label:'年龄',name:'age'},{label:'职业',name:'job'},
        {label:'月收入',name:'income'},{label:'受教育程度',name:'education'},
      ];
      this.habitsCol=[
        {label:'茶龄',name:'teaAge'},{label:'喝乌龙茶的频率',name:'drinkFrequency'},
        {label:'每次饮茶量',name:'teaAmount'},{label:'年花费金额',name:'cost'},
        {label:'购买频率',name:'purchaseFrequency'},{label:'购买原因',name:'purchaseReason'},
        {label:'购买途径',name:'purchaseWay'}, {label:'相关知识',name:'knowledge'},
        {label:'最主要信息来源',name:'infoSource'},{label:'标签最关注',name:'labelFocus'}
      ];
      this.recognitionCol=[
        {label:'质量安全关注度',name:'qualitySafety'},{label:'茶叶分级了解程度',name:'classificationUnderstanding'},
        {label:'食品认证信任度',name:'foodTrust'},
      ];


      return{
        activeCard:'basicInfo',
        basicInfoData:[],
        basicInfoDataCopy:[],
        factorData:[],
        factorDataCopy:[],
        featureData:[],
        featureDataCopy:[],
        habitsData:[],
        habitsDataCopy:[],
        recognitionData:[],
        recognitionDataCopy:[],
        dialogVisible:false,
        totalRow:0,
        currentPage:1,
        pageSize:8,
        ifExport:false,
        infoEdit:false,
        multipleSelection:[],
        selectedId:[],
        exportPer:true,
        inputPer:true,
      }
    },
    created(){
      this.getBasicInfo();
      this.getFactorData();
      this.getFeatureData();
      this.getHabitsData();
      this.getRecognition();
      if(this.$store.state.permissions['4'].indexOf('2')!=-1) this.inputPer=true;
      else this.inputPer=false;
      if(this.$store.state.permissions['4'].indexOf('3')!=-1) this.exportPer=true;
      else this.exportPer=false;
    },
    methods:{
      handleClick() {
        switch (this.activeCard) {
          case 'basicInfo':{
            this.totalRow=this.basicInfoData.length;
            break;
          }
          case 'factor':{
            this.totalRow=this.factorData.length;
            break;
          }
          case 'feature':{
            this.totalRow=this.featureData.length;
            break;
          }
          case 'habits':{
            this.totalRow=this.habitsData.length;
            break;
          }
          case 'recognition':{
            this.totalRow=this.recognitionData.length;
            break;
          }
        }
        this.multipleSelection=[];
      },
      openSingleImport(){
        var dbName='';
        switch (this.activeCard) {
          case 'basicInfo':{
            dbName='basicInfo';
            break;
          }
          case 'factor':{
            dbName='factor';
            break;
          }
          case 'feature':{
            dbName='feature';
            break;
          }
          case 'habits':{
            dbName='habits';
            break;
          }
          case 'recognition':{
            dbName='recognition';
            break;
          }
        }
        this.$router.push({path:'/SingleImport',query:{name:dbName}});
      },
      openMultiImport(){
        switch (this.activeCard) {
          case 'basicInfo':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'basicInfo'}});
            break;
          }
          case 'factor':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'factor'}});
            break;
          }
          case 'feature':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'feature'}});
            break;
          }
          case 'habits':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'habits'}});
            break;
          }
          case 'recognition':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'recognition'}});
            break;
          }
        }
      },
      deleteRow(index,rows,row){
        this.$confirm('是否删除数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除数据',
          cancelButtonText: '放弃删除'
        })
          .then(() => {
            switch (this.activeCard) {
              case 'basicInfo':{
                this.$axios({
                  url:'/database/basicInfo/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.basicInfoData.splice(index,1);
                  this.basicInfoDataCopy.splice(index,1);
                  this.totalRow--;
                }).catch(error=>console.log(error));
                break;
              }
              case 'factor':{
                this.$axios({
                  url:'/database/factor/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.factorData.splice(index,1);
                  this.factorDataCopy.splice(index,1);
                  this.totalRow--;
                }).catch(error=>console.log(error));
                break;
              }
              case 'feature':{
                this.$axios({
                  url:'/database/feature/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.featureData.splice(index,1);
                  this.featureDataCopy.splice(index,1);
                  this.totalRow--;
                }).catch(error=>console.log(error));
                break;
              }
              case 'habits':{
                this.$axios({
                  url:'/database/habits/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.habitsData.splice(index,1);
                  this.habitsDataCopy.splice(index,1);
                  this.totalRow--;
                }).catch(error=>console.log(error));
                break;
              }
              case 'recognition':{
                this.$axios({
                  url:'/database/recognition/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.recognitionData.splice(index,1);
                  this.recognitionDataCopy.splice(index,1);
                  this.totalRow--;
                }).catch(error=>console.log(error));
                break;
              }
            }
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃删除'
                : '停留在当前页面'
            })
          });
      },
      getBasicInfo(){
        this.$axios({
          url:'/database/basicInfo',
          method:'get'
        }).then(response=>{
          this.basicInfoData=response.data;
          this.basicInfoDataCopy=response.data;
          this.totalRow=this.basicInfoData.length;
        }).catch(error=>console.log(error));
      },
      getFactorData(){
        this.$axios({
          url:'/database/factor',
          method:'get'
        }).then(response=>{
          this.factorData=response.data;
          this.factorDataCopy=response.data;
        }).catch(error=>console.log(error));
      },
      getFeatureData(){
        this.$axios({
          url:'/database/feature',
          method:'get'
        }).then(response=>{
          this.featureData=response.data;
          this.featureDataCopy=response.data;
        }).catch(error=>console.log(error));
      },
      getHabitsData(){
        this.$axios({
          url:'/database/habits',
          method:'get'
        }).then(response=>{
          this.habitsData=response.data;
          this.habitsDataCopy=response.data;
        }).catch(error=>console.log(error));
      },
      getRecognition(){
        this.$axios({
          url:'/database/recognition',
          method:'get'
        }).then(response=>{
          this.recognitionData=response.data;
          this.recognitionDataCopy=response.data;
        }).catch(error=>console.log(error));
      },
      exportSelection(){
        var dbUrl='';
        switch (this.activeCard) {
          case 'basicInfo':{
            dbUrl='basicInfo';
            break;
          }
          case 'factor':{
            dbUrl='factor';
            break;
          }
          case 'feature':{
            dbUrl='feature';
            break;
          }
          case 'habits':{
            dbUrl='habits';
            break;
          }
          case 'recognition':{
            dbUrl='recognition';
            break;
          }
        }
        this.getSelectedId();
        if(this.ifExport){
          this.$axios({
            method:'post',
            url:'/'+dbUrl+'/excelDownloads',
            data:{
              id:this.selectedId
            },
            responseType: 'blob'
          }).then(res=>{
            if(res.status===200){
              this.downloadExcel(res.data,dbUrl);
              this.$message({
                type: 'success',
                message: '导出成功'
              });
            }else{
              this.$message.error('导出失败');
            }
          }).catch(error=>{
            this.$message.error('导出失败');
            console.log(error);
          });
          this.ifExport=!this.ifExport;
        }else{
          this.ifExport=!this.ifExport;
        }
      },
      getSelectedId(){
        for(var value of this.multipleSelection){
          this.selectedId.push(value.id);
        }
      },
      downloadExcel(data,name) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name+'.xls')
        document.body.appendChild(link)
        link.click()
      },
      changeFun(val) {
        this.multipleSelection=[];
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {
        this.currentPage=val;
      },
      backOrigin(){
        this.ifExport=false;
        this.infoEdit=false;
      },
      editTable(){
        this.infoEdit=true;
      },
      uploadEdit(){

      },
    }
  }
</script>

<style scoped>
  .tableDiv{
    padding: 10px 100px;
  }
  .searchBar{
    height: 60px;
    line-height: 60px;
  }
  .searchBar .el-input{
    width: 15%;
  }
  .btn-output{
    float: right;
  }
  .btn-search{
    margin-left: 5%;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
  .el-icon-remove{
    background-color: rgba(255,255,255,0);
    border: none;
    color: #ccadad;
  }
  .addBtn{
    border: none;
    height: 80px;
    background-color: white;
  }
  .addBtnDiv{
    background-color: white;
  }
</style>
