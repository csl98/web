<template>
    <base-layout scroll-limit=".user_head img">
        <template slot="header">
            <v-header back btn title="我的"/>
        </template>

        <div class="user_head">
            <router-link to=""><img v-lazy="require('../assets/img/_25.png')">username</router-link>
        </div>
        <dl>
            <dd><router-link to=""><img v-lazy="require('../assets/img/_26.png')">待付款</router-link></dd>
            <dd><router-link to=""><img v-lazy="require('../assets/img/_27.png')">待收货</router-link></dd>
            <dd><router-link to=""><img v-lazy="require('../assets/img/_28.png')">待评价</router-link></dd>
            <dd><router-link to=""><img v-lazy="require('../assets/img/_29.png')">退换/售后</router-link></dd>
            <dt><router-link to=""><img v-lazy="require('../assets/img/_30.png')">我的订单</router-link></dt>
        </dl>
        <dl>
            <dd><router-link to=""><span>优惠券</span><i id="q">3</i></router-link></dd>
            <dd><router-link to=""><span>关注</span><i>583</i></router-link></dd>
            <dd><router-link to=""><span>足迹</span><i>1258</i></router-link></dd>
            <dd><router-link to=""><span>收藏</span><i>45</i></router-link></dd>
            <dt><router-link to=""><img v-lazy="require('../assets/img/_31.png')">我的钱包</router-link></dt>
        </dl>
        <ul class="nav">
            <li><router-link to=""><img v-lazy="require('../assets/img/_32.png')">意见反馈</router-link></li>
            <li><router-link to=""><img v-lazy="require('../assets/img/_33.png')">我的文章</router-link></li>
            <li><router-link to=""><img v-lazy="require('../assets/img/_34.png')">我的活动</router-link></li>
            <li><router-link to=""><img v-lazy="require('../assets/img/_35.png')">客户服务</router-link></li>
        </ul>
        <div class="rec">
            <h2><router-link to=""></router-link>为/你/推/荐</h2>
            <ul>
                <li>
                    <router-link to=""></router-link>
                    <img v-lazy="require('../assets/img/_15.jpg')">
                    <p><span>自营</span>戴尔DELL灵越燃7000 II 14.0英寸轻薄窄边框笔记本电脑8G 1T戴尔DELL灵越燃7000 II 14.0英寸</p>
                </li>
                <li>
                    <router-link to=""></router-link>
                    <img v-lazy="require('../assets/img/12.jpg')">
                    <p><span>自营</span>华为（HUAWEI） 荣耀10 手机 幻影蓝 全网通 6GB+64GB华为（HUAWEI） 荣耀10 手机 幻影蓝 全网通 6GB+64GB</p>
                </li>
                <li>
                    <router-link to=""></router-link>
                    <img v-lazy="require('../assets/img/12.jpg')">
                    <p><span>自营</span>华为（HUAWEI） 荣耀10 手机 幻影蓝 全网通 6GB+64GB华为（HUAWEI） 荣耀10 手机 幻影蓝 全网通 6GB+64GB</p>
                </li>
                <li>
                    <router-link to=""></router-link>
                    <img v-lazy="require('../assets/img/36.jpg')">
                    <p><span>自营</span>洽洽 坚果炒货 坚果零食大礼包 每日坚果（26g*30包）洽洽 坚果炒货 坚果零食大礼包 每日坚果（26g*30包）</p>
                </li>
            </ul>
        </div>


        <template slot="footer">
            <v-footer :current="4"/>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from "../components/BaseLayout";
    import VHeader from "../components/VHeader";
    import VFooter from "../components/VFooter";
    export default {
        name: "User",
        components: {VFooter, VHeader, BaseLayout}
    }
</script>

<style scoped>
    /deep/ main {
        background: #fff;
        overflow-x: hidden;
    }

    /deep/ header {
        box-shadow: none;
    }
    .base-layout.changed/deep/ header {
        box-shadow: 0 0 5px 0 rgba(51,51,51,.1);
    }

    .user_head {
        background-color: #40c7b6;
        height: 182px;
        padding: 0 45px;
        width: 110%;
        box-sizing: border-box;
        margin-left: -5%;
        border-radius: 0 0 50% 50%;
    }
    .user_head>a {
        font-size: 30px;
        color: #fff;
        padding: 25px;
        display: flex;
        align-items: center;
        width: 40%;
    }
    .user_head>a>img {
        width: 90px;
        height: 90px;
        margin-right: 20px;
    }
    dl {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        height: 100px;
        border-bottom: 2px solid #f6f6f6;
    }
    dl>dd>a {
        padding: 0 25px;
    }
    dl>dt {
        border-left: 2px solid #f6f6f6;
        height: 100px;
    }
    dl>dt a {
        padding-top: 8px;
    }
    dl a {
        font-size: 24px;
        color: #333;
        text-align: center;
        display: block;
        padding: 0 25px;
    }
    dl a>span {
        font-size: 26px;
        color: #333;
        display: block;
        margin-bottom: 10px;
    }
    dl a>i {
        font-size: 26px;
        color: #333;
    }
    dl a>img {
        width: 41px;
        height: 40px;
        display: block;
        margin: 0 auto 10px;
    }
    .nav {
        display: flex;
        justify-content: space-between;
        padding: 0 25px;
        align-items: center;
        height: 138px;
        border-top: 9px solid #f3f3f3;
        border-bottom: 9px solid #f3f3f3;
    }
    .nav>li>a {
        display: block;
        text-align: center;
        font-size: 24px;
        color: #333;
    }
    .nav>li>a>img {
        width: 48px;
        height: 45px;
        display: block;
        margin: 0 auto 10px;
    }
    .rec>h2>a {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
    }
    .rec>h2 {
        font-size: 30px;
        color: #ff6699;
        line-height: 68px;
        height: 68px;
        background-color: #f3f3f3;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .rec>h2::before {
        content: "";
        background: url("../assets/img/_17.png") no-repeat center/100%;
        width: 74px;
        height: 51px;
        margin-right: 10px;
    }
    .rec>h2::after {
        content: "";
        background: url("../assets/img/_18.png") no-repeat center/100%;
        width: 68px;
        height: 33px;
        margin-left: 10px;
    }
    .rec>ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .rec>ul>li {
        position: relative;
        width: calc(50% - 3px);
        height: 340px;
        border: 1px solid #f3f3f3;
    }
    .rec>ul>li>a {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
    }
    .rec>ul>li>img {
        width: 308px;
        height: 227px;
        display: block;
        margin: 10px auto 20px;
    }
    .rec>ul>li>p {
        font-size: 22px;
        color: #666;
        line-height: 32px;
        height: 64px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .rec>ul>li>p>span {
        font-size: 24px;
        color: #fff;
        display: inline-block;
        line-height: 26px;
        height: 26px;
        background-color: #ff6699;
        padding: 0 5px;
        margin-right: 5px;
    }
</style>