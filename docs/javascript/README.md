# ECMAScript Basic

## ECMAScript
* 广义的JavaScript是指：`ECMAScript`、`文档对象模型【DOM】`、`游览器对象模型【BOM】`。
  - JavaScript是**弱类型**语言。
  - 基本数据类型：**数字**、**字符串**、**Boolean**、**undefined**、**null**、**symbol**【ES6新增】
  - 引用数据类型：**Object**对象包括【function、array】
  - 原生函数：String、Number、Boolean、Array、Object、Function、RegExp、Date、Error、Symbol
  
* `forEach` - forEach中return有效果吗？如何中断forEach循环？
  - forEach中return**无效果**
  - 中断forEach
    - 使用try catch中断，抛出异常
    - 官方推荐：使用every和some替代forEach.`every`在碰到`return false`的时候，中止循环。`some`在碰到`return true`的时候，中止循环
  
## typeof
  - typeof null = 'object'
  - typeof [1] = 'object'
  - typeof function = 'function'
  - 判断null：`(!null && typeof null === 'object')`
  - 判断数组：
    - Array.isArray()
    - [] instanceof Array
    - Object.prototype.toString.call([]) === '[object Array]'
    - [].constructor === Array
::: warning 注意
typeof()是判断基本类型的。对于引用类型，除function，都返回object【null返回object】。
:::
    
* `undefined` 和 `is not defined` 是两回事，前者已声明未赋值，后者未声明。

* `AO`与`VO`
  - AO：作用域链的开始是当前代码执行环境的变量对象，常被称之为“活跃对象”（AO）
  - VO

* 稀疏数组

* `void`

* 获取封装对象的值：`valueOf`

* `Date.now()` === `(new Date()).getTime()`

* throw new Error ('')

* 类型转换
  - 隐式强制类型转换(`valueOf()`，`toString()`)
  - 显式强制类转换：假值 - `undefined` `null` `false` `+0` `-0` `NaN` `''`
  - `+`一元运算符能将字符串快速转换为数字，并且将日期转换为时间戳

* +、~~、!!的妙用、||、&&的使用简写、==和===的区别
  
* `[]+{} === [object Object]`  `{}+[] === 0 `
  
* 运算符优先级 `&&` > `||` > `(? : 【右关联】)` `=【右关联】` >  `,`

* `JSON.stringify()` 
  - 无法处理：`undefined`，`function`，`symbol`。
  - 该方法可以接受第二个参数JSON.stringify(a, {b,c}, num)
  
* 语句（声明语句）、表达式（赋值表达式）。表达式语句（b）

* `try…catch…finally`

* HTML元素id也会创建全局变量
  
* 变量、（变量声明、变量赋值）=> 变量的初始化

* 清内存，赋值为null

  ```
  24. 类，类的继承，super
  25.  继承
  26.  session，cookie，sessionStorage，localStroage
  27. 红黑树算法，二叉树算法
  31. 函数声明 、函数表达式（声明提升）
  32.  高阶函数、纯函数、函数柯里化
  33. 面向对象编程、面向函数编程
  34. set
  35.  修饰器 - 编译时执行的函数
  36.  AMD/CMD、commonjs
  37. 匿名函数
  38. 隐式换算
  40. JavaScript 中的迭代器（iterators）和迭代（iterables）是什么？ 你知道什么是内置迭代器吗？
  41. JSON.parse(JSON.stringify(Obejct))的注意点
  42. 单向数据流和双向数据绑定
  43. httpXMLrequest、fetch、axios、ajax
  44. 使用单页应用将文件上传到服务器的有哪些方法(XMLHttpRequest2（streaming），fetch（non-streaming），File API)
  ```
## 执行上下文
[JavaScript系列之执行上下文和执行栈 - 知乎](https://zhuanlan.zhihu.com/p/68799915)

## this
* 一般函数
  - 匿名函数调用或者全局函数调用，`this`指向Window、Global
* 构造函数
  - 构造函数调用，`this`指向这个新生成的对象  
* 对象方法
  - 对象方法调用，`this`指向当前对象
* .call()、.apply()和.bind() 
  - 显示绑定，`this`指向绑定的值
* 箭头函数
  - 箭头函数中始终会捕捉其“定义时”所在上下文的`this`值，作为自己的`this`.

## `bind`、`call`和`apply`区别
三者都是用来改变this指向的

`bind`是返回一个新的可执行的函数，第一个参数是要指向的对象，第二个参数是绑定时候参数的顺序以及新可执行函数的参数作为原函数的参数来调用原函数。
  
`call`和`apply`都是执行函数，第一个参数是需要指向的对象，第二参数不同，call需要把参数按顺序依次传递，apply则是把参数放在数组里。
  
如果 call和apply的第一个参数是null或者undefined，那么this的指向就是全局变量，在游览器里面就是windows。
  

## 闭包
1. 可以访问其他函数内变量的函数，叫做闭包。或者说在一个函数内部可访问该函数内部局部变量的函数，作用就是让函数外部可以访问函数内部局部变量。
2. 闭包可以用来保存一个需要持久保存的变量，可以模拟命名空间。
3. 闭包在IE种会造成内存泄露（IE BUG）
```js
    function foo () {
        var ex = 1;
        function bar () {
            ex++
            return ex
        }
        return bar
}
var func = foo()
func()
```

::: tip 提示
IIFE是闭包吗？
严格来讲IIFE并不算闭包，因为函数并没用在本身的词法作用域以外执行。
:::

::: tip 资料库 
[「每日一题」JS 中的闭包是什么？- 知乎](https://zhuanlan.zhihu.com/p/22486908)
:::

## 作用域和作用域链
![Scope](./images/scope.jpeg)

[js基础：作用域及作用域链](https://baijiahao.baidu.com/s?id=1627502571462484522&wfr=spider&for=pc)

## Event Loop
`Event Loop`主要指的是**任务栈**，**宏任务**与**微任务**（JS线程），**同步任务**与**异步任务**， **线程**与**进程**。

### 进程和线程的区别，js单线程带来的好处？
**进程**就是执行中的一个程序，是操作资源分配的最小单位。**线程**是进程中执行的一个任务，是程序执行的最小单位。**一个进程由多个线程组成**。进程间相互独立，一个进程下的多个线程共享资源
打开一个不同地址的游览器tab就是一个进程，里面由渲染线程，JS引擎线程，HTTP请求线程。

### 什么是执行栈（任务栈）？
一个存储函数调用的栈结构，遵循先进后出的原则，后执行的函数会先弹出栈

### Event Loop？
![Event Loop](./images/eventloop.jpg)
1. 首先全局上下文进入函数调用栈，执行同步代码
2. 执行完同步代码后，查询任务队列里是否由异步代码需要执行
3. 执行所有微任务，微任务执行完毕后
4. 循环再次从宏任务开始，从任务队列中拿出一个执行，一直循环下去

### 宏任务和微任务

#### 宏任务
宏任务：当前调用栈执行的任务（主代码快【同步任务】，定时器等等【异步任务】）。事件放在`callback queue`中，由事件触发线程维护。包括script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering

#### 微任务
微任务：宏任务执行完，在下一个宏任务执行之前执行的任务（可以理解为回调事件，promise.then，proness.nextTick等等）。事件放在微任务队列，有 `javascript` 引擎线程维护。
包括process.nextTick ，promise ，MutationObserver

![宏任务和微任务](./images/task.jpg)

[如何解释Event Loop面试官才满意？- 知乎](https://zhuanlan.zhihu.com/p/72507900)


## Class

class super static 继承
```jsx harmony

class myClassParents {
    parentMethods () {
        
    }
}

class myClass extends myClassParents {
    constructor () {
        super()
    }
    unstaticMethods () {
        myClass.staticMethods()
        super.parentMethods()
    }
    static staticMethods () {
        
    }
}
```

## ES6
* `let`、`const`

* 箭头函数 `() => {}`

* `class`、`class <name> extend <parent>`

* yield
```
5. 对象初始化
6. 简写方法名 const object = {functionName () {}}
7.  装饰器写法（修饰器decorator => ES6）（@connet）
8.  赋值解构
9.  rest
10. import、export
```

### Object
```
1.  Object.keys(obj)
2. Object.create()
3.  Object.assign()
4.  Object.defineProperty(obj, key, props)
```

### Number
```
1. Number.prototype.toPrecision()
2. 数字的安全范围：Number.MAX_SAFE_INTEGER、Number.MIN_SAFE_INTEGER
3. Number.isInteger()
4. window.isNaN()和Number.isNaN() 在不是数字类型下返回的结果不同：isNaN(‘A') // true，Number.isNaN(‘A’) // false
```

### String
```
1. String.prototype.indexOf()
2. String.prototype.charAt()
3. String.prototype.substr()、String.prototype.substring()、String.prototype.slice()
4. String.prototype.toUpperCase()、String.prototype.toLowerCase()
5. String.prototype.trim()
```


## DOM
### DOM
```
1. nodeType(1,2,3)
2. nodeName
3.  nodeValue
4.  firstChild
5.  attributes => removeAttribute & addAttribute
6.  createDocumentFragment
7.  appendChild
```

### TODO
* 函数
* 变量提升
* 回收机制

## 常见的设计模式有哪些？

1、js工厂模式
2、js构造函数模式
3、js原型模式
4、构造函数+原型的js混合模式
5、构造函数+原型的动态原型模式
6、观察者模式
7、发布订阅模式

## setTimeout倒计时为什么会出现误差？
setTimeout() 只是将事件插入了“任务队列”，必须等当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码消耗时间很长，也有可能要等很久，所以并没办法保证回调函数一定会在 setTimeout() 指定的时间执行。所以， setTimeout() 的第二个参数表示的是最少时间，并非是确切时间。
HTML5标准规定了 setTimeout() 的第二个参数的最小值不得小于4毫秒，如果低于这个值，则默认是4毫秒。在此之前。老版本的浏览器都将最短时间设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常是间隔16毫秒执行。这时使用 requestAnimationFrame() 的效果要好于 setTimeout();

断点续传？
HTTP1.1协议（RFC2616）中定义了断点续传相关的HTTP头 Range和Content-Range字段，一个最简单的断点续传实现大概如下：
1.客户端下载一个1024K的文件，已经下载了其中512K
2. 网络中断，客户端请求续传，因此需要在HTTP头中申明本次需要续传的片段：
Range:bytes=512000-
这个头通知服务端从文件的512K位置开始传输文件
3. 服务端收到断点续传请求，从文件的512K位置开始传输，并且在HTTP头中增加：
Content-Range:bytes 512000-/1024000
