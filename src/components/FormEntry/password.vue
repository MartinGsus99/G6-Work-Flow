<template>
  <el-input
    v-model="queryKeys[keyName]"
    :disabled="disabled"
    :maxlength="maxlength"
    :placeholder="placeholder"
    show-password
  ></el-input>
</template>
<script>
  export default {
    name: 'passwordEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
      maxlength: { default: '', type: String },
    },
  };
</script>
