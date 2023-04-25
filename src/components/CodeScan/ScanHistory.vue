<template>
  <div id="components-modal-demo-position">
    <a-modal
      :visible="Visible"
      title="扫描历史（仅保留最近12次记录）"
      centered
      width="60%"
      @ok="handleOk"
      @cancel="handleCancle"
    >

      <a-list
        class="demo-loadmore-list "
        :loading="loading"
        item-layout="horizontal"
        :data-source="data1"
        style="height: 600px;overflow-y: scroll;"
      >

        <a-list-item slot="renderItem" slot-scope="item, index" >
          <a slot="actions" v-on:click="changeTask(item.id)">查看</a>
<!--          <a slot="actions">删除</a>-->
          <a-list-item-meta :description="item.sqlresult">
            <a slot="title">{{ item.time }}  <a-icon type="pushpin" style="color: seagreen" v-if="item.id===value"/></a>
          </a-list-item-meta>
          <div style="width: 21%;font-size: x-small;text-align: center;">
            <div style="color: #cc0000;width: 33.3%;display: inline-block;">
              强制问题<br/>{{item.serious}}
            </div>
            <div style="color: #2f54eb;width: 33.3%;display: inline-block;">
              警告问题<br/>{{item.warn}}
            </div>
            <div style="color: seagreen;width: 33.3%;display: inline-block;">
              推荐问题<br/>{{item.propose}}
            </div>
          </div>
        </a-list-item>
      </a-list>

    </a-modal>
  </div>
</template>

<script>
  import {getAction} from '@/api/manage';
    export default {
        name: "ScanHistory",
        props:["Visible","id"],
        data() {
          return {
            //标记指针钉在哪个任务
            value:1,
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
            data1: [
              // {id:1,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:2,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:3,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:4,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:5,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:6,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:7,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:8,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:9,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:10,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:11,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
              // {id:12,sqlresult:"手动触发",time:"2022-10-01 22:22:00",serious:0,warn:0,propose:0},
            ],
          };
        },

        created() {
          var that=this;
          this.loadScanData();

          this.$EventBus.$on('loadScanHistory', (id)=>{
            //调用加载方法
            that.changeTask(id);
          })
        },

      methods: {
          handleOk(){
            this.$emit('ok')
          },
          handleCancle(){
            this.$emit('cancle')
          },
          changeTask(id){
            this.loadScanData();
            //需要查询任务时间戳
            this.value=id;
            //加载报表页信息
            this.$emit("updateScanHistory",this.data1[id-1],this.data1[id]);
            this.$emit("ok");
            //加载扫描结果
            this.$EventBus.$emit('loadScanResult', id);
          },

          //加载最新扫描数据
          loadScanData(){
            //直接去后台加载数据更合适
            var url = "/taskScanResult/queryAllTaskResults"
            var parameter = {
              id:JSON.parse(sessionStorage.getItem("task")).id,
            }
            getAction(url,parameter).then((res) => {
              this.data1=[];
              for(let i=0;i<res.result.length;i++){
                this.data1.push({id:i+1,time:res.result[res.result.length-1-i].timestamp,sqlresult:"手动触发",serious:0,warn:0,propose:0});
                this.loadScanData2(JSON.parse(res.result[res.result.length-1-i].javaruleresult),i);
              }
            })
          },

          //将data1数据清零
          initData1(i){
            this.data1[i].serious=0;
            this.data1[i].warn=0;
            this.data1[i].propose=0;
          },

          loadScanData2(content,pos){
            var that=this;
            content.some(item=>{
              for(let key in item.result){
                switch (item.result[key].level) {
                  case "强制":
                    that.data1[pos].serious+=item.result[key].result.length;
                    break;
                  case "警告":
                    that.data1[pos].warn+=item.result[key].result.length;
                    break;
                  case "推荐":
                    that.data1[pos].propose+=item.result[key].result.length;
                    break;
                }
              }

              // item.result.forEach(item1=>{
              //   if(item1.description.substring(1,3)==="严重"){
              //     that.data1[pos].serious++;
              //   }else {
              //     if(item1.description.substring(1,3)==="警告"){
              //       that.data1[pos].warn++;
              //     }else{
              //       if(item1.description.substring(1,3)==="建议"){
              //         that.data1[pos].propose++;
              //       }
              //     }
              //   }
              // });
            })
          }

        },
    }
</script>

<style scoped>
  .demo-loadmore-list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

</style>