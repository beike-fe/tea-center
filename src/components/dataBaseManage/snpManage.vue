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
          <span class="locat-second">乌龙茶品种SNP指纹图谱数据库</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input v-model="search" type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal btn-search" @click="searchInfo()">筛选</el-button>
            <el-button class="btn-normal btn-output" @click="backOrigin"  v-if="infoEdit||ifExport">返回</el-button>
            <el-button class="btn-normal btn-output" @click="uploadEdit" v-if="infoEdit">完成</el-button>
            <el-button class="btn-normal btn-output" @click="exportSelection" v-if="exportPer&&!infoEdit">导出</el-button>
            <el-button class="btn-normal btn-output" @click="editTable()" v-if="inputPer&&!ifExport&&!infoEdit">编辑</el-button>
            <el-button class="btn-normal btn-output" @click="dialogVisible=!dialogVisible" v-if="inputPer&&!ifExport&&!infoEdit">新增</el-button>


          </p>
          <div class="tableClass">
            <el-table
              stripe
              :data="ifExport?databaseDisplay:databaseDisplay.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}"
              @selection-change="changeFun">
              <el-table-column
                v-if="ifExport"
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                fixed="left">
                <template v-if="!ifExport&&!infoEdit&&inputPer" slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, dataBase,scope.row)"
                    class="el-icon-remove"
                    size="small">
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="teaSpecies"
                label="茶树品种"
                width="120px"
                fixed="left"
                center>
                <template slot-scope="scope">
                  <span v-if="!infoEdit">
                    {{scope.row.teaSpecies}}
                  </span>
                  <el-input v-else v-model="scope.row.teaSpecies"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                width="120px"
                v-for="item in colConfigs"
                :key="item.label"
                :prop="item.label"
                :label="item.label"
                center>
                <template slot-scope="scope">
                  <span v-if="!infoEdit">
                    {{scope.row[item.label]}}
                  </span>
                  <el-select v-else v-model="scope.row[item.label]">
                    <el-option
                      v-for="option in options"
                      :key="option.elementName"
                      :value="option.elementName"
                      :label="option.elementName"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
    name: "snpManage",
    components: {TopBar,NavBar},
    data(){
      this.colConfigs=[{label:'cs1'},{label:'cs115'},{label:'cs13'},{label:'cs15'},
        {label:'cs167'},{label:'cs201'},{label:'cs217'},{label:'cs3'},{label:'cs40'},
        {label:'cs5'},{label:'cs68'},{label:'cs84'},{label:'cs10'},{label:'cs116'},
        {label:'cs130'},{label:'cs150'},{label:'cs170'},{label:'cs202'},{label:'cs218'},
        {label:'cs30'},{label:'cs43'},{label:'cs51'},{label:'cs7'},{label:'cs85'},{label:'cs104'},
        {label:'cs117'},{label:'cs131'},{label:'cs156'},{label:'cs177'},{label:'cs207'},
        {label:'cs219'},{label:'cs31'},{label:'cs44'},{label:'cs52'},{label:'cs74'},{label:'cs88'},
        {label:'cs105'},{label:'cs118'},{label:'cs132'},{label:'cs157'},{label:'cs180'},
        {label:'cs208'},{label:'cs22'},{label:'cs32'},{label:'cs45'},{label:'cs54'},{label:'cs75'},
        {label:'cs9'},{label:'cs111'},{label:'cs119'},{label:'cs134'},{label:'cs16'},{label:'cs190'},
        {label:'cs210'},{label:'cs23'},{label:'cs33'},{label:'cs46'},{label:'cs55'},{label:'cs76'},
        {label:'cs91'},{label:'cs112'},{label:'cs12'},{label:'cs139'},{label:'cs163'},{label:'cs191'},
        {label:'cs212'},{label:'cs25'},{label:'cs36'},{label:'cs47'},{label:'cs57'},{label:'cs79'},
        {label:'cs93'},{label:'cs113'},{label:'cs122'},{label:'cs141'},{label:'cs164'},{label:'cs198'},
        {label:'cs213'},{label:'cs26'},{label:'cs39'},{label:'cs48'},{label:'cs66'},{label:'cs8'},
        {label:'cs94'},{label:'cs114'},{label:'cs124'},{label:'cs146'},{label:'cs166'},{label:'cs20'},
        {label:'cs215'},{label:'cs28'},{label:'cs4'},{label:'cs49'},{label:'cs67'},{label:'cs81'},{label:'cs95'}]
      return{
        dataBase:[],
        databaseDisplay:[],
        dialogVisible:false,
        options:[],
        search:'',
        ifExport:false,
        infoEdit:false,
        multipleSelection:[],
        selectedId:[],
        totalRow:0,
        currentPage:1,
        pageSize:8,
        infoEdit:false,
        exportPer:true,
        inputPer:true,
      }
    },
    created(){
      this. getSnpMap();
      if(this.$store.state.permissions['1'].indexOf('2')!=-1) this.inputPer=true;
      else this.inputPer=false;
      if(this.$store.state.permissions['1'].indexOf('3')!=-1) this.exportPer=true;
      else this.exportPer=false;
    },
    methods:{
      getSnpMap(){
        this.$axios({
          method:'get',
          url:'/database/snpMap',
        }).then(response=>{
          this.dataBase=response.data;
          this.databaseDisplay=response.data;
          this.totalRow=this.databaseDisplay.length;
        }).catch(error=>{
          console.log(error);
        });
        this.$axios({
          method:'get',
          url:'/dictionary/elements/'+'36'
        }).then(res=>{
          this.options=res.data;
        })
      },
      deleteRow(index,rows,row){
        this.$confirm('是否删除数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除数据',
          cancelButtonText: '放弃删除'
        })
          .then(() => {
            this.$axios({
              url:'/database/snpMap/'+row.id,
              method: 'delete'
            }).then((res)=>{
              console.log(res);
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              rows.splice(index, 1);
              this.databaseDisplay.splice(index,1);
              this.dataBase.splice(index,1);
              this.totalRow--;
            }).catch(error=>console.log(error));
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
      openMultiImport(){
        this.$router.push({path:'/MultiImport',query:{databaseName:'snp'}});
      },
      openSingleImport(){
        this.$router.push({path:'/SingleImport',query:{name:'variety'}})
      },
      backOrigin(){
        this.ifExport=false;
        this.infoEdit=false;
      },
      editTable(){
        this.infoEdit=true;
      },
      searchInfo(){
          var search=this.search;
          if(search){
            this.databaseDisplay=this.dataBase.filter(data => !search || data.teaSpecies.toLowerCase().includes(search.toLowerCase()));
          }else{
            this.databaseDisplay=this.dataBase;
          }
      },
      getSelectedId(){
        for(var value of this.multipleSelection){
          this.selectedId.push(value.id);
        }
      },
      exportSelection(){
        this.getSelectedId();
        if(this.ifExport){
          this.$axios({
            method:'post',
            url:'/snpMap/excelDownloads',
            data:{
              id:this.selectedId
            },
            responseType: 'blob'
          }).then(res=>{
            if(res.status===200){
              this.downloadExcel(res.data);
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
      downloadExcel(data) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'snpMapExcel.xls')
        document.body.appendChild(link)
        link.click()
      },
      uploadEdit(){
        // this.$axios({
        //   url:'/database/snpMap',
        //   method:'post',
        //   data:this.databaseDisplay
        // }).then(res=>{
        //   if(res.state===200) {
        //     this.dataBase=this.databaseDisplay;
        //     alert('修改成功');
        //   }else {
        //     this.databaseDisplay = this.dataBase;
        //     alert('修改失败');
        //   }
        // }).catch(error=>{
        //   alert('修改失败');
        //   console.log(error);
        // })
      },
      changeFun(val) {
        this.multipleSelection = val;
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
  .tableClass{
    max-height: 600px;
    overflow: auto;
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
    margin-left: 20px;
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
    height: 20px;
    width: 20px;
    background-color: transparent;
    border: none;
    color: #ccadad;
  }
</style>

