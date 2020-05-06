<script>
    export default {
        name: "OnOff",
        props: {
            bool: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: 'button'
            }
        },
        model: {
            prop: 'bool',
            event: 'click'
        },
        data() {
            return {
                on: this.bool
            }
        },
        computed: {
            classname() {
                return `on-off ${ this.on ? 'on' : 'off' }`;
            }
        },
        render(h) {
            return h(this.tag, {
                class: this.classname,
                on: {
                    click: () => this.$emit('click', this.on = !this.on)
                }
            }, this.$slots.default);
        },
        watch: {
            bool(to) {
                this.on = to;
            }
        }
    }
</script>