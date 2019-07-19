# VueJS 数字自增组件

组件参数：

- auto-number - 需要自增的数字，类型为数组，一个数字：[12]，多个数字：[343, 35, 353]
- time - 限制数字运行结束使用的时间长度，默认1500毫秒
- auto - 设置是否自动执行，默认不执行

使用方法：

通过 `scope.autoNumber`取到对应的自增数字


```vue
<!-- index.vue -->
<template>
    <auto-number ref="autoNumber" :auto-number="numbers" :time="time" :auto="auto">
        <template slot-scope="scope">
            <p>一般使用形式</p>
            <h2>{{parseInt(scope.autoNumber[0])}}</h2>
            <h2>{{parseInt(scope.autoNumber[1])}}</h2>
            <h2>{{parseInt(scope.autoNumber[2])}}</h2>
            <p>特殊使用方式</p>
            <h2>带浮点数： {{scope.autoNumber[0]}}</h2>
            <h2>组合小数：{{parseInt(scope.autoNumber[1])}}.{{parseInt(scope.autoNumber[2])}}</h2>
        </template>
    </auto-number>
</template>

<script>
export default {
    data() {
        return {
            auto: true, // 设置自动运行
            time: 1000, // 设置运行时间长度
            numbers: [2300.33, 56]
        }
    },
    components: {
        'auto-number': require('./autoNumber.vue')
    }
}
</script>
```

