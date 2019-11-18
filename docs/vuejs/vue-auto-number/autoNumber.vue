<template>
    <div>
        <slot name="default" v-bind:autoNumber="numbers"></slot>
    </div>
</template>

<!-- 使用说明
<component-name :autoNumber="[222, 333, 444]">
    <template slot-scope="scope">
        <span>{{parseInt(scope.autoNumber[0])}}</span>
        <span>{{parseInt(scope.autoNumber[1])}}</span>
        <span>{{parseInt(scope.autoNumber[2])}}</span>
    </template>
</component-name>
-->

<script>
export default {
    data () {
        return {
            numbers: [], // 最终展示的数据
            interval: [], // 数字递增间距
            running: false // 正在运行
        }
    },
    props: {
        auto: { // 是否渲染时就执行
            type: Boolean,
            default: false
        },
        autoNumber: { // 需要显示的自增数字
            type: Array
        },
        time: { // 自增结束所用时长, 单位毫秒
            type: Number,
            default: 1500
        }
    },
    mounted () {
        if (this.auto) {
            // 自动运行
            this.rotateNumber()
        } else {
            // 重置为0
            this.initDefaultNumbers()
        }
    },
    methods: {
        initDefaultNumbers () {
            // 初始化当前默认的数字列表
            if (this.autoNumber) {
                this.numbers = this.autoNumber.map(item => {
                    return 0
                })
            }
        },
        rotateNumber () {
            if (!this.autoNumber || this.running) {
                return
            }
            this.initDefaultNumbers()

            // 递增大小
            this.interval = this.autoNumber.map(item => {
                 return item * 17 / this.time
            })
            this.autoNumber.forEach((eachVal, index) => {
                let tt = () => {
                    // console.log(this.interval, index)
                    if (this.numbers[index] <= this.autoNumber[index]) {
                        if (this.numbers[index] + this.interval[index] > this.autoNumber[index]) {
                            this.numbers[index] = this.autoNumber[index]
                            this.$forceUpdate()
                            this.running = false
                            return
                        } else {
                            this.running = true
                            this.numbers[index] = this.numbers[index] + this.interval[index]
                        }
                    } else {
                        // console.log('执行', this.numbers[index])
                        this.running = true
                        this.numbers[index] = this.numbers[index] + this.interval[index]
                    }
                    this.numbers[index].toFixed(2)
                    this.$forceUpdate()
                    requestAnimationFrame(tt)
                }
                tt()
            })
        },
        run () {
            // 运行
            this.rotateNumber()
        },
        reset () {
            // console.log('重置')
            if (!this.running && this.autoNumber) {
                this.initDefaultNumbers()
                this.$forceUpdate()
            }
        }
    }
}
</script>
