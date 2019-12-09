# 函数柯里化

函数柯里化是把接受**多个参数**的函数转变成接受**一个单一参数**（最初函数的第一个参数）的函数，并且**返回接受余下的参数的新函数**的技术。

函数柯里化的主要作用是**参数复用、提前返回和延迟计算、执行**。

## 实现`sum(1)(2)(3)`，结果为6

```js
function sum (a) {
    return function (b) {
        return function(c) {
          return a + b + c
        }
    }
}

sum(1)(2)(3) // 6
```

## 实现curry函数，将普通函数柯里化

```js
function curry(fn, args = []) {
  return function() {
    let rest = [...args, ...arguments];
    if(rest.length) {
        
    }
  }
}
```
