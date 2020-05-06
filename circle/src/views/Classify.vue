<template>
    <base-layout>

        <template slot="header">
            <v-header back search="搜索：美食 娱乐" city btn/>
        </template>

        <tab-head name="test" class="left scroll-y" ref="left">
            <span v-for="(item, index) in items" :key="index">{{ item.name }}</span>
        </tab-head>

        <tab-body name="test" class="right scroll-y" ref="right" :options="{mode:'scroll'}">
            <div v-for="(item, index) in items" :key="index" class="item" ref="item">
                <p>{{ item.details.title }}</p>
                <ul>
                    <router-link v-for="(con, j) in item.details.content" :key="j" tag="li" to="">
                        <img v-lazy="con.img" width="145" height="120">
                        {{ con.txt }}
                    </router-link>
                </ul>
            </div>
        </tab-body>

        <template slot="footer">
            <v-footer :current="1"/>
        </template>

        <template slot="outer">
            <city-selector/>
        </template>
    </base-layout>
</template>



<script>
    import BaseLayout from "../components/BaseLayout";
    import VHeader from "../components/VHeader";
    import TabHead from "../components/TabHead";
    import VFooter from "../components/VFooter";
    import CitySelector from "../components/CitySelector";
    import TabBody from "../components/TabBody";
    export default {
        name: 'classify',
        components: {TabBody, CitySelector, VFooter, TabHead, VHeader, BaseLayout},
        data() {
            return {
                items: [
                    {
                        name: '为你推荐',
                        details: {
                            title: '猜你想找',
                            content: [
                                { txt: '坚果超级单品日', img: require('@/assets/img/_14.jpg') },
                                { txt: '低至5折', img: require('@/assets/img/_15.jpg') },
                                { txt: '新品首发', img: require('@/assets/img/_16.jpg') }
                            ]
                        }
                    },
                    {
                        name: '女装',
                        details: {
                            title: '女装',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') }
                            ]
                        }
                    },
                    {
                        name: '男装',
                        details: {
                            title: '男装',
                            content: [
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '电脑', img: require('@/assets/img/_21.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '男女内衣',
                        details: {
                            title: '男女内衣',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '电脑', img: require('@/assets/img/_21.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '女鞋',
                        details: {
                            title: '女鞋',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '男鞋',
                        details: {
                            title: '男鞋',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '电脑', img: require('@/assets/img/_21.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '箱包皮具',
                        details: {
                            title: '箱包皮具',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                            ]
                        }
                    },
                    {
                        name: '手表配饰',
                        details: {
                            title: '手表配饰',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '电脑', img: require('@/assets/img/_21.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '美妆个护',
                        details: {
                            title: '美妆个护',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '电脑', img: require('@/assets/img/_21.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '母婴',
                        details: {
                            title: '母婴',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '电脑', img: require('@/assets/img/_21.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '户外运动',
                        details: {
                            title: '户外运动',
                            content: [
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '电脑', img: require('@/assets/img/_21.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '手机数码',
                        details: {
                            title: '手机数码',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                            ]
                        }
                    },
                    {
                        name: '家用电器',
                        details: {
                            title: '家用电器',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '婴儿服', img: require('@/assets/img/_22.jpg') }
                            ]
                        }
                    },
                    {
                        name: '家居家纺',
                        details: {
                            title: '家居家纺',
                            content: [
                                { txt: '坚果', img: require('@/assets/img/_14.jpg') },
                                { txt: '盒子', img: require('@/assets/img/_15.jpg') },
                                { txt: '手机', img: require('@/assets/img/_16.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '连衣裙', img: require('@/assets/img/_17.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                                { txt: '面膜', img: require('@/assets/img/_18.jpg') },
                                { txt: '咖啡', img: require('@/assets/img/_19.jpg') },
                                { txt: '饮料', img: require('@/assets/img/_20.jpg') },
                            ]
                        }
                    }
                ]
            }
        }
    }
</script>



<style scoped>
    /deep/ main {
        height: 100%;
        overflow: hidden;
        display: flex;
    }
    .left {
        height: 100%;
        width: 188px;
        display: inline-block;
        box-sizing: border-box;
        background-color: #fff;
    }
    .left>span {
        font-size: 30px;
        color: #333;
        background-color: #fff;
        line-height: 96px;
        text-align: center;
        display: block;
    }
    .left>span.active {
        color: #333;
        background: #f3f3f3;
    }
    .right {
        width: calc(100% - 188px);
        height: 100%;
        display: inline-block;
        padding: 0 25px 30px 20px;
        box-sizing: border-box;
        position: relative;
    }
    .right>.item>p {
        font-size: 30px;
        color: #333;
        line-height: 96px;
    }
    .right>.item>ul {
        background-color: #fff;
        padding-top: 30px;
        display: flex;
        flex-wrap: wrap;
    }
    .right>.item>ul>li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33.33%;
        margin-bottom: 30px;
        font-size: 24px;
        color: #333;
    }
    .right>.item>ul>li>img {
        margin-bottom: 10px;
    }
</style>
