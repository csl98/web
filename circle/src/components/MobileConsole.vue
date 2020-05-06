<template>
    <div class="mobile-console">
        <drag @click="show = !show" tag="button">logs</drag>
        <transition name="fade">
            <pre v-show="show" ref="pre" class="scroll-xy">{{ logs || '空的' }}</pre>
        </transition>
    </div>
</template>

<script>
    import Drag from "./Drag";
    export default {
        name: "MobileConsole",
        components: {Drag},
        data() {
            return {
                log: [],
                logs: '',
                timer: null,
                show: false
            }
        },
        computed: {
            computedLog() {
                let arr = [];
                for (let i = 0; i < this.log.length; i++) {
                    let log = this.log[i];
                    if (this.$typeof(log) === 'arguments') {
                        let arr2 = [];
                        for (let j = 0; j < log.length; j++) {
                            arr2.push(this.handle(log[j], true));
                        }
                        arr.push(arr2);
                    } else {
                        arr.push(this.handle(log, true));
                    }
                }
                return arr;
            }
        },
        methods: {
            handle(obj, first) {
                let txt = '', br = '';
                switch (this.$typeof(obj)) {
                    case 'object':
                        br = first ? '\n' : '';
                        for (let i in obj) {
                            txt += `${br} ${i}: ${ first ? this.handle(obj[i]) : this.$typeof(obj[i], true) },`;
                        }
                        return `{${ txt.substring(0, txt.length-1) }${ first ? '\n' : ' ' }}`;
                    case 'array':
                        br = first ? '\n ' : '';
                        for (let i = 0; i < obj.length; i++) {
                            txt += `${br}${ first ? this.handle(obj[i]) : this.$typeof(obj[i], true) }${ i === obj.length - 1 ? '' : ', ' }`;
                        }
                        return `[ ${txt}${ first ? '\n]' : ' ]' }`;
                    case 'string': return `'${obj}'`;
                    case 'function': return 'function';
                    default: return obj;
                }
            }
        },
        watch: {
            log() {
                for (let i = 0; i < this.computedLog.length; i++) {
                    let cl = this.computedLog[i];
                    if (this.$typeof(cl) === 'array') {
                        for (let j = 0; j < cl.length; j++) {
                            this.logs += `${ !j ? '➛' : '' }${ cl[j] }${ j === cl.length - 1 ? '\n' : ' ' }`;
                        }
                    } else {
                        this.logs += '➛' + cl + '\n';
                    }
                }

                if (this.$refs.pre.$animate) {
                    this.$refs.pre.$animate({ scrollTop: this.$el.scrollHeight, scrollLeft: 0 }, 300).start();
                }
            }
        }
    }
</script>

<style scoped>
    button {
        font-size: 24px;
        color: #333;
        padding: 0 10px;
        border: 1px solid #666;
        opacity: .9;
        background: gray;
    }
    pre {
        position: fixed;
        z-index: 999 !important;
        max-width: 80%;
        max-height: 50%;
        opacity: .9;
        left: 10%;
        top: 20%;
        font-size: 30px;
        color: #333;
        background: gray;
        box-shadow: 0 0 3px 1px #4d4d4d;
    }
</style>