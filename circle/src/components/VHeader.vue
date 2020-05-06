<template>
    <div class="header">
        <div class="full">
            <slot name="full">
                <span class="title" v-if="title">{{ title }}</span>
            </slot>
        </div>

        <slot name="back-before"></slot>
        <slot name="back">
            <span class="back iconfont icon-back-before" v-if="back" @click="$router.back()"></span>
        </slot>
        <slot name="back-after"></slot>

        <slot name="city-before"></slot>
        <slot name="city">
            <span class="city iconfont icon-moreunfold-after" v-if="city" @click="cityClick">{{ cityText }}</span>
        </slot>
        <slot name="city-after"></slot>

        <slot name="search-before"></slot>
        <slot name="search">
            <span class="search" v-if="search">
                <input type="search" :placeholder="search" v-focus="$route.name === 'search'"
                       @click="$route.name === 'search' ? undefined : $router.push({ path: '/search' })"/>
             </span>
        </slot>
        <slot name="search-after"></slot>

        <slot name="btn-before"></slot>
        <slot name="btn">
            <div class="btn" v-if="btn">
                <router-link to="/home"></router-link>
                <router-link to=""></router-link>
            </div>
        </slot>

        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "VHeader",
        props: {
            back: {
                type: Boolean,
                default: false
            },
            city: {
                type: Boolean,
                default: false
            },
            search: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            btn: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            cityText() {
                let txt = this.$store.state.curCity.a;
                if (txt.length > 7) {
                    txt = txt.slice(0, 7) + '…';
                }
                return txt;
            }
        },
        methods: {
            cityClick() {
                this.$root.$getChildren('cityselector')[0].open(
                    'a',
                    this.$store.state.curCity,
                    val => this.$store.commit('set_curCity', val)
                );
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 88px;
        background-color: #40c7b6;
        display: flex;
        align-items: center;
        padding: 0 25px;
        white-space: nowrap;
        position: relative;
        transition-duration: .3s;
    }
    .header>.full {
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .header>*:not(.full) {
        position: relative;
        z-index: 1;
    }
    .header>.full .title {
        font-size: 30px;
        color: #fff;
    }
    .header>.back {
        color: #fff;
        margin-left: -15px;
        display: flex;
        align-items: center;
        font-size: 30px;
    }
    .header>.back::before {
        font-size: 54px;
    }
    .header>.search {
        width: 69%;
        height: 60px;
        background-color: #fff;
        border-radius: 30px;
        font-size: 26px;
        border: 1px solid #ccc;
        color: #999;
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-right: 10px;
    }
    .header>.search::before {
        content: '';
        width: 70px;
        height: 100%;
        background: url("../assets/img/search.png") no-repeat center;
        flex-shrink: 0;
    }
    .header>.search>input {
        line-height: 60px;
        width: 100%;
    }
    .header>.city {
        font-size: 30px;
        color: #fff;
        margin: 0 10px;
    }
    .header>.btn {
        width: 88px;
        height: 28px;
        background-color: rgba(51,51,51,.5);
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-left: auto;
    }
    .header>.btn>a:first-of-type {
        width: 60%;
        height: 100%;
        background:
                linear-gradient( to bottom, transparent 15%, rgba(255,255,255,.5) 15%, rgba(255,255,255,.5) 85%, transparent 85%) no-repeat right/1px 100%,
                url("../assets/img/btn1.png") no-repeat center;
    }
    .header>.btn>a:last-of-type {
        width: 40%;
        height: 100%;
        background: url("../assets/img/btn2.png") no-repeat center;
    }
</style>