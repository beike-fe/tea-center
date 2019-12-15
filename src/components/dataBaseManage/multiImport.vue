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
          <span class="locat-second">批量导入{{databaseName}}</span>
        </p>
        <el-card class="mainCard">
          <p>说明: </p>
          <p>1.点击“下载模板”下载数据表格模板，按要求填写表格后保存文件: </p>
          <p>2.点击“上传数据”选擇上传填写好的文件,仅可上传xls格式的文件; </p>
          <p>3.点击“导入”即可导入數据， </p>

          <el-button class="btn-normal btn-topmargin" @click="downloadMould">下载模版</el-button>
          <el-upload
            class="upload-demo"
            :action=updataUrl
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :http-request="myUpload"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button class="btn-normal">上传文件</el-button>
          </el-upload>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "multiImport",
    components: {TopBar,NavBar},
    data(){
      return{
        databaseName:'',
        updataUrl:'',
        downloadUrl:'',
        fileList:[],
      }
    },
    created() {
      switch(this.$route.query.databaseName){
        case 'snp':{
          this.databaseName='乌龙茶品种SNP指纹图谱数据库';
          this.updataUrl='/snpMap/import';
          this.downloadUrl='/snpMap/modelDownloads';
          break;
        }
        case 'variety':{
          this.databaseName='乌龙茶品种资源数据库';
          this.updataUrl='/germplasmResources/import';
          this.downloadUrl='/germplasmResources/modelDownloads';
          break;
        }
        case 'trade':{
          this.databaseName='一带一路贸易数据库-贸易信息';
          this.updataUrl='/tradeInfo/import';
          this.downloadUrl='/tradeInfo/modelDownloads';
          break;
        }
        case 'consume':{
          this.databaseName='一带一路贸易数据库-国别基本信息与消费';
          this.updataUrl='/countryInfo/import';
          this.downloadUrl='/countryInfo/modelDownloads';
          break;
        }
        case 'produce':{
          this.databaseName='一带一路贸易数据库-茶叶产值';
          this.updataUrl='/production/import';
          this.downloadUrl='/production/modelDownloads';
          break;
        }
        case 'basicInfo':{
          this.databaseName='95后现制奶茶消费数据库-基本信息';
          this.updataUrl='/basicInfo/import';
          this.downloadUrl='/basicInfo/modelDownloads';

          break;
        }
        case 'factor':{
          this.databaseName='95后现制奶茶消费数据库-因素关注程度';
          this.updataUrl='/factor/import';
          this.downloadUrl='/factor/modelDownloads';
          break;
        }
        case 'feature':{
          this.databaseName='福建省乌龙茶消费者购买行为数据库-消费者的个性特征';
          this.updataUrl='/feature/import';
          this.downloadUrl='/feature/modelDownloads';
          break;
        }
        case 'habits':{
          this.databaseName='福建省乌龙茶消费者购买行为数据库-消费者的消费习惯和购买情况';
          this.updataUrl='/habits/import';
          this.downloadUrl='/habits/modelDownloads';
          break;
        }
        case 'recognition':{
          this.databaseName='福建省乌龙茶消费者购买行为数据库-消费者对茶叶的认知度';
          this.updataUrl='/recognition/import';
          this.downloadUrl='/recognition/modelDownloads';
          break;
        }


      }
    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload (file) {
        console.log('beforeUpload')
        console.log(file.type)
        const isText = file.type === 'application/vnd.ms-excel'
        const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        return (isText | isTextComputer)
      },
      myUpload(item) {
        var form = new FormData();
        form.append("fileUpload", item.file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$axios.post(this.updataUrl, form, config)
          .then(res=>{
            if(res.status===200){
              this.$message({
                type: 'success',
                message: '导入成功'
              });
            }else{
              this.$message.error('导入失败');
            }
        }).catch(error=>{
          this.$message.error('导入失败');
          console.log(error);
        });
      },
      downloadMould(){
        this.$axios({
          method:'get',
          url:this.downloadUrl,
          responseType: 'blob'
        }).then(res=>{
          if(res.status===200){
            this.download(res.data);
            this.$message({
              type: 'success',
              message: '下载成功'
            });
          }else{
            this.$message.error('下载失败');
          }
        }).catch(error=>{
          this.$message.error('下载失败');
          console.log(error);
        });
      },
      download (data) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', this.$route.query.databaseName+'ModelExcel.xls')

        document.body.appendChild(link)
        link.click()
      }
    }

  }
</script>

<style scoped>
  .mainCard{
    margin: 10px auto;
    padding: 20px 40px;
    width: 600px;
    height: 420px;
    color: #808080;
    font-size: 12px;
    font-weight: bolder;
  }
  .upload-demo{
    margin-top: 20px;
  }
  .btn-topmargin{
    margin-top: 20px;
  }

</style>
