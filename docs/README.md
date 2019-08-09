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

* `javascript`是弱类型语言。<br/>
基本数据类型 - （数字、字符串、Boolean、undefined、null）、ES6新增（symbol）。<br/>
引用数据类型 - 引用数据类型 object（对象包括【function、array】）。<br/>
原生函数 - String、Number、Boolean、Array、Object、Function、RegExp、Date、Error、Symbol

* `typeof` <br/>
typeof null => object <br/>
判断null：(!a && typeof a === 'object')

* undefined 和 is not defined 是两回事，前者已声明未赋值，后者未声明。

* ECMAScript、文档对象模型（DOM）、游览器对象模型（BOM）

* 稀疏数组

* `void`

* 获取封装对象的值：`valueOf`

* Date.now() === (new Date()).getTime()

* throw new Error ('')

* 隐式强制类型转换(valueOf()，toString())，显式强制类转换：假值 - undefined null false +0 -0 NaN '' <br/>
 +一元运算符能将字符串快速转换为数字，并且将日期转换为时间戳
```
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
* [Vue服务端渲染指南](https://ssr.vuejs.org/zh/)
* [Nuxt.js](https://zh.nuxtjs.org/)

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

## 其他
* [egg.js](https://eggjs.org/zh-cn/)

## emoji - 提高commit逼格

| emoji             | emoji 代码  | commit 说明     |
|:----------------- |:---------- | :-------------- |
| :art: (调色板)     | art    | 改进代码结构/代码格式   |
| :fire: (火焰)      | fire | 移除代码或文件           |
| :bug: (bug)      | bug | 修复 bug           |
| :ambulance: (急救车)     | ambulance | 重要补丁      |
| :sparkles: (火花)    | sparkles | 引入新功能         |
| :memo: (备忘录)   | memo | 撰写文档         |
| :rocket: (火箭)   | rocket | 更新 UI 和样式文件         |
| :tada: (庆祝)    | tada | 初次提交         |
| :white_check_mark: (白色复选框)    | white_check_mark | 增加测试         |
| :lock: (锁)   | lock | 修复安全问题         |
| :apple: (苹果)   | apple | 修复 macOS 下的问题         |
| :penguin: (企鹅)    | penguin | 修复 Linux 下的问题         |
| :checkered_flag: (旗帜)    | checked_flag | 修复 Windows 下的问题         |
| :bookmark: (书签)    | bookmark | 发行/版本标签        |
| :rotating_light: (警车灯)    | rotating_light | 移除 linter 警告         |
| :construction: (施工)    | construction | 工作进行中         |
| :green_heart: (绿心)   | green_heart | 修复 CI 构建问题         |
| :arrow_down: (下降箭头)    | arrow_down | 降级依赖         |
| :arrow_up: (上升箭头)    | arrow_up | 升级依赖         |
| :construction_worker: (工人)   | construction_worker | 添加 CI 构建系统         |
| :chart_with_upwards_trend: (上升趋势图)   | chart_with_upwards_trend | 添加分析或跟踪代码         |
| :hammer: (锤子)    | hammer | 重大重构         |
| :heavy_minus_sign: (减号)    | heavy_minus_sign | 减少一个依赖         |
| :whale: (鲸鱼)   | whale | Docker 相关工作         |
| :heavy_plus_sign: (加号)   | heavy_plug_sign | 增加一个依赖         |
| :wrench: (扳手)   | wrench | 修改配置文件         |
| :globe_with_meridians: (地球)    | globe_with_meridians | 国际化与本地化         |
| :pencil2: (铅笔)   | pencil2 | 修复 typo         |


## 常用正则

### 数字校验

```jsx harmony
 1 数字：^[0-9]*$
 2 n位的数字：^\d{n}$
 3 至少n位的数字：^\d{n,}$
 4 m-n位的数字：^\d{m,n}$
 5 零和非零开头的数字：^(0|[1-9][0-9]*)$
 6 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
 7 带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
 8 正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
 9 有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
10 有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
11 非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
12 非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
13 非负整数：^\d+$ 或 ^[1-9]\d*|0$
14 非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
15 非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
16 非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
17 正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
18 负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
19 浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
```
### 校验字符串
```jsx harmony
 1 汉字：^[\u4e00-\u9fa5]{0,}$
 2 英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
 3 长度为3-20的所有字符：^.{3,20}$
 4 由26个英文字母组成的字符串：^[A-Za-z]+$
 5 由26个大写英文字母组成的字符串：^[A-Z]+$
 6 由26个小写英文字母组成的字符串：^[a-z]+$
 7 由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
 8 由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
 9 中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
10 中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
11 可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
12 禁止输入含有~的字符：[^~\x22]+
```

### 特殊需求校验

```jsx harmony
1 Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
 2 域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?
 3 InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
 4 手机号码：^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$ (由于工信部放号段不定时，所以建议使用泛解析 ^([1][3,4,5,6,7,8,9])\d{9}$)
 5 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$ 
 6 国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7} 
 7 18位身份证号码(数字、字母x结尾)：^((\d{18})|([0-9x]{18})|([0-9X]{18}))$
 8 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
 9 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
10 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$  
11 日期格式：^\d{4}-\d{1,2}-\d{1,2}
12 一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
13 一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$ 
14 钱的输入格式：
15    1.有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$ 
16    2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$ 
17    3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$ 
18    4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$ 
19    5.必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：^[0-9]+(.[0-9]{2})?$ 
20    6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$ 
21    7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$ 
22    8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$ 
23    备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
24 xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
25 中文字符的正则表达式：[\u4e00-\u9fa5]
26 双字节字符：[^\x00-\xff]    (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
27 空白行的正则表达式：\n\s*\r    (可以用来删除空白行)
28 HTML标记的正则表达式：<(\S*?)[^>]*>.*?</\1>|<.*? />    (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
29 首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$)    (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
30 腾讯QQ号：[1-9][0-9]{4,}    (腾讯QQ号从10000开始)
31 中国邮政编码：[1-9]\d{5}(?!\d)    (中国邮政编码为6位数字)
32 IP地址：\d+\.\d+\.\d+\.\d+    (提取IP地址时有用)
33 IP地址：((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))    (由@飞龙三少 提供,感谢共享)
```

[原文地址](https://www.cnblogs.com/zxin/archive/2013/01/26/2877765.html)
