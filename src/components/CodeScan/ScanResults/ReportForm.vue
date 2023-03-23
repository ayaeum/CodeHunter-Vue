<template>
  <div class="Top_Div1">
    <a-card class="scorecard">
      <h3 style="position: absolute;top: 5px;left: 10px;">质量评分</h3>
      <h2 style="position: absolute;top: 30px;left: 40px;font-size: 35px;color: #2296FF">{{score}}</h2>
    </a-card>

    <a-card class="questionscard">
      <h2 style="position: absolute;top: 10%;left: 10%;font-size: 35px;color: #2296FF">{{score}}</h2>
      <h3 style="position: absolute;bottom: 2%;left: 10%;font-size: 15px;">注释问题</h3>

      <h2 style="position: absolute;top: 10%;left: 28%;font-size: 35px;color: #2296FF">{{clonecode_count}}</h2>
      <h3 style="position: absolute;bottom: 2%;left: 28%;font-size: 15px;">代码克隆</h3>

      <h2 style="position: absolute;top: 10%;left: 46%;font-size: 35px;color: #2296FF">{{score}}</h2>
      <h3 style="position: absolute;bottom: 2%;left: 46%;font-size: 15px;">Java规约</h3>

      <h2 style="position: absolute;top: 10%;left: 64%;font-size: 35px;color: #2296FF">{{score}}</h2>
      <h3 style="position: absolute;bottom: 2%;left: 64%;font-size: 15px;">SQL漏洞</h3>

      <h2 style="position: absolute;top: 10%;left: 82%;font-size: 35px;color: #2296FF">{{score}}</h2>
      <h3 style="position: absolute;bottom: 2%;left: 82%;font-size: 15px;">代码缺陷</h3>
    </a-card>

    <a-card class="clonecodecard">
      <h3 style="position: absolute;top: 5px;left: 10px;">克隆代码问题</h3>
      <div style="width: 300px;height: 300px;position: absolute;left: 10px;top: 35px;"><Pie :data-source="clonePie"></Pie></div>
      <h2 style="position: absolute;top: 15%;left: 28%;font-size: 30px;color: red;">{{clone_serious}}</h2>
      <h4 style="position: absolute;top: 47px;left: 32%;color: #cc0000;">严重问题</h4>
      <h2 style="position: absolute;top: 40%;left: 28%;font-size: 30px;color: #f47920;">{{clone_warning}}</h2>
      <h4 style="position: absolute;top: 97px;left: 32%;color: #f47920;">警告问题</h4>
      <h2 style="position: absolute;top: 65%;left: 28%;font-size: 30px;color: #11da75;">{{clone_proposal}}</h2>
      <h4 style="position: absolute;top: 147px;left: 32%;color: #11da75;">建议问题</h4>
      <a-divider style="position: absolute;top: 20px;left: 40%;height: 80%;" type="vertical"/>
      <LineChartMultid style="position: absolute;width: 800px;left: 38%;top: -10px;" :fields="linetype" :dataSource="datasource1"></LineChartMultid>
    </a-card>

    <a-card class="JavaStatutecard">
      <h3 style="position: absolute;top: 5px;left: 10px;">Java规约检测</h3>
      <div style="width: 300px;height: 300px;position: absolute;left: 10px;top: 35px;"><Pie :data-source="clonePie"></Pie></div>
      <a-divider style="position: absolute;top: 20px;left: 40%;height: 80%;" type="vertical"/>
      <LineChartMultid style="position: absolute;width: 800px;left: 38%;top: -10px;"></LineChartMultid>
    </a-card>

    <a-card class="codeDefectcard">
      <h3 style="position: absolute;top: 5px;left: 10px;">代码缺陷检测</h3>
      <div style="width: 300px;height: 300px;position: absolute;left: 10px;top: 35px;"><Pie :data-source="clonePie"></Pie></div>
      <a-divider style="position: absolute;top: 20px;left: 40%;height: 80%;" type="vertical"/>
      <LineChartMultid style="position: absolute;width: 800px;left: 38%;top: -10px;"></LineChartMultid>
    </a-card>

    <a-card class="SQLDefectcard">
      <h3 style="position: absolute;top: 5px;left: 10px;">SQL漏洞检测</h3>
      <div style="width: 300px;height: 300px;position: absolute;left: 10px;top: 35px;"><Pie :data-source="clonePie"></Pie></div>
      <a-divider style="position: absolute;top: 20px;left: 40%;height: 80%;" type="vertical"/>
      <LineChartMultid style="position: absolute;width: 800px;left: 38%;top: -10px;"></LineChartMultid>
    </a-card>

    <a-card class="workloadcard">
      <h3 style="position: absolute;top: 5px;left: 10px;">工作量检测</h3>
      <div style="width: 300px;height: 300px;position: absolute;left: 10px;top: 35px;"><Pie :data-source="clonePie"></Pie></div>
      <a-divider style="position: absolute;top: 20px;left: 40%;height: 80%;" type="vertical"/>
      <LineChartMultid style="position: absolute;width: 800px;left: 38%;top: -10px;"></LineChartMultid>
    </a-card>
  </div>
</template>

<script>
  import Pie from "../../chart/Pie";
  import Bar from "../../chart/Bar";
  import LineChartMultid from '@/components/chart/LineChartMultid';
    export default {
        name: "ReportForm",
        props:["resultList"],
        components:{Pie,Bar,LineChartMultid},
        data(){
          return{
            score:10,
            clonecode_count:"0",
            clone_serious:"0",
            clone_warning:"0",
            clone_proposal:"0",
            //克隆代码饼图数据
            clonePie:[
              { item: '严重', count: 10 },
              { item: '警告', count: 10 },
              { item: '建议', count: 10 },
            ],

            //折线图线条类型
            linetype:["严重","警告","建议"],
            datasource1:[
              { "type": "1", // 列名
                "严重": 7,
                "警告": 3,
                "建议": 4
              },
              { "type": "2", "严重": 6, "警告": 4, "建议": 4 },
              { "type": "3", "严重": 9, "警告": 5 ,"建议": 4},
              { "type": "4", "严重": 14, "警告": 8 ,"建议": 4},
              { "type": "5", "严重": 18, "警告": 11 ,"建议": 4},
              { "type": "6", "严重": 21, "警告": 15 ,"建议": 4},
              { "type": "7", "严重": 25, "警告": 17 ,"建议": 4},
              { "type": "8", "严重": 26, "警告": 16 ,"建议": 4},
              { "type": "9", "严重": 23, "警告": 14 ,"建议": 4},
              { "type": "10", "严重": 18, "警告": 10 ,"建议": 4},
              { "type": "11", "严重": 13, "警告": 6 ,"建议": 4},
              { "type": "12", "严重": 9, "警告": 4 ,"建议": 4}
            ],
          }
        },
      created(){

      },
      methods:{
        // async updatedate2(){
        //     console.log("updatedate2");
        //     console.log(this.resultList);
        //     this.clonecode_count = this.resultList[1].length;
        //     this.clone_serious = this.resultList[2][11].cloneSerious;
        //     this.clone_warning = this.resultList[2][11].cloneWarning;
        //     this.clone_proposal = this.resultList[2][11].cloneProposal;
        //     this.clonePie[0].count=this.resultList[2][11].cloneSerious;
        //     this.clonePie[1].count=this.resultList[2][11].cloneWarning;
        //     this.clonePie[2].count=this.resultList[2][11].cloneProposal;
        //
        //     this.datasource1 = [];
        //     for(var i=0;i<this.resultList[2].length;i++){
        //       this.datasource1.push({"type":this.resultList[2][i].cloneRank,"严重":this.resultList[2][i].cloneSerious,"警告":this.resultList[2][i].cloneWarning,"建议":this.resultList[2][i].cloneProposal});
        //     }
        // },

        async updatedate1(){
            this.clonecode_count = this.resultList[1].length;
            this.clone_serious = this.resultList[2][0].clone_serious;
            this.clone_warning = this.resultList[2][0].clone_warning;
            this.clone_proposal = this.resultList[2][0].clone_proposal;
            this.clonePie[0].count=this.resultList[2][0].clone_serious;
            this.clonePie[1].count=this.resultList[2][0].clone_warning;
            this.clonePie[2].count=this.resultList[2][0].clone_proposal;

          this.datasource1 = [];
            for(var i=0;i<this.resultList[3].length;i++){
              this.datasource1.push({"type":this.resultList[3][i].cloneRank,"严重":this.resultList[3][i].clone_serious,"警告":this.resultList[3][i].clone_warning,"建议":this.resultList[3][i].clone_proposal});
            }
          }
      }
    }
</script>

<style scoped>
  .Top_Div1{
    width: 1380px;
    height: 1220px;
    border: solid 1px #DDDDDD;
    background-color: #F0F2F5;
    position: absolute;
    top: -17px;
  }

  .scorecard{
    position:absolute;
    width: 150px;
    height: 100px;
    top: 10px;
    left: 10px;
    border-radius: 5px;
  }

  .questionscard{
    position:absolute;
    width: 1195px;
    height: 100px;
    top: 10px;
    left: 170px;
    border-radius: 5px;
  }

  .clonecodecard{
    position:absolute;
    width: 1355px;
    height: 210px;
    top: 120px;
    left: 10px;
    border-radius: 5px;
  }

  .JavaStatutecard{
    position:absolute;
    width: 1355px;
    height: 210px;
    top: 340px;
    left: 10px;
    border-radius: 5px;
  }

  .codeDefectcard{
    position:absolute;
    width: 1355px;
    height: 210px;
    top: 560px;
    left: 10px;
    border-radius: 5px;
  }

  .SQLDefectcard{
    position:absolute;
    width: 1355px;
    height: 210px;
    top: 780px;
    left: 10px;
    border-radius: 5px;
  }

  .workloadcard{
    position:absolute;
    width: 1355px;
    height: 210px;
    top: 1000px;
    left: 10px;
    border-radius: 5px;
  }
</style>