<template>
    <div class="pull">
        <div ref="top" class="top-container" :class="'state' + topState">
            <slot name="top">
                <p class="refresh-tip">{{ refreshTip }}</p>
            </slot>
        </div>
        <div ref="scroller" class="puller"
             :class="{ 'no-transition': touching, 'scroll-y': !scrollLocked }"
             :style="{ transform: 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0)' }"
             @touchstart="touchStart"
             @touchmove.stop="touchMove"
             @touchend="touchEnd">
            <slot></slot>
        </div>
        <div ref="bottom" class="bottom-container">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Pull",
        props: {
        },
        data() {
            return {
                position: { x: 0, y: 0 },
                startY: 0,
                startScrollTop: 0,
                touching: false,
                scrollLocked: false,
                locked: false,
                topHeight: 0,
                bottomHeight: 0,
                topState: 0
            }
        },
        computed: {
            refreshTip() {
                switch (this.topState) {
                    case 0: return '下拉刷新';
                    case 1: return '松开刷新';
                    case 2: return '刷新中';
                    case 3: return '刷新成功';
                    case 4: return '刷新失败';
                    default: return '';
                }
            }
        },
        methods: {
            touchStart(e) {
                if (this.locked) return;

                this.touching = true;

                this.startY = e.targetTouches[0].pageY;
                this.startScrollTop = this.$refs.scroller.scrollTop;
            },
            touchMove(e) {
                if (this.locked || !this.touching) return;

                let diff = e.targetTouches[0].pageY - this.startY - this.startScrollTop;
                this.position.y = Math.pow(diff, 0.8) + ((this.topState === 2 || this.topState === 3 || this.topState === 4) ? this.topHeight : 0);

                this.scrollLocked = this.position.y > 0;

                if (this.topState === 2 || this.topState === 3 || this.topState === 4) return;

                if (this.position.y >= this.topHeight) {
                    this.topState = 1;
                } else {
                    this.topState = 0;
                }
            },
            touchEnd(e) {
                this.touching = false;

                if (this.locked) return;

                if (this.position.y >= this.topHeight) {
                    if (this.topState === 1) this.topState = 2;
                    this.position.y = this.topHeight;
                } else {
                    this.topClose();
                }

                this.scrollLocked = this.position.y > 0;
            },
            topClose() {
                this.locked = true;
                this.touching = false;
                this.topState = 0;
                this.position.y = 0;
                setTimeout(() => { this.locked = false }, 300);
            },
            refreshSucc() {
                this.topState = 3;
                setTimeout(this.topClose, 300);
            },
            refreshFail() {
                this.topState = 4;
                setTimeout(this.topClose, 300);
            }
        },
        mounted() {
            this.topHeight = this.$refs.top.offsetHeight;
            this.bottomHeight = this.$refs.bottom.offsetHeight;
        },
        watch: {
            topState(to) {
                this.$emit('topState' + to, this);
            }
        }
    }
</script>

<style scoped>
    .pull {
        overflow: hidden;
        position: relative;
    }
    .puller {
        height: 100%;
    }
    .puller {
        transition: transform .3s;
        position: relative;
        z-index: 1;
    }
    .top-container,
    .bottom-container {
        position: absolute;
        left: 0;
        right: 0;
    }
    .top-container {
        top: 0;
    }
    .bottom-container {
        bottom: 0;
    }
    .refresh-tip {
        font-size: 24px;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }
</style>