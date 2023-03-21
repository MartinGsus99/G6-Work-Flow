<template>
  <el-select
    v-model="queryKeys[keyName]"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    @change="handleChange"
    style="width: 100%"
    multiple
  >
    <el-option
      v-for="(option, index) in options"
      :key="index"
      :label="option.label"
      :value="option.value"
    ></el-option>
  </el-select>
</template>
<script>
  export default {
    name: 'selectMultipEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      disabled: { default: false, type: Boolean },
      clearable: { default: false, type: Boolean },
      filterable: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
      options: { default: null, type: Array },

      selectChange: { default: null, type: Function },
    },
    methods: {
      handleChange(value) {
        this.selectChange && this.selectChange({ key: this.keyName, value });
      },
    },
  };
</script>
