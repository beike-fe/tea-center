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
          <span class="locat-first">字典管理</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">{{databaseName}}</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">{{dictionaryName}}</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal">筛选</el-button>
          </p>
          <el-table
            stripe
            :data="dictionaryInfo.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              width="80px"
              fixed="left"
              v-if="inputPer">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, dictionaryInfo,scope.row)"
                  class="el-icon-remove"
                  size="small">
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="elementId"
              label="ID">
            </el-table-column>
            <el-table-column
              label="数据字段"
              align="center">
              {{dictionaryName}}
            </el-table-column>
            <el-table-column
              prop="elementName"
              label="字典显示"
              align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.elementName" :disabled="!inputPer">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="elementSerial"
              label="排序">
              <template slot-scope="scope">
              </template>
            </el-table-column>
            <el-table-column
              prop="editor"
              label="编辑者">
            </el-table-column>
            <el-table-column
              prop="time"
              label="编辑时间">
            </el-table-column>
            <el-table-column
              label="操作"
              v-if="inputPer">
              <template slot-scope="scope">
                <el-button class="btn-normal" @click="saveEdit(scope.row)">保存修改</el-button>
              </template>
            </el-table-column>
          </el-table>
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
    name: "editDictionary",
    components: {TopBar,NavBar},
    data(){
      return{
        dictionaryInfo:[],
        databaseName:'',
        totalRow:0,
        currentPage:1,
        pageSize:8,
        dictionaryName:'',
        databaseStr:'',
        inputPer:false
      }
    },
    created(){
      this.databaseName=this.$route.query.databaseName;
      this.dictionaryName=this.$route.query.dictionaryName;
      this.inputPer=this.$route.query.inputPer;
      this.getDetailInfo();
    },
    methods:{
      getDetailInfo(){
        switch(this.$route.query.databaseName){
          case '乌龙茶品种SNP指纹图谱数据库':{
            this.$axios({
              url:'/dictionary/snpMap/'+this.$route.query.dictionaryId,
              method:'get'
            }).then(response=>{
              this.databaseStr='snpMap';
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
          case '乌龙茶品种资源数据库':{
            this.$axios({
              url:'/dictionary/germplasm/'+this.$route.query.dictionaryId,
              method:'get'
            }).then(response=>{
              this.databaseStr='germplasm';
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
          case '一带一路贸易数据库':{
            this.$axios({
              url:'/dictionary/tradeinfo/'+this.$route.query.dictionaryId,
              method:'get'
            }).then(response=>{
              this.databaseStr='tradeinfo';
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
          case '福建省乌龙茶消费者购买行为数据库':{
            this.$axios({
              url:'/dictionary/consume/'+this.$route.query.dictionaryId,
              method:'get'
            }).then(response=>{
              this.databaseStr='consume';
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
        }
      },
      handleCurrentChange(val) {
        this.currentPage=val;
      },
      deleteRow(index, rows,row){
        this.$confirm('是否删除数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除数据',
          cancelButtonText: '放弃删除'

        })
          .then(() => {
            console.log(row);
            this.$axios({
              url:'/dictionary/'+this.databaseStr+'/'+this.$route.query.dictionaryId+'/'+row.elementId,
              method: 'delete'
            }).then(()=>{
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              rows.splice(index, 1);
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
      saveEdit(row){
        this.$axios({
          url:'/dictionary/'+this.databaseStr+'/'+this.$route.query.dictionaryId,
          method:'put',
          params:{
            element_id: row.elementId,
            dictionary_code: this.dictionaryName,
            element_name: row.elementName
          }
        }).then(res=>console.log(res))
          .catch(err=>console.log(err));
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
  .locat-second{
    color: #595959;
    font-size: 12px;
    font-weight: bold;
    margin: 0 10px;
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
  .el-icon-remove{
    background-color: rgba(255,255,255,0);
    border: none;
    color: #ccadad;
  }
  .addBtn{
    background-color: rgba(255,255,255,0);
    float: right;
    border: none;
    height: 80px;
  }
</style>
