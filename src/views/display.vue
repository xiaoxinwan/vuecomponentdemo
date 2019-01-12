<template>
    <div>
        <h3>动态渲染.vue的组件——Display</h3>

        <x-display :code="code"></x-display>
    </div>
</template>
<script>
import xDisplay from "../components/display/display";
import defaultCode from "./default-code.js";

export default {
  components: { xDisplay },
  data() {
    return {
      code: defaultCode
    };
  }
};
</script>
