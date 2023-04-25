<template>
  <div>
    <a-drawer
      title="问题详情"
      :width="800"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <!--文件信息展示-->
      <a-descriptions>
        <a-descriptions-item label="涉及代码段">
          {{content.similar_code_list.length}}
        </a-descriptions-item>
      </a-descriptions>
      <br/>

      <!--详细问题展示-->
      <div v-for="item in content.similar_code_list">
        <p style="padding: 0;margin-bottom: 5px;">【文件路径】{{item.filePath}}</p>
        <p style="padding: 0;margin-bottom: 5px;">【方法名】{{item.methodName}}</p>
        <p style="padding: 0;margin-bottom: 5px;">【开始位置】{{item.methodLine}}</p>
        <template style="position:relative;">
          <a-textarea :disabled="true" style="background-color: #F0F2F5;color: black;overflow-y: hidden;overflow-x: scroll;" :rows="(item.Code.split('\n').length+3)"
                      :value="item.Code" />
        </template>
        <br/><br/><br/>
      </div>

      <a-button style="margin-top: 10px;position: absolute;bottom: 20px;" type="primary" @click="onClose">
        确定
      </a-button>
    </a-drawer>
  </div>
</template>

<script>
    export default {
      name: "CloneDrawer",
      props:["visible","content"],
      data() {
        return {
          form: this.$form.createForm(this),
          question_list:[],
        };
      },
      methods: {
        showDrawer() {
          this.$emit('change');
        },
        onClose() {
          this.$emit('change');
        },

        codeParser(code,methodLine){//代码解析器
          var array=code.split("\r\n");
          var maxNum=String(methodLine+array.length).length;//最大行数位数
          var pos=methodLine;
          var res="";
          array.forEach(item=>{
            res=res+this.prefixZero(pos++, maxNum)+"  "+item+"\r\n";
          })
          return res;
        },

        prefixZero(num, n) {//自动补全方法
          return (Array(n).join("0") + num).slice(-n);
        }
      },
    }
</script>

<style scoped>

</style>