<template>
  <div class="Top_div">
      <a-card title="文件目录" class="Catalogue_div">
        <a-tree
          style="margin-left: -25px;margin-top: -20px;"
          checkable
          defaultExpandParent
          v-model="checkedKeys"
          :tree-data="treeData"
          :replace-fields="replaceFields"
          @select="onSelect"
          @check="onCheck"
          :auto-expand-parent="autoExpandParent"
        />
      </a-card>
  </div>
</template>


<script>
  export default {
    name:'FileTree',
    props:[
      "treeData",
      "oncheckFile",
    ],
    data() {
      return {
        data:this.treeData,
        replaceFields: {
          children: 'children',
          title: 'name',
        },
        checkedKeys: [],
        expandedkeys:true,
        autoExpandParent: true,
      };
    },
    methods: {
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info);
        this.$emit("change",);
      },
      onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info);
        this.checkedKeys = checkedKeys;
        this.$emit("change",checkedKeys);
      },
      async updataOncheckFile(res){
        this.checkedKeys = JSON.parse(res);
        this.$emit("change",this.checkedKeys);
      }
    },
  };
</script>

<style>
  .Top_div{
    position: absolute;
    width: 300px;
    height:1460px;
  }

  .Catalogue_div{
    width: 300px;
    height:1460px;
    overflow:auto;
  }
</style>
