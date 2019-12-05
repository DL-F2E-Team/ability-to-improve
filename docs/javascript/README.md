# JavaScript(ECMAscript)

## ES5基础

* `javascript`是弱类型语言<br/>
  - `基本数据类型`：【数字、字符串、Boolean、undefined、null】、ES6新增【symbol】<br/>
  - `引用数据类型`：Object对象包括【function、array】<br/>
  - `原生函数`：String、Number、Boolean、Array、Object、Function、RegExp、Date、Error、Symbol
* `typeof`
  ```
  typeof null => object
  ```
  - 判断 null：`(!a && typeof a === 'object')`

* `undefined` 和 `is not defined` 是两回事，前者已声明未赋值，后者未声明。

* 广义的JavaScript是指：`ECMAScript`、`文档对象模型【DOM】`、`游览器对象模型【BOM】`

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
[「每日一题」JS 中的闭包是什么？- 知乎](https://zhuanlan.zhihu.com/p/22486908)

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

## 原型与原型链
### `for in`能否把原型链循环出来
能。

#### 如何避免？
使用 `hasOwnProperty`。

### 原型链
![solar](./images/1.jpg)

```js
function Father () {
    this.property = true;
}

Father.prototype.getFatherValue = function() {
  return this.property
}

function Son() {
    this.sonProperty = false;
}

// 继承Father
Son.prototype = new Father(); // Son.prototype被重写，导致Son.prototype.constructor也被重写
Son.prototype.getSonValue = function () {
    return this.sonProperty;
}

var instance = new Son();
alert(instance.getFatherValue())
```
instance实例通过原型链找到了Father原型中的getFatherValue方法.

### 如何判断原型和实例的继承关系
```js
instance instanceof Object;

Object.prototype.isPrototypeOf(instance);
```

::: warning
问题一: 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;

问题二: 在创建子类型(例如创建Son的实例)时,不能向超类型(例如Father)的构造函数中传递参数.
:::

### 继承
过【某种方式】让一个对象可以访问到另一个对象中的属性和方法，我们把这种方式称之为继承

### 为什么要使用继承
有些对象会有方法(动作、行为)，而这些方法都是函数，如果把这些方法和函数都放在构造函数中声明就会导致内存的浪费

```js
function Person(){
        this.say=function(){
            console.log("你好")
        }
    }
    var p1=new Person();
    var p2=new Person();
    console.log(p1.say === p2.say);   //false
```

### 原型链继承
```js
Person.prototype = {
    //切记不能忘记
    constructor:Person,
    say:function(){
        console.log("你好");
    },
    run:function(){
        console.log("正在进行百米冲刺");
    }
}
```

### 经典继承【借用构造函数】
```js
function Father(){
	this.colors = ["red","blue","green"];
}
function Son(){
	Father.call(this);//继承了Father,且向父类型传递参数
}
var instance1 = new Son();
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"

var instance2 = new Son();
console.log(instance2.colors);//"red,blue,green" 可见引用类型值是独立的
```

### 组合继承【伪经典继承】
```js
function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	alert(this.name);
};
function Son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
Son.prototype = new Father();//继承父类方法,第二次调用Father()
Son.prototype.sayAge = function(){
	alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
```

### 原型继承
```js
 var o1={ say:function(){} }
 var o2=Object.create(o1);
```

### 寄生式继承

### 寄生组合式继承

### new操作符干了什么
```js
var obj  = {};
obj.__proto__ = F.prototype;
F.call(obj);
```

第一行，我们创建了一个空对象obj;
第二行，我们将这个空对象的__proto__成员指向了F函数对象prototype成员对象;
第三行，我们将F函数对象的this指针替换成obj，然后再调用F函数.
我们可以这么理解: 以 new 操作符调用构造函数的时候，函数内部实际上发生以下变化：
1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
2、属性和方法被加入到 this 引用的对象中。
3、新创建的对象由 this 所引用，并且最后隐式的返回 this.

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
* VO AO
