<template>
    <base-layout>
        <template slot="header">
            <v-header back search="搜索：美食 娱乐" city btn/>
        </template>

        <swiper class="banner" :options="$deepMerge({
            loop: true,
            autoplay: {
                disableOnInteraction: false,
                delay: 5000
            },
            pagination: {
                el: '.banner .swiper-pagination'
            }
        }, $swiperDefault)">
            <swiper-slide v-for="(item, index) in banner" :key="index">
                <router-link to="" class="swiper-lazy" :data-background="item.img"></router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>


        <swiper class="nav" :options="$deepMerge({ pagination: { el: '.nav .swiper-pagination' } }, $swiperDefault)">
            <swiper-slide v-for="(num, index) in nav" :key="index">
                <ul>
                    <li v-for="(item, index) in num" :key="index">
                        <router-link :to="item.href">
                            <img v-lazy="item.img">{{ item.text }}
                        </router-link>
                    </li>
                </ul>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <swiper class="ads" :options="$deepMerge({
            loop: true,
            autoplay: {
                disableOnInteraction: false,
                delay: 7000
            },
            pagination: {
                el: '.ads .swiper-pagination'
            }
        }, $swiperDefault)">
            <swiper-slide v-for="(item, index) in ads" :key="index">
                <router-link class="swiper-lazy" :data-background="item.img" to=""></router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div class="new">
            <p>今日新单</p>
            <div class="big">
                <router-link to="" v-for="(item, index) in 2" :key="index">
                    <img v-lazy="require('../assets/img/3.jpg')">
                    <em>天天特价</em>
                    <span>超值午餐9.9元起</span>
                </router-link>
            </div>
            <div class="small">
                <router-link to="" v-for="(item, index) in 3" :key="index">
                    <img v-lazy="require('../assets/img/4.jpg')">
                    <span>重庆酸辣粉</span>
                    <em>大牌精选</em>
                </router-link>
            </div>
        </div>

        <div class="youxuan">
            <p>为你优选<router-link to="" class="more iconfont icon-more-after">更多</router-link></p>
            <div class="wrap">
                <router-link to="" v-for="(item, index) in 3" :key="index">
                    <span>猜你喜欢</span>
                    <em>你的口味 我都懂得</em>
                    <img v-lazy="require('../assets/img/25.png')">
                </router-link>
            </div>
        </div>

        <div class="related">
            <p>猜你喜欢</p>
            <ul>
                <li v-for="(item, index) in related" :key="index">
                    <router-link class="top" to="">
                        <img v-lazy="item.img">
                        <div class="wrap">
                            <h3>{{ item.title }}<button></button></h3>
                            <p>
                                <span>
                                    <star-rating :score="item.score" color="#fa5758" width="120" size="20x20"/>
                                    {{ item.score }}
                                </span>
                                <em>30分钟 1.2km</em>
                            </p>
                            <em>起送￥20  配送￥2</em>
                        </div>
                    </router-link>
                    <div class="bottom">
                        <div class="activity iconfont"
                             :class="{ 'unfold icon-less-after': item.unfold, 'icon-moreunfold-after': !item.unfold }"
                             @click="item.unfold = !item.unfold">
                            <p class="jian">满45减5</p>
                            <p class="zhe">折扣商品1.25折起</p>
                            <p class="shou">新用户立减14元，首次使用银行卡支付最高再减3元</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <template slot="footer">
            <v-footer :current="0"/>
        </template>

        <template slot="outer">
            <city-selector/>
            <go-top/>
        </template>

    </base-layout>
</template>



<script>
    import BaseLayout from "../components/BaseLayout";
    import VHeader from "../components/VHeader";
    import VFooter from "../components/VFooter";
    import StarRating from "../components/StarRating";
    import CitySelector from "../components/CitySelector";
    import GoTop from "../components/GoTop";
    export default {
        name: 'home',
        components: { GoTop, CitySelector, StarRating, VFooter, VHeader, BaseLayout},
        data() {
            return {
                banner: [
                    { img: require('../assets/img/1.jpg') },
                    { img: require('../assets/img/1.jpg') },
                    { img: require('../assets/img/1.jpg') }
                ],
                nav: [
                    [
                        { img: require('../assets/img/1.png'), href: "/", text: "运动健身" },
                        { img: require('../assets/img/2.png'), href: "/", text: "美食" },
                        { img: require('../assets/img/3.png'), href: "/", text: "外卖" },
                        { img: require('../assets/img/4.png'), href: "/", text: "酒吧" },
                        { img: require('../assets/img/5.png'), href: "/", text: "电影" },
                        { img: require('../assets/img/6.png'), href: "/", text: "酒店/客栈" },
                        { img: require('../assets/img/7.png'), href: "/", text: "休闲娱乐" },
                        { img: require('../assets/img/8.png'), href: "/", text: "跑腿代购" },
                        { img: require('../assets/img/9.png'), href: "/", text: "蔬果生鲜" },
                        { img: require('../assets/img/10.png'), href: "/", text: "点评" }
                    ],
                    [
                        { img: require('../assets/img/11.png'), href: "/", text: "丽人/美发" },
                        { img: require('../assets/img/12.png'), href: "/", text: "结婚/摄影" },
                        { img: require('../assets/img/13.png'), href: "/", text: "美妆护肤" },
                        { img: require('../assets/img/14.png'), href: "/", text: "服装鞋包" },
                        { img: require('../assets/img/15.png'), href: "/", text: "购物中心" },
                        { img: require('../assets/img/16.png'), href: "/", text: "约吗" },
                        { img: require('../assets/img/17.png'), href: "/", text: "本地批发" },
                        { img: require('../assets/img/18.png'), href: "/", text: "汽车养护" },
                        { img: require('../assets/img/19.png'), href: "/", text: "生活服务" },
                        { img: require('../assets/img/20.png'), href: "/", text: "教育/培训" }
                    ],
                    [
                        { img: require('../assets/img/21.png'), href: "/", text: "景点/门票" },
                        { img: require('../assets/img/22.png'), href: "/", text: "亲子活动" },
                        { img: require('../assets/img/23.png'), href: "/", text: "低价抢拼" },
                        { img: require('../assets/img/24.png'), href: "/", text: "全部" }
                    ],
                ],
                ads: [
                    { img: require('../assets/img/2.jpg') },
                    { img: require('../assets/img/2.jpg') },
                    { img: require('../assets/img/2.jpg') }
                ],
                related: [
                    { title: '七月甜品店', img: require('../assets/img/5.jpg'), score: '2.3', ziqu: false, unfold: false },
                    { title: '沃隆坚果店', img: require('../assets/img/36.jpg'), score: '5.0', ziqu: true, unfold: false },
                    { title: '好再来粉店', img: require('../assets/img/4.jpg'), score: '4.6', ziqu: false, unfold: false }
                ]
            }
        }
    }
</script>



<style scoped>
    .banner .swiper-lazy {
        width: 100%;
        height: 360px;
        display: block;
        background: no-repeat center;
    }
    .banner .swiper-pagination {
        bottom: 37px;
        position: absolute;
        display: flex;
        justify-content: center;
        z-index: 1;
        width: 100%;
        left: 0;
    }
    .banner .swiper-pagination /deep/ .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        border-radius: 9999px;
        background-color: #ccc;
        margin: 0 10px;
        opacity: 1;
    }
    .banner .swiper-pagination /deep/ .swiper-pagination-bullet-active {
        background-color: #fff;
    }


    .nav {
        padding-bottom: 30px;
        background-color: #fff;
    }
    .nav li {
        display: inline-block;
        width: 20%;
        margin: 20px 0;
    }
    .nav li>a {
        font-size: 24px;
        color: #666;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .nav li>a>img {
        width: 48px;
        height: 44px;
        margin-bottom: 10px;
    }
    .nav .swiper-pagination {
        position: absolute;
        bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        left: 0;
    }
    .nav .swiper-pagination /deep/ .swiper-pagination-bullet {
        width: 10px;
        height: 10px;
        background-color: #999;
        margin: 0 5px;
        border-radius: 9999px;
        opacity: 1;
    }
    .nav .swiper-pagination /deep/ .swiper-pagination-bullet-active {
        background-color: #333;
    }


    .ads {
        padding: 20px 0;
    }
    .ads .swiper-lazy {
        width: 700px;
        height: 170px;
        display: block;
        margin: 0 auto;
    }
    .ads .swiper-pagination {
        bottom: 37px;
        position: absolute;
        display: flex;
        justify-content: center;
        z-index: 1;
        width: 100%;
        left: 0;
    }
    .ads .swiper-pagination /deep/ .swiper-pagination-bullet {
        width: 14px;
        height: 14px;
        border-radius: 9999px;
        background-color: rgba(255,255,255,.8);
        margin: 0 8px;
        opacity: 1;
    }
    .ads .swiper-pagination /deep/ .swiper-pagination-bullet-active {
        background-color: rgba(226,41,49,.8);
    }


    .new {
        background-color: #fff;
        padding: 0 20px 15px;
    }
    .new>p {
        font-size: 32px;
        color: #333;
        line-height: 96px;
        text-align: center;
    }
    .new>.big {
        display: flex;
        justify-content: space-between;
    }
    .new>.big>a {
        position: relative;
    }
    .new>.big>a>img {
        width: 350px;
        height: 210px;
    }
    .new>.big>a>em {
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fa5758;
        font-size: 20px;
        color: #fff;
        line-height: 32px;
        padding: 0 10px;
        border-radius: 0 0 10px 0;
    }
    .new>.big>a>span {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 24px;
        color: #fff;
        line-height: 50px;
        padding: 0 10px;
        background-color: rgba(33,33,33,.8);
    }
    .new>.small {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    .new>.small>a {
        border: 1px solid #e8e7e7;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .new>.small>a>img {
        width: 226px;
        height: 144px;
    }
    .new>.small>a>span {
        font-size: 24px;
        color: #333;
        margin-top: 10px;
    }
    .new>.small>a>em {
        font-size: 20px;
        color: #767676;
        margin: 10px 0;
    }


    .youxuan {
        background-color: #fff;
        padding: 0 20px 15px;
        margin-top: 20px;
    }
    .youxuan>p {
        font-size: 32px;
        color: #333;
        line-height: 96px;
        text-align: center;
        position: relative;
    }
    .youxuan>p>.more {
        font-size: 24px;
        color: #666;
        position: absolute;
        right: 0;
    }
    .youxuan>.wrap {
        display: flex;
        justify-content: space-between;
    }
    .youxuan>.wrap>a {
        border: 1px solid #e8e7e7;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
    }
    .youxuan>.wrap>a>img {
        width: 226px;
        height: 145px;
        margin-top: 10px;
    }
    .youxuan>.wrap>a>span {
        font-size: 26px;
        color: #333;
        line-height: 50px;
    }
    .youxuan>.wrap>a>em {
        font-size: 20px;
        color: #767676;
        background-color: #fff;
        border: 1px solid #c1c1c1;
        border-radius: 5px;
        padding: 0 6px;
        line-height: 28px;
    }

    .related {
        margin-top: 20px;
        background-color: #fff;
    }
    .related>p {
        font-size: 32px;
        color: #333;
        line-height: 96px;
        text-align: center;
    }
    .related>ul {
        background-color: #fff;
    }
    .related>ul>li {
        padding: 30px 25px;
    }
    .related>ul>li:not(:first-child) {
        border-top: 10px solid #f5f5f5;
    }
    .related>ul>li>.top {
        display: flex;
        align-items: center;
    }
    .related>ul>li>.top>img {
        width: 178px;
        height: 126px;
        margin-right: 10px;
    }
    .related>ul>li>.top>.wrap {
        width: 100%;
    }
    .related>ul>li>.top>.wrap>h3 {
        font-size: 34px;
        color: #333;
        display: flex;
        align-items: center;
    }
    .related>ul>li>.top>.wrap>h3>em {
        line-height: 30px;
        border: 1px solid #40c7b6;
        font-size: 22px;
        color: #40c7b6;
        padding: 0 5px;
        margin-left: 20px;
    }
    .related>ul>li>.top>.wrap>h3>button {
        width: 50px;
        height: 40px;
        background: url("../assets/img/26.png") no-repeat center;
        position: relative;
        z-index: 1;
        margin-left: auto;
    }
    .related>ul>li>.top>.wrap>p {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #333;
        margin: 10px 0;
    }
    .related>ul>li>.top>.wrap>p>span {
        display: flex;
        align-items: center;
    }
    .related>ul>li>.top>.wrap>p>span>.star-rating {
        margin-right: 18px;
    }
    .related>ul>li>.top>.wrap>p>em {
        margin-left: auto;
    }
    .related>ul>li>.top>.wrap>em {
        font-size: 24px;
        color: #333;
    }
    .related>ul>li>.bottom {
        padding-left: 188px;
    }
    .related>ul>li>.bottom>.activity {
        position: relative;
        line-height: 32px;
        margin-top: 20px;
        overflow: hidden;
        height: 94px;
        transition: .3s;
    }
    .related>ul>li>.bottom>.activity.unfold {
        height: 200px;
    }
    .related>ul>li>.bottom>.activity::after {
        font-size: 30px;
        color: #999;
        position: absolute;
        right: 0;
        top: 15px;
    }
    .related>ul>li>.bottom>.activity>p {
        font-size: 24px;
        color: #999;
        margin-top: 15px;
        display: flex;
    }
    .related>ul>li>.bottom>.activity>p::before {
        width: 32px;
        height: 32px;
        border-radius: 3px;
        color: #fff;
        text-align: center;
        margin-right: 10px;
        flex-shrink: 0;
    }
    .related>ul>li>.bottom>.activity>p.jian::before {
        content: '减';
        background-color: #fa5758;
    }
    .related>ul>li>.bottom>.activity>p.zhe::before {
        content: '折';
        background-color: #c183e2;
    }
    .related>ul>li>.bottom>.activity>p.shou::before {
        content: '首';
        background-color: #f5a321;
    }
    .related>ul>li>.bottom>span {
        font-size: 24px;
        color: #40c7b6;
    }
</style>