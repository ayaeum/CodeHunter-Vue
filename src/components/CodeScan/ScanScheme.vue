<template>
  <a-drawer title="扫描方案" :width="600" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
    <a-checkbox :checked="check[0].checked" @change="onChange($event,0)">
      规约扫描
    </a-checkbox>
    <a-checkbox :checked="check[1].checked" style="margin-left: 15%;" @change="onChange($event,1)">
      缺陷扫描
    </a-checkbox>
    <a-checkbox :checked="check[2].checked" style="margin-left: 15%;" @change="onChange($event,2)">
      近似代码扫描
    </a-checkbox>
    <br /><br />
    <a-switch @change="onCheckedChange" v-model:checked="emailChecked"/>
    <p style="margin-left: 2%;display: inline-block;">邮件通知</p>
    <a-popover placement="topLeft">
      <template slot="content">
        <p>开启邮件通知后，系统会在扫描</p>
        <p>完成后向右方指定邮箱推送结果</p>
      </template>
      <span slot="title">邮件通知</span>
      <a-icon type="question-circle" style="margin-left: 1%;display: inline-block;" />
    </a-popover>
    <a-select mode="tags" v-model:value="email" style="width: 60%;margin-left: 8%;" :token-separators="[',']" @change="handleChange">
    </a-select>

    <br />

    <a-switch @click="onCheckedChange"/>
    <p style="margin-left: 2%;display: inline-block;">自动触发</p>
    <a-popover placement="topLeft">
      <template slot="content">
        <p>开启自动触发后，系统会</p>
        <p>在通过网络钩子在代码提</p>
        <p>交、合并时触发一次扫描</p>
      </template>
      <span slot="title">自动触发</span>
      <a-icon type="question-circle" style="margin-left: 1%;display: inline-block;" />
    </a-popover>


    <br /><br />
    <a-button type="primary" @click="showModal">
      扫描方案配置
    </a-button>
    <a-modal v-model="modalvisible" title="扫描方案" width="50%"  @ok="handleOk">
      <div style="position:relative;height: 500px;">
        <a-card v-for="(item) in StatuteList" :key="item.id" :title="item.name" style="width: 23%;border-radius: 5px;display: inline-block;margin-left: 2%;left: -2%;margin-top: 2%;top: -2%;">
          <a slot="extra" @click="showProtocolConfig(item)">配置</a>
          <p>{{item.remarks}}</p>
        </a-card>
      </div>
    </a-modal>
    <ProtocolConfig ref="ProtocolConfig" :title="ProtocolConfigMsg" :visible="ProtocolConfigvisible" @ProtocolConfigOk="ProtocolConfigOk" @ProtocolConfigCancel="ProtocolConfigCancel"></ProtocolConfig>

    <div :style="{position: 'absolute',right: 0,bottom: 0,width: '100%',borderTop: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',textAlign: 'right',zIndex: 1,}">
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        取消
      </a-button>
      <a-button type="primary" @click="handleOK">
        确定
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
  import ProtocolConfig from "./ProtocolConfig";
  import {getAction} from '@/api/manage';

    export default {
        name: "ScanScheme",
        props: ["visible"],
        components:{ProtocolConfig},
        data(){
          return{
            email:[],
            modalvisible: false,
            ProtocolConfigvisible:false,

            StatuteList:[
              {id:1,name:"Java规约",remarks:"扫描基础的安全、缺陷等类型问题，无序提供编译信息。"},
              // {id:2,name:"近似代码检测",remarks:"扫描基础的安全、缺陷等类型问题，无序提供编译信息。"},
              // {id:3,name:"缺陷检测",remarks:"扫描基础的安全、缺陷等类型问题，无序提供编译信息。"},
              // {id:4,name:"SQL漏洞检测",remarks:"扫描基础的安全、缺陷等类型问题，无序提供编译信息。"},
            ],

            ProtocolConfigMsg:"",

            //邮箱通知开关
            emailChecked:false,

            check:[
              {checked:false},//规约扫描开关
              {checked:false},//缺陷扫描开关
              {checked:false},//近似代码扫描开关
            ]
          }
        },

      created() {
        var url = "/taskScanningScheme/queryTaskScanById"
        var parameter = {
          taskId:JSON.parse(sessionStorage.getItem("task")).id,
        }
        getAction(url,parameter).then((res) => {
          if(res.result!==null){
            if(res.result.sqlrule==="true")this.check[0].checked=true;//设置Java规约扫描开关
            if(res.result.defectrule==="true")this.check[1].checked=true;//设置缺陷扫描开关
            if(res.result.approximatecode==="true")this.check[2].checked=true;//设置克隆扫描开关
            if(res.result.automaticemail==="true")this.emailChecked=true;//设置邮件通知开关
            if(res.result.email!=="[]"){//设置邮件通知账号
              this.email=res.result.email.substring(1,res.result.email.length-1).split(",");
            }else{
              this.email.clean;
            }
          }
        })
      },
      methods: {
          onClose() {
            this.$emit("ScanSchemeCancel");
          },
          handleOK() {
            this.$emit("ScanSchemeCancel");
          },

          //邮箱改变触发方法
          handleChange(value) {
            // console.log(`selected ${value}`);
            var url = "/taskScanningScheme/updateEmail"
            var parameter = {
              taskId:JSON.parse(sessionStorage.getItem("task")).id,
              emailList:value.toString(),
            }
            getAction(url,parameter).then((res) => {
              if(res.result.email!=="[]"){
                this.email=res.result.email.substring(1,res.result.email.length-1).split(",");
              }else{
                this.email.clean;
              }
              this.$message.success('配置更新成功');
            })
          },

          onChange(e,pos) {
            this.check[pos].checked=e.target.checked;
            var url = "/taskScanningScheme/updateDetectionSwitchById"//发送给后台更新配置
            var parameter = {
              taskId:JSON.parse(sessionStorage.getItem("task")).id,
              sqlrule:this.check[0].checked,
              defectrule:this.check[1].checked,
              approximatecode:this.check[2].checked,
            }
            getAction(url,parameter).then((res) => {
              if(res.message==="更新成功:")this.$message.success('设置成功');else this.$message.success('设置失败，请重试。');
                if(res.result.sqlrule==="true"){this.check[0].checked=true;}else this.check[0].checked=false;//设置Java规约扫描开关
                if(res.result.defectrule==="true"){this.check[1].checked=true;}else this.check[1].checked=false;//设置缺陷扫描开关
                if(res.result.approximatecode==="true"){this.check[2].checked=true;}else this.check[2].checked=false;//设置克隆扫描开关

            })
          },

          //邮件通知开关
          onCheckedChange(checked) {
            // console.log(`a-switch to ${checked}`);
            var url = "/taskScanningScheme/updateAutoEmail"
            var parameter = {
              taskId:JSON.parse(sessionStorage.getItem("task")).id,
              autoEmail:this.emailChecked,
            }
            getAction(url,parameter).then((res) => {
              if(res.result.automaticemail!==this.emailChecked.toString()){
                this.emailChecked=!this.emailChecked;
              }
              this.$message.success('设置成功');
            })
          },

          showModal() {
            this.modalvisible = true;
          },
          handleOk(e) {
            this.modalvisible = false;
          },

          showProtocolConfig(item){
            this.ProtocolConfigMsg=item.name;
            this.ProtocolConfigvisible=true;
            this.$refs.ProtocolConfig.GetRule();
          },
          ProtocolConfigOk(e){
            this.ProtocolConfigvisible = false;
          },
          ProtocolConfigCancel(e){
            this.ProtocolConfigvisible = false;
          },
        }
    }
</script>

<style scoped>

</style>