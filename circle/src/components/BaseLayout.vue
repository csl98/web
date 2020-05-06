<template>
    <div class="base-layout" :class="{ changed }">
        <header ref="header">
            <slot name="header"></slot>
        </header>
        <main ref="main" :style="{ paddingTop: t + 'px', paddingBottom: b + 'px' }">
            <slot></slot>
        </main>
        <footer ref="footer">
            <slot name="footer"></slot>
        </footer>
        <slot name="outer"></slot>
    </div>
</template>

<script>
    export default {
        name: "BaseLayout",
        props: {
            scrollLimit: {
                type: [Number, String],
                default: 0
            }
        },
        data() {
            return {
                t: 0,
                b: 0,
                changed: false
            }
        },
        computed: {
            limit() {
                let sl = this.scrollLimit;
                if (this.$typeof(sl) === 'number') {
                    return sl;
                } else {
                    return this.$el.querySelector(sl).offsetTop - this.t;
                }
            },
            scroll() {
                return this.$throttle(this.check);
            }
        },
        methods: {
            check() {
                this.changed = window.scrollY > this.limit;
            }
        },
        mounted() {
            this.t = this.$refs.header.offsetHeight - 1;//解决手机横杠
            this.b = this.$refs.footer.offsetHeight;
            if (this.scrollLimit) window.addEventListener('scroll', this.scroll);
        },
        beforeDestroy() {
            if (this.scrollLimit) window.removeEventListener('scroll', this.scroll);
        }
    }
</script>

<style scoped>
    .base-layout {
        height: 100%;
        background-color: #eee;
    }

    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
        box-shadow: 0 0 5px 0 rgba(51,51,51,.1);
        touch-action: none;
        overflow: hidden;
    }

    main {
        box-sizing: border-box;
        min-height: 100%;
        background-color: #eee;
    }

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        box-shadow: 0 0 5px 0 rgba(51,51,51,.1);
        touch-action: none;
    }
</style>