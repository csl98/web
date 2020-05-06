<template>
    <div :class="`tabhead tabhead-${this.name}`" @click="click($event)">
        <slot></slot>
        <div ref="indicator" class="indicator" :class="{ 'vertical': option.indicator.isVertical }"
             v-if="options.indicator" v-show="!isNaN(cur)">
            <div class="indicator-drag"
                 :style="{ backgroundColor: option.indicator.color,
                 transitionDuration: option.indicator.duration }"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabHead",
        props: {
            name: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                cur: this.options.current || 0,
                clickLocked: false,
                timer: null
            }
        },
        computed: {
            option() {
                return this.$deepMerge({
                    isToggle: false,
                    include: '',
                    indicator: {
                        isVertical: false,
                        duration: '.3s',
                        differ: 0,
                        width: 3,
                        length: 0,
                        color: 'red'
                    }
                }, this.options)
            },
            child() {
                let include = this.option.include;
                if (include) {
                    return Array.from(this.$el.querySelectorAll(include));
                } else {
                    return this.$slots.default.map(s => s.elm);
                }
            }
        },
        methods: {
            change(first) {
                let el = this.$el,
                    active = this.child[this.cur],
                    indicator = this.$refs.indicator;

                this.$emit('change', this.cur);

                this.child.map(c => c.classList.remove('active'));

                if (!active) return;

                active.classList.add('active');

                if (indicator) {
                    let drag = indicator.children[0],
                        opt = this.option.indicator,
                        isVertical = opt.isVertical,
                        direction = isVertical ? 'Y' : 'X',
                        wid = isVertical ? 'width' : 'height',
                        len = isVertical ? 'height' : 'width',
                        offsetTL = isVertical ? 'offsetTop' : 'offsetLeft',
                        offsetHW = isVertical ? 'offsetHeight' : 'offsetWidth',
                        scrollHW = isVertical ? 'scrollHeight' : 'scrollWidth',
                        width = opt.width,
                        length = opt.length,
                        differ = opt.differ;

                    indicator.style[len] = el[scrollHW] + 'px';
                    first ? drag.classList.add('no-duration') : drag.classList.remove('no-duration');
                    drag.style[wid] = width + 'px';
                    drag.style[len] = (length || (active[offsetHW] + differ*2)) + 'px';
                    drag.style.transform = 'translate' + direction + '(' + (length ?
                        (active[offsetTL] + (active[offsetHW] - length)/2) :
                        (active[offsetTL] - differ)) + 'px)';
                }

                this.clickLocked = true;
                clearTimeout(this.timer);
                el.$scrollToElement(active, first ? 0 : 300, 'center')
                    .onComplete(()=>{
                        this.timer = setTimeout(()=>{
                            this.clickLocked = false;
                        });
                    })
                    .start();
            },
            click(e) {
                if (this.clickLocked) return;

                let target = e.target, bool = true;

                while (bool && target !== document) {
                    let index = this.child.indexOf(target);

                    if (index > -1) {
                        bool = false;

                        if (this.option.isToggle && this.cur === index) {
                            this.cur = NaN;
                        } else {
                            this.cur = index;
                        }
                        this.$emit('click', target, index);

                    } else {
                        target = target.parentNode;
                    }
                }
            }
        },
        watch: {
            cur(to, from) {
                let max = this.$slots.default.length - 1;
                if (to<0) this.cur = 0;
                else if (to>max) this.cur = max;
                else this.change();
            }
        },
        mounted() {
            this.change(true);
        }
    }
</script>

<style scoped>
    .tabhead {
        position: relative;
    }
    .indicator {
        background-color: transparent;
        position: absolute;
        z-index: 1;
        font-size: 0;
        line-height: normal;
        min-width: 100%;
        bottom: 0;
        left: 0;
    }
    .indicator.vertical {
        min-width: initial;
        bottom: initial;
        left: initial;
        min-height: 100%;
        right: 0;
        top: 0;
    }
</style>
