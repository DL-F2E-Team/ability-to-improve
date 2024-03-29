---
title: ECMAScript
---

[[toc]]

# ECMAScript

JavaScript 是**弱类型**语言，解释时动态，通常所说的 JavaScript 是指`ECMAScript`、`DOM【文档对象模型】`和`BOM【游览器对象模型】`。`ECMAScript`是标准， `JavaScript`
是实现。

## 数据类型

数据类型可分为**基本数据类型**和**引用数据类型**。

1. 基本数据类型：`数字（Number）`、`字符串（String）`、`Boolean`、`undefined`、`null`、**symbol（ES6新增）**、**BigInt（ES2020）**。
2. 引用数据类型：`Object对象`包括【Function、Array】。

## 变量

`undefined` 和 `is not defined` 是两回事，前者已声明未赋值，后者未声明。

申明变量有**显式定义（var）** 与 **隐式定义**两种方式。变量申明遵循以下规则：

1. 首字母必须是字母（大小写均可）、下划线（_）、或者美元符号（$）。
2. 余下可以是下划线，美元符号，任意数字或字母。
3. 变量名不能使用**关键字**。

[void运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)会对它的操作数表达式进行求值，然后忽略掉求值的结果，直接返回`undefined`。譬如：`<a
href="javascript:void(0)">Hi</a>`

`Object.prototype.valueOf()`获取封装对象的值。

```js
// Object：返回对象本身
var obj = {name: "张三", age: 18};
console.log(obj.valueOf() === obj);   // true
```

`Date.now()` === `(new Date()).getTime()` === `+new Date()`都是转换成时间戳。

`throw new Error ('错误信息')`抛出异常。一般与错误处理一起使用：``try…catch…finally``。

 ```js
try {
    // 可能发生错误的代码
    // todo something
} catch (err) {
    // 只有发生错误时才执行的代码
    throw new Error('错误信息')
} finally {
    // 无论是否出错，肯定都要执行的代码
    // todo other things
}
```

HTML元素id也会为自身创建全局变量

清内存，赋值为null。游览器的垃圾回收机制使用了引用计数法（**引用下标计数法，为0则标识不使用。**）

【语句（声明语句）、表达式（赋值表达式）、表达式语句】一个表达式会产生一个值,它可以放在任何需要一个值的地方，如语句则是由分号分隔的句子或命令。如果在表达式后面加上一个“；”分隔符，这就被称为“表达式语句”。
它表明“只有表达式，而没有其他语法元素的语句”。

原生函数【内建函数】：String、Number、Boolean、Array、Object、Function、RegExp、Date、Error、Symbol

forEach

- **forEach中return有效果吗？**：

forEach中return**无效果**

- **如何中断forEach循环？**

1. 使用try catch中断，抛出异常
2. 官方推荐：使用every和some替代forEach.`every`在碰到`return false`的时候，中止循环。`some`在碰到`return true`的时候，中止循环

运算符优先级 `&&` > `||` > `(? : 【右关联】)` `=【右关联】` >  `,`

JSON.stringify()

- JSON.parse(JSON.stringify(Obejct))的注意点：无法处理`NaN`、`RegExp`、`Error`、`undefined`，`function`，`symbol`。
- 该方法可以接受第二个参数JSON.stringify(value[, replacer [, space]])

变量、（变量声明、变量赋值）=> 变量的初始化、变量提升

类，类的继承，super

继承

红黑树算法，二叉树算法

函数声明 、函数表达式（声明提升）

高阶函数、纯函数、函数柯里化

面向对象编程、面向函数编程

set

修饰器 - 编译时执行的函数

AMD/CMD、commonjs

匿名函数

JavaScript 中的迭代器（iterators）和迭代（iterables）是什么？ 你知道什么是内置迭代器吗？

## 类型转换

类型转换分为**隐式类型转换**【隐式换算】和 **显示类型转换**。

`parseInt` 会将十六进制转换成十进制，`parseFloat` 会直接截取。

```js
parseInt('0xA')     // 10
parseFloat('0xA')   // 0
```

### 什么情况下 `a == 1 && a == 2 && a == 3` 返回 `true`？

隐式强制类型转换(`valueOf()`，`toString()`)

```javascript
const a = {
    i: 1,
    toString: function () {
        return a.i++;
    }
}

const b = {
    i: 1,
    valueOf: function () {
        return b.i++;
    }
}
```

显式强制类转换：假值 - `undefined`， `null`， `false`， `+0`， `-0`， `NaN`， `''`， `Number(...)`。

`+`一元运算符能将字符串快速转换为数字，并且将日期转换为时间戳。

```js
var str = 'Hello World'  // Hello World
var str = +'Hello World' // NaN 
```

+、~~【转为数字0和1】、!!【转为boolean】的妙用、||、&&的使用简写、==和===的区别

```js
// []转换成""，+{}转换成[object Object]
[] + {} === '[object Object]'

// {}转换成块级作用域，+[]转换成0
{
}
+[] === 0

// +[]转换成0,和!在一起又转换成true,再取反
!+[] === true
```

## 数据类型检测

### typeof

```js {6}
typeof 5            // number
typeof '5'          // string
typeof undefined    // undefined
typeof false        // boolean
typeof Symbol()     // symbol
typeof null         // object
typeof NaN          // number

typeof [1]          // object
typeof {}           // object
typeof console.log  // function
```

判断null：`(!null && typeof null === 'object')`

判断数组：

- Array.isArray()
- [] instanceof Array
- Object.prototype.toString.call([]) === '[object Array]'
- Object.prototype.toString.call({}) === '[object Object]'
- [].constructor === Array

::: warning 注意 typeof()是判断基本类型的。对于引用类型，除function，都返回object【null返回object】。
:::

### instanceof

```js
const p1 = new Person()
p1 instanceof Person    // true
```

## 字符串

### 字符串处理方法

|  处理方法   | 说明  |
|  ----  | ----  |
| charAt()  | 获取特定索引处字符 |
| toUpperCase() / toLowerCase()  | 大小写 |
| indexOf() / lastIndexOf()  | 返回特定字符串第一次或者最后一次出现的位置 |
| substring() / slice() | 截取字符串（slice支持形参为负数） |
| contact() | 字符串拼接 |
| replace() | 字符串替换 |
| split() | 字符串分割 |
| match() / search() | 正则表达式搜索字符串，match返回字符串，search返回下标 |

## 正则表达式

```js
var str = /pattern/
var str = new RegExp(/pattern/)
var str = new RegExp('pattern', 'i')
```

|  处理方法   | 说明  |
|  ----  | ----  |
| exec(str)  | 检索指定的值，返回找到的值 |
| test(str)  | 检索指定的值是否满足指定的条件，返回true或者false |

|  通配符   | 说明  |
|  ----  | ----  |
| .  | 可以匹配任意字符 |
| \d  | 匹配0-9的所有数字 |
| \D  | 匹配非数字 |
| \s  | 匹配所有空白字符串，包括空格、制表符、换行符、回车符 |
| \S  | 匹配所有非空白字符串 |
| \w  | 匹配所有的单词字符，包括0-9数字、26个英文字母和下划线 |
| \w  | 匹配所有非单词字符 |
| \b  | 匹配单词边界 - 【单词边界：开头还是结尾】 |
| \B  | 匹配非单词边界 |
| `[abc]`  | 查找方括号之间的任意字符 |
| `[^abc]`  | 查找任何不在方括号之间的字符 |
| `[0-9]`  | 查找任何从0-9的数字 |
| `[a-z]`  | 查找任何从a-z的字符 |
| `[A-Z]`  | 查找任何从A-Z的字符 |
| `[A-z]`  | 查找任何从A-z的字符 |
| `(green|blue|red)`  | 查找任何从指定的字符 |

|  量词   | 说明  |
|  ----  | ----  |
| n+  | 匹配任意包含至少一个 n |
| n*  | 匹配任意包含0个或者多个 n |
| n?  | 匹配任意包含0个或者一个 n |
| n{X}  | 匹配包含 X个 n 的序列 |
| n{X,Y}  | 匹配包含 X个 或 Y个 n 的序列  |
| n{X,}  | 匹配包含至少 X个 n 的序列 |
| n$ | 匹配任意结尾为 n的字符 |
| ^n | 匹配任意开头为 n的字符 |

|  修饰符   | 说明  |
|  ----  | ----  |
| i | 执行对大小写不敏感的匹配 |
| g | 执行全部匹配（查找所有匹配，不仅仅是找到一个后停止） |
| m  | 执行多行匹配 |

## bind、call 和 apply 区别

三者都是用来改变this指向的。

`bind`是返回一个**新的可执行的函数**，第一个参数是要指向的对象，第二个参数是**绑定时候参数的顺序以及新可执行函数的参数作为原函数的参数来调用原函数**。

`call`和`apply`都是执行函数，第一个参数是要指向的对象，第二参数不同，call需要把参数**按顺序依次传递**，apply则是把参数**放在数组里**。

如果 call和apply的第一个参数是null或者undefined，那么this的指向就是全局变量，在游览器里面就是windows。

## 闭包

::: tip
[「每日一题」JS 中的闭包是什么？- 知乎](https://zhuanlan.zhihu.com/p/22486908)
:::

**可以访问其他函数内变量的函数**，叫做闭包。或者说在一个函数内部可访问该函数内部局部变量的函数，作用就是让函数外部可以访问函数内部局部变量。

特点：

1. 函数嵌套函数。
2. 函数内部可以引用外部的参数和变量。
3. 参数和变量不会被垃圾回收机制回收。

闭包可以用来保存一个需要持久保存的变量，可以模拟命名空间。

优点：

1. 变量长期驻扎在内存中；
2. 避免全局变量的污染；
3. 私有成员的存在；

**闭包在IE会造成内存泄露**（IE BUG）

```js
    function foo() {
    var ex = 1;

    function bar() {
        ex++
        return ex
    }

    return bar
}

var func = foo()
func()
```

### 闭包产生的本质

当前环境中存在指向父级作用域的引用

::: warning 注意 IIFE是闭包吗？ 严格来讲IIFE并不算闭包，因为函数并没用在本身的词法作用域以外执行。
:::

## setTimeout 倒计时为什么会出现误差？

setTimeout() 只是将事件插入了“任务队列”，必须等当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。

要是当前代码消耗时间很长，也有可能要等很久，所以并没办法保证回调函数一定会在 setTimeout() 指定的时间执行。所以， setTimeout() 的第二个参数表示的是最少时间，并非是确切时间。

HTML5标准规定了 setTimeout() 的第二个参数的最小值不得小于4毫秒，如果低于这个值，则默认是4毫秒。

在此之前。老版本的浏览器都将最短时间设为10毫秒。**另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常是间隔16毫秒执行。这时使用 requestAnimationFrame() 的效果要好于 setTimeout();**

## 断点续传

HTTP1.1协议（RFC2616）中定义了断点续传相关的HTTP头`Range`和`Content-Range`字段，一个最简单的断点续传实现大概如下：

1. 客户端下载一个1024K的文件，已经下载了其中512K
2. 网络中断，客户端请求续传，因此需要在HTTP头中申明本次需要续传的片段：Range:bytes=512000-这个头通知服务端从文件的512K位置开始传输文件
3. 服务端收到断点续传请求，从文件的512K位置开始传输，并且在HTTP头中增加：Content-Range:bytes 512000-/1024000

## ES6

`let`、`const`

箭头函数 `() => {}`

`class`、`class <name> extend <parent>`

yield

5. 对象初始化
6. 简写方法名 const object = {functionName () {}}
7. 装饰器写法（修饰器decorator => ES6）（@connet）
8. 赋值解构
9. rest
10. import、export

### Object

1. Object.keys(obj)
2. Object.create()
3. Object.assign()
4. Object.defineProperty(obj, key, props)

### Number

1. Number.prototype.toPrecision()
2. 数字的安全范围：Number.MAX_SAFE_INTEGER、Number.MIN_SAFE_INTEGER
3. Number.isInteger()
4. window.isNaN()和Number.isNaN() 在不是数字类型下返回的结果不同：isNaN(‘A') // true，Number.isNaN(‘A’) // false

### String

1. String.prototype.indexOf()
2. String.prototype.charAt()
3. String.prototype.substr()、String.prototype.substring()、String.prototype.slice()
4. String.prototype.toUpperCase()、String.prototype.toLowerCase()
5. String.prototype.trim()

## DOM

### DOM

1. nodeType(1,2,3)
2. nodeName
3. nodeValue
4. firstChild
5. attributes => removeAttribute & addAttribute
6. createDocumentFragment
7. appendChild

### TODO

* 函数
* 变量提升
* 回收机制

## 常见的设计模式有哪些？

1. js工厂模式
2. js构造函数模式
3. js原型模式
4. 构造函数+原型的js混合模式
5. 构造函数+原型的动态原型模式
6. 观察者模式
7. 发布订阅模式

## JavaScript模块化

CommonJS、AMD、CMD、UMD

### CommonJS

主要实现者：Nodejs。CommonJS模块的加载不适合网络加载，依赖的模块未加载会出现错误。

方法：exports、require

导出模块

```javascript
exports.blog = {
    say: function (name) {
        return 'hello' + name
    }
}
```

加载模块

```javascript
var blog = require('./blog').blog;
```

### AMD

AMD接口定义：define(id?,dependencies?,factory)，依赖**RequireJS**。

```javascript
// 定义 base.js
define(function () {
    return {
        say: function () {

        }
    }
})

// 调用 app.js
require(['base'], function (base) {

})
```

### CMD

AMD的优化版，AMD是依赖前置，提前加载依赖，CMD是依赖后置，使用时才加载，依赖**SeaJS**。当然现在 `RequireJS` 已经提供了延迟加载的功能。

### UMD

CommonJS侧重服务器，AMD侧重游览器，两者的模块不能共享。

UMD的思想很简单：判断是AMD则使用AMD方式，判断是CommonJS则使用CommonJS方式，都不是则将模块公开给全局（window或global）。

### ES6模块化

## 面向对象

面向对象是一种思想，是基于面向过程而言的，就是说面向对象是将功能等通过对象来实现，将功能封装进对象之中，让对象去实现具体的细节；

这种思想是将数据作为第一位，这是对数据一种优化，操作起来更加的方便，简化了过程。 JS 本身是没有 class 类型的，但是每个函数都有一个 prototype 属性， prototype
指向一个对象，当函数作为构造函数时，prototype 就起到 类似于 class 的作用

面向对象有三个特点：

1. 封装（隐藏对象的属性和实现细节，对外提供公共访问方式）
2. 继承（提高代码复用性，继承是多态的前提）
3. 多态（是父类或接口定义的引用变量可以指向子类或具体实现类的实例对象）

## JS 中的垃圾回收机制

必要性：由于字符串、对象和数组没有固定大小，所有当他们的大小已知时，才能对他们进行动态的存储分配。 JavaScript 程序每次创建字符串、 数组或对象时，解释器都必须分配内存来存储那个实体。
只要像这样动态地分配了内存，最终都要释放这些内存以便他们能够被再用。 否则， JavaScript 的解释器将会消耗完系统中所有可用的内存，造成系统崩溃。

垃圾回收的方法：标记清除、计数引用。

### 标记清除法

这是最常见的垃圾回收方式，当变量**进入环境**时，就标记这个变量为”进入环境“， 从逻辑上讲，永远不能释放进入环境的变量所占的内存，永远不能释放进入环境变量所占用的内存， 只要执行流程进入相应的环境，就可能用到他们。

当离开环境时，就标记为**离开环境**。 垃圾回收器在运行的时候会给存储在内存中的变量都加上标记（所有都加）， 然后去掉环境变量中的变量，以及被环境变量中的变量所引用的变量（条件性去除标记），删除所有被标记的变量，
删除的变量无法在环境变量中被访问所以会被删除 。

最后垃圾回收器，完成了内存的清除工作，并回收他们所占用的内存。

### 引用计数法

引用计数法的意思就是每个值引用的次数， 当声明了一个变量，并用一个引用类型的值赋值给该变量，则这个值的引用次数为 1；

相反的，如果包含了对这个值引用的变量又取得了另外一个值，则原先的引用值引用次数就减 1， 当这个值的引用次数为 0 的时候，说明没有办法再访问这个值了，因此就把所占的内存给回收进来，这样垃圾收集器再次运行的时候，就会释放引用次数为 0
的这些值。

**用引用计数法会存在内存泄露**

## JS 监听对象属性的改变

### Object.defineProperty

```javascript
let user = {name: 1}
Object.defineProperty(user, 'name', {
    set: function (key, value) {

    }
})
```

缺点：如果 id 不在 user 对象中，则不能监听 id 的变化

### Proxy

```javascript
var user = new Proxy({}, {
    set: function (target, key, value, receiver) {

    }
})
```
这样即使有属性在 user 中不存在，通过 user.id 来定义也同样可以这样 监听这个属性的变化哦。
