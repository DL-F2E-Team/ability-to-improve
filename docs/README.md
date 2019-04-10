---
layout: post
title:  Hello F2E !
categories:
- F2E
---

# Hello F2E !

            You cannot improve your past, but you can improve your future.
            once time is wasted, life is wasted.

<TOC/>

## ECMAscript

### ES5
```
1. 弱类型语言 - 基本数据类型（数字、字符串、Boolean、undefined、null）、ES6新增（symbol）、引用数据类型 object（对象包括【function、array】）
2. typeof （null => ‘object’）判断null (!a && typeof a === ‘object')
3. undefined 和 is not defined 是两回事，前者已声明未赋值，后者未声明
4. ECMAScript、文档对象模型（DOM）、游览器对象模型（BOM）
5. 稀疏数组
6. void
7. 原生函数：String、Number、Boolean、Array、Object、Function、RegExp、Date、Error、Symbol
8. 获取封装对象的值：valueOf
9. Date.now() === (new Date()).getTime()
10. throw new Error ('')
11. 隐式强制类型转换(valueOf()，toString())，显式强制类转换：假值 - undefined null false +0 -0 NaN “"
12. +一元运算符能将字符串快速转换为数字，并且将日期转换为时间戳
13. +、~~、!!的妙用、||、&&的使用简写、==和===的区别
14. []+{} === [object Object] {}+[] === 0 
15. 运算符优先级 && > || > (? : 【右关联】)      =【右关联】 > ,
16. JSON.stringify() 无法处理：undefined，function，symbol。该方法可以接受第二个参数JSON.stringify(a, {b,c}, num)
17.  语句（声明语句）、表达式（赋值表达式）。表达式语句（b）
18. try…catch…finally
19. HTML元素id也会创建全局变量
20. 变量、（变量声明、变量赋值）=> 变量的初始化
21. bind、call、apply
22. event loop，任务栈，宏任务，微任务（js线程）
23. 事件捕获，事件目标，事件冒泡，事件代理~事件委托（叫法不同或者说主体不同）
24. 类，类的继承，super
25.  原型，继承
26.  session，cookie，sessionStorage，localStroage
27. 红黑树算法，二叉树算法
28. bind，call，apply
29. 闭包，清内存，赋值为null
30. 网络强缓存，弱缓存（协商缓存）
31. 函数声明 、函数表达式（声明提升）
32.  高阶函数、纯函数、函数柯里化
33. 面向对象编程、面向函数编程
34. set
35.  修饰器 - 编译时执行的函数
36.  AMD/CMD、commonjs
37. 匿名函数
38. 隐式换算
39. 4种函数调用模式（this）有四种模式，函数调用，方法调用，.call() 和 .apply()。
40. JavaScript 中的迭代器（iterators）和迭代（iterables）是什么？ 你知道什么是内置迭代器吗？
41. JSON.parse(JSON.stringify(Obejct))的注意点
42. 单向数据流和双向数据绑定
43. httpXMLrequest、fetch、axios、ajax
44. 使用单页应用将文件上传到服务器的有哪些方法(XMLHttpRequest2（streaming），fetch（non-streaming），File API)
45. MVC、MVVM
```

### ES6
```
1. let、const
2.  () => {}
3.  class、class <name> extend <parent>
4. yield
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

### Array
```
1. Array.from()
2. Array.prototype.includes()
3. Array.prototype.map()
4. Array.prototype.filter()
5. Array.prototype.every()、Array.prototype.some()
6. Array.prototype.reduce()
7. Array.prototype.slice()
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

## STYLE
### CSS
```
1. 两列自适应
2. 边距塌陷
3.  BFC
4.  伪元素，伪类
5.  css - mask镂空
6. clip-path裁剪
7. 自定义css属性
8.  :empty
9.  position: [relative, absolute, fixed, static, inherit, sticky]
10. 重绘和重排
11. CSS Flex / CSS Grid（网格）布局
```

### Less
```
1.  变量 - @
2. 混合 - <name>()
3.  函数
4.  @import
```

### Sass
```
1.  变量 - $
2. 插值 - #{}
3.  @import 和 _
4.  font的合并处理
5.  @extend
6. 占位选择器 - %
7. !optional标记
8.  @at-root
9.  @debug、@warn、@error
10. 函数 - if()
11. 指令 - @if、 @else if、@else
12. 指令 - @for $var from <start> through <end> 、@for $var from <start> to <end>
13. 指令 - @each $var in <list or map>
14. 指令 - @while
15. @mixin <name>($var1, $var2) @include @content
16.  @function
```

## Vue
### Vue
```
1. props，$emit，ref，$parent，$children
2. slot，slot-scope
3. 无渲染组件 - 组件负责行为，调用方负责表现
4. extend
5. 内置组件 component<is>
6. provide / inject - 跨组件访问
7. 为什么vue data 是一个函数
8. 指令: v-cloak v-pre v-once
9. 自定义指令 - directive（bind、inserted、update、componentUpdated、unbind）
10. v-for循环分组实现（template）
```

### Vue-router
```
1. scrollBehavior
```

### Vuex
```
1. state
2. action -> dispatch mutation
3. mutation -> commit（只在这里进行数据修改）
4. module
```

## React
### React
```
1.  jsx
2.  ReactDOM.render()
3. 组件（createClass，Component，SFC）、元素、实例
4. state、props
5.  时间处理（bind(this)） => bind、apply、call
6.  高阶组件（HOC）
7.  纯组件（SFC、函数式无状态组件
8. 纯函数
9. 受控组件、非受控组件
10. 生命周期：constructor => componentWillMount => render => componentDidMount
11. propTypes
12. ref
13. 异步处理redux：redux-chunk、redux-saga
14. context
15. getDerivedStateFromProps，getSnapshotBeforeUpdate
@version 16.4
1. 增加Pointer Events
@version 16.6
1. React.memo(【函数组件】) ~ React.PureComponent   【memoization => 缓存】
2. React.lazy(() => import【组件】)
3. static contextType
4. static getDerivedStateFromError()
5.  Suspense组件【悬念组件？】
6. 废弃 React.StrictMode
```

### dva
```
1. redux-saga
```

## 其他
### 网络协议
```
1. HTTP1.1和HTTP1.0
2. 强缓存、弱缓存（协商缓存）
```