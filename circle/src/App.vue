<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view :key="key"/>
        </transition>
        <mobile-console/>
    </div>
</template>

<script>
    import MobileConsole from "./components/MobileConsole";
    export default {
        components: {MobileConsole},
        data() {
            return {
                transitionName: 'fade'
            }
        },
        computed: {
            key() {
                return this.$route.name !== undefined ?
                    this.$route.name + new Date().getTime() :
                    this.$route + new Date().getTime();
            }
        },
        created() {
            this.$store.commit('set_curCity', {
                a: '定位中...'
            });

            navigator.geolocation.getCurrentPosition((position) => {
                let lng = position.coords.longitude,
                    lat = position.coords.latitude,
                    point = new BMap.Point(lng, lat),
                    geo = new BMap.Geocoder({ extensions_town: true });

                this.$log(`经度：${lng}, 纬度：${lat}`);

                this.$store.commit('set_curCity', {
                    a: '定位成功'
                });

                geo.getLocation(point, result => {
                    let obj = result.addressComponents;

                    this.$log(obj);

                    this.$store.commit('set_curCity', {
                        p: obj.province,
                        c: obj.city,
                        a: obj.district
                    });
                })

            }, (error) => {
                let msg = '';
                this.$log(error.message);
                switch(error.code)
                {
                    case error.PERMISSION_DENIED:
                        msg="用户已拒绝"
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg="位置信息不可用"
                        break;
                    case error.TIMEOUT:
                        msg="请求超时"
                        break;
                    case error.UNKNOWN_ERROR:
                        msg="未知错误"
                        break;
                }

                this.$store.commit('set_curCity', {
                    a: msg
                });

            }, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 30000
            });
        },
        watch: {
            $route(to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;

                if (toDepth === fromDepth || from.path === '/') {
                    this.transitionName = 'fade';
                } else if (toDepth < fromDepth) {
                    this.transitionName = 'slide-right';
                } else {
                    this.transitionName = 'slide-left';
                }
            }
        },
    }
</script>
