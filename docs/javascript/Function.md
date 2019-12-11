# Function

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
let argsArr = Array.prototype.slice.call(arguments);
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
