<template>
  <div :class="visibily">
    <a-form class="play" :form="form" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="标识名称">
            <a-input
              v-decorator="[
                    'identificationName',
                    {
                      rules: [{ required: true, message: 'please enter identificationName' }],
                    },
                  ]"
              style="width: 100%"
              placeholder="请输入标识名称"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="GitLab地址">
            <a-input
              v-decorator="[
                    'Gitlab_address',
                    {
                      rules: [{ required: true, message: 'Please enter user Gitlab_address' }],
                    },
                  ]"
              placeholder="请输入GitLab地址"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Private_token  (RSA加密)">
            <a-input
              type="password"
              v-decorator="[
                    'private_token',
                    {
                      rules: [{ required: true, message: 'please enter private_token' }],
                    },
                  ]"
              style="width: 100%"
              placeholder="请输入私钥（private_token）"
            />
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
                      rules: [{ required: true, message: 'Please enter description' }],
                    },
                  ]"
              :rows="4"
              placeholder="请添加描述"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import {getAction} from '@/api/manage'
  // import {RSAMixin} from "../../mixins/RSAMixin";
  import {RSAMixin} from "@/mixins/RSAMixin"
  export default {
    name: "GitLab_Drawer",
    props:[
      "visibily",
    ],
    mixins:[RSAMixin],
    data(){
      return{
        form: this.$form.createForm(this),
      }
    },

    methods:{
      /**
       * 提交表单，创建新的认证
       */
      onSubmit(){
        var url = "/certificationManagementForm/addCertification";
        var parameter = {
          sysUsername:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
          giteeAccount:this.form.fieldsStore.fields.Gitlab_address.value,
          giteePassword:this.encryptedData(this.$store.state.publicKey,this.form.fieldsStore.fields.private_token.value),
          clientId:"",
          clientSecret:"",
          remarks:this.form.fieldsStore.fields.description.value,
          identificationName:this.form.fieldsStore.fields.identificationName.value,
          platform:"GitLab",
        }

        this.form = this.$form.createForm(this);
        getAction(url,parameter).then((res) => {
          console.log(res)
          if(res.message === "添加成功"){
            this.$emit("change",res.result);
          }
        })
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
  .display{
    display: none;
  }

  .play{
    display: unset;
  }
</style>