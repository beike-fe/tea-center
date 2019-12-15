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
          <span class="locat-second">一带一路贸易数据库</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <!--<img src="../../assets/icon/search.png">-->
            <!--<el-input v-model="search" type="text" placeholder="输入关键字" class="sortInput"></el-input>-->
            <!--<el-button class="btn-normal btn-search" @click="searchInfo">筛选</el-button>-->
            <el-button class="btn-normal btn-output" @click="backOrigin"  v-if="infoEdit||ifExport">返回</el-button>
            <el-button class="btn-normal btn-output" @click="uploadEdit" v-if="infoEdit">完成</el-button>
            <el-button class="btn-normal btn-output" @click="exportSelection" v-if="exportPer&&!infoEdit">导出</el-button>
            <el-button class="btn-normal btn-output" @click="editTable()" v-if="inputPer&&!ifExport&&!infoEdit">编辑</el-button>
            <el-button class="btn-normal btn-output" @click="dialogVisible=!dialogVisible" v-if="inputPer&&!ifExport&&!infoEdit">新增</el-button>
          </p>
          <el-tabs v-model="activeCard" @tab-click="handleClick">
            <el-tab-pane label="贸易信息" name="tradeInfo">
              <!--贸易信息-->
              <el-table
                stripe
                :data="ifExport?tradeInfoData:tradeInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
                @selection-change="changeFun">
                <el-table-column
                  v-if="ifExport"
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  fixed="left">
                  <template v-if="inputPer&&!ifExport&&!infoEdit" slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tradeInfoData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in tradeInfoCol"
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
            <el-tab-pane label="国别基本信息与消费" name="consume">
              <!--国别基本信息与消费-->
              <el-table
                stripe
                :data="ifExport?countryData:countryData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                      @click.native.prevent="deleteRow(scope.$index, countryData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in countryCol"
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
            <el-tab-pane label="茶叶产值" name="teaProduce">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="ifExport?productionData:productionData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                      @click.native.prevent="deleteRow(scope.$index, productionData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in productionCol"
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
          <el-dialog
            title="新增"
            :visible.sync="dialogVisible"
            width="400px"
            class="centerDialog"
            center>
            <el-button class="btn-normal" @click="openSingleImport()">单条导入</el-button>
            <el-button class="btn-normal" @click="openMultiImport()">批量导入</el-button>
          </el-dialog>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "beltRoadDatabase",
    components: {TopBar,NavBar},
    data(){
      this.tradeInfoCol=[
        {label:'国家',name:'country'},{label:'贸易流向',name:'tradeFlow'},
        {label:'年份',name:'year'},{label:'伙伴国',name:'partnerCountry'},
        {label:'产品编号',name:'productNumber'},{label:'贸易价值',name:'tradeValue'},
        {label:'净重',name:'weight'},{label:'贸易数量',name:'tradeQuantity'}
      ];
      this.countryCol=[
        {label:'国家',name:'country'},{label:'地区',name:'district'},
        {label:'年份',name:'year'},{label:'总人口',name:'population'},
        {label:'国土面积',name:'landArea'},{label:'铁路长度',name:'railwayLength'},
        {label:'人均GDP',name:'gdp'},{label:'每百人互联网使用人数',name:'internetUser'},
        {label:'至少完成学士教育人数占25岁以上总人数比',name:'scholarEdu'},{label:'至少完成初中教育人数占25岁以上总人数比',name:'junior_edu'},
        {label:'进口所需时间',name:'importTime'},{label:'出口所需时间',name:'exportTime'},
        {label:'开办企业所需时间',name:'businessTime'},{label:'注册产权所需时间',name:'propertyTime'},
        {label:'人均健康支出',name:'healthSpending'},{label:'私人健康支出占GDP比重',name:'healthSpendingGdp'},
        {label:'家庭最终消费支出',name:'householdSpending'},{label:'人均家庭最终消费支出',name:'perCapitaHouseholdSpending'}
      ];
      this.productionCol=[
        {label:'国家',name:'country'},{label:'产品编号',name:'productNumber'},
        {label:'年份',name:'year'},{label:'产值',name:'production'},
      ]


      return{
        activeCard:'tradeInfo',
        tradeInfoData:[],
        productionData:[],
        countryData:[],
        tradeInfoDataCopy:[],
        productionDataCopy:[],
        countryDataCopy:[],
        dialogVisible:false,
        totalRow:0,
        currentPage:1,
        pageSize:8,
        ifExport:false,
        infoEdit:false,
        multipleSelection:[],
        selectedId:[],
        search:'',
        exportPer:true,
        inputPer:true,
      }
    },
    created(){
      this.getTradeInfo();
      this.getCountryInfo();
      this.getProduction();
      if(this.$store.state.permissions['3'].indexOf('2')!=-1) this.inputPer=true;
      else this.inputPer=false;
      if(this.$store.state.permissions['3'].indexOf('3')!=-1) this.exportPer=true;
      else this.exportPer=false;
    },
    methods:{
      handleClick() {
        switch (this.activeCard) {
          case 'tradeInfo':{
            this.totalRow=this.tradeInfoData.length;
            break;
          }
          case 'consume':{
            this.totalRow=this.countryData.length;
            break;
          }
          case 'teaProduce':{
            this.totalRow=this.productionData.length;
            break;
          }
        }
        this.multipleSelection=[];
      },
      deleteRow(index,rows,row){
        this.$confirm('是否删除数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除数据',
          cancelButtonText: '放弃删除'
        })
          .then(() => {
            switch (this.activeCard) {
              case 'tradeInfo':{
                this.$axios({
                  url:'/database/tradeInfo/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.tradeInfoData.splice(index,1);
                  this.tradeInfoDataCopy.splice(index,1);
                  this.totalRow--;
                }).catch(error=>console.log(error));
                break;
              }
              case 'consume':{
                this.$axios({
                  url:'/database/countryInfo/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.countryData.splice(index,1);
                  this.countryDataCopy.splice(index,1);
                  this.totalRow--;
                }).catch(error=>console.log(error));
                break;
              }
              case 'teaProduce':{
                this.$axios({
                  url:'/database/production/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                  this.productionData.splice(index,1);
                  this.productionDataCopy.splice(index,1);
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
      getTradeInfo(){
        this.$axios({
          url:'/database/tradeInfo',
          method:'get'
        }).then(response=>{
          this.tradeInfoData=response.data;
          this.tradeInfoDataCopy=response.data;
          this.totalRow=this.tradeInfoData.length;
        }).catch(error=>console.log(error));
      },
      getCountryInfo(){
        this.$axios({
          url:'/database/countryInfo',
          method:'get'
        }).then(response=>{
          this.countryData=response.data;
          this.countryDataCopy=response.data;
        }).catch(error=>console.log(error));
      },
      getProduction(){
        this.$axios({
          url:'/database/production',
          method:'get'
        }).then(response=>{
          this.productionData=response.data;
          this.productionDataCopy=response.data;
        }).catch(error=>console.log(error));
      },
      exportSelection(){
        var dbUrl='';
        switch (this.activeCard) {
          case 'tradeInfo':{
            dbUrl='tradeInfo';
            break;
          }
          case 'consume':{
            dbUrl='countryInfo';
            break;
          }
          case 'teaProduce':{
            dbUrl='production';
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
      openMultiImport(){
        switch (this.activeCard) {
          case 'tradeInfo':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'trade'}});
            break;
          }
          case 'consume':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'consume'}});
            break;
          }
          case 'teaProduce':{
            this.$router.push({path:'/MultiImport',query:{databaseName:'produce'}});
            break;
          }
        }
      },
      openSingleImport(){
        switch (this.activeCard) {
          case 'tradeInfo':{
            this.$router.push({path:'/MultiImport',query:{name:'trade'}});
            break;
          }
          case 'consume':{
            this.$router.push({path:'/MultiImport',query:{name:'consume'}});
            break;
          }
          case 'teaProduce':{
            this.$router.push({path:'/MultiImport',query:{name:'produce'}});
            break;
          }
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
      // searchInfo(){
      //   var search=this.search;
      //   if(search){
      //     switch (this.activeCard) {
      //       case 'tradeInfo':{
      //         this.tradeInfoData=this.tradeInfoDataCopy.filter(data => !search || data.teaSpecies.toLowerCase().includes(search.toLowerCase()));
      //         break;
      //       }
      //       case 'consume':{
      //         this.countryData=this.countryDataCopy.filter(data => !search || data.teaSpecies.toLowerCase().includes(search.toLowerCase()));
      //         break;
      //       }
      //       case 'teaProduce':{
      //         this.productionData=this.productionDataCopy.filter(data => !search || data.teaSpecies.toLowerCase().includes(search.toLowerCase()));
      //         break;
      //       }
      //     }
      //   }else{
      //     switch (this.activeCard) {
      //       case 'tradeInfo':{
      //         this.tradeInfoData=this.tradeInfoDataCopy;
      //         break;
      //       }
      //       case 'consume':{
      //         this.countryData=this.countryDataCopy;
      //         break;
      //       }
      //       case 'teaProduce':{
      //         this.productionData=this.productionDataCopy;
      //         break;
      //       }
      //     }
      //   }
      // },
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
    margin: 0 5px;
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
