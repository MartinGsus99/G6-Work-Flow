<template>
  <div>
    <el-radio-group 
      v-model="queryKeys[keyName]" 
      @change="changeRadio"
    >
      <el-radio
        v-for="(option, index) in options" 
        :key="index"
        :label="option.value"
        :disable="disabled"
         border>{{ option.label }}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
  export default {
    name: 'radioEntry',
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
      changeRadio(e) {
          console.log(e)
      }
    }
  };
</script>
<style lang="scss">
  .el-radio {
    margin-right: 15px;
  }
</style>
