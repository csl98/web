<template>
    <div class="star-rating" :style="{ width: width ? width + 'px' : 'auto' }">
        <span class="star" v-for="(item, index) in number" :key="index" :style="{ width: size.split('x')[0] + 'px', height: size.split('x')[1] + 'px' }">
            <span class="filling" :class="{ 'filled': index < int }" :style="{ width: (index > int ? 0 : dec ) + '%', backgroundColor: color }"></span>
        </span>
    </div>
</template>

<script>
    export default {
        name: "StarRating",
        props: {
            score: {
                type: [String, Number],
                required: true
            },
            color: {
                type: String,
                default: 'red'
            },
            size: {
                type: String,
                default: '20x20'
            },
            width: {
                type: [String, Number],
                default: 100
            },
            number: {
                type: Number,
                default: 5
            }
        },
        computed: {
            int() {
                return Number(Number(this.score).toFixed(2).split('.')[0]);
            },
            dec() {
                return Number(Number(this.score).toFixed(2).split('.')[1]);
            }
        }
    }
</script>

<style scoped>
    .star-rating {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .star-rating>.star{
        clip-path: polygon(50% 0, 65% 33%, 100% 38%, 74% 62%, 78% 100%, 48% 81%, 13% 95%, 22% 62%, 0 33%, 35% 31%);
        -webkit-clip-path: polygon(50% 0, 65% 33%, 100% 38%, 74% 62%, 78% 100%, 48% 81%, 13% 95%, 22% 62%, 0 33%, 35% 31%);
        background-color: #ccc;
    }
    .star-rating>.star>.filling{
        display: block;
        height: 100%;
        width: 0;
    }
    .star-rating>.star>.filled {
        width: 100% !important;
    }
</style>