# 基础问题

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
