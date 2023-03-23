<template>
  <div class="Top_Div1">

    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      item-layout="horizontal"
      :data-source="resultList[4]"
    >
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-spin v-if="loadingMore" />
        <!--          <a-button v-else @click="onLoadMore">-->
        <!--            加载更多-->
        <!--          </a-button>-->
      </div>

      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions" v-on:click="Look(item)">查看</a>
        <a slot="actions" v-on:click="ignoreQuestion(item)">忽略</a>
        <a-list-item-meta
          :description= "item[0].description"
        >
          <a slot="title">{{ item[0].filename }}</a>
          <!--            <a-avatar-->
          <!--              slot="avatar"-->
          <!--              src="https://tse1-mm.cn.bing.net/th/id/OIP-C.YdSYufy6uYYFr_8rsmdsDwHaJ4?pid=ImgDet&rs=1"-->
          <!--            />-->
        </a-list-item-meta>
        <div v-bind:style="{color:item[0].color}">{{item[0].level}}</div>
      </a-list-item>
    </a-list>

    <!--    <Drawer :visible=this.drawervisible @change="closedrawer"></Drawer>-->
    <DrawerwithTwoEditor ref="DrawerwithTwoEditor" :visible="this.drawervisible" :value1="value1" :value2="value2" :hight-line1="hightLine1" :hight-line2="hightLine2" :question-message="questionmessage" @change="closedrawer"></DrawerwithTwoEditor>
  </div>
</template>

<script>
  import Drawer from "./Drawer"
  import DrawerwithTwoEditor from "./DrawerwithTwoEditor";
  export default {
    name: "Test",
    props:["resultList"],
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
        console.log(item1);
        this.value1 = "";
        this.value2 = "";
        this.hightLine1.splice(0,this.hightLine1.length);
        this.hightLine2.splice(0,this.hightLine2.length);

          this.array=[];
          for(var i=0;i<this.resultList[0].length;i++){
            if(this.resultList[0][i].path === item1[0].filename){
              for(var j=0;j<this.resultList[0][i].code.length;j++){
                this.value1 = this.value1 + this.resultList[0][i].code[j];
                this.array.push(" \n");
              }
              for(var i=0;i<item1[0].qlist.length-1;i++){
                var num = item1[0].qlist[i].questionableLine;
                this.array[num-1] = item1[0].qlist[i].description+"\n";
                this.hightLine1.push(num-1);
                this.hightLine2.push(num-1);
              }
              for(var j=0;j<this.array.length;j++){
                this.value2 = this.value2 + this.array[j];
              }
              break;
            }
          }
      },

    },
  }
</script>

<style scoped>
  .Top_Div1{
    width: 1380px;
    height: 1220px;
    border: solid 1px #DDDDDD;
    background-color: white;
    position: absolute;
    top: -17px;
    left: 2755px;
    overflow: auto;
  }

  .demo-loadmore-list {
    min-height: 350px;
    margin-left: 15px;
  }
</style>