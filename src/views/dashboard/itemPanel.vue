<template lang="">
<div>
    <div class="item-container" id="item-container" v-show="itemPanelFlag" ref="itemPanel">
        <div v-for="item in nodeItems" :key="item.id" class="item" :class="item.type" draggable='true' @dragstart="dragItemStart(item,$event)" @dragend="dragItemEnd(item,$event)" :id="item.id">
            <img v-if="item.img!=''" :src="item.img">
            <span v-else>{{item.label}}</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'itemPanel',
    props: {
        itemPanelFlag: {
            type: Boolean,
            default: false
        },
        graph: {
            type: Object,
            default: () => {},
        },
        mode:{
            type:String,
            default:'',
        },
    },
    data() {
        return {
            nodeCount: 0,
            //组件节点数据
            nodeItems: [{
                    id: 1,
                    width: 120,
                    height: 50,
                    type: 'rect',
                    label: '固件A',
                    img: 'https://s3.bmp.ovh/imgs/2022/12/06/e63957e18f501181.png',
                    describe:'方形节点',
                },
                {
                    id: 2,
                    width: 120,
                    height: 50,
                    type: 'diamond',
                    label: '固件B',
                    img: 'https://s3.bmp.ovh/imgs/2022/12/06/f3b50413639559a8.png',
                    describe:'菱形节点',
                },
                {
                    id: 3,

                    size: 80,
                    type: 'circle',
                    label: '固件C',
                    img: 'https://s3.bmp.ovh/imgs/2022/12/06/73480d673c115f15.png',
                    describe:'圆形节点',
                },
                {
                    id: 4,
                    width: 80,
                    height: 50,
                    type: 'ellipse',
                    label: '固件E',
                    img: 'https://s3.bmp.ovh/imgs/2022/12/20/b2536c20eaff5b6a.png',
                    describe:'椭圆形节点',
                },
            ]
        }
    },
    mounted() {

    },
    methods: {
        dragItemStart(item, e) {

        },
        dragItemEnd(item, e) {
            if(this.mode=='预览模式')
            {
                return;
            }
            const pointPos = this.graph.getPointByClient(e.clientX, e.clientY);
            let cfg = item;
            this.addNewNode(pointPos, cfg);
        },
        addNewNode(pointPos, cfg) {
            let newNode = {
                id: (this.nodeCount++).toString(),
                type: cfg.type,
                label: cfg.label,
                labelCfg: {
                    position: 'center',
                },
                anchorPoints:this.getAnchorPoints(cfg.type),
                size: this.getSize(cfg),
                x: pointPos.x,
                y: pointPos.y,
                linkPoints: {
                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                },
                describe:cfg.describe,
            }
            this.graph.addItem('node', newNode);
        },
        getSize(cfg) {
            if (cfg.size) {
                return cfg.size;
            } else {
                return [cfg.width, cfg.height];
            }
        },
        getAnchorPoints(type){
            if(type=='triangle')
            {
                return [
                [0.5,0],[0,1],[1,1]
                ]
            }else
            {
                return [
                    [0.5,0],[1,0.5],[0.5,1],[0,0.5]
                ]
            }
        }
    }
}
</script>

<style lang="scss">
.item {
    width: 90%;
    padding: 10px;
    margin: 10px;
}

img {
    width: 60px;
    height: 60px;
    line-height: 60px;
}
</style>
