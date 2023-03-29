<template>
  <div>
    <a-drawer title="文件过滤" :width="800" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
<!--      <a-alert style="position:absolute;left: 30%;z-index: 100" message="更新成功" type="success" show-icon />-->
      <div style="width: 45%;display: inline-block;position:absolute;padding-left: 5px;overflow-y: scroll;height: 90%;">
        <a-checkbox @change="onChange">
          {{checkbox}}
        </a-checkbox>
        <a-tree
          checkable
          defaultExpandParent
          v-model="checkedKeys"
          :tree-data="FileList"
          :replace-fields="replaceFields"
          @select="onSelect"
          @check="onCheck"
          :auto-expand-parent="autoExpandParent"
          style="margin-bottom: 40px;"
        />
<!--        <a-alert style="position:absolute;" message="更新成功" type="success" />-->
        <br/>
      </div>

      <div style="width: 50%;display: inline-block;position:absolute;right: 0;">
        <p>整体匹配:</p>
        <a-select ref="select" v-model:value="filter1" mode="tags" style="width: 90%" :token-separators="[',']" @change="handleChange">

        </a-select>
        <br/>
        <a-button type="primary" v-on:click="updatefilter1('choose')">
          全部选中
        </a-button>
        <a-button style="margin-left: 5px;margin-top: 5px;" v-on:click="updatefilter1('unchoose')">
          全部取消
        </a-button>

        <br/><br/>

        <p>前缀匹配:</p>
        <a-select mode="tags" v-model:value="filter2" style="width: 90%" :token-separators="[',']" @change="handleChange">

        </a-select>
        <br/>
        <a-button type="primary" v-on:click="updatefilter2('choose')">
          全部选中
        </a-button>
        <a-button style="margin-left: 5px;margin-top: 5px;" v-on:click="updatefilter2('unchoose')">
          全部取消
        </a-button>

        <br/><br/>

        <p>后缀匹配:</p>
        <a-select mode="tags" v-model:value="filter3" style="width: 90%" :token-separators="[',']" @change="handleChange">

        </a-select>
        <br/>
        <a-button type="primary" v-on:click="updatefilter3('choose')">
          全部选中
        </a-button>
        <a-button style="margin-left: 5px;margin-top: 5px;" v-on:click="updatefilter3('unchoose')">
          全部取消
        </a-button>
      </div>

      <div :style="{position: 'absolute',right: 0,bottom: 0,width: '100%',borderTop: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',textAlign: 'right',zIndex: 1,}">
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="handleOK">
          确定
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
  import FileTree from "./FileTree";
  import TreeCatalogue from "./TreeCatalogue";
  import {getAction} from '@/api/manage';

    export default {
        name: "FileFilter",
        components: {FileTree},
        props: ["visible","treeData"],
          data() {
            return {
              form: this.$form.createForm(this),

              filter1:[],
              filter1carry:[],
              filter2:[],
              filter2carry:[],
              filter3:[],
              filter3carry:[],

              checkbox:"全选",

              replaceFields: {
                children: 'children',
                title: 'name',
              },
              checkedKeys: [],
              expandedkeys:true,
              autoExpandParent: true,

              FileList:[],
            };
          },

      created(){

      },

      methods: {
        getFileList(){
              //向后端请求文件列表
              var that=this;
              var url = "/GitOptController/getFileList"
              var parameter = {
                task:this.treeData,
              }
              getAction(url,parameter).then((res) => {
                this.FileList=TreeCatalogue(res.tree);
                that.filterJava(that.FileList,that);
                var url = "/taskPathTable/getList"
                var parameter = {
                  sysName:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
                  taskName:JSON.parse(sessionStorage.getItem("task")).taskName,
                }
                getAction(url,parameter).then((res) => {
                  if(res.result!==null){
                    this.checkedKeys=res.result.oncheckFile.split(',');
                  }
                })
              })
        },

        onClose() {
          this.filter1=this.filter1carry;
          this.$emit("FileFilterCancel");
        },

        handleOK(){
          this.filter1carry=this.filter1;
          this.$emit("FileFilterCancel");
        },

        handleChange(value) {
          //将选中的文件发送给后台进行保存
          // console.log(`selected ${value}`);
        },

        onSelect(selectedKeys, info) {
          // console.log('selected', selectedKeys, info);
        },

        onCheck(checkedKeys, info) {
          // console.log('onCheck', checkedKeys, info);
          this.updateChecked();
        },

        updateChecked(){
          var url = "/taskPathTable/updateList"
          var parameter = {
            sysUsername:JSON.parse(localStorage.getItem("pro__Login_Username")).value,
            taskName:JSON.parse(sessionStorage.getItem("task")).taskName,
            oncheckFile:this.checkedKeys,
          }
          getAction(url,parameter).then((res) => {
            this.$message.success('更新成功');
          })
        },

            updatefilter1(val){
              var that = this;
              this.filter1deal(this.filter1,that.FileList,that,val);
              this.updateChecked();
            },

            filter1deal(filter,arr,that,opt){
              filter.forEach(item1=>{
                arr.forEach(item=>{
                  if(item.children.length>0){
                    that.filter1deal(filter,item.children,that,opt);
                  }
                  if(item.type==="blob"&&item.disabled!==true&&item.name.search(item1)!==-1){
                    if(opt==="choose"){
                      if(that.checkedKeys.includes(item.path)===false){
                        that.checkedKeys.push(item.path);
                      }
                    }else{
                      if(that.checkedKeys.includes(item.path)===true){
                        that.checkedKeys.splice(that.checkedKeys.indexOf(item.path),1)
                      }
                    }
                  }
                })
              })
            },

            updatefilter2(val){
              var that = this;
              this.filter2deal(this.filter2,that.FileList,that,val);
              this.updateChecked();
            },
            filter2deal(filter,arr,that,opt){
              filter.forEach(item1=>{
                arr.forEach(item=>{
                  if(item.children.length>0){
                    that.filter2deal(filter,item.children,that,opt);
                  }

                  if(item.type==="blob"&&item.disabled!==true&&item.name.substring(0,item1.length)===item1){
                    if(opt==="choose"){
                      if(that.checkedKeys.includes(item.path)===false){
                        that.checkedKeys.push(item.path);
                      }
                    }else{
                      if(that.checkedKeys.includes(item.path)===true){
                        that.checkedKeys.splice(that.checkedKeys.indexOf(item.path),1)
                      }
                    }
                  }
                })
              })
            },

            updatefilter3(val){
              var that = this;
              this.filter3deal(this.filter3,that.FileList,that,val);
              this.updateChecked();
            },
            filter3deal(filter,arr,that,opt){
              filter.forEach(item1=>{
                arr.forEach(item=>{
                  if(item.children.length>0){
                    that.filter3deal(filter,item.children,that,opt);
                  }
                  if(item.type==="blob"&&item.disabled!==true&&item.name.substr(item.name.length-item1.length)===item1){
                    if(opt==="choose"){
                      if(that.checkedKeys.includes(item.path)===false){
                        that.checkedKeys.push(item.path);
                      }
                    }else{
                      if(that.checkedKeys.includes(item.path)===true){
                        that.checkedKeys.splice(that.checkedKeys.indexOf(item.path),1)
                      }
                    }
                  }
                })
              })
            },

            filterJava(arr,that){
              arr.forEach(item=>{
                if(item.children.length>0){
                  that.filterJava(item.children,that);
                }
                if(item.type==='blob'&&item.name.search('.java')===-1){
                  // console.log(item.name);item.type==="file"&&
                  // console.log(item.name.search("."));
                  item.disabled=true;
                }
              })
            },

            chooseAll(arr){
              var that = this;
              arr.forEach(item=>{
                if(item.children.length>0){
                  that.chooseAll(item.children,that);
                }
                if(that.checkedKeys.includes(item.name)===false){
                  that.checkedKeys.push(item.name);
                }
              })
            },

            onChange(e) {
              if(!e.target.checked){
                this.checkedKeys=[];
              }else{
                this.chooseAll(this.FileList);
              }
            },
          },
    }
</script>

<style scoped>

</style>