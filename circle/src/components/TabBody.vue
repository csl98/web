<template>
    <div :tag="option.tag" :class="classname" @scroll="option.mode === 'scroll' ? scroll() : undefined">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBody",
        props: {
            name: {
                type: String,
                required: true
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
                control: true,
                scrolling: false,
                timer: null
            }
        },
        computed: {
            option() {//default options
                return this.$deepMerge({
                    mode: 'tab',//tab,scroll,swiper
                    scrollPosition: '',//center,bottom,right  '' = default
                    tag: 'div'
                }, this.options);
            },
            head() {
                let all = this.$root.$getChildren('tabhead');
                for (let i = 0; i < all.length; i++) {
                    if (all[i].name === this.name) return all[i];
                }
            },
            cur() {
                return this.head.cur;
            },
            classname() {
                return `tabbody tabbody-${this.name} tabbody-${this.option.mode}`;
            }
        },
        methods: {
            scroll() {
                let el = this.$el,
                    target = el.children[this.cur];

                clearTimeout(this.timer);

                if (this.scrolling) return;

                this.control = false;

                if (el.scrollTop < target.offsetTop) {
                    this.head.cur --;
                } else if (el.scrollTop > target.offsetTop + target.offsetHeight) {
                    this.head.cur ++;
                }

                this.timer = setTimeout(()=>{
                    this.control = true;
                });
            },
            change(first) {
                let el = this.$el,
                    child = Array.from(el.children),
                    active = child[this.cur];

                child.map(c => c.classList.remove('active'));

                if (!active) return;

                active.classList.add('active');

                switch (this.option.mode) {
                    case 'tab':
                        child.map(c => {
                            first ? c.classList.add('no-duration') : c.classList.remove('no-duration');
                            c.style.transform = `translateX(${-this.cur}00%)`;
                        });
                        el.style.paddingLeft = (el.offsetWidth - active.offsetWidth)/2 + 'px';
                        break;
                    case 'scroll':
                        clearTimeout(this.timer);

                        if (active && this.control && !this.scrolling) {
                            this.scrolling = true;

                            el.$scrollToElement(active, first ? 0 : 300, this.option.scrollPosition)
                                .onComplete(()=>{
                                    this.timer = setTimeout(()=>{
                                        this.scrolling = false;
                                    });
                                })
                                .start();
                        }
                        break;
                }
            }
        },
        watch: {
            cur() {
                this.change();
            }
        },
        mounted() {
            this.change(true);
            if (this.option.mode === 'tab') {
                window.onresize = this.change;
            }
        },
        beforeDestroy() {
            if (this.option.mode === 'tab') {
                window.onresize = null;
            }
        }
    }
</script>

<style scoped>
    .tabbody-scroll {
        position: relative;
        max-height: 100%;
        overflow: scroll;
    }
    .tabbody-tab {
        height: 100%;
        position: relative;
        display: flex;
        overflow: hidden;
    }
    .tabbody-tab /deep/>* {
        flex-shrink: 0;
        opacity: .1;
        transition: .5s;
    }
    .tabbody-tab /deep/>*.active {
        opacity: 1;
    }
</style>
