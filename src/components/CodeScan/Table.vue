<template>
  <a-table :columns="columns" :data-source="data" bordered :pagination="false" size="small">
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>

<script>
  const renderContent = (value, row, index) => {
    const obj = {
      children: value,
      attrs: {},
    };
    if (index === 4) {
      obj.attrs.colSpan = 0;
    }
    return obj;
  };

  export default {
    props:["tableData","current"],
    data() {
      return {
        data:[
          {
            key: '1',
            name: '警示级别',
            age: '本次扫描（个）',
            tel: '上次扫描（个）',
            phone: '历史平均（个）',
          },
          {
            key: '2',
            name: '致命问题',
            age: this.tableData[0].serious,
            tel: this.tableData[1].serious,
            phone: this.tableData[2].serious,
          },
          {
            key: '3',
            name: '警告问题',
            age: this.tableData[0].warn,
            tel: this.tableData[1].warn,
            phone: this.tableData[2].warn,
          },
          {
            key: '4',
            name: '建议问题',
            age: this.tableData[0].propose,
            tel: this.tableData[1].propose,
            phone: this.tableData[2].propose,
          },
        ],
        columns:[
          {
            title: '问题总计（个）',
            dataIndex: 'name',
            customRender: renderContent,
          },
          {
            title: this.tableData[0].total,
            dataIndex: 'age',
            customRender: renderContent,
          },
          {
            title: '未处理问题（个）',
            dataIndex: 'tel',
            customRender: renderContent
          },
          {
            title: this.tableData[1].total,
            colSpan: 1,
            dataIndex: 'phone',
            customRender: renderContent,
          },
        ],
      };
    },
    watch:{
      tableData:{
        handler(newVal, oldVal){
          this.columns[1].title=newVal[0].total;
          this.columns[3].title=newVal[0].total;
          this.data[1].age=newVal[0].serious;
          this.data[1].tel=newVal[1].serious;
          this.data[1].phone=newVal[2].serious;
          this.data[2].age=newVal[0].warn;
          this.data[2].tel=newVal[1].warn;
          this.data[2].phone=newVal[2].warn;
          this.data[3].age=newVal[0].propose;
          this.data[3].tel=newVal[1].propose;
          this.data[3].phone=newVal[2].propose;
        },
        immediate:true,
        deep:true,
      }
    },
    methods:{
      async updateModel(){
        this.$forceUpdate();
      }
    }
  };
</script>

<style scoped>

</style>