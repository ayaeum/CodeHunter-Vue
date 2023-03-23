<template>
  <div>
    {{ msg }}
    <br>    <br>
    jeecg账号:{{ jeecg_account }}
    <br>    <br>
    用户名:{{ username }}
    <br>    <br>
    用户邮箱：{{ useremail }}
    <br>    <br>
    授权码：{{ access_token }}

    <br>    <br>
    <input type="button" value="链接GITEE" v-on:click="connectGit">
    <br>    <br>
    <a href="https://gitee.com/oauth/authorize?client_id=7d49c90fef9b37e0a42923300e4cfc0786aaaefd80ca8947556cf2d504ecac19&redirect_uri=http://192.168.5.80:8080/jeecg-boot/Git/success&response_type=code" target="_blank" v-on:click="getAccessToken">链接GIT</a>
    <br>    <br>
    <input type="button" value="获取授权码" v-on:click="getAccessToken">
    <br>    <br>
    <input type="button" value="获取用户信息" v-on:click="getUserInfo">
    <br>    <br>
    <input type="button" value="获取仓库文件结构" v-on:click="getGitTree">
    <br>    <br>
    <input type="button" value="获取用户列表数据" v-on:click="getUserlistinfo">
    <br>    <br>
    <input type="button" value="获取在线用户数据" v-on:click="getOnlineUser">
    <br>    <br>
    <input type="button" value="获取当前用户数据" v-on:click="getCurrentUser">
    <br>    <br>
    <input type="button" value="测试按钮" v-on:click="TestBtn">
    <br>    <br>
    <br>    <br>
    <br>    <br>

    邮箱：<input placeholder="请输入Gitee账号" v-model="account">
    <br>    <br>
    密码：<input type="password" placeholder="请输入Gitee密码" v-model="password">
    <br>    <br>
    Client ID：<input placeholder="" v-model="Client_ID">
    <br>    <br>
    Client Secret：<input placeholder="" v-model="Client_Secret">
    <br>    <br>
    <input type="button" value="保存" v-on:click="connectBypwd">
    <br>    <br>
    {{result}}

    <demo :tree-data="TreeCatalogue_result"></demo>
  </div>

</template>

<script lang="ts">
  import {getAction} from '@/api/manage'
  import demo from '../../components/CodeScan/FileTree.vue'
  import TreeCatalogue from '../../components/CodeScan/TreeCatalogue'

  export default {
    components:{
      demo
    },
    data () {
      return {
        msg: "",
        account:"",
        password:"",
        username:"未获取",
        result:"未登录",
        useremail:"未获取",
        access_token:"未获取",
        jeecg_account:"",
        Client_ID:"",
        Client_Secret:"",
        TreeCatalogue_result:[]
      }
    },
    methods: {
      hello () {
        var url = "/test/jeecgDemo/hello1"
        getAction(url).then((res) => {
          if (res.success) {
            console.log(res);
            this.msg = res.result;
          }
        })
      },

      connectGit() {

      },

      //获取仓库文件结构
      getGitTree(){
        console.log("------调用getGtiTree方法------");
        var url = "/Git/getTree"
        var parameter = {
          access_token:this.access_token,
          owner:"caiguapi",
          repo:"aicode-hunter",
          sha:"master",
          recursive:"1"
        }
        getAction(url,parameter).then((res) => {
          console.log("res:");
          console.log(res);
          this.TreeCatalogue_result = TreeCatalogue(res.tree);
          console.log(this.TreeCatalogue_result);
          // console.log(res.result);
        })
      },

      //获取用户信息
      getUserInfo(){
        console.log("------调用getUserInfo方法------");
        var url = "/Git/getUserInfo"
        var parameter = {
          access_token:this.access_token
        }
        getAction(url,parameter).then((res) => {
          this.username=res.name;
          console.log("res:");
          console.log(res);
        })
      },

      //获取access_token
      getAccessToken(){
        console.log("------调用getAccessToken方法------");
        var url = "/GitByPwd/checkAccessToken"
        var parameter = {
          jeecg_account:"10eee7d21523c7e89451d988483711c6"
        }
        getAction(url,parameter).then((res) => {
          this.access_token=res.result.accesstoken;
          console.log("res:");
          console.log(res);
        })
      },

      connectBypwd(){
        console.log("------调用connectBypwd方法------");

        var url = "/GitByPwd/setGiteeMsg"
        var parameter = {
          jeecg_account:this.jeecg_account,
          account:this.account,
          password:this.password,
          Client_ID:this.Client_ID,
          Client_Secret:this.Client_Secret
        }
        getAction(url,parameter).then((res) => {
          this.result=res.message;
          this.access_token=res.result.access_token;
          console.log(res.result.access_token);
          console.log("res:");
          console.log(res);
        })
      },

      getUserlistinfo(){
        var url = "/sys/user/list"
        var parameter = {

        }
        getAction(url,parameter).then((res) => {
          console.log("JEECG用户列表:");
          console.log(res);
        })
      },

      getOnlineUser(){
        var url = "/sys/online/list"
        var parameter = {

        }
        getAction(url,parameter).then((res) => {
          console.log("JEECG用户列表:");
          console.log(res);
        })
      },

      getCurrentUser(){
        var url = "/sys/user/getUserInfo"
        var parameter = {

        }
        getAction(url,parameter).then((res) => {
          console.log("当前登录用户信息:");
          console.log(res);
          return res;
        })
      },

      TestBtn(){
        // var url = "/test/demo"
        // var parameter = {
        //   jeecg_account:""
        // }
        // getAction(url,parameter).then((res) => {
        //   console.log("当前登录用户信息:");
        //   console.log(res);
        //   return res;
        // })
      }
    },

    mounted() {
      console.log('------挂载完成---------')
      var url = "/sys/user/getUserInfo"
      var parameter = {
      }
      getAction(url,parameter).then((res) => {
        this.jeecg_account=res.result.userInfo.username;
        console.log("当前登录用户信息:");
        console.log(res.result.userInfo.username);

        var url1 = "/GitByPwd/checkAccessToken"
        var parameter1 = {
          jeecg_account:this.jeecg_account
        }
        getAction(url1,parameter1).then((res) => {

          console.log("检查授权码:");
          console.log(res);
        })
      })
    }
  }
</script>