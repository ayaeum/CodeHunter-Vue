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
          <a-descriptions-item label="文件名">
            {{content.filename}}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions>
          <a-descriptions-item label="共计问题">
            {{content.result.length}}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions>
          <a-descriptions-item label="文件路径">
            {{content.filename}}
          </a-descriptions-item>
        </a-descriptions>
        <br/>

        <!--详细问题展示-->
        <a-collapse v-for="(item,index) in content.result" :key="index" default-active-key="1" :bordered="false">
          <template #expandIcon="props">
              <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel  :header="'【'+item.level+'】'+item.rule" class="panel">
            <p :style="{'color':item.color}">&nbsp;&nbsp;级别：【{{item.level}}】</p>
            <br/>
            <div v-for="item1 in item.result">
              <p style="padding: 0;margin-bottom: 5px;">【所在行数】{{item1.questionableLine}}</p>
              <p style="padding: 0;margin-bottom: 5px;">【错误代码】{{item1.text}}</p>
              <template style="position:relative;">
                <a-textarea :disabled="true" style="background-color: #F0F2F5;color: black;overflow-y: hidden;overflow-x: scroll;" :rows="5"
                            :value="(item1.questionableLine-2)+'   '+content.code.split('\n')[item1.questionableLine-3]+'\n'
                        +(item1.questionableLine-1)+'   '+content.code.split('\n')[item1.questionableLine-2]+'\n'
                        +item1.questionableLine+'   '+content.code.split('\n')[item1.questionableLine-1]+'\n'
                        +(item1.questionableLine+1)+'   '+content.code.split('\n')[item1.questionableLine]+'\n'
                        +(item1.questionableLine+2)+'   '+content.code.split('\n')[item1.questionableLine+1]" />
              </template>
              <br/><br/><br/>
            </div>
          </a-collapse-panel>
        </a-collapse>

        <a-button style="margin-top: 10px;position: absolute;bottom: 20px;" type="primary" @click="onClose">
          确定
        </a-button>
      </a-drawer>
    </div>
</template>

<script>
    // import descriptionItem from 'descriptionItem';
    // 引入主题 可以从 codemirror/theme/ 下引入多个

    import codeeditor from "../CodeEditor/codeeditor";

    export default {
        name: "Drawer",
        props:["visible","content"],
        components: {
          codeeditor
        },
        data() {
          return {
            form: this.$form.createForm(this),
            question_list:[
              { id:1,
                level:"致命",
                value:
                  "    public static void cleanTheCode(String filePath) throws IOException {\n" +
                  "        try {\n" +
                  "            RandomAccessFile acf = new RandomAccessFile(filePath, \"r\");\n" +
                  "            String line;\n" +
                  "            boolean isComment = false;\n" +
                  "            boolean isMethod = false;//判断该行代码是否为一个方法的起始行\n" +
                  "            int doubleMethodWord = 0;//判断方法代码段中是否含有另外的“{”\n" +
                  "            while (null != (line = acf.readLine())) {\n" +
                  "                lineNum++;\n" +
                  "                // 去除前后空格\n" +
                  "                line=line.trim();\n" +
                  "\n",
                rows:11,
                description:"采用 4 个空格缩进，禁止使用 Tab 字符",
                position:"11-22"},
              {
                level:"警告",
                value:
                  "    public static void cleanTheCode(String filePath) throws IOException {\n" +
                  "        try {\n" +
                  "            RandomAccessFile acf = new RandomAccessFile(filePath, \"r\");\n" +
                  "            String line;\n" +
                  "            boolean isComment = false;\n" +
                  "            boolean isMethod = false;//判断该行代码是否为一个方法的起始行\n" +
                  "            int doubleMethodWord = 0;//判断方法代码段中是否含有另外的“{”\n" +
                  "            while (null != (line = acf.readLine())) {\n" +
                  "                lineNum++;\n" +
                  "                // 去除前后空格\n" +
                  "                line=line.trim();\n" +
                  "\n",
                rows:12,
                description:"没有必要增加若干空格来使变量的赋值等号与上一行对应位置的等号对齐。",
                position:"28-40"},
              {
                level:"建议",
                value:
                  "    public static void cleanTheCode(String filePath) throws IOException {\n" +
                  "        try {\n" +
                  "            RandomAccessFile acf = new RandomAccessFile(filePath, \"r\");\n" +
                  "            String line;\n" +
                  "            boolean isComment = false;\n" +
                  "            boolean isMethod = false;//判断该行代码是否为一个方法的起始行\n" +
                  "            int doubleMethodWord = 0;//判断方法代码段中是否含有另外的“{”\n" +
                  "            while (null != (line = acf.readLine())) {\n" +
                  "                lineNum++;\n" +
                  "                // 去除前后空格\n" +
                  "                line=line.trim();\n" +
                  "\n",rows:11,
                description:"好的命名、代码结构是自解释的，注释力求精简准确、表达到位。",
                position:"67-78"},
            ],
            customStyle:
              'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
          };
        },
        methods: {
          showDrawer() {
            this.$emit('change');
          },
          onClose() {
            this.$emit('change');
          },
        },
    }
</script>

<style scoped>
.panel{
  background: #f7f7f7;
  border-radius: 4px;
  margin-bottom: 24px;
  border: 0;
  overflow: hidden;
}

/*/deep/.ant-collapse > .ant-collapse-item > .ant-collapse-header{*/
/*  color: red;*/
/*}*/

.panel1{
  font-size: 18px;
}
</style>