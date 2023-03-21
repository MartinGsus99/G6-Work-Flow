<template>
<div class="dynamic-form-wrap">
    <el-form :inline="true" :model="formKeys" ref="form" :rules="rules(formList)" :label-width="labelWidth + 'px'">
        <el-form-item v-for="item in formList" :label="item.label" :key="item.key" :prop="item.key">
            <component :queryKeys="formKeys" :keyName="item.key" :options="item.options" :disabled="item.disabled" :placeholder="item.placeholder" :extendKeys="item.extendKeys" :is="item.entryType + 'Entry'" :ref="item.entryType === 'uploadFile' || item.entryType === 'uploadImg' ? 'upload' : ''" />
        </el-form-item>
    </el-form>

    <div class="form-submit" :style="{ paddingLeft: `${labelWidth}px` }">
        <template v-if="!$slots.default">
            <el-button type="primary" @click="goBack">取消</el-button>
            <el-button type="primary" @click="handleClick">提交</el-button>
        </template>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    directives: {},
    props: {
        formList: {
            default: null,
            type: Array
        },
        formKeys: {
            default: null,
            type: Object
        },
        submitClick: {
            default: null,
            type: Function
        },
        cancelClick: {
            default: null,
            type: Function
        },
        labelWidth: {
            default: 100,
            type: Number
        },

    },
    daya() {
        return {

        }
    },
    methods: {
        goBack() {
            this.cancelClick && this.cancelClick();
        },
        handleClick() {
            this.submitClick && this.submitClick();
        },
        onReset(formName) {
            this.$refs[formName].resetFields();
            console.log(this.$refs)
            this.$refs['upload'] !== undefined ? this.$refs['upload'][0].clearFiles() : null;
        },
    },
    computed: {
        rules() {
            return (formList) => {
                const result = {};
                formList.forEach((item) => {
                    if (item.rules && item.rules.length) {
                        result[item.key] = item.rules;
                    }
                });
                return result;
            };
        },
    },
};
</script>

<style lang="scss">
.dynamic-form-wrap {
    margin: 0 auto;
    width: 100%;

    .el-form-item {
        margin-right: 0;
        display: block;

        .el-form-item__content {
            width: 64%;

            .el-select {
                width: 284px;
            }

            .el-cascader {
                width: 100%;
            }
        }
    }
}

.alert {
    margin-top: 15px;
    height: 15px;
}
</style>
