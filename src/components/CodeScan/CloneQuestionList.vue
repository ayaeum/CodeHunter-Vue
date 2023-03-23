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
            resultList: [
            ],
            questionmessage:{},
          }
        },
      created() {
        var that=this;
        this.loadScanResult();
        this.$EventBus.$on('loadScanCloneResult', ()=>{
          that.loadScanResult();
        })
      },
      methods:{
        loadScanResult(){//加载扫描结果
          var url = "/taskScanResult/queryAllTaskResults"//直接去后台加载数据更合适
          var parameter = {
            id:JSON.parse(sessionStorage.getItem("task")).id,
          }
          getAction(url,parameter).then((res) => {
            this.resultList=JSON.parse(res.result[res.result.length-1].cloneresult);
          })
        },

        ignoreQuestion(){//忽略问题
          this.$message.success('好好改bug吧，别想着偷懒。');
        },
        //查看问题
        Look(item1){
          console.log(item1)
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
  .Top_Div1{
    background-color: white;
    position: relative;
  }

  .demo-loadmore-list {
  }
</style>