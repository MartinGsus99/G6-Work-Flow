<template>
  <el-cascader
    ref="cascader"
    :disabled="disabled"
    :placeholder="placeholder"
    :props="{ multiple: true }"
    :options="options"
    v-model="queryKeys[keyName]"
    @change="handleChange"
  />
</template>

<script>
  export default {
    name: 'cascaderMuEntry',
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
