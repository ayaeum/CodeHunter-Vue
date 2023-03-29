<template>
  <div class="Top_Div1">
    <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="resultList"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
<!--        <a slot="actions" v-on:click="Look(item)">查看</a>-->
        <a slot="actions" v-on:click="ignoreQuestion(item)">忽略</a>
        <a-list-item-meta
          :description= "'缺陷倾向概率：'+ ((parseFloat(item.result.prob)*100).toString()).substring(0,4)+'%'"
        >
          <a slot="title">{{ item.filename}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  import {getAction} from '@/api/manage';
    export default {
      name: "DefectQuestionList",
      data(){
        return{
          resultList: [
            {id:1,description: "共发现42处问题", filename: "test1.java",code:"asdsd", result:[{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"}]},
            {id:2, description: "共发现42处问题", filename: "test1.java",code:"asdsd", result:[{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"},{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"}]},
            {id:2, description: "共发现42处问题", filename: "testCode.java",code:"asdsd", result:[{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"}]},
            {id:2, description: "共发现42处问题", filename: "testDefect.java",code:"asdsd", result:[{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"},{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"},{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"}]},
          ],
        }
      },
      created() {
        var that=this;
        this.loadScanCurResult(1);
        this.$EventBus.$on('loadScanDefectResult', (order)=>{
          that.loadScanCurResult(order);//调用加载方法
        })
      },

      methods:{
        loadScanCurResult(order){//加载最近一次的扫描结果
          var url = "/taskScanResult/queryCurrentTaskResult"
          var parameter = {
            id:JSON.parse(sessionStorage.getItem("task")).id,
            order:order,
          }
          getAction(url,parameter).then((res) => {
            if(res.result!==null){
              this.resultList=JSON.parse(res.result.defectresult);
            }
          })
        },

        ignoreQuestion(){//忽略问题
          this.$message.success('好好改bug吧，别想着偷懒。');
        },

        Look(item1){//查看问题
          this.drawervisible=true;
          this.questionmessage = item1;
        },
        closedrawer(){
          this.drawervisible = false;
        },
      }
    }
</script>

<style scoped>

</style>