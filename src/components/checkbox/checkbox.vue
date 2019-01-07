<template>
    <label>
        <span>
            <input
                    v-if="group"
                    type="checkbox"
                    :disabled="disabled"
                    :value="label"
                    v-model="model"
                    @change="change"
            >
            <input
                    v-else
                    type="checkbox"
                    :disabled="disabled"
                    :checked="currentValue"
                    @change="change"
            >
        </span>
        <slot></slot>
    </label>   
</template>
<script>
import Emitter from "../../mixins/emitter.js";
import { findComponentUpward } from "../../utils/assist.js";

export default {
  name: "xCheckbox",
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Boolean, Number],
      default: false
    },
    trueValue: {
      type: [String, Boolean, Number],
      default: true
    },
    falseValue: {
      type: [String, Boolean, Number],
      default: false
    },
    label: {
      type: [String, Boolean, Number]
    }
  },
  data() {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: findComponentUpward(this, 'xCheckboxGroup')
    };
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw "Value should be trueValue or falseValue";
      }
    }
  },
  mounted() {
      this.parent = findComponentUpward(this, 'xCheckboxGroup');
      if (this.parent) {
      this.group = true;
    }

    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;
      this.currentValue = checked;

      const value = checked ? this.trueValue : this.falseValue;

        this.$emit("input", value);

      if (this.group) {

          this.parent.change(this.model);
      } else {
        this.$emit("on-change", value);
        this.dispatch("xFormItem", "on-form-change", value);
      }
    },
    updateModel() {
        this.currentValue = this.value === this.trueValue;
    }
  }
};
</script>
