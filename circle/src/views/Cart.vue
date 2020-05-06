<template>
    <base-layout>
        <template slot="header">
            <v-header back btn :title="`购物车${ goodsNum ? `(${goodsNum})` : '' }`">
                <on-off slot="btn-before" v-if="goods.length" v-model="edit">{{ edit ? '完成' : '管理' }}</on-off>
            </v-header>
        </template>


        <ul class="shop-list">
            <li v-for="(shop, index) in goods" :key="index">
                <div class="top">
                    <on-off class="check-shop checkbox" type="checkbox" v-model="shop.checked" @click="checkShop(shop)"/>
                    <router-link class="shop" :to="shop.href">{{ shop.shop_name }}</router-link>
                    <button class="explain">优惠说明</button>
                </div>
                <ul class="pro-list">
                    <li v-for="(pro, index) in shop.products" :key="index">
                        <div class="pro-wrap">
                            <on-off class="check-pro checkbox" type="checkbox" v-model="pro.checked" @click="checkPro(pro, shop)"/>
                            <router-link class="pro" :to="pro.href">
                                <img v-lazy="pro.url">
                                <div class="wrap">
                                    <p>{{ pro.product_name }}</p>
                                    <div class="tags">
                                        <span v-for="(tag, index) in pro.tags" :key="index">{{ tag }}</span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <ul class="type-list">
                            <li v-for="(type, index) in pro.product_types" :key="index">
                                <on-off class="check-type checkbox" type="checkbox" @click="checkType(type, pro, shop)" v-model="type.checked"/>
                                <div class="type-wrap">
                                    <div class="wrap">
                                        <p>颜色:{{ type.type.color }},适合身高:{{ type.type.size }}</p>
                                        <span>
                                            <i class="money">￥<b>{{ type.price.toFixed(2).split('.')[0] }}</b>.{{ type.price.toFixed(2).split('.')[1] }}</i>/件
                                        </span>
                                    </div>
                                    <add-subtract v-model="type.number" :num="type.number" :max="15" @change="count"/>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="bottom">
                    <span>共{{ shop.subtotal.number }}件{{ shop.subtotal.type }}个</span>
                    <i class="money">￥<b>{{ shop.subtotal.money.toFixed(2).split('.')[0] }}</b>.{{ shop.subtotal.money.toFixed(2).split('.')[1] }}</i>
                </div>
            </li>
        </ul>


        <template slot="footer">
            <div v-if="goods.length" class="bottom-bar">
                <label class="check-all" for="check-all"><on-off id="check-all" class="checkbox" type="checkbox" @click="checkAll" v-model="all_checked"/>全选</label>
                <div v-if="!edit" class="wrap">
                    <p>合计：<i class="money">￥<b>{{ total.money.toFixed(2).split('.')[0] }}</b>.{{ total.money.toFixed(2).split('.')[1] }}</i></p>
                    <span>共{{ total.number }}件{{ total.type }}个，不含运费</span>
                </div>
                <button v-else class="collect">移至收藏夹</button>
                <button v-if="!edit" :class="total.number ? 'settlement' : 'settlement locked'" @click="submit">去结算</button>
                <button v-else :class="total.number ? 'del' : 'del locked'" @click="del">删除</button>
            </div>
            <v-footer items="items1" :current="3"/>
        </template>


        <template slot="outer">
            <div class="empty" v-if="!goods.length">
                <p>还没有选购商品</p>
                <span>购物车会为您保留最近7天的选购商品</span>
                <router-link to="">去逛逛</router-link>
            </div>

            <popup class="explain-popups" open-el=".explain">
                <p>优惠说明</p>
                <span>混批条件：支持混批货品总件数≥3</span>
                <button class="close"></button>
            </popup>
        </template>
    </base-layout>
</template>

<script>
    import BaseLayout from "../components/BaseLayout";
    import VHeader from "../components/VHeader";
    import VFooter from "../components/VFooter";
    import AddSubtract from "../components/AddSubtract";
    import Popup from "../components/Popup";
    import OnOff from "../components/OnOff";
    export default {
        name: "ShopCart",
        components: {OnOff, Popup, AddSubtract, VFooter, VHeader, BaseLayout},
        data() {
            return {
                edit: false,
                all_checked: false,
                goodsNum: 0,
                goods: [
                    {
                        shop_name: '某某服饰店铺',
                        href: '',
                        subtotal: { type: 0, number: 0, money: 0 },
                        checked: false,
                        products: [
                            {
                                product_name: '2019秋季新品童装纯棉长袖连衣裙 汉服女装古装襦裙儿童一件代发',
                                url: require('@/assets/img/55.jpg'),
                                href: '',
                                tags: ['混批','混批'],
                                checked: false,
                                product_types: [
                                    {
                                        type: {
                                            color: '粉色',
                                            size: '120cm'
                                        },
                                        price: 45,
                                        number: 3,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '蓝色',
                                            size: '130cm'
                                        },
                                        price: 50,
                                        number: 2,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '白色',
                                            size: '130cm'
                                        },
                                        price: 56,
                                        number: 1,
                                        checked: false
                                    }
                                ]
                            },
                            {
                                product_name: '2019秋季新品童装纯棉长袖连衣裙 汉服女装古装襦裙儿童一件代发',
                                url: require('@/assets/img/55.jpg'),
                                href: '',
                                tags: ['混批','混批'],
                                checked: false,
                                product_types: [
                                    {
                                        type: {
                                            color: '粉色',
                                            size: '130cm'
                                        },
                                        price: 53,
                                        number: 2,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '黑色',
                                            size: '130cm'
                                        },
                                        price: 57,
                                        number: 2,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '红色',
                                            size: '130cm'
                                        },
                                        price: 52,
                                        number: 1,
                                        checked: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        shop_name: '某某服饰店铺',
                        href: '',
                        subtotal: { type: 0, number: 0, money: 0 },
                        checked: false,
                        products: [
                            {
                                product_name: '2019秋季新品童装纯棉长袖连衣裙 汉服女装古装襦裙儿童一件代发',
                                url: require('@/assets/img/55.jpg'),
                                href: '',
                                tags: ['混批','混批'],
                                checked: false,
                                product_types: [
                                    {
                                        type: {
                                            color: '粉色',
                                            size: '120cm'
                                        },
                                        price: 45,
                                        number: 3,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '蓝色',
                                            size: '130cm'
                                        },
                                        price: 50,
                                        number: 2,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '白色',
                                            size: '130cm'
                                        },
                                        price: 56,
                                        number: 1,
                                        checked: false
                                    }
                                ]
                            },
                            {
                                product_name: '2019秋季新品童装纯棉长袖连衣裙 汉服女装古装襦裙儿童一件代发',
                                url: require('@/assets/img/55.jpg'),
                                href: '',
                                tags: ['混批','混批'],
                                checked: false,
                                product_types: [
                                    {
                                        type: {
                                            color: '粉色',
                                            size: '130cm'
                                        },
                                        price: 53,
                                        number: 2,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '黑色',
                                            size: '130cm'
                                        },
                                        price: 57,
                                        number: 2,
                                        checked: false
                                    },
                                    {
                                        type: {
                                            color: '红色',
                                            size: '130cm'
                                        },
                                        price: 52,
                                        number: 1,
                                        checked: false
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        },
        computed: {
            total() {
                let type = 0, number = 0, money = 0;

                for (let i = 0; i < this.goods.length; i ++) {
                    type += this.goods[i].subtotal.type;
                    number += this.goods[i].subtotal.number;
                    money += this.goods[i].subtotal.money;
                }

                return { type, number, money };
            }
        },
        methods: {
            checkAll() {
                for (let shop of this.goods) {
                    shop.checked = this.all_checked;
                    for (let pro of shop.products) {
                        pro.checked = this.all_checked;
                        for (let type of pro.product_types) {
                            type.checked = this.all_checked;
                        }
                    }
                }

                this.count();
            },
            checkShop(shop) {
                for (let pro of shop.products) {
                    pro.checked = shop.checked;
                    for (let type of pro.product_types) {
                        type.checked = shop.checked;
                    }
                }

                this.all_checked = true;
                for (let shops of this.goods) {
                    if (!shops.checked) {
                        this.all_checked = false;
                        break;
                    }
                }

                this.count();
            },
            checkPro(pro, shop) {
                for (let type of pro.product_types) {
                    type.checked = pro.checked;
                }

                shop.checked = true;
                for (let pros of shop.products) {
                    if (!pros.checked) {
                        shop.checked = false;
                        break;
                    }
                }

                this.all_checked = true;
                for (let shops of this.goods) {
                    if (!shops.checked) {
                        this.all_checked = false;
                        break;
                    }
                }

                this.count();
            },
            checkType(type, pro, shop) {
                pro.checked = true;
                for (let types of pro.product_types) {
                    if (!types.checked) {
                        pro.checked = false;
                        break;
                    }
                }

                shop.checked = true;
                for (let pros of shop.products) {
                    if (!pros.checked) {
                        shop.checked = false;
                        break;
                    }
                }

                this.all_checked = true;
                for (let shops of this.goods) {
                    if (!shops.checked) {
                        this.all_checked = false;
                        break;
                    }
                }

                this.count();
            },
            count() {
                this.goodsNum = 0;
                for (let shop of this.goods) {
                    shop.subtotal.type = 0;
                    shop.subtotal.number = 0;
                    shop.subtotal.money = 0;
                    for (let pro of shop.products) {
                        this.goodsNum ++;
                        for (let type of pro.product_types) {
                            if (type.checked) {
                                shop.subtotal.type ++;
                                shop.subtotal.number += type.number;
                                shop.subtotal.money += type.number * type.price;
                            }
                        }
                    }
                }
            },
            del() {
                if (!this.total.number || !confirm('确认删除这' + this.total.number + '件吗？')) return;

                for (let i = 0; i < this.goods.length; i ++) {
                    for (let j = 0; j < this.goods[i].products.length; j ++) {
                        for (let n = 0; n < this.goods[i].products[j].product_types.length; n ++) {
                            if (this.goods[i].products[j].product_types[n].checked) {
                                this.goods[i].products[j].product_types.splice(n--, 1);
                            }
                        }
                        if (!this.goods[i].products[j].product_types.length) {
                            this.goods[i].products.splice(j--, 1);
                        }
                    }
                    if (!this.goods[i].products.length) {
                        this.goods.splice(i--, 1);
                    }
                }
                if (!this.goods.length) {
                    this.all_checked = false;
                    this.edit = false;
                }

                this.count();
            },
            submit() {
                if (!this.total.number) return;
                this.$router.push({ path: '' });
            }
        },
        mounted() {
            this.count();
        }
    }
</script>

<style scoped>
    .empty {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .empty>p {
        font-size: 36px;
        color: #666;
    }
    .empty>span {
        font-size: 24px;
        color: #666;
        margin-top: 20px;
    }
    .empty>a {
        font-size: 30px;
        color: #fff;
        background-color: #fa5758;
        line-height: 70px;
        padding: 0 20px;
        border-radius: 10px;
        margin-top: 40px;
    }


    .header>.on-off {
        font-size: 24px;
        color: #fff;
        position: absolute;
        right: 130px;
    }



    .bottom-bar {
        background: #fff linear-gradient(to left, transparent 214px, #b2b2b2 214px, #b2b2b2 100%) no-repeat bottom/100% 1px;
        height: 104px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .bottom-bar>.del,
    .bottom-bar>.settlement {
        font-size: 36px;
        color: #fff;
        background-color: #fa5758;
        height: 100%;
        width: 214px;
    }
    .bottom-bar>.del.locked,
    .bottom-bar>.settlement.locked {
        background-color: #888;
    }
    .bottom-bar>.collect {
        font-size: 36px;
        color: #fa5758;
        background-color: #fed2d2;
        height: 100%;
        width: 214px;
        margin-left: auto;
    }
    .bottom-bar>.wrap {
        text-align: right;
        margin-left: auto;
        margin-right: 20px;
    }
    .bottom-bar>.wrap>p {
        font-size: 26px;
        color: #333;
    }
    .bottom-bar>.wrap>span {
        font-size: 26px;
        color: #999;
    }


    .money {
        font-size: 26px;
        color: #fa5758;
    }
    .money>b {
        font-size: 30px;
    }



    .checkbox {
        font-size: 28px;
        color: #666;
        padding-left: 25px;
        padding-right: 20px;
        height: 100%;
        width: 42px;
        background: url("../assets/img/check.png") no-repeat 25px;
        -webkit-appearance: none;
        box-sizing: content-box;
        flex-shrink: 0;
    }
    .checkbox.on {
        background-image: url("../assets/img/checked2.png");
    }
    .check-pro {
        height: auto;
    }
    .check-all {
        font-size: 28px;
        color: #666;
        height: 100%;
        display: flex;
        align-items: center;
    }


    .shop-list>li {
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        margin: 10px;
        background-color: #fff;
    }
    .shop-list>li>.top {
        display: flex;
        align-items: center;
        height: 88px;
        border-bottom: 2px solid #ededed;
    }
    .shop-list>li>.top>.shop {
        font-size: 30px;
        color: #333;
    }
    .shop-list>li>.top>.explain {
        font-size: 26px;
        color: #999;
        margin-right: 25px;
        height: 100%;
        margin-left: auto;
    }
    .shop-list>li>.bottom {
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .shop-list>li>.bottom>span {
        font-size: 26px;
        color: #333;
        margin-right: 25px;
    }
    .shop-list>li>.bottom>.money {
        padding: 0 25px;
        border-left: 2px solid #f3f3f3;
        line-height: 36px;
        height: 36px;
    }


    .pro-list>li {
        border-bottom: 2px solid #ededed;
        padding: 20px 0;
    }
    .pro-list>li>.pro-wrap {
        display: flex;
    }
    .pro-list>li>.pro-wrap>.pro {
        display: flex;
        align-items: center;
        margin-right: 25px;
    }
    .pro-list>li>.pro-wrap>.pro>img {
        width: 160px;
        height: 160px;
        margin-right: 20px;
    }
    .pro-list>li>.pro-wrap>.pro>.wrap>p {
        font-size: 30px;
        color: #333;
        text-align: justify;
    }
    .pro-list>li>.pro-wrap>.pro>.wrap>.tags {
        margin-top: 10px;
    }
    .pro-list>li>.pro-wrap>.pro>.wrap>.tags>span {
        font-size: 20px;
        color: #ff4c5b;
        background-color: #ffd1d5;
        border-radius: 3px;
        padding: 0 10px;
        line-height: 36px;
        display: inline-block;
        margin-right: 20px;
    }


    .type-list>li {
        margin-top: 20px;
        display: flex;
        height: 120px;
    }
    .type-list>li>.type-wrap {
        display: flex;
        align-items: center;
        background-color: #f0f2f5;
        width: 100%;
        margin-right: 25px;
        box-sizing: border-box;
        padding: 0 20px;
        justify-content: space-between;
    }
    .type-list>li>.type-wrap>.wrap>p {
        font-size: 26px;
        color: #666;
    }
    .type-list>li>.type-wrap>.wrap>span {
        font-size: 26px;
        color: #999;
    }
    .type-list>li>.type-wrap>.add-subtract {
        height: 58px;
    }
    .type-list>li>.type-wrap>.add-subtract /deep/ button {
        width: 45px;
    }
    .type-list>li>.type-wrap>.add-subtract /deep/ input {
        width: 44px;
        background-color: #fff;
        font-size: 26px;
        color: #333;
        border-left: 2px solid #e5e5e5;
        border-right: 2px solid #e5e5e5;
    }


    .explain-popups {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .explain-popups /deep/>.content {
        background-color: #fff;
        border-radius: 10px;
        padding: 65px 90px;
        box-sizing: border-box;
    }
    .explain-popups /deep/>.content>p {
        font-size: 36px;
        color: #333;
        margin-bottom: 35px;
    }
    .explain-popups /deep/>.content>span {
        font-size: 30px;
        color: #333;
    }
    .explain-popups /deep/>.content>.close {
        width: 30px;
        height: 30px;
        background: url("../assets/img/close2.png") no-repeat center;
        position: absolute;
        top: 30px;
        right: 30px;
    }
</style>