<template>
    <div class="Top_Div">

        <!--      添加主体-->
        <a-button style="position: relative;left: 40px;top: 30px" type="primary" @click="showDrawer"> <a-icon type="plus" /> 新增主体 </a-button>

        <!--      认证列表-->
        <div style="position: relative;top: 10px">
          <a-space style="position: relative;top: 40px" direction="horizontal" size="middle" align="center">
            <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4 }" :data-source="data">
              <a-list-item style="width: 320px;height: 240px;position: relative;overflow: hidden" slot="renderItem" slot-scope="item, index">
                <!--删除图标-->
                <a-icon style="width: 30px;height: 30px;position: absolute;top: 22px;right: 10px;z-index: 100;" type="delete" v-on:click="deleteCer($event,item.identificationName,item.giteeAccount)" />
                <a-card style="width: 280px;height: 220px;margin-left: 20px;position: absolute;	overflow-x: hidden;overflow-y: scroll;right: -7px;border-right: grey" :title="item.identificationName" v-on:click="clickCard">
                  <a-tag>账号</a-tag>{{item.giteeAccount}}<br/><br/>
                  <a-tag>平台</a-tag>{{item.platform}}<br/><br/>
                  <a-tag>备注</a-tag>{{item.remarks}}<br/><br/>
                </a-card>
              </a-list-item>
            </a-list>
          </a-space>
        </div>

      <a-modal
        title="警告"
        :visible="delete_dialogvisible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <p>确认删除认证主体吗？</p>
      </a-modal>

      <a-drawer
        title="新增账号主体"
        width="520"
        :closable="true"
        :visible="visible"
        :maskClosable="true"
        @handleCancle="Close_Choose_Drawer"
        @close="Close_Choose_Drawer"
      >
        <a-row :gutter="16">
          <a-col :span="6">
            <a-button type="primary" @click="Show_Gitee_Drawer">
              Gitee平台
            </a-button>
          </a-col>
          <a-col :span="6">
            <a-button type="primary" @click="Show_GitLab_Drawer">
              GitLab平台
            </a-button>
          </a-col>
          <a-col :span="6">
            <a-button type="primary" @click="Show_GitHub_Drawer">
              GitHub平台
            </a-button>
          </a-col>
        </a-row>

        <a-drawer
          title="新增Gitee主体"
          :width="720"
          :visible="Gitee_Drawer"
          :body-style="{ paddingBottom: '80px' }"
          @close="onClose"
        >
          <Gitee_Drawer ref="Gitee_Drawer" :jeecg_account="jeecg_account" :visibily="gitee_drawer_visible" @change="Submit_Success"></Gitee_Drawer>
          <div
            :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
          >
            <a-button :style="{ marginRight: '8px' }" @click="onClose">
              取消
            </a-button>
            <a-button type="primary" @click="onSubmit">
              提交
            </a-button>
          </div>
        </a-drawer>

        <a-drawer
          title="新增GitLab主体"
          :width="720"
          :visible="GitLab_Drawer"
          :body-style="{ paddingBottom: '80px' }"
          @close="onClose"
        >
          <GitLab_Drawer ref="GitLab_Drawer" :visibily="gitlab_drawer_visible" @change="Submit_Success"></GitLab_Drawer>
          <div
            :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
          >
            <a-button :style="{ marginRight: '8px' }" @click="onClose">
              取消
            </a-button>
            <a-button type="primary" @click="onSubmit">
              提交
            </a-button>
          </div>
        </a-drawer>

        <a-drawer
          title="新增GitHub主体"
          :width="720"
          :visible="GitHub_Drawer"
          :body-style="{ paddingBottom: '80px' }"
          @close="onClose"
        >
          <GitHub_Drawer ref="GitHub_Drawer" :visibily="github_drawer_visible" @change="Submit_Success"></GitHub_Drawer>
          <div
            :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
          >
            <a-button :style="{ marginRight: '8px' }" @click="onClose">
              取消
            </a-button>
            <a-button type="primary" @click="onSubmit">
              提交
            </a-button>
          </div>
        </a-drawer>

        <div
          :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
        >
          <a-button style="marginRight: 8px" @click="Close_Choose_Drawer">
            取消
          </a-button>
        </div>
      </a-drawer>

    </div>
</template>

<script>
  import {getAction} from '@/api/manage'
  import Gitee_Drawer from "../../components/CodeScan/Authorization/Gitee_Drawer";
  import GitLab_Drawer from "../../components/CodeScan/Authorization/GitLab_Drawer";
  import {RSAMixin} from "../../mixins/RSAMixin";
  import GitHub_Drawer from "../../components/CodeScan/Authorization/GitHub_Drawer";

        export default {
          name: "Authorization",
          mixins:[RSAMixin],
          components:{
            Gitee_Drawer,
            GitLab_Drawer,
            GitHub_Drawer
          },
          data(){
            return{
              data:[],
              visible: false,
              Gitee_Drawer:false,
              GitLab_Drawer:false,
              GitHub_Drawer:false,
              jeecg_account:"",

              gitee_drawer_visible:"play",
              gitlab_drawer_visible:"play",
              github_drawer_visible:"play",

              // 删除警示框
              delete_dialogvisible: false,
              confirmLoading: false,
              current_Cer:{identificationName:'',giteeAccount:''},
            }
          },

          created(){
              // 查询授权的列表
              var url = "/certificationManagementForm/queryCertificationBySysName"
              var parameter = {
                jeecg_account:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
              }
              getAction(url,parameter).then((res) => {
                this.data = res.result;
              })
          },

          methods:{
            test(){
              // 查询授权的列表
              var url = "/test/demo1"
              var parameter = {
                jeecg_account:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
              }
              getAction(url,parameter).then((res) => {
                console.log(res)
              })
            },

            clickCard(){
              console.log("------点击了卡片------");
            },

            showDrawer() {
              this.visible = true;
            },

            onClose() {
              if(this.Gitee_Drawer === true){
                this.Gitee_Drawer = false;
              }

              if(this.GitLab_Drawer === true){
                this.GitLab_Drawer = false;
              }
            },

            onSubmit(){
              if(this.Gitee_Drawer === true){
                if(this.$refs.Gitee_Drawer.check()==="false"){
                  this.$message.info("存在空字段")
                  return;
                }
                this.Gitee_Drawer = false;
                this.visible = false;
                this.$refs.Gitee_Drawer.onSubmit();
              }

              if(this.GitLab_Drawer === true){
                if(this.$refs.GitLab_Drawer.check()==="false"){
                  this.$message.info("存在空字段")
                  return;
                }
                this.GitLab_Drawer = false;
                this.visible = false;
                this.$refs.GitLab_Drawer.onSubmit();
              }

              if(this.GitHub_Drawer === true){
                if(this.$refs.GitHub_Drawer.check()==="false"){
                  this.$message.info("存在空字段")
                  return;
                }
                this.GitHub_Drawer = false;
                this.visible = false;
                this.$refs.GitHub_Drawer.onSubmit();
              }
            },

            /**
             * 关闭选择平台的抽屉
             * @constructor
             */
            Close_Choose_Drawer(){
              this.visible = false;
            },

            /**
             * 添加成功，清空表单，更新授权信息
             * @constructor
             */
            Submit_Success(res){
              this.data = res;
              if(this.GitLab_Drawer === true){
                this.$refs.Gitee_Drawer.Clear_Form();
              }
              if(this.GitLab_Drawer === true){
                this.$refs.GitLab_Drawer.Clear_Form();
              }

            },

            /**
             * 显示gitee抽屉，隐藏gitlab抽屉
             * @constructor
             */
            Show_Gitee_Drawer(){
                this.Gitee_Drawer = true;
                this.GitLab_Drawer = false;
                this.GitHub_Drawer=false;
            },

            /**
             * 显示gitlab抽屉，隐藏gitee抽屉
             * @constructor
             */
            Show_GitLab_Drawer(){
              this.Gitee_Drawer = false;
              this.GitHub_Drawer=false;
              this.GitLab_Drawer = true;
            },

            Show_GitHub_Drawer(){
              this.Gitee_Drawer = false;
              this.GitLab_Drawer = false;
              this.GitHub_Drawer=true;
            },

            /**
             * 删除警示框
             * @param e
             * @param identificationName
             * @param giteeAccount
             */
            deleteCer(e,identificationName,giteeAccount){
              this.delete_dialogvisible = true;
              this.current_Cer.giteeAccount = giteeAccount;
              this.current_Cer.identificationName = identificationName;
            },

            handleOk(e) {
              this.ModalText = '正在删除认证...';
              this.confirmLoading = true;
              console.log(e);

              var url = "/certificationManagementForm/deleteCertificationBySysNameandGitee"
              var parameter = {
                jeecg_account:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
                giteeAccount:this.current_Cer.giteeAccount,
              }
              getAction(url,parameter).then((res) => {
                this.data = res.result;
              })

              setTimeout(() => {
                this.delete_dialogvisible = false;
                this.confirmLoading = false;
              }, 2000);
            },
            handleCancel(e) {
              this.delete_dialogvisible = false;
            },
          }
        }
</script>

<style scoped>
  .Top_Div{
    width: 100%;
    min-height: 1000px;
    border: solid 1px #DDDDDD;
    background-color: white;
    overflow: auto;
  }

  .display{
    display: none;
  }

  .play{
    display: unset;
  }

</style>
