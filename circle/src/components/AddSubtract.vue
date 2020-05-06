<template>
    <div class="add-subtract">
        <button class="down" :disabled="isMin" @click="$emit('change', --number)"></button>
        <input class="number" type="number" v-model.number="number" @keyup="$emit('change', number)"/>
        <button class="up" :disabled="isMax" @click="$emit('change', ++number)"></button>
    </div>
</template>

<script>
    export default {
        name: "AddSubtract",
        model: {
            prop: 'num',
            event: 'change'
        },
        props: {
            num: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: 10
            },
            min: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                number: this.num
            }
        },
        computed: {
            isMax() {
                if (this.number >= this.max) {
                    this.number = this.max;
                    return true;
                } else {
                    return false;
                }
            },
            isMin() {
                if (this.number <= this.min) {
                    this.number = this.min;
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch: {
            num(to) {
                this.number = to;
            }
        }
    }
</script>

<style scoped>
    .add-subtract {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        height: 30px;
    }
    .add-subtract>.number {
        font-size: 24px;
        padding: 0 10px;
        min-width: 30px;
        text-align: center;
        height: 100%;
    }
    .add-subtract>button {
        width: 30px;
        height: 100%;
        background: #f3f3f3 no-repeat center/45%;
        flex-shrink: 0;
    }

    .add-subtract>.down {
        background-image: url("../assets/img/down.png");
    }
    .add-subtract>.down:disabled {
        background-image: url("../assets/img/down-lock.png");
    }
    .add-subtract>.up {
        background-image: url("../assets/img/up.png");
    }
    .add-subtract>.up:disabled {
        background-image: url("../assets/img/up-lock.png");
    }
</style>