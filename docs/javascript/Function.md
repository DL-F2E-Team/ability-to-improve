# 函数
函数是 javascript 世界中的**一等公民**，技能是定义**作用域**。
一般存在四种基本形式：**函数声明**、**函数表达式**、**函数嵌套**、**闭包**。
只有**声明的函数**才具有提升的特性。

函数声明（函数提升）
```js
function func(){
    console.log("函数的声明形态")
}
```

函数表达式
```js
// 函数的表达式形态 之一
let func0 = function(){
    console.log("函数的表达式形态");
}

// 函数的表达式形态 之二
(function func1() {})
```

函数嵌套
```js
let func2 = function(){
    console.log("函数的嵌套形态");
    let func3 = function(){
        console.log("func2嵌套在func1里")
    }
    func3();
}
```

闭包
```js
let func4 = function(){
    var a = "func4"; 
    return function(){
        console.log("我是以闭包形态存在的函数:"+a);
    }
}
```
## 立即执行函数
立即执行函数`IIFE`（Immediately-Invoked Function Expression）
```js
(function(){
    console.log("我是立即运行的匿名函数");
})();

(function(){
    console.log("我也是立即运行的匿名函数");
}());
```

## 箭头函数
箭头函数（又叫做`lambda表达式`）不暴露 arguments 对象。箭头函数可以保持this的指向，总是指向定义它时所在的上下文环境。
箭头函数不能作为构造函数，因此无法被new操作。
```js
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```

## 高阶函数
如果某个函数接收另一个函数作为参数或者返回值为一个函数，该函数就称之为高阶函数（HOF）。

**回调函数**是最常见的高阶函数
```js
function fn1(cb){
    cb && cb();
}
```

数组中的高阶函数：
1. `Array.prototype.map`
2. `Array.prototype.reduce`
3. `Array.prototype.filter`
4. `Array.prototype.sort`


## 函数重载
重载是面向对象编程语言（比如Java、C#）里的特性，JavaScript语言并不支持该特性。所谓**重载(overload)**，
就是函数名称一样，但是随着传入的参数个数不一样，调用的逻辑或返回的结果会不一样。jQuery之父John Resig
曾经提供了一个非常巧妙的思路实现重载，代码如下：

```js
(() => {
    // IIFE+箭头函数，把要写的代码包起来，避免影响外界，这是个好习惯
    // 当函数成为对象的一个属性的时候，可以称之为该对象的方法。
  
    /**
    * @param {object}  一个对象，以便接下来给这个对象添加重载的函数(方法)
    * @param {name}    object被重载的函数(方法)名
    * @param {fn}      被添加进object参与重载的函数逻辑
    */
    function overload(object, name, fn) {
      // 存放旧函数，本办法灵魂所在，将多个fn串联起来
      var oldMethod = object[name];
      object[name] = function() {
        // fn.length为fn定义时的参数个数,arguments.length为重载方法被调用时的参数个数
        if (fn.length === arguments.length) {
          // 若参数个数匹配上 就调用指定的函数fn
          return fn.apply(this, arguments);
        } else if (typeof oldMethod === "function") {
          // 若参数个数不匹配 就调旧函数
          return oldMethod.apply(this, arguments);
          // 注意：当多次调用overload()时，旧函数中又有旧函数,层层嵌套,递归地执行if..else
          // 判断,直到找到参数个数匹配的fn
        }
      };
    }
  
    // 不传参数时
    function fn0() {
      return "no param";
    }
    // 传1个参数
    function fn1(param1) {
      return "1 param:" + param1;
    }
    // 传两个参数时，返回param1和param2都匹配的name
    function fn2(param1, param2) {
      return "2 param:" + [param1, param2];
    }
  
    let obj = {}; // 定义一个对象，以便接下来给它的方法进行重载
    
    overload(obj, "fn", fn0);//给obj添加第1个重载的函数
    overload(obj, "fn", fn1);//给obj添加第2个重载的函数
    overload(obj, "fn", fn2);//给obj添加第3个重载的函数
  
    console.log(obj.fn());//>> no param
    console.log(obj.fn(1));//>> 1 param:1
    console.log(obj.fn(1, 2));//>> 2 param:1,2
})();
```

## arguments

### 函数的arguments为什么不是数组？如何转化成数组？
因为`argument`是一个对象【类数组】，它的属性从0开始，依次为0，1，2...最后还有callee和length属性。

常见的类数组：
1. `getElementByTagName()`、`getElementsByClassName()`、`getElementsByName()`获得的HTMLCollection.
2. `querySelector()`获得的nodeList

转化成数组：
1. `for in`循环

2. `Array.prototype.slice.call()`
```js
let argsArr = Array.prototype.slice.call(arguments, 1);
```

3. `Array.from()`
```js
let argsArr = Array.from(arguments);
```

4. ES6展开运算符
```js
let argsArr = [...arguments]
```

5. `concat`+`apply`
```js
// apply方法会把第二个参数展开
let argsArr = Array.prototype.concat.apply([], arguments)
```
