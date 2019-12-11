---
title: Curry - 函数柯里化
---
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
    if(rest.length < fn.length) {
        return curry.call(this, fn, rest)
    } else {
        return fn.apply(this, rest)
    }
  }
}

function curry (fn, currArgs) {
    return function() {
        let args = [].slice.call(arguments);
        // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
        if (currArgs !== undefined) {
            args = args.concat(currArgs);
        }
        // 递归调用
        if (args.length < fn.length) {
            return curry(fn, args);
        }
        // 递归出口
        return fn.apply(null, args);
    }
}

//test
function sum(a,b,c) {
    return a+b+c;
}
let sumFn = curry(sum);
console.log(sumFn(1)(2)(3)); //6
console.log(sumFn(1)(2, 3)); //6

// 写一个 sum 方法，当使用下面的语法调用时，能正常工作
console.log(sum(2, 3)); // Outputs 5
console.log(sum(2)(3)); // Outputs 5

function sum (x) {
    if (arguments.length == 2) {
        return arguments[0] + arguments[1];
    }
    
    return function(y) {
        return x + y;
    }
}
```
