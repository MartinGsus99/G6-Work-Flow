<template>
  <el-date-picker
    v-model="queryKeys[keyName]"
    :type="options.type"
    :value-format="options.format"
    :disabled="disabled"
    :placeholder="placeholder"
  >
  </el-date-picker>
</template>
<script>
  export default {
    name: 'dateEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
      options: { default: () => ({ type: 'date', format: 'yyyyMMdd' }), type: Object },
    },
  };
</script>
