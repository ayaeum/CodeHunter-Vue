<template>
  <div style="position: relative;width: 100%;">
    <!--配置区域-->
    <div style="position:relative;width: 100%;height: auto;background-color: #FFFFFF;padding-left: 1%;">
      <br><TaskMsg :taskname="task.owner" :reposity="task.reponame" :branch="task.branch" style="position: relative;display: inline-block;"></TaskMsg>
      <a-button type="primary" style="position: relative;display: inline-block;margin-left: 5px;" v-on:click="showSelectDialog">切换任务</a-button>
      <a-modal v-model="SelectDialogVisible" title="切换任务" @ok="SelectDialogOk" @cancel="SelectDialogCancel">
        <p style="display: inline-block">请选择任务：</p>
        <Select :list="TaskList" :default-value="value" @updateTask="updateTask"></Select>
      </a-modal>

      <a-button type="primary" style="position: relative;margin-left: 5px;" @click="showScanHistory">扫描历史</a-button>
      <ScanHistory ref="ScanHistory" style="position: absolute;" :visible="ScanHistoryVisible" :id="1" @cancle="ScanHistoryCancel" @ok="ScanHistoryOk" @updateScanHistory="updateScanHistory"></ScanHistory>

      <div style="position: absolute;right: 5px;display: inline-block;">
        <a-button type="primary" style="position: relative;margin-right: 5px;" v-on:click="showFileFilter" @click="call">文件过滤</a-button>
        <FileFilter ref="FileFilter" style="position: absolute;" :tree-data="taskNow" :visible="FileFilterVisible" @FileFilterOk="FileFilterOk" @FileFilterCancel="FileFilterCancel"></FileFilter>

        <a-button type="primary" style="position: relative;margin-right: 5px;" v-on:click="showScanScheme">扫描方案</a-button>
        <ScanScheme ref="ScanScheme" :visible="ScanSchemeVisible" @ScanSchemeOk="ScanSchemeOk" @ScanSchemeCancel="ScanSchemeCancel"></ScanScheme>

        <a-button type="primary" style="position: relative;margin-right: 15px;" v-on:click="StartScan">启动扫描</a-button>
      </div>
      <br>
      <br>
    </div>
    <!--配置区域-->
    <div style="position:absolute;width: 100%;height: auto;background-color: #FFFFFF;">
      <Tabs ref="Tabs"></Tabs>
    </div>
  </div>
</template>

<script>
  import TaskMsg from "../../components/CodeScan/TaskMsg";
  import Tabs from "../../components/CodeScan/Tabs";
  import Select from "../../components/CodeScan/Select";
  import ScanHistory from "../../components/CodeScan/ScanHistory";
  import FileFilter from "../../components/CodeScan/FileFilter";
  import ScanScheme from "../../components/CodeScan/ScanScheme";
  import {mapState} from "vuex";
  import {getAction} from '@/api/manage';

    export default {
        name: "DetailPage",
        components:{
          TaskMsg,
          Tabs,
          Select,
          ScanHistory,
          FileFilter,
          ScanScheme
        },
      data(){
          return{
            value:1,
            valuecarry:1,
            taskname:"caiguapi",
            reposity:"CodeHunter",
            branch:"master",
            taskNow:{},//现展示的任务对象
            timestamp:"1970-01-01",
            SelectDialogVisible: false,//切换任务对话框显示
            ScanHistoryVisible: false,//ScanHistory
            FileFilterVisible: false,//FileFilterVisible
            ScanSchemeVisible: false,//ScanSchemeVisible
            TaskList:[]//任务列表
          }
      },
      created(){
        //刷新之后vuex中的state会被清空，需要恢复
        this.$store.commit("updatetask1",JSON.parse(sessionStorage.getItem("task")))
        var that=this;
        //加载所有任务
        var url = "/taskManagementTable/queryTaskBySysName"
        var parameter = {
          jeecg_account:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
        }
        getAction(url,parameter).then((res) => {
          this.TaskList = res.result;
          this.TaskList.forEach(item=>{
            //校对value的值
            if(item.taskName===JSON.parse(sessionStorage.getItem("task")).taskName){
              that.value=item.id;
              that.valuecarry=item.id;
              that.taskNow=item;
            }
            item.value=item.id;
            item.label=item.taskName;
          })

          setTimeout(function(){
            that.$refs.FileFilter.getFileList();
          }, 100);
        })
      },

      computed:{
        ...mapState(["task"])
      },
      methods: {
        call(){
          console.log("sadasd");
        },
        //切换任务按钮逻辑
        showSelectDialog(){
          this.SelectDialogVisible = true;
        },
        SelectDialogOk(e){
          this.SelectDialogVisible = false;
          this.valuecarry=this.value;
          var that=this;
          this.TaskList.some(item=>{
            if(item.id===that.value){
              that.$store.commit("updatetask",item);//更新缓存
              sessionStorage.setItem("task",JSON.stringify(this.$store.state.task))
              that.taskNow=item;
              return true;
            }
          })
          location. reload();
          //更新数据(http请求形式-暂未完成)
          setTimeout(function(){
            that.$refs.FileFilter.getFileList();
          }, 200);
        },
        SelectDialogCancel(e){
          this.value=this.valuecarry;
        },

        //扫描历史
        showScanHistory(){
          this.ScanHistoryVisible = true;
        },
        ScanHistoryOk(e){
          this.ScanHistoryVisible = false;
          this.$message.success('扫描历史切换成功');
        },
        ScanHistoryCancel(e){
          // this.value=this.valuecarry;
          this.ScanHistoryVisible = false;
        },

        //文件过滤按钮
        showFileFilter(){
          this.FileFilterVisible = true;
        },
        FileFilterOk(e){
          // console.log(e);
          this.FileFilterVisible = false;
        },
        FileFilterCancel(e){
          // this.value=this.valuecarry;
          this.FileFilterVisible = false;
        },

        //扫描方案按钮
        showScanScheme(){
          this.ScanSchemeVisible = true;
        },
        ScanSchemeOk(e){
          this.ScanSchemeVisible = false;
        },
        ScanSchemeCancel(e){
          this.ScanSchemeVisible = false;
        },

        updateTask(value){
          this.value = value;
        },

        //历史任务切换更新报表数据
        updateScanHistory(e1,e2){
          this.$refs.Tabs.updateScanHistory(e1,e2);
        },

        //启动扫描按钮
        StartScan(){
          var flag=0;
          // console.log(this.$refs.ScanScheme.check)
          for(let item in this.$refs.ScanScheme.check){
            if(this.$refs.ScanScheme.check[item].checked===true){
              flag=1;
            }
          }
          if(flag===0){
            this.$message.info("您未开启任何检测项目");
          }else{
            this.$refs.Tabs.ScanStart();
          }

        },
      },
    }
</script>

<style scoped>
  html,body{height:100%;}
</style>