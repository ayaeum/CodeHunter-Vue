<template>
  <a-statistic
    :title="title"
    :value="value"
    :precision="precision"
    :suffix="suffix"
    :value-style="{ color: '#3f8600' }"
    style="position:relative;display: inline-block;"
  >
  </a-statistic>
</template>

<script>
    export default {
        name: "DigitalBoard",
        props:["title","value","precision","suffix"],
    }
</script>

<style scoped>

</style>