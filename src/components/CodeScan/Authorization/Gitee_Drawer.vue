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
                      rules: [{ required: true, message: '请输入标识名称' }],
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
            <a-form-item label="邮箱">
              <a-input
                v-decorator="[
                    'email',
                    {
                      rules: [{ required: true, message: '请输入邮箱' }],
                    },
                  ]"
                placeholder="请输入绑定的邮箱"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="密码  (RSA加密)">
              <a-input
                type="password"
                v-decorator="[
                    'password',
                    {
                      rules: [{ required: true, message: '请输入密码' }],
                    },
                  ]"
                style="width: 100%"
                placeholder="请输入密码"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Client ID">
              <a-input
                v-decorator="[
                    'Client_ID',
                    {
                      rules: [{ required: true, message: '请输入 Client ID' }],
                    },
                  ]"
                style="width: 100%"
                placeholder="请输入Client ID"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Client Secret">
              <a-input
                v-decorator="[
                    'Client_Secret',
                    {
                      rules: [{ required: true, message: '请输入 Client Secret' }],
                    },
                  ]"
                style="width: 100%"
                placeholder="请输入Client Secret"
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
                      rules: [{ required: true, message: '请输入备注' }],
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
  import {RSAMixin} from "@/mixins/RSAMixin"
    export default {
      name: "Gitee_Drawer",
      props:[
        "visibily",
        "jeecg_account"
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

            // var url = "/certificationManagementForm/addCertification";
            // var parameter = {
            //   sysUsername:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
            //   giteeAccount:this.form.fieldsStore.fields.email.value,
            //   giteePassword:this.encryptedData(this.$store.state.publicKey,this.form.fieldsStore.fields.password.value),
            //   clientId:this.form.fieldsStore.fields.Client_ID.value,
            //   clientSecret:this.form.fieldsStore.fields.Client_Secret.value,
            //   remarks:this.form.fieldsStore.fields.description.value,
            //   identificationName:this.form.fieldsStore.fields.identificationName.value,
            //   platform:"Gitee",
            // }
            // getAction(url,parameter).then((res) => {
            //   if(res.message === "添加成功"){
            //     this.$emit("change",res.result);
            //     this.form = this.$form.createForm(this);
            //   }
            // })
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