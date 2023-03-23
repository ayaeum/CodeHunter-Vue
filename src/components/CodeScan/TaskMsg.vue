<template>
  <div>
    <a-tooltip placement="topLeft" title="Prompt Text">
      <a-button style="font-weight: bold;color: black;font-size: 16px;">{{taskname}}<a-icon type="link" style="color: #1890FF;"/>{{reposity}}<a-icon type="link" style="color: #1890FF;"/>{{branch}}</a-button>
    </a-tooltip>
  </div>
</template>

<script>
  // 任务详情页上的任务信息，包含任务名、仓库、分支信息等等
    export default {
        name: "TaskMsg",
        props:["taskname","reposity","branch"]
    }
</script>

<style scoped>

</style>