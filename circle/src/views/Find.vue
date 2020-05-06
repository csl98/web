<template>
    <base-layout>
        <template slot="header">
            <v-header back btn title="发现"/>
            <tab-head class="scroll-x" name="find" :options="{ current: 1, indicator: { differ: -20, color: '#40c7b6', width: 3 } }">
                <span v-for="(item, i) in items" :key="i">{{ item.name }}</span>
            </tab-head>
        </template>

        <tab-body name="find" :options="{ mode: 'tab' }">
            <ul class="scroll-y" v-for="(item, i) in items" :key="i">
                <router-link tag="li" v-for="(article, j) in item.articles" :key="j" to="">
                    <p>{{ article.title }}</p>
                    <img v-lazy="article.img">
                    <span>{{ article.total }}</span>
                </router-link>
            </ul>
        </tab-body>

        <template slot="footer">
            <v-footer :current="2"/>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from "../components/BaseLayout";
    import VFooter from "../components/VFooter";
    import VHeader from "../components/VHeader";
    import TabHead from "../components/TabHead";
    import TabBody from "../components/TabBody";
    export default {
        name: "Find",
        components: {TabBody, TabHead, VHeader, VFooter, BaseLayout},
        data() {
            return {
                items: [
                    {
                        name: '精选',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/11.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/4.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '关注',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/2.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '爱零食',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/2.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/11.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '出去浪',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '生活控',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/4.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/2.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/11.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '精选',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/11.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/4.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '关注',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/2.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '爱零食',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/2.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/11.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '出去浪',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/3.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    },
                    {
                        name: '生活控',
                        articles: [
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/4.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/1.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/2.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/5.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            },
                            {
                                title: '吃货必备! 这五条广州美食街只有地道老广才知道！',
                                img: require('@/assets/img/11.jpg'),
                                total: '9800评论 . 400浏览 . 298收藏'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .tabhead-find {
        background-color: #fff;
        padding: 0 25px;
        white-space: nowrap;
    }
    .tabhead-find span {
        font-size: 30px;
        color: #999;
        line-height: 80px;
        margin-right: 5px;
        padding: 0 20px;
    }
    .tabhead-find span.active {
        color: #40c7b6;
    }

    /deep/ main {
        height: 100%;
    }
    .tabbody-find ul {
        background-color: #fff;
    }
    .tabbody-find ul li {
        border-bottom: 1px solid #f5f5f5;
        display: block;
        padding: 0 21px;
    }
    .tabbody-find ul li img {
        width: 708px;
        height: 357px;
    }
    .tabbody-find ul li p {
        font-size: 30px;
        color: #333;
        line-height: 70px;
    }
    .tabbody-find ul li span {
        font-size: 24px;
        color: #999;
        display: block;
        text-align: right;
        line-height: 62px;
    }
</style>