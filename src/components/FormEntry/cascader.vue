<template>
  <el-cascader
    ref="cascader"
    :disabled="disabled"
    :placeholder="placeholder"
    :props="{ lazy: true, lazyLoad }"
    v-model="queryKeys[keyName]"
    @change="handleChange"
  />
</template>

<script>
  export default {
    name: 'cascaderEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
      selectChange: { default: null, type: Function },
      lazyLoad: { default: null, type: Function },
    },
    methods: {
      handleChange() {
        //同时获取 labels 和 values
        let [checkedNodes] = this.$refs['cascader'].getCheckedNodes();
        this.selectChange &&
        this.selectChange({
          keyName: this.keyName,
          labels: checkedNodes.pathLabels,
          values: checkedNodes.path,
        });
      },
    },
  };
</script>
