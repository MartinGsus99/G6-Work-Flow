<template>
  <div class="data-picker-entry-wrap">
    <el-date-picker
      v-model="queryKeys[keyName]"
      :type="dateType"
      :value-format="valueFormat"
      :disabled="isCurrent || disabled"
      :placeholder="placeholder"
      class="`date-picker-mini`"
      :picker-options="options"
    />
  </div>
</template>
<script>
  export default {
    name: 'dateRangeEntry',
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: '', type: String },
      dateType: { default: 'daterange', type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: '', type: String },
      options: { default: null, type: Object },
    },
    data() {
      return {
        isCurrent: false,
      };
    },
    computed: {
      valueFormat: function () {
        return this.dateType === 'monthrange' ? 'yyyyMM' : 'yyyyMMdd';
      },
    },
    methods: {
      extendClick() {
        //禁用时不执行点击事件
        if (this.disabled) {
          return;
        }
        this.isCurrent = !this.isCurrent;
        const key = this.findObj(this.isCurrent);
        this.queryKeys[this.options.extendKey] = key; //key即是接口对应的值
      },
      findObj(boolean) {
        for (let key in this.options.extendConfig) {
          const item = this.options.extendConfig[key];
          if (item.value === boolean) {
            return key;
          }
        }
      },
    },
  };
</script>
<style lang="scss">
  .data-picker-entry-wrap {
    display: flex;
    .date-picker-mini {
      width: 260px !important;
    }
    .check-btn {
      height: 36px;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid #dcdfe6;
      margin-left: 4px;
      text-align: center;
      font-size: 12px;
      width: 36px;
      color: #666;
      cursor: pointer;
      &.current {
        color: #fff;
        border-color: #d69646;
        background-color: #d69646;
      }
      &.disabled {
        cursor: no-drop;
      }
    }
  }
</style>
