# 高频问题

## :bookmark: Array的内建方法

### Array Function
* `Array.from()`： 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
* `Array.isArray()`：用于确定传递的值是否是一个`Array`。

### Array.prototype Function
* 修改原数组
  * `pop()`：**删除最后一个**元素，并返回该元素。更改数组长度。
  * `push()`：将**一个或多个元素**添加到数组的**末尾**，并返回该数组的新长度。
  * `shift()`：方法从数组中**删除第一个**元素，并返回该元素。此方法更改数组的长度。
  * `unshift()`：将**一个或多个元素**添加到数组的**开头**，并返回该数组的新长度(该方法修改原有数组)。
  * `reverse()`：反转数组，并返回该数组。
  * `sort()`：对数组进行排序。
  * `splice()`：**删除或替换**现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
  
* 创建新数组
  * `map()`：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
  * `filter()`：过滤符合条件的数组元素，返回一个新数组。
  * `slice()` ：返回一个新的数组，这一对象是一个由`begin`和`end`决定的原数组的浅拷贝（包括`begin`，不包括`end`）。
  * `concat()` ：用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
  * `flat()`：方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

* 查找数组
  * `find()`：返回数组中满足提供的测试函数的第一个元素的值。否则返回`undefined`。
  * `findIndex()`：返回数组中满足提供的测试函数的第一个元素的值的`index`。否则返回`-1`。
  * `indexOf()`：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回`-1`。

* 判断数组
  * `includes()`：用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回`true`，否则返回`false`
  * `some()` ：测试数组中是不是有元素通过了被提供的函数测试
  * `every()` ：测试一个数组内的所有元素是否都能通过某个指定函数的测试
  
* `forEach()`：对数组的每个元素执行一次提供的函数，`renturn undefined`。
* `join()` ：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串
* `reduce()`：方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

### Doc
[Array - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## :bookmark: 数组去重
1. indexOf
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(array){
  var n = []; // 一个新的临时数组
  array.forEach((item) => {
    if(n.indexOf(item) === -1){
      n.push(item)
    }
  });
  return n
}

arr = unique(arr);
```

2. splice
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(a) {
    for(let i = 0; i < a.length; i ++) {
        for(let j = i+1; j < a.length; j ++) {
            if(a[i] == a[j]) {
                a.splice(j, 1);
                j --;
            }
        }
    }
}
unique(arr);
```

3. 数组下标判断法
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(array){
  var n = [array[0]]; // 结果数组
  for(var i = 1; i < array.length; i++) { // 从第二项开始遍历
    if (array.indexOf(array[i]) == i) 
      n.push(array[i]);
  }
  return n;
}

function unique2(array) {
    return array.filter((item, index, arr) => {
        return array.indexOf(item) === index
    })
}
arr = unique(arr);
```

4. set
```js
var arr = ['12','32','89','12','12','78','12','32'];
arr = [...new Set(arr)];

function dedupe(array) {
  return Array.from(new Set(array));       // Array.from()能把set结构转换为数组
}
```

5. reduce + includes
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(a) {
    return a.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur]
    }, [])
}
arr = unique(arr)
```

6. 利用对象的key不能重复
```js
var arr = ['12','32','89','12','12','78','12','32'];
function unique(a) {
    let obj = {};
    let array = [];
    arr.forEach(item => {
        if(!obj[item]) {
            obj[item] = item;
            array.push(item);
        }
    })
    return array;
}
arr = unique(arr);
```

