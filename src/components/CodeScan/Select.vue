<template>
  <a-select
    show-search
    placeholder="请选择"
    option-filter-prop="children"
    style="width: 200px"
    :filter-option="filterOption"
    notFoundContent="暂无数据"
    :options="list"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    :value="defaultValue"
  >
  </a-select>
</template>

<script>
    export default {
        name: "Select",
        props:["list","defaultValue"],
        methods: {
          handleChange(value) {
            // console.log(`selected ${value}`);
            this.$emit('updateTask',value)
          },
          handleBlur() {
            // console.log('blur');
          },
          handleFocus() {
            // console.log('focus');
          },
          filterOption(input, option) {
            return (
              option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          },
        },
    }
</script>

<style scoped>

</style>