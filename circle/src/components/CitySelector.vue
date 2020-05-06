<template>
    <popup ref="popup" class="city-selector-popup" maskCloseMode="click">
        <p class="city-selector-title">选择地区</p>
        <div class="city-selector-current">
            <span class="city-selector-current-province">{{ index.p !== undefined ? citys[index.p].n : '请选择' }}</span>
            <span class="city-selector-current-city"
                  v-if="level === 'c' || level === 'a'">{{ index.c !== undefined ? citys[index.p].c[index.c].n : '请选择' }}</span>
            <span class="city-selector-current-area"
                  v-if="level === 'a'">{{ index.a !== undefined ? citys[index.p].c[index.c].a[index.a] : '请选择' }}</span>
        </div>
        <ul class="city-selector-item scroll-y city-selector-item-province">
            <li v-for="(p, i) in citys"
                :class="{ active: i === index.p }"
                :data-index="i"
                @click="pClick(p.n)"
                :key="i">{{ p.n }}</li>
        </ul>
        <ul class="city-selector-item scroll-y city-selector-item-city"
            v-if="index.p !== undefined && (level === 'c' || level === 'a')">
            <li v-for="(c, i) in citys[index.p].c"
                :class="{ active: i === index.c }"
                :data-index="i"
                @click="cClick(c.n)"
                :key="i">{{ c.n }}</li>
        </ul>
        <ul class="city-selector-item scroll-y city-selector-item-area"
            v-if="index.c !== undefined && level === 'a'">
            <li v-for="(a, i) in citys[index.p].c[index.c].a"
                :class="{ active: i === index.a }"
                :data-index="i"
                @click="aClick(a)"
                :key="i">{{ a }}</li>
        </ul>
    </popup>
</template>

<script>
    import citys from "@/assets/js/citys"
    import Popup from "./Popup";

    export default {
        name: "CitySelector",
        components: {Popup},
        data() {
            return {
                citys,
                level: 'a',
                default: {
                    p: '',
                    c: '',
                    a: ''
                }
            }
        },
        computed: {
            index() {
                let obj = {
                        p: undefined,
                        c: undefined,
                        a: undefined
                    },
                    def = this.default;

                if (def.p) {
                    for (let p = 0; p < citys.length; p++) {
                        if (def.p.search(citys[p].n) !== -1) {
                            obj.p = p;
                            if (this.level !== "p" && def.c) {
                                for (let c = 0; c < citys[p].c.length; c++) {
                                    if (citys[p].c[c].n.search(def.c) !== -1) {
                                        obj.c = c;
                                        if (this.level !== "c" && def.a) {
                                            for (let a = 0; a < citys[p].c[c].a.length; a++) {
                                                if (citys[p].c[c].a[a].search(def.a) !== -1) {
                                                    obj.a = a;
                                                    break;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }

                return obj;
            }
        },
        methods: {
            open(level, def, fn) {
                this.level = level;
                this.default.p = def.p;
                this.default.c = def.c;
                this.default.a = def.a;
                this.selected = fn;

                this.$refs.popup.open();

                setTimeout(() => {
                    let actives = this.$el.querySelectorAll('.city-selector-item>.active');
                    for (let i = 0; i < actives.length; i++) {
                        actives[i].parentNode.scrollTop = actives[i].offsetTop;
                    }
                }, 100);
            },
            close: function () {
                this.$refs.popup.close();
                this.selected(this.default);
            },
            pClick: function (n) {
                this.default.p = n;
                this.default.c = '';
                this.default.a = '';
                if (this.level === "p") this.close();
            },
            cClick: function (n) {
                this.default.c = n;
                this.default.a = '';
                if (this.level === "c") this.close();
            },
            aClick: function (n) {
                this.default.a = n;
                if (this.level === "a") this.close();
            },
            selected: function () {}
        }
    }
</script>

<style scoped>
    .city-selector-popup /deep/>.content {
        position: absolute;
        top: 40%;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff
        linear-gradient(to right,
                #f5f5f5 33.33%,
                transparent 33.33%,
                transparent 66.66%,
                #f5f5f5 66.66%)
        no-repeat bottom/100% calc(100% - 85px);
    }

    .city-selector-popup.popup-enter /deep/>.content,
    .city-selector-popup.popup-leave-to /deep/>.content {
        transform: translate3d(0, 100%, 0);
        opacity: 1;
    }

    .city-selector-title {
        font-size: 24px;
        color: #333;
        line-height: 45px;
        height: 45px;
        text-align: center;
        background: linear-gradient(to right, #d9d9d9 0, #d9d9d9 100%) no-repeat bottom/100% 1px;
    }
    .city-selector-current {
        font-size: 20px;
        color: #333;
        line-height: 40px;
        height: 40px;
        background: linear-gradient(to right, #d9d9d9 0, #d9d9d9 100%) no-repeat bottom/100% 1px;
        display: flex;
    }
    .city-selector-current>span {
        width: 33.33%;
        text-align: center;
    }
    .city-selector-item {
        position: absolute;
        font-size: 20px;
        color: #333;
        top: 85px;
        bottom: 0;
    }
    .city-selector-item-province {
        left: 0;
        right: 66.66%;
    }
    .city-selector-item-city {
        left: 33.33%;
        right: 33.33%;
    }
    .city-selector-item-area {
        left: 66.66%;
        right: 0;
    }
    .city-selector-item>li {
        padding-left: 15%;
        line-height: 40px;
        height: 40px;
        cursor: pointer;
        white-space: nowrap;
        background: linear-gradient(to right, transparent 15%, #e7e7e7 15%, #e7e7e7 100%) no-repeat bottom/100% 1px;
    }
    .city-selector-item>li.active {
        color: #F23030;
    }
    .city-selector-city>li{
        background: linear-gradient(to right, transparent 15%, #ececec 15%, #ececec 100%) no-repeat bottom/100% 1px;
    }
</style>