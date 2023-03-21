<template>
  <div class="stringEntryWrap">
    <el-input
      v-model="queryKeys[keyName][0]"
      :disabled="disabled"
      :placeholder="placeholder"
      class="stringEntryRange"
    ></el-input>
    <el-input
      v-model="queryKeys[keyName][1]"
      :disabled="disabled"
      :placeholder="placeholder"
      class="stringEntryRange"
    ></el-input>
  </div>
</template>
<script>
  export default {
    name: 'stringRangeEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
    },
  };
</script>
<style lang="scss">
  .stringEntryWrap {
    display: flex;
    .stringEntryRange {
      width: 100px;
      margin-right: 8px;
      &:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
</style>
