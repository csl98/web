<template>
    <input class="datetime" type="text" @click="click">
</template>

<script>
    import '../assets/js/jquery-3.3.1.min'
    import '../assets/plugin/datatime/bootstrap.css'
    import '../assets/plugin/datatime/bootstrap-datetimepicker.min.css'
    import '../assets/plugin/datatime/bootstrap.min'
    import '../assets/plugin/datatime/bootstrap-datetimepicker.min'
    import '../assets/plugin/datatime/bootstrap-datetimepicker.zh-CN'

    export default {
        name: 'DatetimeInput',
        props: {
            options: {
                type: Object,
                default: () => ({})
            }
        },
        methods: {
            click() {
                $(this.$el).datetimepicker('show');
            }
        },
        mounted() {
            $(this.$el).datetimepicker(this.deepObjectMerge({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn:  1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0
            }, this.options));
        }
    }
</script>