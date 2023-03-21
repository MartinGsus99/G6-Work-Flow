<template>
<div class="dashboard-container">
    <el-row>
        <ToolPanel :clearGrapgh="clearGrapgh" :savePic="savePic" :graphUndo="graphUndo" :graphRedo="graphRedo" :saveJSON="saveJSON" :uploadJSON="uploadJSON" :changeMode="changeMode" :mode="mode"></ToolPanel>
    </el-row>

    <el-row>
        <el-col :span="2">
            <el-button @click="showItemPanel = !showItemPanel">展开/折叠元素栏</el-button>
            <transition name="el-zoom-in-top">
                <ItemPanel v-show="showItemPanel" :itemPanelFlag="panelFlag" :graph="graph" :mode="mode"></ItemPanel>
            </transition>
        </el-col>

        <div class="toolbar-container" id="toolbar"></div>

        <el-col :span="18">
            <div class="map-container" id="map-container"></div>
        </el-col>

        <el-card class="detailCard">
            <div class="minimap" id="minimap"></div>
        </el-card>

        <el-card class="detailCard" v-show="showDetailFlag">
            <el-descriptions title="节点信息" :column="2">
                <el-descriptions-item label="节点ID">{{ nodeDetail.id }}</el-descriptions-item>
                <el-descriptions-item label="节点坐标">X:{{ nodeDetail.posX }} Y:{{ nodeDetail.posY }}</el-descriptions-item>
                <el-descriptions-item label="节点大小">{{ nodeDetail.size }}</el-descriptions-item>
                <el-descriptions-item label="节点名称">{{ nodeDetail.label }}</el-descriptions-item>
                <el-descriptions-item label="节点类型">{{ nodeDetail.type }}</el-descriptions-item>
                <el-descriptions-item label="备注">
                    {{ nodeDetail.describe }}
                </el-descriptions-item>

                <el-descriptions-item label="操作">
                    <el-tag @click="modifyNodeAttribute" size="small">修改</el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>

        <el-card class="detailCard" v-show="showEdgeDetailFlag">
            <el-descriptions title="边信息" :column="2">
                <el-descriptions-item label="名称">{{ nodeDetail.label }}</el-descriptions-item>
                <el-descriptions-item label="类型">{{ nodeDetail.type }}</el-descriptions-item>
                <el-descriptions-item label="备注">
                    {{ nodeDetail.describe }}
                </el-descriptions-item>

                <el-descriptions-item label="操作">
                    <el-tag @click="modifyNodeAttribute" size="small">修改</el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>

        <el-dialog title="修改节点属性" :visible.sync="dialogModifyDialogVisible" width="30%" :before-close="handleClose">
            <DynamicForm ref="addDynamic" :formList="formList" :formKeys="formKeys" :cancelClick="handleClose" :submitClick="submitEditClick"></DynamicForm>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>

        <el-dialog title="修改边属性" :visible.sync="dialogModifyEdgeDialogVisible" width="30%" :before-close="handleClose">
            <DynamicForm ref="addEdgeDynamic" :formList="formEdgeList" :formKeys="formEdgeKeys" :cancelClick="handleEdgeClose" :submitClick="submitEdgeEditClick"></DynamicForm>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>

    </el-row>
</div>
</template>

<script>
import ItemPanel from '@/views/dashboard/itemPanel.vue';
import ToolPanel from '@/views/dashboard/toolPanel.vue';
import DynamicForm from '@/components/DynamicForm/index.vue';
import G6, {
    registerNode
} from '@antv/g6';
import {
    mapGetters
} from 'vuex'

export default {
    name: 'Dashboard',
    components: {
        ItemPanel,
        ToolPanel,
        DynamicForm,
    },
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    mounted() {
        this.initG6();
    },
    data() {
        return {
            panelFlag: true,
            showDetailFlag: false,
            initdata: {
                // 点集
                nodes: [],
                // 边集
                edges: [],
            },

            nodeDetail: {

            },
            fileList: [],
            showItemPanel: true,
            graph: {},
            mode: '编辑模式',
            dialogModifyDialogVisible: false,
            formList: [{
                    key: 'id',
                    label: '节点ID:',
                    entryType: 'string',
                    placeholder: '请输入节点ID',

                },
                {
                    key: 'label',
                    label: '节点名称:',
                    entryType: 'string',
                    placeholder: '请输入节点名称',

                },

                {
                    key: 'type',
                    label: '节点类型:',
                    entryType: 'select',
                    placeholder: '请输入节点类型',
                    options: [{
                            label: 'Rect',
                            value: 'rect',
                        },
                        {
                            label: 'Diamond',
                            value: 'diamond',
                        },
                        {
                            label: 'Circle',
                            value: 'circle',
                        },
                        {
                            label: 'Ellipse',
                            value: 'ellipse',
                        },
                        //三角形存在锚点问题
                        // {
                        //     label: 'Triangle',
                        //     value: 'triangle',
                        // },
                    ],

                },
                {
                    key: 'describe',
                    label: '节点描述:',
                    entryType: 'string',
                    placeholder: '请输入节点描述',
                },
            ],

            formKeys: {
                id: '',
                label: '',
                type: '',
                describe: '',
                x: '',
                y: '',
            },

            dialogModifyEdgeDialogVisible: false,
            formEdgeList: [{
                    key: 'id',
                    label: '边ID:',
                    entryType: 'string',
                    placeholder: '请输入节点ID',

                },
                {
                    key: 'label',
                    label: '名称:',
                    entryType: 'string',
                    placeholder: '请输入节点名称',

                },

                {
                    key: 'type',
                    label: '类型:',
                    entryType: 'select',
                    placeholder: '请输入节点类型',
                    options: [],
                },
                {
                    key: 'describe',
                    label: '描述:',
                    entryType: 'string',
                    placeholder: '请输入节点描述',
                },
            ],

            formEdgeKeys: {
                id: '',
                label: '',
                type: '',
                describe: '',
            },
            toolBar: {},

            //点击节点获取当前节点
            currentNode: {},
            showEdgeDetailFlag: false,

        }
    },
    methods: {
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        itemPanelChange() {
            if (this.panelFlag == false) {
                this.panelFlag = true;
                this.switchPanelButton = '';
            } else {
                this.panelFlag = false;
                this.switchPanelButton = 'primary';
            }
        },
        modifyNodeAttribute() {
            this.dialogModifyDialogVisible = true;
            this.formKeys.id = this.nodeDetail.id;
            this.formKeys.type = this.nodeDetail.type;
            this.formKeys.label = this.nodeDetail.label;
            this.formKeys.describe = this.nodeDetail.describe;
            this.formKeys.x = this.nodeDetail.posX;
            this.formKeys.y = this.nodeDetail.posY;

        },
        //提交对节点的修改
        submitEditClick() {
            let item = this.currentNode;
            console.log(this.formKeys);
            item.update(this.formKeys);
            this.clearForm('addDynamic');
            this.dialogModifyDialogVisible = false;

        },
        submitEdgeEditClick() {

        },
        handleClose() {
            this.clearForm('addDynamic')
            this.dialogModifyDialogVisible = false;
        },
        clearForm(form) {
            if (this.$refs[form]) {
                this.$refs[form].$refs['form'].resetFields();
            }
        },
        handleEdgeClose() {
            this.clearForm('addEdgeDynamic');
            this.dialogModifyEdgeDialogVisible = false;
        },
        changeMode() {
            if (this.mode == '编辑模式') {
                this.mode = '预览模式';
                this.graph.setMode('default');
                this.$message({
                    message: '预览模式',
                    type: 'success',
                    duration: 1000,
                });

            } else {
                this.mode = '编辑模式';
                this.graph.setMode('edit');
                this.$message({
                    message: '编辑模式',
                    type: 'success',
                    duration: 1000,
                });
            }
        },
        clearGrapgh() {
            this.$confirm('确定清空画布吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '画布已清空!'
                });
                this.initdata = {};
                this.graph.render();
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '取消清空'
                });
            });
        },
        savePic() {
            this.graph.downloadImage('mypic', 'image/png', '#fff');
        },
        uploadJSON() {

        },
        saveJSON() {
            var data = this.graph.save();
            var filename = 'mapdata.json';
            if (!data) {
                alert("保存的数据为空");
                return;
            }
            if (!filename) filename = "mapdata.json";
            if (typeof data === "object") {
                data = JSON.stringify(data, undefined, 4);
            }
            var blob = new Blob([data], {
                    type: "text/json"
                }),
                e = document.createEvent("MouseEvents"),
                a = document.createElement("a");
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
            e.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            a.dispatchEvent(e);
        },

        graphUndo() {
            this.toolBar.undo();
        },
        graphRedo() {
            this.toolBar.redo();
        },

        initG6() {
            //minimap插件
            const minimap = new G6.Minimap({
                size: [150, 100],
                className: 'minimap',
                type: 'delegate',
                container: 'minimap',
            });

            const toolbar = new G6.ToolBar({
                container: 'toolbar',
            });

            this.toolBar = toolbar;

            //网格插件
            const grid = new G6.Grid();

            const graph = new G6.Graph({
                container: 'map-container',
                width: window.innerWidth,
                height: window.innerHeight,
                fitCenter: true,
                defaultNode: {

                },

                defaultEdge: {
                    type: 'polyline',
                    style: {
                        radius: 10,
                        lineWidth: 3,
                        offset: 30,
                        endArrow: true,
                        lineDash: [5, 5],
                    },
                    label: '',
                    describe: '123',
                },

                //插件
                plugins: [minimap, grid, toolbar],
                enabledStack: true,

                //交互
                //新建边的逻辑需要重新写，改成由点击锚点开始链接
                modes: {
                    default: ['drag-node', 'drag-canvas', 'zoom-canvas', 'brush-select', 'click-select'],
                    edit: ['drag-node', 'drag-canvas', 'zoom-canvas', {
                        type: 'create-edge',
                        trigger: 'click',
                        key: 'shift',
                    }],
                }
            });

            graph.on('node:mouseenter', (e) => {
                //进入节点获取节点数据

            });

            graph.on('node:mouseleave', (e) => {
                //鼠标离开节清除、关闭属性面板
                // this.nodeDetail = {};
                // this.showDetailFlag = false;
            });

            graph.on('node:click', (e) => {
                if (this.mode == "预览模式") {
                    return;
                }
                this.nodeDetail = {};
                this.showDetailFlag = false;
                this.showEdgeDetailFlag = false;
                const item = e.item._cfg;
                this.nodeDetail.id = item.id;
                this.nodeDetail.type = item.model.type;
                this.nodeDetail.size = item.model.size;
                this.nodeDetail.posX = Math.round(item.model.x);
                this.nodeDetail.posY = Math.round(item.model.y);
                this.nodeDetail.label = item.model.label;
                this.nodeDetail.describe = item.model.describe;
                this.showDetailFlag = true;
                //修改属性

                //获取当前节点；
                this.currentNode = e.item;
            });

            graph.on('edge:click', (e) => {
                if (this.mode == "预览模式") {
                    return;
                }
                this.nodeDetail = {};
                this.showDetailFlag = false;
                this.showEdgeDetailFlag = false;
                const item = e.item._cfg;

                console.log(item.model);

                this.nodeDetail.id = item.id;
                this.nodeDetail.type = item.model.type;
                this.nodeDetail.size = item.model.size;
                this.nodeDetail.label = item.model.label;
                this.nodeDetail.describe = item.model.describe;
                this.showEdgeDetailFlag = true;
                //修改属性

                //获取当前节点；
                this.currentNode = e.item;
            });

            graph.on('canvas:click', (ev) => {
                const shape = ev.target;
                const item = ev.item;
                if (item) {
                    const type = item.getType();
                }
                this.nodeDetail = {};
                this.showDetailFlag = false;
                this.showEdgeDetailFlag = false;
            });

            //双击节点进行修改
            graph.on('node:dbclick'), (e) => {
                console.log("DBCLICK")
            }

            graph.on('edge:mouseenter', (evt) => {
                const {
                    item
                } = evt;
                graph.setItemState(item, 'active', true);
            });

            graph.on('edge:mouseleave', (evt) => {
                const {
                    item
                } = evt;
                graph.setItemState(item, 'active', false);
            });

            graph.data(this.initdata);
            graph.render();

            //将graph设为全局变量
            //Notice:因为需要向子组件传递graph实例，但是graph实例需要在Component挂载之后才能获得g6容器，所以先置空一个graph:{},传递给子组件；
            this.graph = graph;
            this.graph.setMode('edit');
        },

    },
}
</script>

<style lang="scss" scoped>
.item-container {
    width: 100%;
    height: 100%;
}

.detailCard {
    margin: 10px;
}

.switch-panel-button-on {
    background-color: aquamarine;
    color: white;
}

.switch-panel-button-off {
    background-color: red;
    color: white;
}

.toolbar-container {
    // 自定义 CSS 内容
    display: none;
    opacity: 0;
}
</style>
