<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import Emitter from "../../mixins/emitter.js";
import { findComponentsDownward } from "../../utils/assist";

export default {
  name: "xCheckboxGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      children: []
    };
  },

  mounted() {
    this.updateModel(true);
  },
  watch: {
    value() {
      this.updateModel(true);
    }
  },
  methods: {
    updateModel(update) {
        this.children = findComponentsDownward(this, "xCheckbox");
        if (this.children) {
          const { value } = this;
        this.children.forEach(child => {
          child.model = value;
            if (update) {
                child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit("input", data);
      this.$emit("on-change", data);
      this.dispatch("xFormItem", "on-form-change", data);
    }
  }
};
</script>
