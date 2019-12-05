# 问题

<!--<TOC/>-->

## :bookmark: 求以下输出结果

### 输出结果是
```js
var tasks = [];
var output = function(i){
  return new Promise(function(resolve){
   setTimeout(function(){
      console.log(new Date(), i)
      resolve(i);
    },1000)
  })
}

for(var i = 0; i < 5; i ++){
  tasks.push(output(i));
}

Promise.all(tasks).then(function(i){
  setTimeout(function(){
    console.log(new Date(), i)
  },1000)
})
```
回答：Console

### 输出结果是

```js
for(var i = 0; i < 5; i++){
  setTimeout(function(){
    console.log(new Date(), i)
  }, 1000 * i)
}

console.log(new Date(), i)
```
回答：Console

## 前端与后端交互，如何实现数据加密

## 前端在混合开发中的交互

## 创建原生的ajax请求
```js
 ajax({
     url: "./TestXHR.aspx",              //请求地址
     type: "POST",                       //请求方式
     data: { name: "super", age: 20 },        //请求参数
     dataType: "json",
     success: function (response, xml) {
         // 此处放成功后执行的代码
     },
     fail: function (status) {
         // 此处放失败后执行的代码
     }
 });

 function ajax(options) {
     options = options || {};
     options.type = (options.type || "GET").toUpperCase();
     options.dataType = options.dataType || "json";
     var params = formatParams(options.data);

     //创建 - 非IE6 - 第一步
     if (window.XMLHttpRequest) {
         var xhr = new XMLHttpRequest();
     } else { //IE6及其以下版本浏览器
         var xhr = new ActiveXObject('Microsoft.XMLHTTP');
     }

     //接收 - 第三步
     xhr.onreadystatechange = function () {
         if (xhr.readyState == 4) {
             var status = xhr.status;
             if (status >= 200 && status < 300) {
                 options.success && options.success(xhr.responseText, xhr.responseXML);
             } else {
                 options.fail && options.fail(status);
             }
         }
     }

     //连接 和 发送 - 第二步
     if (options.type == "GET") {
         xhr.open("GET", options.url + "?" + params, true);
         xhr.send(null);
     } else if (options.type == "POST") {
         xhr.open("POST", options.url, true);
         //设置表单提交时的内容类型
         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
         xhr.send(params);
     }
 }
 //格式化参数
 function formatParams(data) {
     var arr = [];
     for (var name in data) {
         arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
     }
     arr.push(("v=" + Math.random()).replace("."));
     return arr.join("&");
 }
```

## `<div name="abc" abc="1"></div>` 如何获取其中的 `abc` 属性
```js
// jq
$('[name="abc"]').attr('abc');

// js
var a = document.getElementByName('abc');
a.getAttribute('abc');
```

## 实现菲波那切数列

## 知道哪些排序的方法？实现思路

回答：

## `jQuery`是如何暴露`$`符号的

```js
window.jQuery = window.$ = jQuery
```

## `for in`能否把原型链循环出来

能。

### 如何避免？

使用 `hasOwnProperty`。

## 原型链

![solar](./images/1.jpg)

## 继承的几种方式

1. `借用构造函数继承` 使用call和apply方法，将父对象的构造函数绑定在子对象上
2. `原型继承`，将子对象的prototype指向父对象的一个实例
3. `组合继承`
