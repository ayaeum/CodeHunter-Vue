<template>
  <div>
    <a-modal :visible="visible" :title="title" width="1200px" @ok="handleOk" @cancel="handleCancle">
      <div style="height: 600px;">
        <a-list item-layout="vertical" size="small" :pagination="pagination" :data-source="listData">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
            <a-list-item-meta :description="item.context">
              <a slot="title" style="display: inline-block;width: 100%;position:relative;">
                {{item.id}}.{{ item.rule }}
                  <a-select
                    label-in-value
                    size="small"
                    :default-value="{ key: item.remark }"
                    style="position:absolute;display: inline-block;right: 3%;"
                    @change="handleChange($event,item.id)"
                  >
                    <a-select-option value="deadly">
                      严重
                    </a-select-option>
                    <a-select-option value="warning">
                      警告
                    </a-select-option>
                    <a-select-option value="proposal">
                      建议
                    </a-select-option>
                    <a-select-option value="common">
                      取消
                    </a-select-option>
                  </a-select>
              </a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import {getAction} from '@/api/manage';
  export default{
    name: "ProtocolConfig",
    props:["title","visible"],
    data() {
      return {
        listDataCarry:[],
        listData:[
          {
            id:1,
            rule: `ant design vue`,
            context:
              'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            rank:"致命",
          },
          {
            id:2,
            rule: `ant design vue part`,
            context:
              'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            rank:"警告",
          },
          {
            id:3,
            rule: `ant design`,
            context:
              'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            rank:"建议",
          },
          {
            id:4,
            rule: `ant design vue part`,
            context:
              'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            rank:"取消",
          }
        ],
        pagination: {
          onChange: page => {
            console.log(page);
          },
          pageSize: 6,
          position:'bottom',
        },
        actions: [
          { type: 'star-o', text: '156' },
          { type: 'like-o', text: '156' },
          { type: 'message', text: '2' },
        ],
        ConfigList:{},
      };

    },
    created() {
      this.GetRule();
    },

    methods: {
      GetRule(){
        var that=this;
        //请求规约列表
        var url = "/ProtocolConfiguration/getJavaRule"
        var parameter = {}
        getAction(url,parameter).then((res) => {
          that.listData=res.result;
          //请求用户Java规约配置
          var url = "/taskScanningScheme/queryTaskScan"
          var parameter = {
            Sysname:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
            Taskname:JSON.parse(sessionStorage.getItem("task")).taskName
          }
          getAction(url,parameter).then((res) => {
            that.ConfigList=JSON.parse(res.javarule);
            //遍历listData校对配置
            that.listData.forEach(item=>{
              item.remark=that.ConfigList[item.id];
            })
          })
        })

        this.listData.forEach(function (item) {
          that.listDataCarry.push(item);
        })
      },

      handleOk() {
        var that=this;
        // this.listDataCarry.splice(0,this.listDataCarry.length);
        // this.listData.forEach(function (item) {
        //   that.listDataCarry.push(item);
        // })
        // this.listDataCarry=this.listData.slice(0,this.listData.length);
        this.$emit("ProtocolConfigCancel");
      },
      handleCancle() {
        // var that=this;
        // this.listData.splice(0,this.listData.length);
        // this.listDataCarry.forEach(function (item) {
        //   that.listData.push(item);
        // })
        this.$emit("ProtocolConfigCancel");
      },
      handleChange(e,id) {
        this.listData.some(item=>{
          if(item.id === id){
            item.remark=e.label.replaceAll("\n","").replaceAll(" ","");
            return true;
          }
        })
        var url = "/taskScanningScheme/updateTaskScan"
        var parameter = {
          taskId:JSON.parse(sessionStorage.getItem("task")).id,
          configList:JSON.stringify(this.listData),
        }
        getAction(url,parameter).then((res) => {
          //TODO 提示与更新操作
          // console.log(res);
          this.$message.success('配置更新成功');
        })
      },
    },
  }
</script>

<style scoped>

</style>

