<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
    mixins: [resize], // 混入此组件中,
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '350px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null
        }
    },
    watch: {
        chartData: {
            // 自动监听异步数据，更新到本地，优点：新的对象，更换;缺点不是事实更新必须调用http待优化
            deep: true,
            handler(val) {
                this.setOptions(val)
            }
        }
    },
    mounted() {
        // node: 显示点击后的值,简单的说就是渲染显示点击后的效果
        this.$nextTick(() => {
            this.initChart()
        })
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions(this.chartData)
        },
        setOptions({ expectedData, actualData } = {}) {
            this.chart.setOption({
                xAxis: {
                    data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13']
                },
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 20,
                    top: 30,
                    containLabel: true
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                yAxis :{
                    type : 'value',
                },
                legend: {
                    data: ['订单数', '付款数']
                },
                series: [
                    {
                    name: '订单数', 
                    itemStyle: {
                        normal: {
                            color: '#3888fa',
                        }
                    },
                    smooth: true,
                    type:'bar',
                    data: expectedData,
                    animationDuration: 2800,
                    animationEasing: 'cubicInOut'
                },
                {
                    name: '付款数',
                    smooth: true,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#FF005A',
                            lineStyle: {
                                color: '#FF005A',
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    data: actualData,
                    animationDuration: 2800,
                    animationEasing: 'quadraticOut'
                }]
            })
        }
    }
}
</script>
