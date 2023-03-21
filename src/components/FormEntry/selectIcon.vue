<template>
  <el-popover placement="bottom-start" trigger="click">
    <div class="icon-list">
      <div
        v-for="(item, index) in iconList"
        :key="index"
        class="icon-box"
        @click="selectedIcon(item)"
      >
        <svg-icon :icon-class="item" />
        <span class="icon-text">{{ item }}</span>
      </div>
    </div>
    <el-input
      slot="reference"
      v-model="queryKeys[keyName]"
      :placeholder="placeholder"
      readonly
    >
      <svg-icon
        v-if="queryKeys[keyName]"
        slot="prefix"
        :icon-class="queryKeys[keyName]"
      />
      <span v-else slot="prefix" />
    </el-input>
  </el-popover>
</template>
<script>
  import icons from "./requireicons";

  export default {
    name: "SelectIconEntry",
    props: {
      queryKeys: { default: () => {}, type: Object },
      keyName: { default: "", type: String },
      disabled: { default: false, type: Boolean },
      placeholder: { default: "", type: String },
      maxlength: { default: "", type: String },
    },
    data() {
      return {
        iconList: icons,
      };
    },
    methods: {
      selectedIcon(name) {
        console.log(name);
        this.queryKeys[this.keyName] = name;
        document.body.click();
      },
    },
  };
</script>

<style scoped lang="scss">
  .icon-list {
    width: 347px;
    overflow-wrap: scroll;
    display: block;
    align-items: left;
    font-size: 16px;
  }

  .icon-box {
    line-height: 35px;
  }
  .icon-text {
    margin-left: 25px;
    line-height: 30px;
    text-align: center;
  }
</style>
