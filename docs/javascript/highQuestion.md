# 高频问题

## Array的内建方法

### Array
* `from()`： 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
* `isArray()`：用于确定传递的值是否是一个`Array`。

### Array.prototype
* 修改原数组
  * `pop()`：**删除最后一个**元素，并返回该元素。更改数组长度。
  * `push()`：将**一个或多个元素**添加到数组的**末尾**，并返回该数组的新长度。
  * `shift()`：方法从数组中**删除第一个**元素，并返回该元素。此方法更改数组的长度。
  * `unshift()`：将**一个或多个元素**添加到数组的**开头**，并返回该数组的新长度(该方法修改原有数组)。
  * `reverse()`：反转数组，并返回该数组。
  * `sort()`：对数组进行排序。
  * `splice()`：**删除或替换**现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
  
* 创建新数组
  * `map()`：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
  * `filter()`：过滤符合条件的数组元素，返回一个新数组。
  * `slice()` ：返回一个新的数组，这一对象是一个由`begin`和`end`决定的原数组的浅拷贝（包括`begin`，不包括`end`）。
  * `concat()` ：用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
  * `flat()`：方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

* 查找数组
  * `find()`：返回数组中满足提供的测试函数的第一个元素的值。否则返回`undefined`。
  * `findIndex()`：返回数组中满足提供的测试函数的第一个元素的值的`index`。否则返回`-1`。
  * `indexOf()`：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回`-1`。

* 判断数组
  * `includes()`：用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回`true`，否则返回`false`
  * `some()` ：测试数组中是不是有元素通过了被提供的函数测试
  * `every()` ：测试一个数组内的所有元素是否都能通过某个指定函数的测试
  
* `forEach()`：对数组的每个元素执行一次提供的函数，`renturn undefined`。
* `join()` ：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串
* `reduce()`：方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

### Doc
[Array - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 数组去重
1. indexOf
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(array){
  var n = []; // 一个新的临时数组
  array.forEach((item) => {
    if(n.indexOf(item) === -1){
      n.push(item)
    }
  });
  return n
}

arr = unique(arr);
```

2. splice
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(a) {
    for(let i = 0; i < a.length; i ++) {
        for(let j = i+1; j < a.length; j ++) {
            if(a[i] == a[j]) {
                a.splice(j, 1);
                j --;
            }
        }
    }
}
unique(arr);
```

3. 数组下标判断法
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(array){
  var n = [array[0]]; // 结果数组
  for(var i = 1; i < array.length; i++) { // 从第二项开始遍历
    if (array.indexOf(array[i]) == i) 
      n.push(array[i]);
  }
  return n;
}

function unique2(array) {
    return array.filter((item, index, arr) => {
        return array.indexOf(item) === index
    })
}
arr = unique(arr);
```

4. set
```js
var arr = ['12','32','89','12','12','78','12','32'];
arr = [...new Set(arr)];

function dedupe(array) {
  return Array.from(new Set(array));       // Array.from()能把set结构转换为数组
}
```

5. reduce + includes
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(a) {
    return a.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur]
    }, [])
}
arr = unique(arr)
```

6. 利用对象的key不能重复
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(a) {
    let obj = {};
    let array = [];
    arr.forEach(item => {
        if(!obj[item]) {
            obj[item] = item;
            array.push(item);
        }
    })
    return array;
}
arr = unique(arr);
```

## `XSS`跨站脚本攻击
`XSS`跨站脚本攻击通过网页漏洞来执行恶意的`Javascript`代码。

### 存储型`XSS`攻击
利用漏洞提交恶意`JavaScript`代码，比如在input, textarea等所有可能输入文本信息的区域，输入javascript恶意代码等
提交后信息会存在服务器中，当用户再次打开网站请求到相应的数据，打开页面，恶意脚本就会将用户的 Cookie 信息等数据上传到黑客服务器。

### 反射型 XSS 攻击
QQ邮件等发送过来的恶意链接。

### 基于`DOM`的`XSS`攻击
基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。它的特点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。
比如利用工具(如Burpsuite)扫描目标网站所有的网页并自动测试写好的注入脚本等。

### XSS预防

1. 将cookie等敏感信息设置为httponly，禁止Javascript通过document.cookie获得
2. 对所有的输入做严格的校验尤其是在服务器端，过滤掉任何不合法的输入，比如手机号必须是数字，通常可以采用正则表达式.
3. 净化和过滤掉不必要的html标签，比如：iframe, alt,script ;净化和过滤掉不必要的Javascript的事件标签，比如：onclick, onfocus等
4. 转义单引号，双引号，尖括号等特殊字符，可以采用htmlencode编码 或者过滤掉这些特殊字符
5. CSP,CSP 全称为 Content Security Policy，即内容安全策略。主要以白名单的形式配置可信任的内容来源，在网页中，能够使白名单中的内容正常执行（包含 JS，CSS，Image 等等），而非白名单的内容无法正常执行，从而减少跨站脚本攻击（XSS），当然，也能够减少运营商劫持的内容注入攻击。
   
配置方式： 
```
//1、meta
<meta http-equiv="Content-Security-Policy" content="script-src 'self'">

//2、Http 头部
Content-Security-Policy:
script-src 'unsafe-inline' 'unsafe-eval' 'self' *.54php.cn *.yunetidc.com *.baidu.com *.cnzz.com *.duoshuo.com *.jiathis.com;report-uri /error/csp
```

## `CSRF`跨站请求伪造
`CSRF`跨站请求伪造（Cross-site request forgery）引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。

发生`CSRF`的必要条件：
1. 目标站点一定要有 CSRF 漏洞；
2. 用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；
3. 需要用户打开一个第三方站点，如黑客的站点等。

### CSRF预防

1. 充分利用好 Cookie 的 SameSite 属性。
```
set-cookie: 1P_JAR=2019-10-20-06; expires=Tue, 19-Nov-2019 06:36:21 GMT; path=/; domain=.google.com; SameSite=none
```

2. 验证请求的来源站点
验证HTTP请求头中的`Origin`和`Referer`。
```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: keep-alive
Host: comment-wrapper-ms.juejin.im
Origin: https://juejin.im
Pragma: no-cache
Referer: https://juejin.im/post/5dca1b376fb9a04a9f11c82e
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36
X-Juejin-Client: 1574834410506
X-Juejin-Src: web
X-Juejin-Token: eyJhY2Nlc3NfdG9rZW4iOiJXOXduNFBaT1RpdGhrRzdaIiwicmVmcmVzaF90b2tlbiI6ImwwVjVJcERlV3BrOGVpc0wiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==
X-Juejin-Uid: 59c9cedbf265da06690875a6
```
3. 在请求地址中添加token并验证
token前可以增加约定好的随机的字符串

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

## 事件机制
事件机制包括：事件捕获，事件目标，事件冒泡，事件代理【事件委托叫法不同或者说主体不同】。

一般来说事件机制`W3C标准`先触发事件捕获 => 目标事件 => 事件冒泡。`IE`中先触发事件冒泡 => 目标事件 => 事件捕获。

* 阻止事件冒泡：`W3C标准`中使用`stopPropagation()`；在`IE`中使用`cancelBubble = true`;
* 阻止事件捕获：`W3C标注`中使用`preventDefault()`；在`IE`中使用`window.event.returnValue = false`

### addEventListener
如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。
```js
// 以下会先打印冒泡然后是捕获
// addEventListener默认第三个参数是false也就是在冒泡阶段触发。
node.addEventListener('click',(event) =>{
    console.log('冒泡')
},false); // false 冒泡
node.addEventListener('click',(event) =>{
    console.log('捕获 ')
},true)   // true 捕获
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


## 前端性能优化

* 【1】减少DOM操作
  - 最小化DOM访问次数，暂存DOM
* 【2】采用更优的API替代消费高的API
  - 用`querySelectorAll()`替代`getElementByXX()`.
  - 开启动画GPU，把渲染计算交给GPU
  - 少用HTML集合（类数组）来遍历.
  - 用事件委托
* 【3】减少重排
  - 避免设置大量的style属性，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow，所以最好是使用class属性。
  - 实现元素的动画，它的position属性，最好是设为absoulte或fixed，这样不会影响其他元素的布局
  - 动画实现的速度的选择。比如实现一个动画，以1个像素为单位移动这样最平滑，但是reflow就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多。
  - 不要使用table布局
* 【4】css及动画处理
  - 少用css表达式
  - 减少通过JavaScript代码修改元素样式，尽量使用修改class名方式操作样式或动画；
  - 动画尽量使用在绝对定位或固定定位的元素上；
  - 隐藏在屏幕外，或在页面滚动时，尽量停止动画；


