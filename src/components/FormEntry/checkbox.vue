<template>
  <el-checkbox-group v-model="queryKeys[keyName]">
    <el-checkbox v-for="option in options" :label="option.value" :key="option.value">
      {{ option.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>
  export default {
    name: 'checkboxEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      options: { default: null, type: Array },
    },
  };
</script>
