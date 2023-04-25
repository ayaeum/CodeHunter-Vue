<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="数据总览">
        <div style="position:relative;width: 100%;">
          <div style="width: 98%;height: 280px;left: 1%;position:relative;border-radius: 10px;border: 1px solid #ECECEC;">
            <p style="font-size: medium;margin-left: 1%;margin-top: 15px;color: black;">扫描数据概览</p>
            <div style="position:relative;width: 30%;display: inline-block;height: 80%;top: 5%;left: -1%;">
              <Pie title="问题统计" :data-source="datasource"></Pie>
            </div>
            <div style="position:relative;width: 70%;display: inline-block;height: 80%;">
              <Table style="width: 90%;position:relative;top: 5%;" :table-data="tableData" ref="Table" :current="tableData[0].total"></Table>
            </div>
          </div>
          <br/>
          <div style="width: 98%;height: 300px;left: 1%;position:relative;border-radius: 10px;border: 1px solid #ECECEC;">
            <p style="font-size: medium;margin-left: 1%;margin-top: 15px;color: black;">历史数据概览</p>
            <div style="position:relative;width: 30%;display: inline-block;height: 80%;top: -1%;left: -1%;">
              <Radar :data-source="datasource1" title="错误雷达图"></Radar>
            </div>
            <div style="position:relative;width: 70%;display: inline-block;height: 80%;">
              <LineChartMultid style="width: 80%;left: -5%;" :fields="linetype" :dataSource="datasource2" title="近12次扫描结果折线图"></LineChartMultid>
            </div>
          </div>
          <br/>
        </div>
      </a-tab-pane>

      <a-tab-pane key="2" tab="规约问题" force-render>
        <div style="position:relative;width: 95%;left: 2.5%;">
          <QuestionList ref="QuestionList" style="width: 100%;" @loadScanData="loadScanData"></QuestionList>
        </div>
      </a-tab-pane>

      <a-tab-pane key="3" tab="克隆问题" force-render>
        <div style="position:relative;width: 95%;left: 2.5%;">
          <CloneQuestionList ref="CloneQuestionList" style="width: 100%;" @loadScanData="loadScanData"></CloneQuestionList>
        </div>
      </a-tab-pane>

      <a-tab-pane key="4" tab="缺陷问题" force-render>
        <div style="position:relative;width: 95%;left: 2.5%;">
          <DefectQuestionList ref="CloneQuestionList" style="width: 100%;" @loadScanData="loadScanData"></DefectQuestionList>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>

</template>

<script>
    import Pie from "../chart/Pie";
    import Radar from "../chart/Radar";
    import Table from "./Table";
    import LineChartMultid from '@/components/chart/LineChartMultid';
    import QuestionList from "./QuestionList";
    import QuestionsList from "./ScanResults/QuestionsList";
    import {getAction} from '@/api/manage';
    import CloneQuestionList from "./CloneQuestionList";
    import DefectQuestionList from "./DefectQuestionList";

    export default {
        name: "Tabs",
        components:{Pie,Table,Radar,LineChartMultid,QuestionList,QuestionsList,CloneQuestionList,DefectQuestionList},
        data() {
          return {
            tableData:[
              {total:0,unresolved:0,serious:0,warn:0,propose:0},
              {total:0,unresolved:0,serious:0,warn:0,propose:0},
              {total:0,unresolved:0,serious:0,warn:0,propose:0},
              ],

            datasource:[
              {item:"严重问题",count:10},
              {item:"警告问题",count:10},
              {item:"建议问题",count:10},
            ],
            datasource1:[
              {item:"命名规范问题",score:19},
              {item:"变量问题",score:14},
              {item:"注释问题",score:9},
              {item:"内存泄露问题",score:9},
              {item:"代码近似问题",score:39},
            ],
            //折线图线条类型
            linetype:["serious","warn","propose"],
            datasource2:[
              { type: "1", // 列名
                serious: 0,
                warn: 0,
                propose: 0
              },
              { type: "2", serious: 0, warn: 0, propose: 0 },
              { type: "3", serious: 0, warn: 0 ,propose: 0},
              { type: "4", serious: 0, warn: 0 ,propose: 0},
              { type: "5", serious: 0, warn: 0 ,propose: 0},
              { type: "6", serious: 0, warn: 0 ,propose: 0},
              { type: "7", serious: 0, warn: 0 ,propose: 0},
              { type: "8", serious: 0, warn: 0 ,propose: 0},
              { type: "9", serious: 0, warn: 0 ,propose: 0},
              { type: "10", serious: 0, warn: 0 ,propose: 0},
              { type: "11", serious: 0, warn: 0 ,propose: 0},
              { type: "12", serious: 0, warn:0 ,propose: 0}
            ],

            resultList:[
              [{color:"red",level:"致命问题",description:"asd",filePath_1:"test1.java"}],
              [{color:"red",level:"致命问题",description:"asd",filePath_1:"test1.java",filePath_2:"test1.java"}],
            ]
          };
        },
      watch:{
        tableData:{
          handler(newVal){

          },
          immediate:true,
          deep:true,
        }
      },
        created(){
          this.loadScanData();
        },
      methods: {
          callback(key) {
            console.log(key);
          },

          //启动扫描
          async ScanStart(){
            await this.$refs.QuestionList.ScanStart1();
          },

          //加载最新扫描数据
          loadScanData(e){
            var url = "/taskScanResult/queryAllTaskResults"//直接去后台加载数据更合适
            var parameter = {
              id:JSON.parse(sessionStorage.getItem("task")).id,
            }
            getAction(url,parameter).then((res) => {
              if(res.result.length>0){
                //处理表格数据
                this.resettableData(0);
                this.loadScanData1(JSON.parse(res.result[11].javaruleresult),0);

                //处理饼图数据
                this.datasource[0].count=this.tableData[0].serious;
                this.datasource[1].count=this.tableData[0].warn;
                this.datasource[2].count=this.tableData[0].propose;
                this.resettableData(1);
                this.loadScanData1(JSON.parse(res.result[10].javaruleresult),1);
                this.resettableData(2);
                for(var i=0;i<res.result.length;i++){
                  this.loadScanData1(JSON.parse(res.result[i].javaruleresult),2);
                }
                this.tableData[2].serious=parseInt((this.tableData[2].serious)/(res.result.length));
                this.tableData[2].warn=parseInt((this.tableData[2].warn)/(res.result.length));
                this.tableData[2].propose=parseInt((this.tableData[2].propose)/(res.result.length));
                //处理折线图数据
                for(var i=0;i<res.result.length;i++){
                  this.loadScanData2(JSON.parse(res.result[i].javaruleresult),i);
                }
              }
            })
          },

          resettableData(pos){
            this.tableData[pos].total=0;
            this.tableData[pos].serious=0;
            this.tableData[pos].warn=0;
            this.tableData[pos].propose=0;
          },

          loadScanData1(content,pos){
            var that=this;
            content.some(item=>{
              //total
              for(let key in item.result){
                switch (item.result[key].level) {
                  case "强制":
                    that.tableData[pos].serious+=item.result[key].result.length;
                    break;
                  case "警告":
                    that.tableData[pos].warn+=item.result[key].result.length;
                    break;
                  case "推荐":
                    that.tableData[pos].propose+=item.result[key].result.length;
                    break;
                }
                that.tableData[pos].total=that.tableData[pos].total+item.result[key].result.length;
              }

            })
          },

          loadScanData2(content,pos){
            var that=this;
            that.datasource2[pos].serious=0;
            that.datasource2[pos].warn=0;
            that.datasource2[pos].propose=0;
            content.some(item=>{
              for(let key in item.result){
                switch (item.result[key].level) {
                  case "强制":
                    that.datasource2[pos].serious+=item.result[key].result.length;
                    break;
                  case "警告":
                    that.datasource2[pos].warn+=item.result[key].result.length;
                    break;
                  case "推荐":
                    that.datasource2[pos].propose+=item.result[key].result.length;
                    break;
                }
              }
            })
          },

          updateScanHistory(e1,e2){
            this.resettableData(0);
            this.tableData[0].total=e1.serious+e1.warn+e1.propose;
            this.tableData[0].serious=e1.serious;
            this.tableData[0].warn=e1.warn;
            this.tableData[0].propose=e1.propose;
            this.datasource[0].count=e1.serious;
            this.datasource[1].count=e1.warn;
            this.datasource[2].count=e1.propose;

            this.resettableData(1);
            this.tableData[1].total=e2.serious+e2.warn+e2.propose;
            this.tableData[1].serious=e2.serious;
            this.tableData[1].warn=e2.warn;
            this.tableData[1].propose=e2.propose;
          }

        },
    }
</script>
