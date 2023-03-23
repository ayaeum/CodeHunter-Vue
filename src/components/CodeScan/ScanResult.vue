<template>
  <div class="Top_Div">
    <a-tabs style="height: 1270px;" default-active-key="1" @change="callback">
      <a-tab-pane key="1" style="position: absolute" tab="检测报表" force-render>
         <ReportForm ref="ReportForm1" :result-list="resultList"></ReportForm>
      </a-tab-pane>
      <a-tab-pane key="2" style="position: absolute;" tab="克隆问题" force-render>
        <QuestionsList :result-list="resultList" @change="ignoreQuestion($event,ignorequestion)"></QuestionsList>
      </a-tab-pane>
      <a-tab-pane key="3" style="position: absolute;" tab="规约问题" force-render>
        <Test :result-list="resultList" @change="ignoreQuestion($event,ignorequestion)"></Test>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import ReportForm from "./ScanResults/ReportForm";
  import QuestionsList from "./ScanResults/QuestionsList"
  import Test from "./ScanResults/Test";
  export default {
    name: "ScanResult",
    components:{
      'ReportForm':ReportForm,
      'QuestionsList':QuestionsList,
      'Test':Test,
    },
    props:["resultList"],
    data() {
      return {
        ignorequestion:{},
        resultList1:[],
      };
    },
    watch:{
      resultList:{
        handler(newVal,oldVal){
          this.resultList = newVal;
        }
      }
    },
    created(){
      var that = this;
      setTimeout(function (){
        that.$refs.ReportForm1.updatedate1();
      },2000);
    },
    methods: {
      callback(key) {
        console.log(key);
      },

      async updatedate(){
        var that = this;
        //要等待一下，太快加载没完成，导致传参失败
        setTimeout(function (){
          that.$refs.ReportForm1.updatedate1();
        },2000);
      },

      async ignoreQuestion(ignorequestion){
        this.ignorequestion = ignorequestion;
        this.$emit('change',this.ignorequestion);
      }
    },
  };
</script>

<style scoped>
  .Top_Div{
    position: absolute;
    width: 1380px;
    height: 1270px;
    top: 190px;
    margin-left: 300px;
    border: solid 1px #DDDDDD;
  }

  .empty{
    margin-top: 200px;
  }

</style>

