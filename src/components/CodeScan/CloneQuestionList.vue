<template>
  <div class="Top_Div1">
    <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="resultList"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions" v-on:click="Look(item)">查看</a>
        <a slot="actions" v-on:click="ignoreQuestion(item)">忽略</a>
        <a-list-item-meta
          :description= "'共发现'+item.similar_code_list.length+'处克隆问题'"
        >
          <a slot="title">克隆组{{index+1}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>

    <CloneDrawer :visible=this.drawervisible :content="questionmessage" @change="closedrawer"></CloneDrawer>
  </div>
</template>

<script>
    import CloneDrawer from "./ScanResults/CloneDrawer";
    import {getAction} from '@/api/manage';
    export default {
      name: "CloneQuestionList",
      components: {CloneDrawer},
      data(){
          return{
            drawervisible:false,
            resultList: [],
            questionmessage:{},
          }
        },
      created() {
        this.loadScanCurResult(1);
        this.$EventBus.$on('loadScanCloneResult', (order)=>{
          this.loadScanCurResult(order);
        })
        this.$EventBus.$on('loadScanResult', (order)=>{
          this.loadScanCurResult(order);
        })

      },
      methods:{
        loadScanCurResult(order){//加载扫描结果
          var url = "/taskScanResult/queryCurrentTaskResult"
          var parameter = {
            id:JSON.parse(sessionStorage.getItem("task")).id,
            order:order,
          }
          getAction(url,parameter).then((res) => {
            if(res.result!==null&&JSON.parse(res.result.cloneresult).length!==0){
              this.resultList=JSON.parse(res.result.cloneresult);
            }
          })
        },

        ignoreQuestion(){//忽略问题
          this.$message.success('好好改bug吧，别想着偷懒。');
        },

        Look(item1){//查看问题
          this.drawervisible=true;
          this.questionmessage = item1;
          console.log(item1)
        },
        closedrawer(){
          this.drawervisible = false;
        },
      }
    }
</script>

<style scoped>
  .Top_Div1{
    background-color: white;
    position: relative;
  }

  .demo-loadmore-list {
  }
</style>