# ECMAScript
JavaScript 是**弱类型**语言，解释时动态，通常所说的 JavaScript 是指`ECMAScript`、`DOM【文档对象模型】`和`BOM【游览器对象模型】`。

## 变量与数据类型
数据类型可分为**基本数据类型**：**数字（number）**、**字符串（string）**、**Boolean**、**undefined**、**null**、**symbol**和**引用数据类型**：**Object对象**包括【function、array】。

`undefined` 和 `is not defined` 是两回事，前者已声明未赋值，后者未声明。

申明变量有**显式定义（var）** 与 **隐式定义**两种方式。变量申明遵循以下规则：
1. 首字母必须是字母（大小写均可）、下划线（_）、或者美元符号（$）。
2. 余下可以是下划线，美元符号，任意数字或字母。
3. 变量名不能使用**关键字**。

[void运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)会对它的操作数表达式进行求值，然后忽略掉求值的结果，直接返回`undefined`。譬如：`<a href="javascript:void(0)">Hi</a>`

`Object.prototype.valueOf()`获取封装对象的值。
```js
// Object：返回对象本身
var obj = {name: "张三", age: 18};
console.log( obj.valueOf() === obj );   // true
```

`Date.now()` === `(new Date()).getTime()` === `+new Date()`都是转换成时间戳。

 `throw new Error ('错误信息')`抛出异常。一般与错误处理一起使用：``try…catch…finally``。
 ```js
try{
    // 可能发生错误的代码
    // todo something
}catch(err){
    // 只有发生错误时才执行的代码
    throw new Error ('错误信息')
}finally{
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
- 该方法可以接受第二个参数JSON.stringify(a, {b,c}, num)

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

什么情况下 `a == 1 && a == 2 && a == 3` 返回 `true`？隐式强制类型转换(`valueOf()`，`toString()`)

显式强制类转换：假值 - `undefined`， `null`， `false`， `+0`， `-0`， `NaN`， `''`， `Number(...)`。

`+`一元运算符能将字符串快速转换为数字，并且将日期转换为时间戳。
```js
var str = 'Hello World'  // Hello World
var str = +'Hello World' // NaN 
```

+、~~【转为数字0和1】、!!【转为boolean】的妙用、||、&&的使用简写、==和===的区别 

```js
// []转换成""，+{}转换成[object Object]
[]+{} === '[object Object]'

// {}转换成块级作用域，+[]转换成0
{}+[] === 0

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

::: warning 注意
typeof()是判断基本类型的。对于引用类型，除function，都返回object【null返回object】。
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

闭包可以用来保存一个需要持久保存的变量，可以模拟命名空间。

**闭包在IE会造成内存泄露**（IE BUG）
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

::: warning 注意
IIFE是闭包吗？
严格来讲IIFE并不算闭包，因为函数并没用在本身的词法作用域以外执行。
:::

## setTimeout 倒计时为什么会出现误差？
setTimeout() 只是将事件插入了“任务队列”，必须等当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。

要是当前代码消耗时间很长，也有可能要等很久，所以并没办法保证回调函数一定会在 setTimeout() 指定的时间执行。所以， setTimeout() 的第二个参数表示的是最少时间，并非是确切时间。

HTML5标准规定了 setTimeout() 的第二个参数的最小值不得小于4毫秒，如果低于这个值，则默认是4毫秒。

在此之前。老版本的浏览器都将最短时间设为10毫秒。**另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常是间隔16毫秒执行。这时使用 requestAnimationFrame() 的效果要好于 setTimeout();**

## 断点续传

HTTP1.1协议（RFC2616）中定义了断点续传相关的HTTP头 Range和Content-Range字段，一个最简单的断点续传实现大概如下：
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
7.  装饰器写法（修饰器decorator => ES6）（@connet）
8.  赋值解构
9.  rest
10. import、export

### Object
1.  Object.keys(obj)
2. Object.create()
3.  Object.assign()
4.  Object.defineProperty(obj, key, props)

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
3.  nodeValue
4.  firstChild
5.  attributes => removeAttribute & addAttribute
6.  createDocumentFragment
7.  appendChild

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
