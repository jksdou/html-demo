h5 storage事件监听
原文 http://blog.csdn.net/ruangong1203/article/details/52841135  2016-10-24 06:05:36  25 ℃ 0 评论
分析
引用《h5移动web开发指南》上的话：

“当同源页面的某个页面修改了localStorage,其余的同源页面只要注册了storage事件，就会触发”

所以，localStorage的例子运行需要如下条件：

同一浏览器打开了两个同源页面
其中一个网页修改了localStorage
另一网页注册了storage事件
很容易犯的错误是，在同一个网页修改本地存储，又在同一个网页监听，这样是没有效果的。

例子
网页A：监听了storage事件：

<!DOCTYPE html>
<html>
<head lang="en">
    <title>A</title>
</head>
<body>
<script>
    window.addEventListener("storage", function (e) {
        alert(e.newValue);
    });
</script>
</body>
</html>
网页B：修改了localStorage

<!DOCTYPE html>
<html>
<head lang="en">
    <title>B</title>
</head>
<body>
<script>
    localStorage.clear();
    localStorage.setItem('foo', 'bar');
</script>
</body>
</html>
运行 ： 将上面两个网页保存，放到同一个服务器上，然后，先打开A.html，再打开B.html。就会看到A.html会弹出提示框。注意两个网页要同源。

扩展
如果非得要在同一网页监听怎么办？可以重写localStorage的方法，抛出自定义事件：

<!DOCTYPE html>
<html>
<head lang="en">
    <title>A</title>
</head>
<body>
<script>
    var orignalSetItem = localStorage.setItem;
    localStorage.setItem = function(key,newValue){
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.newValue = http://blog.csdn.net/ruangong1203/article/details/newValue;
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this,arguments);
    }
    window.addEventListener("setItemEvent", function (e) {
        alert(e.newValue);
    });
    localStorage.setItem("nm","1234");
</script>
</body>
</html>