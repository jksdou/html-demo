window.onload = function () {
  (function () {
    // 创建DIV
    function creatDiv() {
      // 创建DIV并追加到父元素
      var snowDiv = document.createElement("div");
      document.getElementById("js_sonw").appendChild(snowDiv);
      // 让创建DIV的class为随机，显示不同的雪花
      var whatName = ["snow_one parent", "snow_two parent", "snow_three parent", "snow_four parent"];
      var index = Math.floor(Math.random() * whatName.length);
      snowDiv.className = whatName[index];
      // 获取该DIV的left属性值(随机的)并赋值给创建的DIV
      var whatLeft = getLeft() + 'px';
      snowDiv.style.left = whatLeft;
      return snowDiv;
    }
    // 获取随机left属性值
    function getLeft() {
      // 获取该DIV的最大left属性值即父元素的宽度
      var eleParent = document.getElementById("js_sonw");
      // 获取父元素的所有style样式
      var style = window.getComputedStyle(eleParent);
      // CSS中的left是负数这里得减去下
      var maxWidth = parseInt(style.width) + 70;
      // 让创建的DIV的left为随机值
      var randomLeft = Math.floor(Math.random() * maxWidth);
      return randomLeft;
    }
    // 让其向下移动
    function moveDown() {
      // 获取移动对象
      var moveElem = creatDiv();
      // 获取移动对象的所有style属性值
      var eleStyle = window.getComputedStyle(moveElem);
      // 获取它的top属性值
      var eleTop = parseInt(eleStyle.top);
      // 设置定时器动态改变移动对象的top属性值
      var t = setInterval(function () {
        eleTop++;
        // 把新的top值付给移动对象
        moveElem.style.top = eleTop + "px";
        // 当下落到屏幕的高度后停止定时器并把该移动对象从父元素删除
        if (eleTop >= window.innerHeight) {
          clearInterval(t);
          document.getElementById("js_sonw").removeChild(moveElem);
        }
      }, 10);//下落速度没10毫秒下落1px
    }
    document.body.style.height = document.documentElement.clientHeight + "px";
    // 每500毫秒创建一个移动对象并执行移动函数
    var t = setInterval(function () {
      moveDown();
    }, 100);
  })()
}