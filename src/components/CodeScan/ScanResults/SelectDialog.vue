<template>
  <div>
    <a-button type="primary" @click="showModal">
      Open Modal
    </a-button>
    <a-modal v-model="SelectDialogVisible" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script>
    export default {
        name: "SelectDialog",
        props:["SelectDialogVisible"],
        data() {
          return {
            visible: false,
          };
        },
        methods: {
          showModal() {
            this.visible = true;
          },
          handleOk(e) {
            console.log(e);
            this.visible = false;
          },
        },
    }
</script>

<style scoped>

</style>