<template lang="">
<div>
    <el-card class="tool-panel">
        <el-button icon="el-icon-back" type="primary" @click="graphUndo"></el-button>
        <el-button icon="el-icon-right" type="primary" @click="graphRedo"></el-button>
        <el-button icon="el-icon-delete" type="primary"></el-button>
        <el-button icon="el-icon-picture" type="primary" @click="savePic"></el-button>
        <el-button icon="el-icon-download" type="primary" @click="saveJSON"></el-button>
        <el-button icon="el-icon-refresh-left" type="primary" @click="clearGrapgh"></el-button>
        <el-button icon="el-icon-edit-outline" type="primary" @click="changeMode">{{ mode }}</el-button>

    </el-card>
</div>
</template>

<script>
export default {
    name: 'ToolPanel',
    props: {
        clearGrapgh: {
            type: Function,
            default: null,
        },
        savePic: {
            type: Function,
            default: null,
        },
        graphUndo: {
            type: Function,
            default: null,
        },
        graphRedo: {
            type: Function,
            default: null,
        },
        saveJSON: {
            type: Function,
            default: null,
        },
        uploadJSON: {
            type: Function,
            default: null,
        },
        changeMode: {
            type: Function,
            default: null,
        },
        mode: {
            type: String,
            default: "",
        }

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
.tool-panel {
    margin: 10px;
}
</style>
