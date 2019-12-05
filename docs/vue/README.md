# Vuejs

## 双向数据绑定
`Vuejs` 是采用`数据劫持`结合`发布者-订阅者模式`的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：
 1. 需要`Observe`的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

```js
// 响应式的数据绑定
function defindReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get: function() {
      // 经过某些操作
      return val
    },
    set: function(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 经过某些操作
    }
  })
}

// observe将对象进行遍历，vm是vue实例
function observe(obj, vm) {
  Object.keys(obj).forEach((key) => {
    defindReactive(vm.data, key, obj[key])
  })
}
  
// Vue构造函数
function Vue(options) {
  this.data = options.data;
  const data = this.data;
  // 将绑定的对象中的data传入observe
  observe(data, this);
  // ...此处代码省略
}
```

2. `Compile`解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。
```js
 // 劫持node的所有子节点
  function nodeToFragment(node, vm) {
    var flag = document.createDocumentFragment();
    var child;
    while (child = node.firstChild) {
      compile(child, vm);
      // 调用以后 child 会从原来 DOM 中移除
      flag.appendChild(child);
    }
    return flag;
  }
  // 数据初始化绑定
  function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/;
    // 节点类型为元素
    if (node.nodeType === 1) {
      var attr = node.attributes;
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName === 'v-model') {
          // 获取v-model绑定的属性名
          var name = attr[i].nodeValue;
          node.addEventListener('input', function(e) {
            // 给相应的 data 属性赋值，进而触发该属性的 set 方法
            vm.data[name] = e.target.value;
          });
          // 将data的值赋给该node
          node.value = vm.data[name];
          node.removeAttribute('v-model');
        }
      }

      // new Watcher(vm, node, name, 'input');
    }

    // 节点类型为text
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        // 获取匹配到的字符串
        var name = RegExp.$1;
        name = name.trim();
        // new Watcher(vm, node, name, 'text')
      }
    }
  }
  
  function Vue(options) { 
    // ...此处省略代码
    var id = options.el;
    var dom = nodeToFragment(document.getElementById(id), this);
    // 编译完成后，将 dom 返回到 app 中
    document.getElementById(id).appendChild(dom);
  }
```

3. `Watcher`订阅者是`Observer`和`Compile`之间通信的桥梁，主要做的事情是:在自身实例化时往属性订阅器(dep)里面添加自己自身必须有一个 update()方法待属性变动 dep.notice()通知时，能调用自身的 update() 方法，并触发`Compile`中绑定的回调，则功成身退。
```js
function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/;
    // 节点类型为元素
    if (node.nodeType === 1) {
      // ...此处省略代码
      new Watcher(vm, node, name, 'input');
    }

    // 节点类型为text
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        // ...此处省略代码
        new Watcher(vm, node, name, 'text')
      }
    }
  }

function Watcher(vm, node, name, nodeType) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.nodeType = nodeType;
    this.update();
    Dep.target = null;
  }

  Watcher.prototype = {
    update: function() {
      this.get();
      if (this.nodeType == 'text') {
        this.node.nodeValue = this.value;
      }
      if (this.nodeType == 'input') {
        this.node.value = this.value;
      }
    },
    // 获取 data 中的属性值
    get: function() {
      // 触发相应属性的 get
      this.value = this.vm.data[this.name];
    }
  };

  function Dep() {
    this.subs = []
  }

  Dep.prototype = {
    addSub: function(sub) {
      this.subs.push(sub);
    },
    notify: function() {
      this.subs.forEach(function(sub) {
        sub.update();
      })
    }
  };
  
  // 响应式的数据绑定
  function defindReactive(obj, key, val) {
    var dep = new Dep();
  
    Object.defineProperty(obj, key, {
      get: function() {
        // 添加订阅者 watcher 到主题对象 Dep
        if (Dep.target) dep.addSub(Dep.target);
        return val
      },
      set: function(newVal) {
          if (newVal === val) return;
          val = newVal;
          // 作为发布者发出通知
          dep.notify();
      }
    })
  }
```
4. `MVVM` 作为数据绑定的入口，整合 `Observer`、`Compile` 和 `Watcher` 三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

## `MVVM`与`MVC`

### 什么是`MVVM`
`MVVM`是`Modal-View-ViewModal`的缩写，是一种设计思想。
* `Modal`代表数据模型：定义数据、修改、操作业务逻辑。
* `View`代表UI组件：将Modal层的数据转化为UI渲染出来。
* `ViewModel`：是同步上述两个的对象（方法是通过双向数据绑定）。是View和Modal链接的桥梁，是双向的。
 View <=> Modal （自动同步的，只需关注业务逻辑，不需要操作DOM和关注数据的状态同步问题）
 
### 什么是`MVC`

* `M`代表 Model，即模型，用于封装与业务逻辑有关的代码和数据。例如订单模型、商品模型。
* `V` 代表 View，即视图，用于呈现内容给用户。例如商品列表页面、后台登录页面。
* `C` 代表 Controller，即控制器，用于接收用户输入（通过浏览器发起的请求），然后调用模型（Model）对输入数据进行处理并获得处理结果。最后将结果传递到视图（View），从而让用户能够看到自己操作的结果。例如用户点击删除文章按钮后，控制器调用操作文章的模型，删除掉指定文章，最后通过视图显示成功删除文章的提示信息。

MVC 模式最大的作用就是分离逻辑和表现。一个业务逻辑在模型中实现，而处理结果在视图中呈现。控制器则充当中间人，根据用户请求调用模型，然后把处理结果传递给视图。

理解：一句话，C接收用户请求发与M，M处理后返回给V结果（一般来讲还要再通过一次C），

1. 当用户在浏览器中点击一个链接或者提交一个表单时，那么就会产生一个请求（request）。当请求离开浏览器时，它会携带用户请求的信息。
2. 请求的第一站到达的是Spring的DispatcherServlet，它是一个前端控制器，工作是将用户的请求委托给其他的组件（这里是交给Spring MVC的控制器）去处理。
这里DispatcherServlet要决定将请求传给哪一个控制器（Controller）去处理，那么这时就需要处理器映射（Handler Mapping）了。
处理器映射会看请求的URL信息，然后决定将请求交给哪一个控制器去处理。比如说有两个控制器ControllerA和ControllerB，分别处理后缀名为.html和.jsp送来的请求，那么当请求者的后缀名为.html时，那么DispatcherServlet就将请求交给ControllerA进行处理。
C代表Controller，负责用户界面和业务逻辑层的通信控制，一方面解释来自用户界面的输入，识别用户动作（如点击按钮等），调用相应Model中的方法，另一方面处理来自Model的事件和返回的执行结果，调用适当的View显示给用户，Controller主要由Servlet完成。
M代表Model，负责整个解决方案的业务逻辑实现，底层的数据库也由Model访问和操作；
V代表View，负责系统向用户的展示，主要由HTML及JSP等完成；
 
### `MVVM`和`MVC`的区别
区别不大，都是设计思想。MVVM中的ViewModal 替换成了Controller，MVVM 主要解决了MVC 中大量的 DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当 Model 频繁发生变化，开发者需要主动更新到 View。

## 组件间数据传递的方式
数据传递的方式有：
1. `props` 和 `$emit`、`on`
2. `vue.protetype.eventBus`
3. `provide` 和 `inject`
4. `slot`、`slot-scope`、`scope`
5. `$attrs` 和 `$listeners`
6. `vuex`
7. `$parent` 和 `$children`
8. `refs`
9. `sync`
10. `observable`

## 生命周期
### 父子组件生命周期的执行顺序
* 初始化渲染
  - 【1】**父组件**的`beforeCreate`、`created` 、`beforeMounted`
  - 【2】**子组件**的`beforeCreate`、`created`、`beforeMount`、`mounted`
  - 【3】**父组件**的`mounted`
* 子组件更新
  - 【1】**父组件**的`beforeUpdate`
  - 【2】**子组件**的`beforeUpdate`、`updated`
  - 【3】**父组件**的`updated`
* 父组件更新
  - 【1】父组件的`beforeUpdate`
  - 【2】父组件的`updated`
* 销毁过程
  - 【1】父组件的`beforeDestroy`
  - 【2】子组件的`beforeDestroy`、`destroyed`
  - 【3】父组件`destroyed`

### 生命周期以及触发机制
#### `beforeCreate、created`
`new Vue实例`之后调用`this._init()`方法，在`_init`方法里面`callHook(vm, 'beforeCreate')`和`callHook(vm, 'created')`

beforeCreate => initState【data】 => created

* beforeMounted

[生命周期钩子](https://cn.vuejs.org/v2/api/index.html#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

### 如何监听子组件的生命周期
```vue
<!-- parent.vue -->
<children @mounted="doSomething"></children>

<!-- children.vue -->
mounted () {
    this.$emit('mounted');
}
```
简单写法直接使用`@hook`。

```vue
<Child @hook:mounted="doSomething"/>
```
 
## `Vuejs`的两个核心
1. 数据驱动[数据变动触发视图跟新]
2. 组件系统[.vue]

## `"v-model"`的实现原理
`v-model` 是 `v-bind:value` 和输入框 `change事件` 的语法糖.

## 重置data
```js
Object.assign(this.$data, this.$options.data())
```

## `Vue.observable`
轻量级的`Vuex`，用作状态管理

```js
// store.js
import Vue from 'vue';

export let store = Vue.observable({count: 0});
export let mutations = {
    setCount(count) {
        store.count = count;
    }
}
```

## 保留模板中的HTML注释
```
<template comment>
...
</template>
```

## 罕见指令
1. `v-pre`：跳过编译
2. `v-cloak`
3. `v-once`

## 性能优化
1. 使用v-pre、v-once
2. 路由懒加载
3. 组件懒加载
4. Object.freeze冻结列表数据/虚拟列表-展示用户手机显示区域内的列表（长列表优化）

## 如何实现权限控制
beforeEach和动态路由加载(addRoutes)

## 如何实现锚点
scrollBehavior
[滚动行为](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)

```js
// 锚点跳转
goAnchor(selector, index) {
  document.querySelector("#app-root").scrollTop = this.$el.querySelector(selector).offsetTop;
  this.$el.querySelector(selector).scrollIntoView()
}
```
## `Vue`有哪些修饰符
* `.stop` 阻止点击事件冒泡（event.stopPropagation）
* `.prevent` 阻止预设行为（event.preventDefault）
* `.capture` 与事件冒泡相反（事件捕获）
* `.self` 只会触发自身事件，不包含子元素
* `.once` 只执行一次
* `.passive` 滚动行为立即触发

## 内置组件 component【is】

## 相关文章
[7个有用的vue开发技巧](https://juejin.im/post/5ce3b519f265da1bb31c0d5f)
