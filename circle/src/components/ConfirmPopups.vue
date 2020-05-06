<template>
    <popup class="confirm-popups" ref="popup">
        <p>{{ msg }}</p>
        <div>
            <button @click="noClick">{{ noText }}</button>
            <button @click="yesClick">{{ yesText }}</button>
        </div>
    </popup>
</template>

<script>
    export default {
        name: "ConfirmPopups",
        props: {
            msg: {
                type: String,
                required: true
            },
            yesText: {
                type: String,
                default: '是'
            },
            noText: {
                type: String,
                default: '否'
            }
        },
        data: function () {
            return {
                noFn: undefined,
                yesFn: undefined
            }
        },
        methods: {
            noClick() {
                this.$refs.popup.close();
                if (this.noFn) this.noFn();
            },
            yesClick() {
                this.$refs.popup.close();
                if (this.yesFn) this.yesFn();
            },
            open(yes, no) {
                this.$refs.popup.open();
                this.yesFn = yes;
                this.noFn = no;
            }
        }
    }
</script>

<style scoped>
    .confirm-popups {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .confirm-popups /deep/>.content {
        background-color: #fff;
        border-radius: 10px;
        width: 666px;
        height: 258px;
        box-sizing: border-box;
        padding: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .confirm-popups /deep/>.content>p {
        font-size: 34px;
        color: #333;
    }
    .confirm-popups /deep/>.content>div {
        text-align: right;
    }
    .confirm-popups /deep/>.content>div>button {
        font-size: 34px;
        color: #fa5758;
        margin-left: 80px;
    }
</style>