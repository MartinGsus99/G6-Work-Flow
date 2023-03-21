<template>
      <el-popover
        ref="popover"
        placement="bottom"
        width="30%"
        trigger="click">
        <el-input
            v-model="queryKeys[keyName]"
            :disabled="disabled"
            :placeholder="placeholder"
            :maxlength="maxlength"
            slot="reference"
            ></el-input>
            <cron @change="changeCron" @close="closePopover"></cron>
        </el-popover>
</template>
<script>
import { cron } from 'vue-cron'
export default {
     name: 'cronEntry',
     components: {
        cron
     },
     props: {
        queryKeys: { default: () => {}, type: Object },
        keyName: { default: '', type: String },
        disabled: { default: false, type: Boolean },
        placeholder: { default: '', type: String },
        maxlength: { default: '', type: String },
     },
     data() {
         return {
             cronPopover: false
          };
     },
     methods : {
        changeCron(val){
            this.queryKeys[this.keyName] = val
        },
        closePopover() {
            console.log(this.$refs)
            this.$refs.popover.doClose();
        }
     }
 }
</script>
<style lang="scss"></style>