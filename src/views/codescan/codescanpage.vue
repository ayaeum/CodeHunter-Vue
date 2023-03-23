<template>
<!--  <div>-->
    <div :class="mainclass">
      <FileTree  :oncheck-file="oncheckFile" :tree-data="TreeCatalogue_result" @change="updateTree"></FileTree>
      <RepositoryMsg :task-name="taskName" :gitee-name="wareHouse" :scan-language="scanLanguage" :branch="branch" :oncheck-file="oncheckFile" @change="updateresultList($event,resultList)"></RepositoryMsg>
      <ScanResult ref="add" :result-list="resultList" @change="ignoreQuestion($event,ignorequestion)"></ScanResult>
      <div style="width: 208px;height: 616px;position: absolute;left: -220px;background-color: #001529;top: 845px;"></div>
    </div>

<!--    <div :class="loadingclass">-->
<!--      <a-spin style="position: absolute;left: 45%;top: 25%;" tip="页面加载中..." size="large">-->
<!--      </a-spin>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
  import FileTree from '../../components/CodeScan/FileTree'
  import TreeCatalogue from '../../components/CodeScan/TreeCatalogue'
  import {getAction} from '@/api/manage'
  import RepositoryMsg from "../../components/CodeScan/RepositoryMsg";
  import ScanResult from "../../components/CodeScan/ScanResult";
  import {postAction} from '@/api/manage'

  export default {
      name: "codescanpage",
      components:{
        FileTree,
        RepositoryMsg,
        ScanResult,
      },
      data(){
        return {
          taskName:this.$router.currentRoute.params.taskName,
          wareHouse:this.$router.currentRoute.params.wareHouse,
          scanLanguage:this.$router.currentRoute.params.language,
          branch:this.$router.currentRoute.params.branch,
          platform:this.$router.currentRoute.params.platform,
          access_token:"未获取",
          TreeCatalogue_result:[],
          oncheckFile:[],
          //检测结果列表
          resultList:[],

          ignorequestion:{},

          mainclass:"Top_div play",
          loadingclass:"Top_div play",
        }
      },

      // beforeRouteLeave(to, from, next) {
      //     this.$destroy(this)
      //     next()
      //   },

      created(){

          this.jeecg_account=JSON.parse(localStorage.getItem("pro__Login_Username")).value
          var parameter = {}
          var url = "/GiteeApiController/getTree"
          //在页面加载时读取sessionStorage里的状态信息
          if (sessionStorage.getItem("store")) {
            this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
            this.taskName=this.$store.state.taskName;
            this.wareHouse=this.$store.state.wareHouse;
            this.scanLanguage=this.$store.state.scanLanguage;
            this.branch=this.$store.state.branch;
            this.platform=this.$store.state.platform;
            parameter = {
              jeecg_account:this.jeecg_account,
              taskName:this.$store.state.taskName,
              owner:this.$store.state.owner,
              repo:this.$store.state.repo,
              sha:this.$store.state.sha,
              recursive:"1"
            }
          }
          getAction(url,parameter).then((res) => {
            console.log(res)
            this.TreeCatalogue_result = TreeCatalogue(res.tree);
            console.log(this.TreeCatalogue_result)
          })
          var parameter1 = {
            jeecg_account:this.jeecg_account,
            taskName:this.$store.state.taskName,
            owner:this.$store.state.owner,
            repo:this.$store.state.repo,
            sha:this.$store.state.sha,
            recursive:"1"
          }
          var url1 = "/test/demo2"
          postAction(url1,parameter1).then((res) => {
            // this.loadingclass = "Top_div display";
            // this.mainclass = "Top_div play";
            this.resultList = res.result;
            this.$refs.FileTree.updataOncheckFile(res.result[4][0]);
          })

        // 在页面刷新时将store保存到sessionStorage里
        window.addEventListener("beforeunload", () => {
          sessionStorage.setItem("store", JSON.stringify(this.$store.state));
          this.$destroy(this);
        });
      },

    methods:{
      async updateTree(checkedKeys){
          this.oncheckFile = checkedKeys;
      },
      async updateresultList(resultList){
        this.resultList = resultList;
        this.$refs.add.updatedate();
      },
      async ignoreQuestion(ignorequestion){
        this.ignorequestion = ignorequestion;
        this.resultList.splice(this.resultList.indexOf(this.ignorequestion),1);
      }
    }
    }
</script>

<style scoped>
  .Top_div{
    width: 1680px;
    height:1460px;
    background-color: white;
  }

  .display{
    display: none;
  }

  .paly{
    display: unset;
  }

  .spin-content {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
</style>