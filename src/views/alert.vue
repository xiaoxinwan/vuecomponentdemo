<template>
    <div>
        <button @click="handleOpen1">打开提示1</button>
        <button @click="handleOpen2">打开提示2</button>
    </div>
</template>
<script>
export default {
  methods: {
    handleOpen1() {
      this.$Alert.info({
        content: "我能提示1"
      });
    },
    handleOpen2() {
      this.$Alert.info({
        content: "你能干啥2",
        duration: 3
      });
    }
  }
};
</script>
