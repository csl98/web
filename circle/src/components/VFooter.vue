<template>
    <ul class="footer">
        <li v-for="(item, index) in items" :key="index">
            <router-link :to="item.href" :class="{ 'active': index === Number(current) }">
                <img v-if="index === Number(current)" :src="item.imgActive">
                <img v-else :src="item.img">
                {{ item.text }}
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "VFooter",
        props: {
            current: {
                type: [String, Number],
                required: true
            }
        },
        data() {
            return {
                items: [
                    {
                        img: require('../assets/img/menu1.png'),
                        imgActive: require('../assets/img/menu1_active.png'),
                        href: "/",
                        text: "首页"
                    },
                    {
                        img: require('../assets/img/menu2.png'),
                        imgActive: require('../assets/img/menu2_active.png'),
                        href: "/classify",
                        text: "分类"
                    },
                    {
                        img: require('../assets/img/menu3.png'),
                        imgActive: require('../assets/img/menu3_active.png'),
                        href: "/find",
                        text: "发现"
                    },
                    {
                        img: require('../assets/img/menu4.png'),
                        imgActive: require('../assets/img/menu4_active.png'),
                        href: "/cart",
                        text: "购物车"
                    },
                    {
                        img: require('../assets/img/menu5.png'),
                        imgActive: require('../assets/img/menu5_active.png'),
                        href: "/user",
                        text: "我的"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .footer {
        height: 102px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        position: relative;
    }
    .footer>li {
        height: 100%;
    }
    .footer>li>a {
        font-size: 22px;
        color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 25px;
        height: 100%;
    }
    .footer>li>a.active {
        color: #40c7b6;
    }
    .footer>li>a>img {
        margin-bottom: 5px;
    }
</style>
