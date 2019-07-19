<template>
    <div class="auto-number">
        <h1>自增数字</h1>
        <!-- 使用范例 start -->
        <auto-number ref="autoNumber"
            :auto-number="numbers"
            :time="time"
            :auto="auto">
            <template slot-scope="scope">
                <p>一般使用形式</p>
                <h2>{{parseInt(scope.autoNumber[0])}}</h2>
                <h2 class="text-red">{{parseInt(scope.autoNumber[1])}}</h2>
                <h2>{{parseInt(scope.autoNumber[2])}}</h2>
                <p>特殊使用方式</p>
                <h2>带浮点数： {{scope.autoNumber[0]}}</h2>
                <h2>组合小数：{{parseInt(scope.autoNumber[1])}}.{{parseInt(scope.autoNumber[2])}}</h2>
            </template>
        </auto-number>
        <!-- 使用范例 end -->
        <hr />
        <h2>函数：run()</h2>
        <p><button @click="$refs.autoNumber.run()">开始</button></p>
        <hr />
        <h2>函数：reset()</h2>
        <p><button @click="$refs.autoNumber.reset()">重置</button></p>
        <hr />
        <h2>设置</h2>
        <p>时长设置：<input type="number" v-model="time" min="1000" max="5000" /></p>
    </div>
</template>
<script>

export default {
    data() {
        return {
            auto: true, // 设置自动运行
            time: 1000, // 设置运行时间长度
            numbers: [2300.33, 3456, 56]
        }
    },
    components: {
        'auto-number': require('./autoNumber.vue')
    }
}
</script>

<style lang="css">
    h1 {
        text-align: center;
    }
    .text-red {
        color: red;
    }
    input[type="number"] {
        width: 100px;
        height: 30px;
        border: 1px solid #ddd;
        padding-left: 5px;
        padding-right: 5px;
    }
    button {
        height: 30px;
        width: 100px;
        color: #fff;
        background-color: #8787e4;
        padding: 5px;
        border-radius: 5px;
    }
    button:hover {
        background-color: aliceblue;
        color: blue
    }
</style>