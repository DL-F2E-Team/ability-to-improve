---
title: This
---

# This

## 一般函数
匿名函数调用或者全局函数调用，`this`指向**Window、Global**，严格模式下全局函数调用 `this`指向**undefined**

## 构造函数
构造函数调用，`this`指向这个**实例对象**

## 对象方法
对象方法调用，`this`指向**当前对象**

## DOM事件绑定
`onclick`和`addEventerListener`中this默认指向**绑定事件的元素**，IE中使用`attachEvent`,里面的this默认指向**window**

## .call()、.apply()和.bind() 
显示绑定，`this`指向**绑定的值**

## 箭头函数
箭头函数中始终会捕捉其“定义时”所在上下文的`this`值，作为自己的`this`.
