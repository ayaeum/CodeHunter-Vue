<template>
    <div class="Top_Div">
          <a-card :title="taskName" style="width: 1380px;height: 190px;position: absolute;">
            <a-tag style="position: relative;top: -8px;">{{giteeName}}</a-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-tag style="position: relative;top: -8px;margin-left: -60px;">{{branch}}</a-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a-tag style="position: relative;top: -8px;margin-left: -60px;">{{scanLanguage}}</a-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/>

            <div style="position: absolute;">
              <a-tag style="margin-top: -5px;">扫描方案</a-tag>
              <br/>
              <a-checkbox-group style="margin-top: 10px;width: 800px;" :default-value="defaultValue" @change="onChange">
                <a-row>
                  <a-col :span="8">
                    <a-checkbox value="代码注释检测">
                      代码注释检测
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="近似代码检测">
                      近似代码检测
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="Java规约检测">
                      Java规约检测
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="代码缺陷检测">
                      代码缺陷检测
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="SQL漏洞扫描">
                      SQL漏洞扫描
                    </a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="工作量检测">
                      工作量检测
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </div>
            <a-button style="position: relative;margin-left: 1210px;margin-top: 15px;" type="primary" v-on:click="Manual_trigger">
              手动触发
            </a-button>
            <br/>
            <span>
            <a-switch style="position: relative;margin-left: 1209px;margin-top: 5px;" checked-children="自动触发开" un-checked-children="自动触发关" default-checked v-on:click="switch_Btn" />
          </span>
          </a-card>
    </div>
</template>

<script>
  import {postAction} from '@/api/manage'
    export default {
        name: "RepositoryMsg",
        components: {
        },
        props:[
          "giteeName",
          "taskName",
          "scanLanguage",
          "branch",
          "oncheckFile"
        ],
        data(){
          return {
            defaultValue:["代码注释检测","近似代码检测","Java规约检测",]
            //"代码缺陷检测","SQL漏洞扫描","工作量检测"
          }
        },
      watch:{
        oncheckFile:{
          handler(newVal,oldVal) {

          }
        }
      },
      methods: {
        onChange(checkedValues) {
          console.log('checked = ', checkedValues);
        },

        Manual_trigger() {
          console.log(this.oncheckFile);
          var url = "/taskDatasTable/detection"
          var parameter = {
            jeecg_account:"admin",
            oncheckFile:JSON.stringify(this.oncheckFile),
            taskName:this.$store.state.taskName,
            repoowner:this.$store.state.owner,
            repo:this.$store.state.repo,
            branch:this.$store.state.branch,
            platform:this.$store.state.platform,
            recursive:'1'
          }
          postAction(url,parameter).then((res) => {
            console.log(res);
            this.$emit('change',res.result);
          })
        },

        //自动触发开关方法
        switch_Btn(checked, event) {
          if(checked === true){
            console.log("选中");
          }
          else{
            console.log("未选中");
          }
        },
      }
    }
</script>

<style scoped>
  .Top_Div{
    position: absolute;

    left: 300px;
    top: 0;
    width: 1380px;
    height: 190px;
  }
</style>