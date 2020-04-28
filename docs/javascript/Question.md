# Question

## 浅拷贝和深拷贝

### 浅拷贝
`浅拷贝`是拷贝一层，深层次的对象级别就拷贝引用。

浅拷贝的方法：
1. =（如果是基本数据类型，直接赋值。如果是引用类型，就拷贝引用。）
2. 遍历一层
```js {2,8}
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

### 深拷贝
`深拷贝`是拷贝多层，每一级别的数据都会拷贝出来。

深拷贝的方法：
1. JSON.parse(JSON.stringify())
2. 递归遍历
3. jQuery的extend
4. lodash.cloneDeep()
5. Oject.create() `mdn`上说不是

### Object.assign()
`Object.assign()`**如果对象的数据为基本数据类型，则为深拷贝。如果对象是引用类型，则为浅拷贝。**(也可以理解为深拷贝第一层，后面的浅拷贝) 
```js
// 深拷贝
var copy = JSON.parse(JSON.stringify(person))

var deepCopy = function(obj) {
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

## 防抖和节流
防抖和节流区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，**防抖的情况下只会调用一次，而节流的情况会每隔一定时间（参数wait）调用函数。**

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

```js
// 这个是用来获取当前时间戳的
function now() {
  return +new Date()
}
/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce (func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

### 节流
`节流（throttle）`是指连续触发事件但是N秒内只执行一次。

节流：高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。

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

```js
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
      // 首次进入前者肯定为 true
      // 如果需要第一次不执行函数
      // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
      // 如果设置了 trailing，只会进入这个条件
      // 如果没有设置 leading，那么第一次会进入这个条件
      // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
      // 其实还是会进入的，因为定时器的延时
      // 并不是准确的时间，很可能你设置了2秒
      // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
        // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
```

## 用户输入URL到底发生了啥？
1. 根据URL地址解析出主机名
2. 游览器将主机名转换成服务器IP地址，再从URL中解析出端口号
3. 拿到IP和端口后，建立TCP连接【三次握手】
4. 游览器向服务器发送HTTP请求报文
5. 服务器向游览器返回HTTP响应报文
6. 关闭连接，游览器解析文档

### 游览器渲染HTML步骤

1. HTML 被 HTML解析器 解析成`DOM Tree`，CSS 被 CSS解析器 解析成`CSSOM Tree`。
2. DOM Tree 和 CSSOM Tree 解析完后，形成**渲染树（Render Tree）**。
3. 节点信息计算（**重排**），这个过程被叫做 Layout(Webkit) 或者 Reflow(Mozilla)。即根据渲染树计算每个节点的几何信息。
4. 渲染绘制（**重绘**）这个过程被叫做 Painting 或者 Repaint。即根据计算好的信息绘制整个页面。

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

## 求以下输出结果

### 输出结果是
```js
var tasks = [];
var output = function(i){
  return new Promise(function(resolve){
   setTimeout(function(){
      console.log(new Date(), i)
      resolve(i);
    },1000)
  })
}

for(var i = 0; i < 5; i ++){
  tasks.push(output(i));
}

Promise.all(tasks).then(function(i){
  setTimeout(function(){
    console.log(new Date(), i)
  },1000)
})
```

### 输出结果是
```js
for(var i = 0; i < 5; i++){
  setTimeout(function(){
    console.log(new Date(), i)
  }, 1000 * i)
}

console.log(new Date(), i)
```

### 问题：“newArray”中有哪些元素？
```
var array = [];
for(var i = 0; i <3; i++) {
 array.push(() => i);
}

var newArray = array.map(el => el());
console.log(newArray); // ??[3, 3, 3]
```

在for循环的头部声明带有var关键字的变量会为该变量创建单个绑定（存储空间）。  让我们再看一次for循环。
```
// 误解作用域:认为存在块级作用域
var array = [];
for (var i = 0; i < 3; i++) {
  // 三个箭头函数体中的每个`'i'`都指向相同的绑定，
  // 这就是为什么它们在循环结束时返回相同的值'3'。
  array.push(() => i);
}
var newArray = array.map(el => el());
console.log(newArray); // [3, 3, 3]
```
如果使用 let 声明一个具有块级作用域的变量，则为每个循环迭代创建一个新的绑定。// 使用ES6块级作用域
```
var array = [];
for (let i = 0; i < 3; i++) {
  // 这一次，每个'i'指的是一个新的的绑定，并保留当前的值。
 // 因此，每个箭头函数返回一个不同的值。
  array.push(() => i);
}
var newArray = array.map(el => el());
console.log(newArray); // [0, 1, 2]
```
解决这个问题的另一种方法是使用闭包。let array = [];
```
for (var i = 0; i < 3; i++) {

  array[i] = (function(x) {
    return function() {
      return x;
    };
  })(i);
}
const newArray = array.map(el => el());
console.log(newArray); // [0, 1, 2]
```

### 问题：如果我们在浏览器控制台中运行'foo'函数，是否会导致堆栈溢出错误？
```
function foo() {
  setTimeout(foo, 0); // 是否存在堆栈溢出错误?
};   

foo()  // 不会溢出
```
JavaScript并发模型基于“事件循环”。 当我们说“浏览器是 JS 的家”时我真正的意思是浏览器提供运行时环境来执行我们的JS代码。

浏览器的主要组件包括调用堆栈，事件循环，任务队列和Web API。 像setTimeout，setInterval和Promise这样的全局函数不是JavaScript的一部分，而是 Web API 的一部分。 JavaScript 环境的可视化形式如下所示：

![eventLoop2.jpg](./images/eventLoop2.jpg)

JS调用栈是后进先出(LIFO)的。引擎每次从堆栈中取出一个函数，然后从上到下依次运行代码。每当它遇到一些异步代码，如setTimeout，它就把它交给Web API(箭头1)。因此，每当事件被触发时，callback 都会被发送到任务队列（箭头2）。事件循环(Event loop)不断地监视任务队列(Task Queue)，并按它们排队的顺序一次处理一个回调。每当调用堆栈(call stack)为空时，Event loop获取回调并将其放入堆栈(stack )(箭头3)中进行处理。请记住，如果调用堆栈不是空的，则事件循环不会将任何回调推入堆栈。现在，有了这些知识，让我们来回答前面提到的问题：
步骤
调用 foo()会将foo函数放入调用堆栈(call stack)。
在处理内部代码时，JS引擎遇到setTimeout。
然后将foo回调函数传递给WebAPIs(箭头1)并从函数返回，调用堆栈再次为空
计时器被设置为0，因此foo将被发送到任务队列`<Task Queue>`(箭头2)。
由于调用堆栈是空的，事件循环将选择foo回调并将其推入调用堆栈进行处理。
进程再次重复，堆栈不会溢出。

### 问题: 如果在控制台中运行以下函数，页面(选项卡)的 UI 是否仍然响应
```
function foo() {
  return Promise.resolve().then(foo);
};

foo()
```
大多数时候，开发人员假设在事件循环`<event loop>`图中只有一个任务队列。但事实并非如此，我们可以有多个任务队列。由浏览器选择其中的一个队列并在该队列中处理回调`<callbacks>`。

在底层来看，JavaScript中有宏任务和微任务。setTimeout回调是宏任务，而Promise回调是微任务。

主要的区别在于他们的执行方式。宏任务在单个循环周期中一次一个地推入堆栈，但是微任务队列总是在执行后返回到事件循环之前清空。因此，如果你以处理条目的速度向这个队列添加条目，那么你就永远在处理微任务。只有当微任务队列为空时，事件循环才会重新渲染页面、现在，当你在控制台中运行以下代码段

```
function foo() {
  return Promise.resolve().then(foo);
};
```
每次调用'foo'都会继续在微任务队列上添加另一个'foo'回调，因此事件循环无法继续处理其他事件（滚动，单击等），直到该队列完全清空为止。 因此，它会阻止渲染。

### 问题: 我们能否以某种方式为下面的语句使用展开运算而不导致类型错误
```
var obj = { x: 1, y: 2, z: 3 };
[...obj]; // TypeError 
```
展开语法 和 for-of 语句遍历iterable对象定义要遍历的数据。Array 或Map 是具有默认迭代行为的内置迭代器。对象不是可迭代的，但是可以通过使用iterable和iterator协议使它们可迭代。在Mozilla文档中，如果一个对象实现了@@iterator方法，那么它就是可迭代的，这意味着这个对象(或者它原型链上的一个对象)必须有一个带有@@iterator键的属性，这个键可以通过常量Symbol.iterator获得。上述语句可能看起来有点冗长，但是下面的示例将更有意义：
```
var obj = { x: 1, y: 2, z: 3 };
obj[Symbol.iterator] = function() {
  
  // iterator 是一个具有 next 方法的对象，
  // 它的返回至少有一个对象
  // 两个属性：value＆done。

  // 返回一个 iterator 对象
  return {
    next: function() {
      if (this._countDown === 3) {
        const lastValue = this._countDown;
        return { value: this._countDown, done: true };
      }
      this._countDown = this._countDown + 1;
      return { value: this._countDown, done: false };
    },
    _countDown: 0
  };
};
[...obj]; // 打印 [1, 2, 3]
```

还可以使用 generator 函数来定制对象的迭代行为：

```
var obj = {x:1, y:2, z: 3}
obj[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
}
[...obj]; // 打印 [1, 2, 3]
```

```
var obj = { a: 1, b: 2 }; //a，b 都是 enumerables 属性

// 将{c：3}设置为'obj'的原型，并且我们知道
// for-in 循环也迭代 obj 继承的属性
// 从它的原型，'c'也可以被访问。
Object.setPrototypeOf(obj, { c: 3 });

// 我们在'obj'中定义了另外一个属性'd'，但是 
// 将'enumerable'设置为false。 这意味着'd'将被忽略。
Object.defineProperty(obj, "d", { value: 4, enumerable: false });

for (let prop in obj) {
  console.log(prop);
}
// 打印
// a
// b
// c
```

### 运行以下代码片段时，控制台上会打印什么？
```
var obj = { a: 1, b: 2 };
Object.setPrototypeOf(obj, {c: 3});
Object.defineProperty(obj, 'd', { value: 4, enumerable: false });

// what properties will be printed when we run the for-in loop?
for(let prop in obj) {
    console.log(prop);
}
```

## 前端与后端交互，如何实现数据加密

## 前端在混合开发中的交互

## 创建原生的ajax请求
```js
 ajax({
     url: "./TestXHR.aspx",              //请求地址
     type: "POST",                       //请求方式
     data: { name: "super", age: 20 },        //请求参数
     dataType: "json",
     success: function (response, xml) {
         // 此处放成功后执行的代码
     },
     fail: function (status) {
         // 此处放失败后执行的代码
     }
 });

 function ajax(options) {
     options = options || {};
     options.type = (options.type || "GET").toUpperCase();
     options.dataType = options.dataType || "json";
     var params = formatParams(options.data);

     //创建 - 非IE6 - 第一步
     if (window.XMLHttpRequest) {
         var xhr = new XMLHttpRequest();
     } else { //IE6及其以下版本浏览器
         var xhr = new ActiveXObject('Microsoft.XMLHTTP');
     }

     //接收 - 第三步
     xhr.onreadystatechange = function () {
         if (xhr.readyState == 4) {
             var status = xhr.status;
             if (status >= 200 && status < 300) {
                 options.success && options.success(xhr.responseText, xhr.responseXML);
             } else {
                 options.fail && options.fail(status);
             }
         }
     }

     //连接 和 发送 - 第二步
     if (options.type == "GET") {
         xhr.open("GET", options.url + "?" + params, true);
         xhr.send(null);
     } else if (options.type == "POST") {
         xhr.open("POST", options.url, true);
         //设置表单提交时的内容类型
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         xhr.send(params);
     }
 }
 //格式化参数
 function formatParams(data) {
     var arr = [];
     for (var name in data) {
         arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
     }
     arr.push(("v=" + Math.random()).replace("."));
     return arr.join("&");
 }
```

## `<div name="abc" abc="1"></div>` 如何获取其中的 `abc` 属性
```js
// jq
$('[name="abc"]').attr('abc');

// js
var a = document.getElementByName('abc');
a.getAttribute('abc');
```

## 实现菲波那切数列

## 知道哪些排序的方法？实现思路

回答：

## `jQuery`是如何暴露`$`符号的

```js
window.jQuery = window.$ = jQuery
```

## 继承的几种方式

1. `借用构造函数继承` 使用call和apply方法，将父对象的构造函数绑定在子对象上
2. `原型继承`，将子对象的prototype指向父对象的一个实例
3. `组合继承`

## 实现函数

### 1.获取获取深层对象的值
```js
/**
 * @param obj 需要获取值的目标对象
 * @param key 当前需要获取的key
 */
getDeepObjectValue(obj, 'organization.config.id')

function getDeepObjectValue (obj, keyString) {
    if(!obj) return;
    if(keyString.indexOf('.') !== -1) {
        // 多层
        const keyArr = keyString.split('.');
        let VObj = JSON.parse(JSON.stringify(obj));
        for(let i = 0; i < keyArr.length; i ++) {
            if(VObj[keyArr[i]]) {
                VObj = VObj[keyArr[i]]
            } else {
                return
            }
        }
        return VObj
    } else {
        // 1层的情况
        return obj[keyString]
    }
}
```

### 2.设置深层对象的值
```js
var obj = {organization: {config: {id: 1}}}
setDeepObjectValue(obj, 'organization.config.id', 5) 

// var obj = {organization: {config: {id: 1}}}
// var obj = {}
function setDeepObjectValue (obj, keyString, value) {
    var keyArr = keyString.split('.');
    keyArr.reduce(function (acc, cur, index, arr) {
        console.log(acc, cur, index, arr)
        if(index < keyArr.length - 1) {
            if(!acc[cur]) {
                return acc[cur] = {}
            }
        }
        if(index === keyArr.length - 1) {
            acc[cur] = value;
        }
        return acc[cur]
    }, obj)
}
setDeepObjectValue(obj, 'organization.config.id', 5) 
```
