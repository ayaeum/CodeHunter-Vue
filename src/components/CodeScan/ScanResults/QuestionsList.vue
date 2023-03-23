<template>
  <div class="Top_Div1">

      <a-list
        class="demo-loadmore-list"
        :loading="loading"
        item-layout="horizontal"
        :data-source="resultList"
      >
        <div
          v-if="showLoadingMore"
          slot="loadMore"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <a-spin v-if="loadingMore" />
        </div>

        <a-list-item slot="renderItem" slot-scope="item, index">
          <a slot="actions" v-on:click="Look(item)">查看</a>
          <a slot="actions" v-on:click="ignoreQuestion(item)">忽略</a>
          <a-list-item-meta
            :description= "item.description"
          >
            <a slot="title">{{ item.filePath_1}}</a>
          </a-list-item-meta>
          <div v-bind:style="{color:item.color}">{{item.level}}</div>
        </a-list-item>
      </a-list>

    <Drawer :visible=this.drawervisible @change="closedrawer"></Drawer>
<!--    <DrawerwithTwoEditor ref="DrawerwithTwoEditor" :visible="this.drawervisible" :value1="value1" :value2="value2" :hight-line1="hightLine1" :hight-line2="hightLine2" :question-message="questionmessage" @change="closedrawer"></DrawerwithTwoEditor>-->
  </div>
</template>

<script>
    import Drawer from "./Drawer"
    import DrawerwithTwoEditor from "./DrawerwithTwoEditor";

    export default {
        name: "QuestionsList",
        // props:["resultList"],
        components:{Drawer,DrawerwithTwoEditor},
        data() {
          return {
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
            drawervisible:false,
            data: [],
            ignorequestion:{},

            //代码内容
            value1:"",
            value2:"",
            hightLine1:[],
            hightLine2:[],
            array:[],
            questionmessage:{},

            listtitle:"加载中...",

            resultList: [
              {id:1,color: "red", level: "", description: "共发现42处问题", filePath_1: "test1.java", filePath_2: "test1.java"},
              {id:2,color: "red", level: "", description: "共发现42处问题", filePath_1: "test1.java", filePath_2: "test1.java"},
            ]
          };
        },
        watch: {
          resultList: {
            handler(newVal,oldVal) {
              this.resultList = newVal;
            }
          },
          hightLine1: {
            handler(newVal) {
              this.hightLine1 = newVal;
            }
          },
          hightLine2: {
            handler(newVal) {
              this.hightLine2 = newVal;
            }
          },
        },
        created() {
        },
        methods: {
          onLoadMore() {
            this.loadingMore = true;
          },
          closedrawer(){
            this.drawervisible = false;
          },
          ignoreQuestion(item){
            this.ignorequestion = item;
            this.$emit('change',item);
          },

          Look(item1){
            this.drawervisible=true;
            this.questionmessage = item1;
            this.value1 = "";
            this.value2 = "";
            this.hightLine1.splice(0,this.hightLine1.length);
            this.hightLine2.splice(0,this.hightLine2.length);

            for(var i=0;i<this.resultList[0].length;i++){
              if(this.resultList[0][i].path === item1.filePath_1){
                console.log("sss")
                for(var j=0;j<this.resultList[0][i].code.length;j++){
                  if(j>=item1.startLine_1-1 && j<=item1.endLine_1-1){
                    this.hightLine1.push(j);
                    this.value1 = this.value1 + this.resultList[0][i].code[j];
                  }else{
                    this.value1 = this.value1 + this.resultList[0][i].code[j];
                  }
                }
              }
              if(this.resultList[0][i].path === item1.filePath_2){
                for(var j=0;j<this.resultList[0][i].code.length;j++){
                  if(j>=item1.startLine_2-1 && j<=item1.endLine_2-1){
                    this.hightLine2.push(j);
                    this.value2 = this.value2  + this.resultList[0][i].code[j];
                  }else{
                    this.value2 = this.value2 + this.resultList[0][i].code[j];
                  }
                }
                break;
              }
            }

              // if(item1.color === undefined){
              //   this.array=[];
              //   for(var i=0;i<this.resultList[0].length;i++){
              //     if(this.resultList[0][i].path === item1[item1.length-1]){
              //       for(var j=0;j<this.resultList[0][i].code.length;j++){
              //         this.value1 = this.value1 + this.resultList[0][i].code[j];
              //         this.array.push(" \n");
              //       }
              //       for(var i=0;i<item1.length-2;i++){
              //         var num = item1[i].questionableLine;
              //         this.array[num-1] = item1[i].description+"\n";
              //         this.hightLine1.push(num-1);
              //         this.hightLine2.push(num-1);
              //       }
              //       for(var j=0;j<this.array.length;j++){
              //         this.value2 = this.value2 + this.array[j];
              //       }
              //       break;
              //     }
              //   }
              // }else{
              //
              // }
          },

        },
    }
</script>

<style scoped>
  .Top_Div1{
    background-color: white;
  }

  .demo-loadmore-list {
  }
</style>