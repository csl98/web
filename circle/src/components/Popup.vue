<template>
    <transition name="popup">
        <div v-show="show" class="popup" :class="{ show: show }" @touchstart.stop="touchstart" @touchmove.stop="touchmove">

            <i v-if="maskCloseMode === 'click'" class="mask" :style="{ backgroundColor: maskBgColor }" @click.prevent="close"></i>
            <i v-else-if="maskCloseMode === 'touchstart'" class="mask" :style="{ backgroundColor: maskBgColor }" @touchstart.prevent="close"></i>
            <i v-else class="mask" :style="{ backgroundColor: maskBgColor }"></i>

            <div class="content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Popup",
        props: {
            mode: {
                type: String,
                default: ''//pointer eventTarget target
            },
            target: {
                type: String,
                default: ''
            },
            direction: {
                type: String,
                default: 'left bottom'
            },
            offset: {
                type: Array,
                default: () => ([0, 0])
            },
            openEl: {
                type: String,
                default: ''
            },
            closeEl: {
                type: String,
                default: ''
            },
            toggleEl: {
                type: String,
                default: ''
            },
            maskCloseMode: {
                type: String,
                default: ''
            },
            maskBgColor: {
                type: String,
                default: 'rgba(51,51,51,.5)'
            },
            isAlone: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: false,
                scrollEl: null,
                startY: 0,
                startX: 0,
                lastOpenEl: null
            }
        },
        methods: {
            open(e) {
                if (this.isAlone) {
                    var popups = this.$root.$getChildren('popup');
                    for (var i = 0; i < popups.length; i++) { popups[i].close() }
                }

                this.show = true;

                if (e) this.lastOpenEl = e.target;

                if (document.querySelector('.popup.show')) {
                    var opened = document.querySelectorAll('.popup.show'),
                        maxZ = 0,
                        z = 0;
                    for (var i = 0; i < opened.length; i ++) {
                        z = Number(opened[i].$getStyle('z-index'));
                        z > maxZ && (maxZ = z);
                    }
                    this.$el.style.zIndex = maxZ + 1;
                }

                if (this.mode) {
                    setTimeout(() => {
                        var content = this.$el.querySelector('.content'),
                            t = this.offset[1],
                            l = this.offset[0],
                            rect;

                        if (this.mode === 'target') {
                            rect = document.querySelector(this.target).getBoundingClientRect();
                        } else if (this.mode === 'eventTarget' && e) {
                            rect = e.target.getBoundingClientRect();
                        }

                        if (this.direction.search(/top/) !== -1) {
                            t = (rect.top - content.offsetHeight + t) < 0 ?
                                rect.bottom + t :
                                (rect.top - content.offsetHeight + t);
                        } else if (this.direction.search(/bottom/) !== -1) {
                            t = (rect.bottom + content.offsetHeight + t) > window.innerHeight ?
                                (rect.top - content.offsetHeight + t) :
                                rect.bottom + t;
                        }
                        if (this.direction.search(/left/) !== -1) {
                            l += rect.left;
                        } else if (this.direction.search(/right/) !== -1) {
                            l += rect.right - content.offsetWidth;
                        }

                        if (t < 0) t = 0;
                        if (l < 0) l = 0;

                        content.style.cssText = 'top:' + t + 'px;left:' + l + 'px;';
                    }, 30);
                }
            },
            close() {
                this.show = false;
            },
            touchstart(e) {
                var target = e.target;
                this.scrollEl = null;
                this.startY = e.changedTouches[0].clientY;
                this.startX = e.changedTouches[0].clientX;
                while (!this.scrollEl && target !== this.$el) {
                    if (target.$scrollDirection()) this.scrollEl = target;
                    target = target.parentNode;
                }
            },
            touchmove(e) {
                var moveY = e.changedTouches[0].clientY,
                    moveX = e.changedTouches[0].clientX;
                if (this.scrollEl) {
                    var edge = this.scrollEl.$isScrollEdge(true);
                    switch (this.scrollEl.$scrollDirection()) {
                        case 'y':
                            if (edge.t && moveY > this.startY || edge.b && moveY < this.startY) e.preventDefault();
                            break;
                        case 'x':
                            //if (edge.l && moveX > this.startX || edge.r && moveX < this.startX) e.preventDefault();
                            break;
                        case 'xy':
                            //if (edge.l && moveX > this.startX || edge.r && moveX < this.startX || edge.t && moveY > this.startY || edge.b && moveY < this.startY) e.preventDefault();
                            break;
                    }
                } else {
                    e.preventDefault();
                }
            }
        },
        mounted() {
            document.addEventListener('click', e => {
                var target = e.target, openEl = null;
                while (!openEl && target !== document && this.openEl) {
                    if (Array.from(document.querySelectorAll(this.openEl)).indexOf(target) > -1) {
                        openEl = target;
                    } else {
                        target = target.parentNode;
                    }
                }
                openEl && this.open(e);
            });

            document.addEventListener('click', e => {
                var target = e.target, closeEl = null;
                while (!closeEl && target !== document && this.closeEl) {
                    if (Array.from(document.querySelectorAll(this.closeEl)).indexOf(target) > -1) {
                        closeEl = target;
                    } else {
                        target = target.parentNode;
                    }
                }
                closeEl && this.close(e);
            });

            document.addEventListener('click', e => {
                var target = e.target, toggleEl = null;
                while (!toggleEl && target !== document && this.toggleEl) {
                    if (Array.from(document.querySelectorAll(this.toggleEl)).indexOf(target) > -1) {
                        toggleEl = target;
                    } else {
                        target = target.parentNode;
                    }
                }
                if (toggleEl) this.show ? this.close() : this.open();
            });

            this.$el.querySelector('.close') && this.$el.querySelector('.close').addEventListener('click', this.close);
        },
        watch: {
            show(to, from) {
                this.$emit('change', to);
            }
        }
    }
</script>

<style scoped>
    .popup-enter-active, .popup-leave-active,
    .popup-enter-active>.mask, .popup-leave-active>.mask,
    .popup-enter-active>.content, .popup-leave-active>.content {
        transition-duration: .3s;
    }
    .popup-enter>.mask, .popup-leave-to>.mask,
    .popup-enter>.content, .popup-leave-to>.content {
        opacity: 0;
    }

    .popup {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 999;
        touch-action: none;
    }
    .mask {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .content {
        position: relative;
        z-index: 1;
    }
</style>