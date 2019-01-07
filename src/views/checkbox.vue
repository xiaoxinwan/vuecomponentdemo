<template>
    <div>
        <h3>CheckBox</h3>
        <x-checkbox v-model="single">单选</x-checkbox>

        数据：{{single}}

        <br><br>

        <x-checkbox-group v-model="multiple">
            <x-checkbox label="option1">选项1</x-checkbox>
            <x-checkbox label="option2">选项2</x-checkbox>
            <x-checkbox label="option3">选项3</x-checkbox>
            <x-checkbox label="option4">选项4</x-checkbox>
        </x-checkbox-group>
        数据：{{multiple}}
    </div>
</template>
<script>
    import xCheckboxGroup from "../components/checkbox/checkbox-group.vue";
    import xCheckbox from "../components/checkbox/checkbox.vue";
export default {
  components: { xCheckboxGroup, xCheckbox },
  data() {
    return {
      single: false,
      multiple: ['option1']
    };
  }
};
</script>
