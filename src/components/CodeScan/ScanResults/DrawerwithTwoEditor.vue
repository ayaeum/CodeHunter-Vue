<template>
  <div>
    <a-drawer
      title="问题详情"
      :width="1240"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <div style="position:absolute;">
        <h3 style="position:absolute;left: -10px;width: 600px;top: -10px;color: #2f54eb">文件路径：{{this.QuestionMessage.filePath_1}}</h3>
        <h3 style="position:absolute;left: 575px;width: 600px;top: -10px;color: #2f54eb">文件路径：{{this.QuestionMessage.filePath_2}}</h3>
        <h4 style="position:absolute;left: -10px;width: 600px;top: 17px;color: #11da75;">代码位置：{{this.QuestionMessage.startLine_1}} -- {{this.QuestionMessage.endLine_1}}</h4>
        <h4 style="position:absolute;left: 575px;width: 600px;top: 17px;color: #11da75;">代码位置：{{this.QuestionMessage.startLine_2}} -- {{this.QuestionMessage.endLine_2}}</h4>
        <h4 style="position:absolute;left: -10px;width: 600px;top: 40px;color: #cc0000">问题详情：{{this.QuestionMessage.description }}</h4>
      </div>

      <codeeditor ref="codeeditor" style="background-color: #F0F2F5;width: 600px;position: absolute;left: 10px;top: 150px;" :value="value1" :hightline="hightLine1" language="x-java" auto-height="false,800" ></codeeditor>
      <codeeditor style="background-color: #F0F2F5;width: 600px;position: absolute;right: 20px;top: 150px;" :value="value2" :hightline="hightLine2" language="x-java" auto-height="false,800" ></codeeditor>

      <a-button style="margin-top: 10px;position: absolute;bottom: 20px;" type="primary" @click="onClose">
        确定
      </a-button>
    </a-drawer>
  </div>
</template>

<script>

import codeeditor from "../CodeEditor/codeeditor";

export default {
  name: "DrawerwithTwoEditor",
  props:["visible","value1","value2","QuestionMessage","hightLine1","hightLine2"],
  components: {
    codeeditor
  },
  data() {
    return {
      form: this.$form.createForm(this),
      filevalue1:"",
      filevalue2:"",
      };
    },
    created() {
    },
    methods: {
      showDrawer() {
        this.$emit('change');
      },
      onClose() {
        this.$emit('change');
      },
    },
  watch: {
    value1: {
      handler(newVal) {
        this.value1 = newVal;
      }
    },
    value2: {
      handler(newVal) {
        this.value2 = newVal;
      }
    },
    hightLine1: {
      handler(newVal) {
        this.hightLine1 = newVal;
      }
    },
    hightLine2: {
      handler(newVal) {
        this.hightLine2 = newVal;
      }
    },
  }
  }
  </script>

  <style scoped>
    .errorHighlight{
      background-color: #00ff80;
    }
  </style>