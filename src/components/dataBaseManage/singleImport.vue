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
          <span class="locat-second">{{dbName}}</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">单条导入</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <el-button class="btn-normal btn-output" @click="backOrigin()">返回</el-button>
            <el-button class="btn-normal btn-output" @click="importNewData()">导入</el-button>
          </p>
          <el-table
            stripe
            :data="importData"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              center
              v-for="item in colConfigs"
              :key="item.name"
              :prop="item.name"
              :label="item.label"
              center>
              <template slot-scope="scope">
                <el-input v-model="scope.row[item.name]"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
    export default {
        name: "singleImport",
      components: {TopBar,NavBar},
      data(){
        //SNP Database
        this.snp=[{name:'teaSpecies',label:'茶树品种'},{name:'cs1',label:'cs1'},{name:'cs115',label:'cs115'},
          {name:'cs13',label:'cs13'},{name:'cs15',label:'cs15'}, {name:'cs167',label:'cs167'},
          {name:'cs201',label:'cs201'},{name:'cs217',label:'cs217'},{name:'cs3',label:'cs3'},{name:'cs40',label:'cs40'},
          {name:'cs5',label:'cs5'},{name:'cs68',label:'cs68'},{name:'cs84',label:'cs84'},{name:'cs10',label:'cs10'},
          {name:'cs116',label:'cs116'}, {name:'cs130',label:'cs130'},{name:'cs150',label:'cs150'},
          {name:'cs170',label:'cs170'},{name:'cs202',label:'cs202'},{name:'cs218',label:'cs218'},
          {name:'cs30',label:'cs30'},{name:'cs43',label:'cs43'},{name:'cs51',label:'cs51'},
          {name:'cs7',label:'cs7'},{name:'cs85',label:'cs85'},{name:'cs104',label:'cs104'},
          {name:'cs117',label:'cs117'},{name:'cs131',label:'cs131'},{name:'cs156',label:'cs156'},
          {name:'cs177',label:'cs177'},{name:'cs207',label:'cs207'}, {name:'cs219',label:'cs219'},
          {name:'cs31',label:'cs31'},{name:'cs44',label:'cs44'},{name:'cs52',label:'cs52'},
          {name:'cs74',label:'cs74'},{name:'cs88',label:'cs88'}, {name:'cs105',label:'cs105'},
          {name:'cs118',label:'cs118'},{name:'cs132',label:'cs132'},{name:'cs157',label:'cs157'},
          {name:'cs180',label:'cs180'}, {name:'cs208',label:'cs208'},{name:'cs22',label:'cs22'},
          {name:'cs32',label:'cs32'},{name:'cs45',label:'cs45'},{name:'cs54',label:'cs54'},{name:'cs75',label:'cs75'},
          {name:'cs9',label:'cs9'},{name:'cs111',label:'cs111'},{name:'cs119',label:'cs119'},
          {name:'cs134',label:'cs134'},{name:'cs16',label:'cs16'},{name:'cs190',label:'cs190'},
          {name:'cs210',label:'cs210'},{name:'cs23',label:'cs23'},{name:'cs33',label:'cs33'},{name:'cs46',label:'cs46'},
          {name:'cs55',label:'cs55'},{name:'cs76',label:'cs76'}, {name:'cs91',label:'cs91'},{name:'cs112',label:'cs112'},
          {name:'cs12',label:'cs12'},{name:'cs139',label:'cs139'},{name:'cs163',label:'cs163'},
          {name:'cs191',label:'cs191'}, {name:'cs212',label:'cs212'},{name:'cs25',label:'cs25'},{name:'cs36',label:'cs36'},
          {name:'cs47',label:'cs47'},{name:'cs57',label:'cs57'},{name:'cs79',label:'cs79'},
          {name:'cs93',label:'cs93'},{name:'cs113',label:'cs113'},{name:'cs122',label:'cs122'},{name:'cs141',label:'cs141'},
          {name:'cs164',label:'cs164'},{name:'cs198',label:'cs198'}, {name:'cs213',label:'cs213'},
          {name:'cs26',label:'cs26'},{name:'cs39',label:'cs39'},{name:'cs48',label:'cs48'},{name:'cs66',label:'cs66'},
          {name:'cs8',label:'cs8'}, {name:'cs94',label:'cs94'},{name:'cs114',label:'cs114'},{name:'cs124',label:'cs124'},
          {name:'cs146',label:'cs146'},{name:'cs166',label:'cs166'},{name:'cs20',label:'cs20'},
          {name:'cs215',label:'cs215'},{name:'cs28',label:'cs28'},{name:'cs4',label:'cs4'},{name:'cs49',label:'cs49'},
          {name:'cs67',label:'cs67'},{name:'cs81',label:'cs81'},{name:'cs95',label:'cs95'}];

        //TeaVarietyDatabase
        this.teaVariety=[{name:'variety',label:'品系（种）'},{name:'sourceArea',label:'原产地'},{name:'treeShape',label:'树型'},
          {name:'treePerformance',label:'树姿'},{name:'branchDensity',label:'分枝密度'},
          {name:'suitablePickingMonth',label:'春茶适采月'}, {name:'suitablePickingMeadow',label:'春茶适采地'},{name:'suitablePickingPeriod',label:'春茶适采期'},
          {name:'budBody',label:'芽身'}, {name:'budColor',label:'芽叶色泽'},{name:'budPastel',label:'芽叶茸毛'},{name:'leafSize',label:'叶片大小'},
          {name:'leafShape',label:'叶形'},{name:'leafColor',label:'叶色'},
          {name:'leafBody',label:'叶身'},{name:'leafValue',label:'叶质'},{name:'leafVein',label:'叶脉'},{name:'leafMargin',label:'叶缘'},
          {name:'teethDepth',label:''}, {name:'teethSharpness',label:''},{name:'teethDensity',label:''},
          {name:'leafTip',label:'叶尖'},{name:'corolla',label:'花冠'},{name:'petals',label:'花瓣'},
          {name:'stylet',label:'花柱'},{name:'quality',label:'品质'},{name:'cords',label:'条索'},{name:'colorLustre',label:'色泽'},{name:'fragrance',label:'香气'},
          {name:'taste',label:'滋味'},{name:'note',label:'备注'}];

        //Consume Database
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

        //BeltRoadDatabase
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
          importData:[{}],
          colConfigs:[],
          dbName:'',
          dbUrl:''
        }
      },
      created(){
        this.dbSwitch();
      },
      methods:{
        dbSwitch(){
            switch (this.$route.query.name) {
              case 'snp':{
                this.colConfigs=this.snp;
                this.dbName='乌龙茶品种SNP指纹图谱数据库';
                this.dbUrl='/snpMap'
                break;
              }
              case 'variety':{
                this.colConfigs=this.teaVariety;
                this.dbName='乌龙茶品种资源数据库';
                this.dbUrl='/germplasmResources'
                break;
              }
              //ConsumeDatabase
              case 'basicInfo':{
                this.colConfigs=this.basicInfoCol;
                this.dbName='95后现制奶茶消费数据库-基本信息';
                this.dbUrl='/basicInfo'
                break;
              }
              case 'factor':{
                this.colConfigs=this.factorCol;
                this.dbName='95后现制奶茶消费数据库-因素关注程度';
                this.dbUrl='/factor'
                break;
              }
              case 'feature':{
                this.colConfigs=this.featureCol;
                this.dbName='福建省乌龙茶消费者购买行为数据库-消费者的个性特征';
                this.dbUrl='/feature'
                break;
              }
              case 'habits':{
                this.colConfigs=this.habitsCol;
                this.dbName='福建省乌龙茶消费者购买行为数据库-消费者的消费习惯和购买情况';
                this.dbUrl='/habits'
                break;
              }
              case 'recognition':{
                this.colConfigs=this.recognitionCol;
                this.dbName='福建省乌龙茶消费者购买行为数据库-消费者对茶叶的认知度';
                this.dbUrl='/recognition'
                break;
              }

              //beltRoad
              case 'trade':{
                this.colConfigs=this.tradeInfoCol;
                this.dbName='一带一路贸易数据库-c贸易信息';
                this.dbUrl='/tradeInfo'
                break;
              }
              case 'consume':{
                this.colConfigs=this.countryCol;
                this.dbName='一带一路贸易数据库-国别基本信息与消费';
                this.dbUrl='/countryInfo'
                break;
              }
              case 'produce':{
                this.colConfigs=this.productionCol;
                this.dbName='一带一路贸易数据库-茶叶产值';
                this.dbUrl='/production'
                break;
              }
            }
          },
        importNewData(){
          console.log(this.importData[0]);
          this.$axios({
            url:'/database'+this.dbUrl,
            method:'post',
            data:this.importData[0]
          }).then(()=>{
            this.$message({
              type: 'success',
              message: '导入成功'
            });
          }).catch(error=>{
            alert('导入失败,请输入正确的格式');
            console.log(error);
          });
        },
        backOrigin(){
          this.$router.go(-1);
        }
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
  .addBtn{
    border: none;
    height: 80px;
    background-color: white;
  }
  .addBtnDiv{
    background-color: white;
  }
  .el-icon-remove{
    background-color: rgba(255,255,255,0);
    border: none;
    color: #ccadad;
  }
</style>
