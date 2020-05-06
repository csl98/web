<template>
    <base-layout>
        <template slot="header">
            <v-header back search="卓诗尼">
                <router-link class="search-btn" to="">搜索</router-link>
            </v-header>
        </template>

        <div class="history">
            <p>历史记录<button class="del"></button></p>
            <ul>
                <li>卓诗尼</li>
                <li>卓诗尼</li>
                <li class="store">哈皮候生鲜旗舰店</li>
                <li class="store">哈皮候生鲜旗舰店</li>
            </ul>
        </div>

        <div class="guess-you-look">
            <p>猜你在找<button class="change">换一批</button></p>
            <ul>
                <li v-for="(item, index) in 10" :key="index">卓诗尼</li>
            </ul>
        </div>

        <template slot="footer">
            <div class="bottom-bar">
                <span>按住 说出你要的宝贝</span>
            </div>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from "../components/BaseLayout";
    import VHeader from "../components/VHeader";
    export default {
        name: "Search",
        components: {VHeader, BaseLayout},
    }
</script>

<style scoped>
    /deep/ main {
        background-color: #fff;
    }
    .header {
        background-color: #fff;
        height: 80px;
    }
    .header /deep/>.back::before {
        color: #333;
        font-weight: bold;
    }
    .header /deep/>.search {
        background-color: #e8e8e8;
        border: none;
        width: 100%;
        margin: 0 20px 0 30px;
        height: 56px;
    }
    .header /deep/>.search::before {
        background: url("../assets/img/68.png") no-repeat center;
        width: 50px;
        margin-left: 15px;
    }
    .header /deep/>.search input {
        font-size: 22px;
        height: 56px;
    }
    .header /deep/>.search-btn {
        font-size: 30px;
        color: #666;
        margin-left: auto;
    }

    .history {
        padding-left: 40px;
        padding-bottom: 150px;
    }
    .history>p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        font-size: 26px;
        color: #666;
        border-bottom: 2px solid #e8e8e8;
    }
    .history>p>.del {
        height: 100%;
        width: 80px;
        background: url("../assets/img/109.png") no-repeat center;
    }
    .history>ul {
        display: flex;
        flex-wrap: wrap;
    }
    .history>ul>li {
        display: flex;
        align-items: center;
        font-size: 26px;
        color: #333;
        line-height: 58px;
        padding: 0 20px;
        border: 2px solid #dcdbdb;
        margin-top: 20px;
        margin-right: 20px;
    }
    .history>ul>li.store::before {
        content: '';
        width: 30px;
        height: 30px;
        margin-right: 10px;
        background: url("../assets/img/110.png") no-repeat center;
    }


    .guess-you-look {
        padding-left: 40px;
        padding-bottom: 150px;
    }
    .guess-you-look>p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        font-size: 26px;
        color: #666;
        border-bottom: 2px solid #e8e8e8;
    }
    .guess-you-look>p>.change {
        font-size: 26px;
        color: #666;
        height: 100%;
        padding: 0 25px;
        display: flex;
        align-items: center;
    }
    .guess-you-look>p>.change::after {
        content: '';
        width: 30px;
        height: 30px;
        background: url("../assets/img/111.png") no-repeat center;
        margin-left: 10px;
    }
    .guess-you-look>ul {
        display: flex;
        flex-wrap: wrap;
    }
    .guess-you-look>ul>li {
        display: flex;
        align-items: center;
        font-size: 26px;
        color: #333;
        line-height: 58px;
        padding: 0 20px;
        border: 2px solid #dcdbdb;
        margin-top: 20px;
        margin-right: 20px;
    }
    .guess-you-look>ul>li.store::before {
        content: '';
        width: 30px;
        height: 30px;
        margin-right: 10px;
        background: url("../assets/img/110.png") no-repeat center;
    }

    .bottom-bar {
        background-color: #f9f8f8;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bottom-bar>span {
        font-size: 32px;
        color: #333;
        background-color: #e8e8e8;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 560px;
        border-radius: 32px;
    }
    .bottom-bar>span::before {
        content: '';
        width: 34px;
        height: 46px;
        background: url("../assets/img/108.png") no-repeat center;
        margin-right: 40px;
    }
</style>