<template>
  <div class="Top_div">

    <!--      添加任务-->
    <a-button style="position: relative;left: 40px;top: 30px" type="primary" @click="showDrawer"> <a-icon type="plus" /> 创建任务 </a-button>

    <!--      任务卡片-->
    <div style="position: relative;top: 10px">
      <a-space style="position: relative;top: 40px" direction="horizontal" size="middle" align="center">
        <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4 }" :data-source="taskdata">
          <a-list-item style="width: 320px;height: 240px;position: relative;overflow: hidden" slot="renderItem" slot-scope="item, index">
            <!--删除图标-->
            <a-icon style="width: 30px;height: 30px;position: absolute;top: 22px;right: 10px;z-index: 100;" type="delete" v-on:click="deleteTask($event,item.taskName)" />
            <a-card style="width: 280px;height: 220px;margin-left: 20px;position: absolute;	overflow-x: hidden;overflow-y: scroll;right: -7px;border-right: grey" :title="item.taskName" v-on:click="clickCard(item)">
              <a-tag>仓库</a-tag>{{item.wareHouse}}{{item.platform}}<br/><br/>
              <a-tag>分支</a-tag>{{item.branch}}<br/><br/>
              <a-tag>语言</a-tag>{{item.language}}
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
      <p>确认删除该任务吗？</p>
    </a-modal>

    <a-drawer
      title="创建新任务"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <div style="position:absolute;top: 70%;left: 40%;width: 100px;">
        <a-spin tip="创建中..." :spinning="spinning">
          <div class="spin-content">
          </div>
        </a-spin>
      </div>
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="任务名称">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  },
                ]"
                placeholder="请输入任务名称"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="账号主体">
              <a-select v-on:change="accountChange"
                        v-decorator="[
                  'owner',
                  {
                    rules: [{ required: true, message: 'Please select an owner' }],
                  },
                ]"
                        placeholder="请选择主体"
              >
                <a-select-option v-for="(item,index) in ownerList" :key="index" :value="item.identificationName">
                  {{item.identificationName}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="仓库">
              <a-select v-on:change="repoChange"
                        v-decorator="[
                  'repos',
                  {
                    rules: [{ required: true, message: 'Please choose the repos' }],
                  },
                ]"
                        placeholder="请选择仓库"
              >
                <a-select-option v-for="(item,index) in repositoryList" :key="index" :value="item.name">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="分支">
              <a-select
                v-decorator="[
                  'branch',
                  {
                    rules: [{ required: true, message: 'Please choose the branch' }],
                  },
                ]"
                placeholder="请选择分支"
              >
                <a-select-option v-for="(item,index) in branchList" :key="index" :value="item.name">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="语言">
              <a-select
                v-decorator="[
                  'language',
                  {
                    rules: [{ required: true, message: 'Please choose the language' }],
                  },
                ]"
                placeholder="请选择语言类型"
              >
                <a-select-option value="Java">
                  Java
                </a-select-option>
<!--                <a-select-option value="Pyhton">-->
<!--                  Python-->
<!--                </a-select-option>-->
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="描述">
              <a-textarea
                v-decorator="[
                  'description',
                  {
                    rules: [{ required: true, message: 'Please enter url description' }],
                  },
                ]"
                :rows="4"
                placeholder="请添加任务描述"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
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
          Cancel
        </a-button>
        <a-button type="primary" @click="onSubmit">
          Submit
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
  import {getAction} from '@/api/manage'

  export default {
    name: "TaskList",
    data(){
      return{
        //任务数据
        taskdata:[],

        //主体数据
        ownerList:[],

        //仓库数据
        repositoryList:[],

        //分支数据
        branchList:[],

        // 删除警示框
        delete_dialogvisible: false,
        confirmLoading: false,
        current_task:{taskName:'',owner:''},

        //创建任务时选中的仓库信息
        choosedTask:{},

        form: this.$form.createForm(this),
        visible: false,
        jeecg_account:'',

        spinning:false,
      }
    },

    created() {
        var url = "/taskManagementTable/queryTaskBySysName"
        var parameter = {
          jeecg_account:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
        }
        getAction(url,parameter).then((res) => {
          this.taskdata = res.result;
          var url = "/certificationManagementForm/queryCerandRepoBySysName"
          var parameter = {
            jeecg_account:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
          }
          getAction(url,parameter).then((res) => {
            this.ownerList = res.result;
          })
        })
    },

    beforeRouteLeave(to, from, next) {
      next()
    },

    methods:{
      accountChange(e){
        var i = 0;
        if(this.form.fieldsStore.fields.repos !== undefined) {
          this.form.setFieldsValue({repos:""});
          this.choosedTask = {};
        }

        for(i=0;i<this.ownerList.length;i++) {
          if(this.ownerList[i].identificationName === e) {
            this.repositoryList = this.ownerList[i].repo;
          }
        }
      },

      repoChange(e){
        var i = 0;
        if(this.form.fieldsStore.fields.branch !== undefined) {
          this.form.setFieldsValue({branch:""});
        }

        for(i=0;i<this.repositoryList.length;i++) {
          if(this.repositoryList[i].name === e) {
            this.branchList = this.repositoryList[i].branchs;
            this.choosedTask = this.repositoryList[i];
          }
        }
      },

      clickCard(e){
        // this.$store.commit('receive',{title:e.taskName,taskName:e.taskName,path:e.path,owner:e.repoowner,branch:e.branch,language:e.language,wareHouse:e.wareHouse,recursive:"1",platform:e.platform});
        // sessionStorage.setItem("store", JSON.stringify(this.$store.state));
        this.$store.commit('updatetask',e)
        sessionStorage.setItem("task", JSON.stringify(this.$store.state.task));
        this.$router.push({name:'DetailPage'});//跳转到扫描结果页面
      },

      showDrawer() {
        this.visible = true;
      },

      onClose() {
        this.visible = false;
      },

      onSubmit(){
        if(this.check()==="false"){
          this.$message.info("存在空字段");
          return;
        }
        this.spinning=true;
        var url = "/taskManagementTable/insertTask"
        var parameter = {
          sysUsername:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
          taskName:this.form.fieldsStore.fields.name.value,
          owner:this.form.fieldsStore.fields.owner.value,
          wareHouse:this.form.fieldsStore.fields.repos.value,
          branch:this.form.fieldsStore.fields.branch.value,
          path:this.choosedTask.path,
          repoowner:this.choosedTask.owner.name,
          language:this.form.fieldsStore.fields.language.value,
          remark:this.form.fieldsStore.fields.description.value,
          repoid:this.choosedTask.id,
        }
        getAction(url,parameter).then((res) => {
          if(res.success === true){
            this.taskdata = res.result;
            this.form.fieldsStore.fields.name.value = '';
            this.form.fieldsStore.fields.owner.value = '';
            this.form.fieldsStore.fields.repos.value = '';
            this.form.fieldsStore.fields.branch.value = '';
            this.form.fieldsStore.fields.language.value = '';
            this.form.fieldsStore.fields.description.value = '';
            this.visible = false;
            this.spinning=false;
            this.$message.success('添加成功。');
          }

        })
      },

      deleteTask(e,taskName){
        this.delete_dialogvisible = true;
        this.current_task.taskName = taskName;
      },

      handleOk(e) {
        this.ModalText = '正在删除任务...';
        this.confirmLoading = true;

        var url = "/taskManagementTable/deleteTaskBySysNameandTaskName"
        var parameter = {
          jeecg_account:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
          taskName:this.current_task.taskName
        }
        getAction(url,parameter).then((res) => {
          this.taskdata = res.result;
        })

        setTimeout(() => {
          this.delete_dialogvisible = false;
          this.confirmLoading = false;
        }, 2000);
      },

      handleCancel(e) {
        this.delete_dialogvisible = false;
      },

      check() {//字段检查
        var res="false";
        this.form.validateFields(err => {
          if (!err) {
            res="true";
          }
        });
        return res;
      },
    }
  }
</script>

<style scoped>
  html,body{height:100%;}

  .Top_div{
    position: relative;
    width: 100%;
    height:100%;
    min-height: 1000px;
    background-color: white;
    overflow: auto;
  }
</style>