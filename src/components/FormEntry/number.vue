<template>
  <el-input
    v-model.number="queryKeys[keyName]"
    type="number"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="limitLength"
  ></el-input>
</template>
<script>
  export default {
    name: 'numberEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
      maxlength: { default: 0, type: Number },
    },
    methods: {
      limitLength(value) {
        let { queryKeys, keyName, maxlength } = this;
        if (maxlength && value.length > maxlength) {
          queryKeys[keyName] = value.slice(0, maxlength);
        }
      },
    },
  };
</script>
