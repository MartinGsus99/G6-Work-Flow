<template>
<div class="app-container">
    <el-row>
        <el-col :span="4">
            <el-card>
                <el-input v-model="filterText" placeholder="漏洞类别\CWE编号" style="margin-bottom:30px;" />

                <el-tree ref="tree2" :data="data2" :props="defaultProps" node-key="id" :filter-node-method="filterNode" class="filter-tree" default-expand-all @node-click="refreshData" />
            </el-card>
        </el-col>

        <el-col :span="20">
            <el-card>
                <div id="map-container"></div>
            </el-card>
        </el-col>
    </el-row>

</div>
</template>

<script>
import G6, {
    registerNode
} from '@antv/g6';
export default {

    data() {
        return {
            filterText: '',
            url: [
                'https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json',
                'https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json',
                'https://gw.alipayobjects.com/os/bmw-prod/f1565312-d537-4231-adf5-81cb1cd3a0e8.json',
            ],
            data2: [{
                    id: 1,
                    label: '功能滥用',
                    children: [{
                            id: 10,
                            label: 'CWE-10',
                            children: [{
                                    id: 1001,
                                    label: 'CVE-2018-9011',
                                },
                                {
                                    id: 1002,
                                    label: 'CVE-2018-9012',
                                },
                                {
                                    id: 1003,
                                    label: 'CVE-2018-9013',
                                },
                            ]
                        },
                        {
                            id: 11,
                            label: 'CWE-16',
                            children: [{
                                id: 1004,
                                label: 'CVE-2020-1025',
                            }, ]
                        },
                        {
                            id: 12,
                            label: 'CWE-20',
                            children: [{
                                id: 1005,
                                label: 'CVE-2020-1026',
                            }, ]
                        },
                        {
                            id: 13,
                            label: 'CWE-22',
                            children: [{
                                    id: 1006,
                                    label: 'CVE-2020-1027',
                                },
                                {
                                    id: 1007,
                                    label: 'CVE-2020-1027',
                                },
                                {
                                    id: 1008,
                                    label: 'CVE-2020-1027',
                                },
                            ]
                        },
                    ]
                },
                {
                    id: 2,
                    label: '缓冲区溢出',
                    children: [{
                            id: 20,
                            label: 'CWE-119',
                            children: [{
                                    id: 2001,
                                    label: 'CVE-2019-9011',
                                },
                                {
                                    id: 2002,
                                    label: 'CVE-2019-9012',
                                },
                                {
                                    id: 2003,
                                    label: 'CVE-2019-9013',
                                },
                            ]
                        },
                        {
                            id: 21,
                            label: 'CWE-120',
                            children: [{
                                    id: 2101,
                                    label: 'CVE-2020-9011',
                                },
                                {
                                    id: 2102,
                                    label: 'CVE-2020-9012',
                                },
                                {
                                    id: 2103,
                                    label: 'CVE-2020-9013',
                                },
                            ]
                        },
                        {
                            id: 22,
                            label: 'CWE-189',
                            children: [{
                                    id: 2201,
                                    label: 'CVE-2021-9011',
                                },
                                {
                                    id: 2202,
                                    label: 'CVE-2021-9012',
                                },
                                {
                                    id: 2203,
                                    label: 'CVE-2021-9013',
                                },
                            ]
                        },
                        {
                            id: 23,
                            label: 'CWE-825',
                            children: [{
                                    id: 2201,
                                    label: 'CVE-2022-9011',
                                },
                                {
                                    id: 2202,
                                    label: 'CVE-2022-9012',
                                },
                                {
                                    id: 2203,
                                    label: 'CVE-2022-9013',
                                },
                            ]
                        },
                    ]
                }

            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            graph: {},
            initdata: {},

            lightColors: [
                '#8FE9FF',
                '#87EAEF',
                '#FFC9E3',
                '#A7C2FF',
                '#FFA1E3',
                '#FFE269',
                '#BFCFEE',
                '#FFA0C5',
                '#D5FF86',
            ],
            darkColors: [
                '#7DA8FF',
                '#44E6C1',
                '#FF68A7',
                '#7F86FF',
                '#AE6CFF',
                '#FF5A34',
                '#5D7092',
                '#FF6565',
                '#6BFFDE',
            ],
            uLightColors: [
                '#CFF6FF',
                '#BCFCFF',
                '#FFECF5',
                '#ECFBFF',
                '#EAD9FF',
                '#FFF8DA',
                '#DCE2EE',
                '#FFE7F0',
                '#EEFFCE',
            ],
            uDarkColors: [
                '#CADBFF',
                '#A9FFEB',
                '#FFC4DD',
                '#CACDFF',
                '#FFD4F2',
                '#FFD3C9',
                '#EBF2FF',
                '#FFCBCB',
                '#CAFFF3',
            ],

            initData: {
                nodes: [{
                        id: 'cveID',
                        size: 150,
                        x: 0,
                        y: 0,
                        style: {
                            fill: '#59c4e6',
                        },
                        label: 'CVE-2017-4432',
                        labelCfg: {
                            fill: "#d1c2d3"
                        },
                        describtion: '** REJECT ** DO NOT USE THIS CANDIDATE NUMBER. ConsultIDs: none. Reason: This candidate was in a CNA pool that was not assigned to any issues during 2017. Notes: none.'
                    },
                    {
                        id: 'cweID',
                        label: 'CWE-287',
                        size: 100,
                        x: 0,
                        y: 0,
                        style: {
                            fill: '#edafda',
                        },
                        describtion: 'CWE编号287。'
                    },
                    {
                        id: 'influcenceVersion1',
                        label: '6.0.0',
                        style: {
                            fill: '#93b7e3',
                        },
                    },
                    {
                        id: 'influcenceVersion2',
                        label: '6.0.1',
                        style: {
                            fill: '#93b7e3',
                        },
                        describtion: '受影响的组件版本。',
                    },
                    {
                        id: 'influcenceVersion3',
                        label: '6.0.2',
                        style: {
                            fill: '#93b7e3',
                        },
                        describtion: '受影响的组件版本。',
                    },
                    {
                        id: 'componentName',
                        label: 'Qpid_java',
                        style: {
                            fill: '#a5e7f0',
                        },
                        describtion: '受影响的组件版本。',
                    },
                    {
                        id: 'support',
                        label: 'Apache',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: '组件供应商。',
                    },
                    {
                        id: 'repair',
                        label: 'Repair',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: '暂时没有官方修复发布。',
                    },
                    {
                        id: 'cvssScore',
                        label: 'CVSS:5.0',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: 'CVSS评分。',
                    }
                ],
                edges: [{
                        id: '1',
                        source: 'cveID',
                        target: 'cweID', // 目标点 id 
                    },
                    {
                        id: '2',
                        source: 'cveID',
                        target: 'cvssScore', // 目标点 id 
                    },
                    {
                        id: '3',
                        source: 'cveID',
                        target: 'repair',
                    },
                    {
                        id: '4',
                        source: 'cveID',
                        target: 'influcenceVersion1',
                    },
                    {
                        id: '5',
                        source: 'cveID',
                        target: 'influcenceVersion2',
                    },

                    {
                        id: '6',
                        source: 'cveID',
                        target: 'influcenceVersion3',
                    },
                    {
                        id: '7',
                        source: 'influcenceVersion1',
                        target: 'componentName',
                    },
                    {
                        id: '8',
                        source: 'influcenceVersion2',
                        target: 'componentName',
                    },
                    {
                        id: '9',
                        source: 'influcenceVersion3',
                        target: 'componentName',
                    },
                    {
                        id: '10',
                        source: 'componentName',
                        target: 'support',
                    },
                ]
            },

            initData1: {
                nodes: [{
                        id: 'cveID',
                        size: 150,
                        x: 0,
                        y: 0,
                        style: {
                            fill: '#59c4e6',
                        },
                        label: 'CVE-2022-4779',
                        labelCfg: {
                            fill: "#d1c2d3"
                        },
                        describtion: 'Elvexys StreamX是Elvexys公司的一种管理和控制实时数据采集过程的解决方案。StreamX applications 6.02.01版本至6.04.34版本存在安全漏洞，该漏洞源于存在逻辑错误。'
                    },
                    {
                        id: 'cweID',
                        label: 'CWE-287',
                        size: 100,
                        x: 0,
                        y: 0,
                        style: {
                            fill: '#edafda',
                        },
                        describtion: 'CWE编号287。'
                    },
                    {
                        id: 'influcenceVersion3',
                        label: '1.3',
                        style: {
                            fill: '#93b7e3',
                        },
                        describtion: '受影响的组件版本。',
                    },
                    {
                        id: 'componentName',
                        label: 'Qpid_java',
                        style: {
                            fill: '#a5e7f0',
                        },
                        describtion: '受影响的组件版本。',
                    },
                    {
                        id: 'support',
                        label: 'Apache',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: '组件供应商。',
                    },
                    {
                        id: 'repair',
                        label: 'Repair',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: '暂时没有官方修复发布。',
                    },
                    {
                        id: 'cvssScore',
                        label: 'CVSS:5.0',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: 'CVSS评分。',
                    }
                ],
                edges: [{
                        id: '1',
                        source: 'cveID',
                        target: 'cweID', // 目标点 id 
                    },
                    {
                        id: '2',
                        source: 'cveID',
                        target: 'cvssScore', // 目标点 id 
                    },
                    {
                        id: '3',
                        source: 'cveID',
                        target: 'repair',
                    },
                    {
                        id: '4',
                        source: 'cveID',
                        target: 'influcenceVersion1',
                    },
                    {
                        id: '5',
                        source: 'cveID',
                        target: 'influcenceVersion2',
                    },

                    {
                        id: '6',
                        source: 'cveID',
                        target: 'influcenceVersion3',
                    },
                    {
                        id: '7',
                        source: 'influcenceVersion1',
                        target: 'componentName',
                    },
              
                    {
                        id: '9',
                        source: 'influcenceVersion3',
                        target: 'componentName',
                    },
                    {
                        id: '10',
                        source: 'componentName',
                        target: 'support',
                    },
                ]
            },

            current: 0,

            initData2: {
                nodes: [{
                        id: 'cveID',
                        size: 150,
                        x: 0,
                        y: 0,
                        style: {
                            fill: '#59c4e6',
                        },
                        label: 'CVE-2018-4432',
                        labelCfg: {
                            fill: "#d1c2d3"
                        },
                        describtion: '这是CVW-2016-4432漏洞。'
                    },
                    {
                        id: 'cweID',
                        label: 'CWE-287',
                        size: 100,
                        x: 0,
                        y: 0,
                        style: {
                            fill: '#edafda',
                        },
                        describtion: 'CWE编号287。'
                    },
                    {
                        id: 'componentName',
                        label: 'Qpid_java',
                        style: {
                            fill: '#a5e7f0',
                        },
                        describtion: '受影响的组件版本。',
                    },
                    {
                        id: 'support',
                        label: 'Apache',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: '组件供应商。',
                    },
                    {
                        id: 'repair',
                        label: 'Repair',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: '暂时没有官方修复发布。',
                    },
                    {
                        id: 'cvssScore',
                        label: 'CVSS:5.0',
                        style: {
                            fill: '#cbb0e3',
                        },
                        describtion: 'CVSS评分。',
                    }
                ],
                edges: [{
                        id: '1',
                        source: 'cveID',
                        target: 'cweID', // 目标点 id 
                    },
                    {
                        id: '2',
                        source: 'cveID',
                        target: 'cvssScore', // 目标点 id 
                    },
                    {
                        id: '3',
                        source: 'cveID',
                        target: 'repair',
                    },
                    {
                        id: '4',
                        source: 'cveID',
                        target: 'influcenceVersion1',
                    },
                    {
                        id: '5',
                        source: 'cveID',
                        target: 'influcenceVersion2',
                    },

                    {
                        id: '6',
                        source: 'cveID',
                        target: 'influcenceVersion3',
                    },
               
                    {
                        id: '10',
                        source: 'componentName',
                        target: 'support',
                    },
                ]
            },

            // testData1: {
            //     nodes: [{
            //             id: 'cveID',
            //             size: 150,
            //             x: 0,
            //             y: 0,
            //             style: {
            //                 fill: '#59c4e6',
            //             },
            //             label: 'CVE-2016-4432',
            //             labelCfg: {
            //                 fill: "#d1c2d3"
            //             },
            //      
            //             describtion: '这是CVW-2016-4432漏洞。'
            //         },
            //         {
            //             id: 'cweID',
            //             label: 'CWE-287',
            //             size: 100,
            //             x: 0,
            //             y: 0,
            //             style: {
            //                 fill: '#edafda',
            //             },
            //      
            //             describtion: 'CWE编号287。'
            //         },
            //         {
            //             id: 'influcenceVersion1',
            //             label: '6.0.0',
            //             style: {
            //                 fill: '#93b7e3',
            //             },
            //      
            //         },
            //         {
            //             id: 'influcenceVersion2',
            //             label: '6.0.1',
            //             style: {
            //                 fill: '#93b7e3',
            //             },
            //      
            //             describtion: '受影响的组件版本。',
            //         },
            //         {
            //             id: 'influcenceVersion3',
            //             label: '6.0.2',
            //             style: {
            //                 fill: '#93b7e3',
            //             },
            //      
            //             describtion: '受影响的组件版本。',
            //         },
            //         {
            //             id: 'componentName',
            //             label: 'Qpid_java',
            //             style: {
            //                 fill: '#a5e7f0',
            //             },
            //      
            //             describtion: '受影响的组件版本。',
            //         },
            //         {
            //             id: 'support',
            //             label: 'Apache',
            //             style: {
            //                 fill: '#cbb0e3',
            //             },
            //      
            //             describtion: '组件供应商。',
            //         },
            //         {
            //             id: 'repair',
            //             label: 'Repair',
            //             style: {
            //                 fill: '#cbb0e3',
            //             },
            //      
            //             describtion: '暂时没有官方修复发布。',
            //         },
            //         {
            //             id: 'cvssScore',
            //             label: 'CVSS:5.0',
            //             style: {
            //                 fill: '#cbb0e3',
            //             },
            //      
            //             describtion: 'CVSS评分。',
            //         }
            //     ],
            //     edges: [{
            //             id: '1',
            //             source: 'cveID',
            //             target: 'cweID', // 目标点 id 
            //         },
            //         {
            //             id: '2',
            //             source: 'cveID',
            //             target: 'cvssScore', // 目标点 id 
            //         },
            //         {
            //             id: '3',
            //             source: 'cveID',
            //             target: 'repair',
            //         },
            //         {
            //             id: '4',
            //             source: 'cveID',
            //             target: 'influcenceVersion1',
            //         },
            //         {
            //             id: '5',
            //             source: 'cveID',
            //             target: 'influcenceVersion2',
            //         },

            //         {
            //             id: '6',
            //             source: 'cveID',
            //             target: 'influcenceVersion3',
            //         },
            //         {
            //             id: '7',
            //             source: 'influcenceVersion1',
            //             target: 'componentName',
            //         },
            //         {
            //             id: '8',
            //             source: 'influcenceVersion2',
            //             target: 'componentName',
            //         },
            //         {
            //             id: '9',
            //             source: 'influcenceVersion3',
            //             target: 'componentName',
            //         },
            //         {
            //             id: '10',
            //             source: 'componentName',
            //             target: 'support',
            //         },
            //         {
            //             id: '11',
            //             source: 'CWE-1',
            //             target: 'CWE-2',
            //             type: 'line'
            //         },
            //         {
            //             id: '12',
            //             source: 'CWE-2',
            //             target: 'CWE-3',
            //             type: 'line'
            //         },
            //         {
            //             id: '13',
            //             source: 'CWE-3',
            //             target: 'CWE-4',
            //             type: 'line'
            //         },

            //     ],
            //     combos: [{
            //             id: 'CWE-1',
            //             label: 'CWE-1',
            //             style: {
            //                 stroke: '#FFECF5',
            //             }
            //         },
            //         {
            //             id: 'CWE-2',
            //             label: 'CWE-2',
            //             style: {
            //                 stroke: '#CFF6FF',
            //             }
            //         },
            //         {
            //             id: 'CWE-3',
            //             label: 'CWE-3',
            //             style: {
            //                 stroke: '#8FE9FF',
            //             }
            //         },
            //         {
            //             id: 'CWE-4',
            //             label: 'CWE-4',
            //             style: {
            //                 stroke: '#FFC9E3',
            //             }
            //         },

            //         {
            //             id: 'CVE-2016-4432',
            //             label: 'CVE-2016-4432',
            //             parentId: 'CWE-1',
            //             style: {
            //                 stroke: '#FFE269',
            //             }
            //         },
            //         {
            //             id: 'CVE-2017-4432',
            //             label: 'CVE-2017-4432',
            //             parentId: 'CWE-1',
            //             style: {
            //                 stroke: '#FFE269',
            //             }
            //         },
            //         {
            //             id: 'CVE-2010-4432',
            //             label: 'CVE-2010-4432',
            //             parentId: 'CWE-1',
            //             style: {
            //                 stroke: '#FFE269',
            //             }
            //         },
            //         {
            //             id: 'CVE-2018-4432',
            //             label: 'CVE-2018-4432',
            //             parentId: 'CWE-2',
            //             style: {
            //                 stroke: '#D5FF86',
            //             }
            //         },
            //         {
            //             id: 'CVE-2019-4432',
            //             label: 'CVE-2019-4432',
            //             parentId: 'CWE-3',
            //             style: {
            //                 stroke: '#BFCFEE',
            //             }
            //         },
            //     ]

            // }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val)
        }
    },
    mounted() {
        this.initG6();

    },
    methods: {
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        initG6() {
            //网格插件
            const grid = new G6.Grid();

            const tooltip = new G6.Tooltip({
                offsetX: 10,
                offsetY: 10,
                // the types of items that allow the tooltip show up
                // 允许出现 tooltip 的 item 类型
                itemTypes: ['node', 'edge', 'combo'],
                // custom the tooltip's content
                // 自定义 tooltip 内容
                getContent: (e) => {
                    const outDiv = document.createElement('div');
                    outDiv.style.width = 'fit-content';
                    outDiv.style.padding = '0px 0px 20px 0px';
                    outDiv.innerHTML = `
      <h4>节点信息</h4>
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>
      <ul>
        <li>描述信息: ${e.item.getModel().describtion||'无'}</li>
      </ul>`;
                    return outDiv;
                },
            });

            const graph = new G6.Graph({
                container: 'map-container',
                width: window.innerWidth,
                height: window.innerHeight,
                layout: {
                    type: 'dagre',
                    rankdir: 'LR',
                    align: 'DL',
                    nodesepFunc: d => {
                        // d 是一个节点
                        if (d.id === 'cweID') {
                            return 10;
                        }
                        return 10;
                    },
                    ranksepFunc:d => {
                        // d 是一个节点
                        if (d.id === 'cweID') {
                            return 100;
                        }
                        return 10;
                    },
                },

                fitViewPadding: [10, 10, 10, 10],

                defaultNode: {
                    type: 'circle',
                    size: 50,
                },

                defaultEdge: {
                    type: 'poliline',
                    style: {
                        radius: 10,
                        lineWidth: 2,
                        offset: 30,
                        endArrow: true,
                    },
                },

                defaultCombo: {
                    style: {
                        fill: '#fff',
                    }
                },

                //插件
                plugins: [tooltip, grid],
                enabledStack: true,

                //交互
                modes: {
                    default: ['drag-node', 'drag-combo', 'drag-canvas', 'zoom-canvas', 'brush-select', 'click-select', {
                        type: 'collapse-expand-combo',
                        trigger: 'click',
                        relayout: true, // 收缩展开后，不重新布局
                    }, ],
                }
            });

            graph.on('node:mouseenter', (e) => {

            })

            graph.data(this.initData);
            graph.render();

            //测试
            //将graph设为全局变量
            //Notice:因为需要向子组件传递graph实例，但是graph实例需要在Component挂载之后才能获得g6容器，所以先置空一个graph:{},传递给子组件；
            this.graph = graph;

        },
        getColor() {
            let randomNum = Math.round(Math.random() * 10);
            return this.lightColors[randomNum];
        },

        fetchData(url) {
            this.initdata = {};
            this.graph.render();
            fetch(url).then((res) => res.json()).then((data) => {
                data.nodes.forEach((node) => {
                    node.label = node.olabel;
                    node.degree = 0;
                    data.edges.forEach((edge) => {
                        if (edge.source === node.id || edge.target === node.id) {
                            node.degree++;
                        }
                    });
                });
                this.initData = data;
                this.graph.changeData(this.initData);
            });
        },

        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },

        refreshData(data, node, el) {
            console.log(data.id);
            if (this.current == 0) {
                this.graph.data(this.initData);
                this.graph.render();
                this.current = 1;
            } else if (this.current == 1) {
                this.graph.data(this.initData1);
                this.graph.render();
                this.current = 2;
            } else {
                this.graph.data(this.initData2);
                this.graph.render();
                this.current = 0;
            }
        }
    },
}
</script>

<style scoped>
.el-card {
    margin: 10px;
    height: 1000px;
}

.fit-content{
    width: 300px;
}
</style>
