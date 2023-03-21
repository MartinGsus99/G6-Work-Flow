<!--
 * @Author: Aruver
 * @Date: 2022-06-15 09:54:37
 * @LastEditors: Aruver
 * @qq: 37919926
-->
<template>
  <el-input
    v-model="queryKeys[keyName]"
    :disabled="disabled"
    :placeholder="placeholder"
    :maxlength="maxlength"
    class="paperview"
  ></el-input>
</template>
<script>
  export default {
    name: 'stringEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
      maxlength: { default: '', type: String },
    },
  };
</script>
