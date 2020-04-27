# 高频问题
## `浅拷贝`和`深拷贝` 
`浅拷贝`是拷贝一层，深层次的对象级别就拷贝引用。

浅拷贝的方法：
1. =（如果是基本数据类型，直接赋值。如果是引用类型，就拷贝引用。）
2. 遍历一层

```js
var obj = { a:1, arr: [2,3] };
var shallowObj = shallowCopy(obj);

function shallowCopy(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}

// object.assign
var x = {
  a: 1,
  b: { f: { g: 1 } },
  c: [ 1, 2, 3 ]
};
var y = Object.assign({}, x);
console.log(y.b.f === x.b.f);     // true
```

`深拷贝`是拷贝多层，每一级别的数据都会拷贝出来。

深拷贝的方法：
1. JSON.parse(JSON.stringify())
2. 递归遍历
3. jQuery的extend
4. lodash.cloneDeep()
5. Oject.create() `mdn`上说不是

`Object.assign()` 如果对象的数据为基本数据类型，则为深拷贝。如果对象是引用类型，则为浅拷贝。(也可以理解为深拷贝第一层，后面的浅拷贝) 

```js
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj); // 系列化对象
        newobj = JSON.parse(str);  // 还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
            cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};
```
```js
// 深拷贝
var copy = JSON.parse(JSON.stringify(person))

function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key]!==null) {
        result[key] = deepCopy(obj[key]);   //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
```

## `防抖`和`节流`

### 防抖
`防抖（debounce）`高频事件触发，是指在N秒内事件只执行一次，如果N秒内执行事件，会重新计算时间。

思路: 每次触发事件时都取消之前的延时调用方法。

防抖应用场景
* 每次 resize/scroll 触发统计事件
* 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）

非立即执行版本
```js
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}
```

立即执行版本
```js
function debounce(func,wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        let callNow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait)

        if (callNow) func.apply(context, args)
    }
}
```

防抖函数
```js
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}
```

### 节流
`节流（throttle）`是指连续触发事件但是N秒内只执行一次。

节流:    高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。

思路：每次触发事件时都判断当前是否有等待执行的延时函数。

函数节流的应用场景有:
* DOM 元素的拖拽功能实现（mousemove）
* 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
* 计算鼠标移动的距离（mousemove）
* Canvas 模拟画板功能（mousemove）
* 搜索联想（keyup）
* 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次

时间戳版
```js
function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

定时器版
```js
function throttle(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
```

节流函数
```js
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait ,type) {
    if(type===1){
        let previous = 0;
    }else if(type===2){
        let timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}
```

## 用户输入URL到底发生了啥
1. 根据URL地址解析出主机名
2. 游览器将主机名转换成服务器IP地址，再从URL中解析出端口号
3. 拿到IP和端口后，建立TCP连接【三次握手】
4. 游览器向服务器发送HTTP请求报文
5. 服务器向游览器返回HTTP响应报文
6. 关闭连接，游览器解析文档

### 游览器渲染HTML步骤

1. HTML被HTML解析器解析成DOM Tree，CSS被CSS解析器解析成CSSOM Tree
2. DOM Tree和CSSOM Tree解析完后，形成渲染树（Render Tree）
3. 节点信息计算（**重排**），这个过程被叫做**Layout(Webkit)**或者**Reflow(Mozilla)**。即根据渲染树计算每个节点的几何信息。
4. 渲染绘制（**重绘**）这个过程被叫做(Painting 或者 Repaint)。即根据计算好的信息绘制整个页面。

## 重绘和重排
重排**一定**会重绘，重绘**不一定**有重排

### 重排（Relayout/Reflow）
所谓重排，实际上是根据渲染树中每个渲染对象的信息，计算出各自渲染对象的几何信息（DOM对象的位置和尺寸大小），并将其安置在界面中的正确位置。

由于浏览器渲染界面是基于流式布局模型的，也就是某一个DOM节点信息更改了，就需要对DOM结构进行重新计算，重新布局界面，再次引发回流，只是这个
结构更改程度会决定周边DOM更改范围，即全局范围和局部范围，全局范围就是从根节点html开始对整个渲染树进行重新布局，例如当我们改变了窗口尺寸
或方向或者是修改了根元素的尺寸或者字体大小等；而局部布局可以是对渲染树的某部分或某一个渲染对象进行重新布局。

引起重排的操作有：
1. 页面首次渲染。
2. 浏览器窗口大小发生改变。
3. 元素尺寸或位置发生改变。 
4. 元素内容变化（文字数量或图片大小等等）。
5. 元素字体大小变化。
6. 添加或者删除可见的DOM元素。
7. 激活CSS伪类（例如：:hover）。
8. 设置style属性
9. 查询某些属性或调用某些方法。

### 重绘（Repainting）
所谓重绘，就是当页面中元素样式的改变并不影响它在文档流中的位置时，例如更改了字体颜色,浏览器会将新样式赋予给元素并重新绘制的过程称。

