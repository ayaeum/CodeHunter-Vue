<template>
  <div class="Top_Div1">
    <a-modal
      v-model="modal2Visible"
      title="扫描进度"
      :maskClosable="false"
      :footer="null"
      :closable="modalFooter"
      centered
      @ok="() => (modal2Visible = false)"
      @cancel="modal2Visible = false;content='';progress=0;modalFooter=false;"
    >
      <a-textarea id="scroll_text" ref="textarea" :disabled="true" style="color: black;overflow-y: scroll;resize: none;" :rows="8" :value="content"/>
      <div>规约与缺陷扫描</div>
      <a-progress :percent="progress1" status="active" />
      <div>克隆代码扫描</div>
      <a-progress :percent="progress2" status="active" />
    </a-modal>
    <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="resultList"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions" v-on:click="Look(item)">查看</a>
        <a slot="actions" v-on:click="ignoreQuestion(item)">忽略</a>
        <a-list-item-meta
          :description= "'共发现'+item.length+'处问题'"
        >
          <a slot="title">{{ item.filename}}</a>
        </a-list-item-meta>
<!--        <div v-bind:style="{color:item.color}">{{item.level}}</div>-->
      </a-list-item>
    </a-list>

    <Drawer :visible=this.drawervisible :content="questionmessage" @change="closedrawer"></Drawer>
  </div>
</template>

<script>
    import Drawer from "./ScanResults/Drawer"
    import {getAction} from '@/api/manage';
    export default {
      name: "QuestionList",
      components:{Drawer},
      data() {
        return {
          drawervisible:false,
          modal2Visible:false,
          content:"",
          modalFooter:false,
          progress1:0,//规约、缺陷扫描进度
          progress2:0,//克隆扫描进度
          resultList: [
            {id:1,description: "共发现42处问题", filename: "test1.java",code:"asdsd", result:[{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"}]},
            {id:2, description: "共发现42处问题", filename: "test1.java",code:"asdsd", result:[{text:"asd",questionableLine:10,description:"【严重】xxxxxxx"}]},
          ],
          questionmessage:{},
        }
      },
      created(){
        var that=this;
        this.questionmessage=this.resultList[0];
        this.loadScanResult(1);
        this.$EventBus.$on('loadScanResult', (order)=>{
          that.loadScanResult(order);//调用加载方法
        })
      },
      methods:{
        accumulation(){
          this.resultList.forEach(item=>{
            var length=0;
            for(let i in item.result){
              length+=item.result[i].result.length;
            }
            item.length=length;
          })
        },

        //加载扫描结果
        loadScanResult(order){
          var url = "/taskScanResult/queryCurrentTaskResult"
          var parameter = {
            id:JSON.parse(sessionStorage.getItem("task")).id,
            order:order,
          }
          getAction(url,parameter).then((res) => {
            console.log(JSON.parse(res.result.javaruleresult));
            if(res.result!==null){
              this.resultList=JSON.parse(res.result.javaruleresult);
            }
            this.accumulation()
          })
        },

        //忽略问题
        ignoreQuestion(){
          this.$message.success('好好改bug吧，别想着偷懒。');
        },
        //查看问题
        Look(item1){
          this.drawervisible=true;
          this.questionmessage = item1;
          console.log(item1);
        },

        closedrawer(){
          this.drawervisible = false;
        },

        async ScanStart1(){//启动扫描
          var that=this;
          this.modal2Visible=true;
          this.progress1=0;
          this.progress2=0;
          this.content="正在建立连接..."
          var url = "/taskScanStatus/StartScan"//发送请求给后台启动扫描
          var parameter = {
            id:JSON.parse(sessionStorage.getItem("task")).id,
          }
          getAction(url,parameter).then((res) => {
            this.resultList=res.result;//加载数据
            this.$emit("loadScanData",res.result);
            setTimeout(() => {
              this.$EventBus.$emit('loadScanResult',1);
              this.$EventBus.$emit('loadScanCloneResult',1);
              this.$EventBus.$emit("loadScanDefectResult",1);
              this.$EventBus.$emit('loadScanHistry', 1);
            }, 1000)
          })

          //查询结果
          let setInt=setInterval(function(){
            var url = "/taskScanStatus/queryScanStatus"
            var parameter = {
              id:JSON.parse(sessionStorage.getItem("task")).id,
            }
            getAction(url,parameter).then((res) => {
              if(res.success!==false){
                if(res.result.process1==="100"){
                  that.content=res.result.status;
                  that.progress1=parseInt(res.result.process);
                  that.progress2=parseInt(res.result.process1);
                  that.modalFooter=true;
                  clearInterval(setInt);
                }else{
                  that.content=res.result.status+"\n"+res.result.scanmsg;
                  that.progress1=parseInt(res.result.process);
                  that.progress2=parseInt(res.result.process1);
                }
              }
            })
            that.$nextTick(() => {//让进度条一直处于最底部
              const textarea = document.getElementById('scroll_text');
              textarea.scrollTop = textarea.scrollHeight;
            })
        }, 300);//500毫秒刷新一次

        },
      }
    }
</script>

<style scoped>
  html,body{height:100%;}

  .Top_Div1{
    background-color: white;
    position: relative;
    width: 100%;
  }

  .demo-loadmore-list {
  }
</style>