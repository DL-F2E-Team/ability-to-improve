---
title: 事件流
---

# 事件流
事件机制【事件原理】包括：**事件捕获，事件目标，事件冒泡**。

一般来说事件机制`W3C标准`先触发**事件捕获 -> 目标事件 -> 事件冒泡**。
`IE`中先触发**事件冒泡 -> 目标事件 -> 事件捕获**。
这个过程又叫做**事件的传播**。

虽然**捕获阶段**在规范中规定不允许响应事件，但是实际上还是会执行，所以有两次机会获取到目标对象。

## 阻止事件

* 阻止事件冒泡：
  - **`W3C`** 中使用`event.stopPropagation()`；
  - **`IE`** 中使用`cancelBubble = true`;

* 阻止事件捕获：
  - **`W3C`** 中使用`event.preventDefault()`；
  - **`IE`** 中使用`window.event.returnValue = false`

## 事件代理
事件代理【事件委托叫法不同或者说主体不同】 - addEventListener

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
