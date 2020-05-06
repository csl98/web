<script>
    export default {
        name: "Drag",
        props: {
            tag: {
                type: String,
                default: 'div'
            }
        },
        data() {
            return {
                disX: 0,
                disY: 0
            }
        },
        render(h) {
            return h(
                this.tag,
                {
                    class: 'drag',
                    on: {
                        touchstart: this.start,
                        touchmove: this.move,
                        touchend: this.end,
                        mousedown: this.start,
                        click: () => {
                            this.$emit('click', this)
                        }
                    }
                },
                this.$slots.default
            )
        },
        methods: {
            start(event) {
                let e = event.changedTouches ? event.changedTouches[0] : event;
                this.disX = e.clientX - this.$el.offsetLeft;
                this.disY = e.clientY - this.$el.offsetTop;
                document.addEventListener('mousemove', this.move);
                document.addEventListener('mouseup', this.end);
            },
            move(event) {
                event.preventDefault();
                let e = event.changedTouches ? event.changedTouches[0] : event,
                    l = e.clientX - this.disX,
                    t = e.clientY - this.disY,
                    el = this.$el,
                    docEl = document.documentElement;
                if(l < 0){
                    l = 0;
                }else if(l > docEl.clientWidth - el.offsetWidth){
                    l = docEl.clientWidth - el.offsetWidth;
                }
                if(t < 0){
                    t = 0;
                }else if(t > docEl.clientHeight - el.offsetHeight){
                    t = docEl.clientHeight - el.offsetHeight;
                }
                el.style.left = l + 'px';
                el.style.top = t + 'px';
            },
            end() {
                document.removeEventListener('mousemove', this.move);
                document.removeEventListener('mouseup', this.end);
            }
        }
    }
</script>

<style scoped>
    .drag {
        position: fixed;
        z-index: 9999 !important;
        left: 0;
        top: 0;
    }
</style>