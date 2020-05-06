<template>
    <transition name="fade">
        <button class="go-top" v-show="show" @click="click"></button>
    </transition>
</template>

<script>
    export default {
        name: "GoTop",
        data() {
            return {
                show: false
            }
        },
        computed: {
            scroll() {
                return this.$throttle(this.check);
            }
        },
        methods: {
            click() {
                document.documentElement.scrollTop && document.documentElement.$animate({scrollTop:0},800).start();
                document.body.scrollTop && document.body.$animate({scrollTop:0},800).start();
            },
            check() {
                this.show = window.scrollY > window.innerHeight;
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scroll);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scroll);
        }
    }
</script>

<style scoped>
    .go-top {
        position: fixed;
        z-index: 9;
        top: calc(50% - 42px);
        right: 20px;
        width: 84px;
        height: 84px;
        border-radius: 9999px;
        background: rgba(0,0,0,.4) url("../assets/img/go-top.png") no-repeat center;
    }
</style>