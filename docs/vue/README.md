# Vuejs@2.x

[[toc]]

`Vuejs`是单向数据流和双向数据绑定的。

`Vuejs`的两个核心：
1. **数据驱动**【数据变动触发视图跟新】
2. **组件系统**【.vue】

## 双向数据绑定
`Vuejs` 是采用`数据劫持`结合`发布者-订阅者模式`的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤如下（当然实际要比这个复杂很多）：
1. **对需要`Observe`的数据对象进行递归遍历，包括子属性对象的属性，都加上`setter`和`getter`**。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到数据变化。

```js
// 响应式的数据绑定
function defindReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get: function() {
      ... // 经过某些操作
      return val
    },
    set: function(newVal) {
      if (newVal === val) return;
      val = newVal;
      ... // 经过某些操作
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

2. **`Compile`解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者**。一旦数据有变动，收到通知，更新视图。

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

3. **`Watcher`订阅者是`Observer`和`Compile`之间通信的桥梁**，主要做的事情是:在自身实例化时往属性订阅器(dep)里面添加自己自身必须有一个 update()方法待属性变动 dep.notice()通知时，能调用自身的 update() 方法，并触发`Compile`中绑定的回调，则功成身退。

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

## MVVM 与 MVC

### 什么是 MVVM ?
`MVVM`是`Modal-View-ViewModal`的缩写，是一种设计思想。
* `Modal`代表数据模型：定义数据、修改、操作业务逻辑。
* `View`代表UI组件：将Modal层的数据转化为UI渲染出来。
* `ViewModel`：是同步上述两个的对象（方法是通过双向数据绑定）。是View和Modal链接的桥梁，是双向的。
 View <=> Modal （自动同步的，只需关注业务逻辑，不需要操作DOM和关注数据的状态同步问题）
 
### 什么是 MVC ?
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
区别不大，都是设计思想。**MVVM中的 ViewModal 替换成了MVC中的 Controller**，MVVM 主要解决了MVC 中大量的 DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当 Model 频繁发生变化，开发者需要主动更新到 View。

## Vue的渲染过程
![Vue render](./images/vuerender.jpg)

1. 调用 compile 函数，生成 render 函数字符串，编译过程如下:
  * parse 函数解析 template，生成 ast (抽象语法树)
  * optimize 函数优化静态节点 (标记不需要每次都更新的内容，diff 算法会直接跳过静态节点，从而减少比较的过程，优化了 patch 的性能)
  * generate 函数生成 render 函数字符串
2. 调用 new Watcher 函数，监听数据的变化，当数据发生变化时，Render 函数执行生成 vnode 对象
3. 调用 patch 方法，对比新旧 vnode 对象，通过 DOM diff 算法，添加、修改、删除真正的 DOM 元素

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

## Vue.observable
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

## 生命周期
### 父子组件生命周期的执行顺序
在以下生命周期中，`mixins`相应的生命周期会在**当前混入的生命周期之前执行**，如果是`methods`相同，就会完全覆盖掉。

* 初始化渲染
  1. 父组件的`beforeCreate`、`created` 、`beforeMounted`
  2. 子组件的`beforeCreate`、`created`、`beforeMount`、`mounted`
  3. 父组件的`mounted`
* 子组件更新
  1. 父组件的`beforeUpdate`
  2. 子组件的`beforeUpdate`、`updated`
  3. 父组件的`updated`
* 父组件更新
  1. 父组件的`beforeUpdate`
  2. 父组件的`updated`
* 销毁过程
  1. 父组件的`beforeDestroy`
  2. 子组件的`beforeDestroy`、`destroyed`
  3. 父组件`destroyed`

### 生命周期以及触发机制
#### `beforeCreate、created`
`new Vue实例`之后调用`this._init()`方法，在`_init`方法里面`callHook(vm, 'beforeCreate')`和`callHook(vm, 'created')`

beforeCreate => initState【data】 => created

* beforeMounted

创建前/后：在beforeCreated阶段，vue实例的挂载元el还没有。
载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
更新前/后：当data变化时，会触发beforeUpdate和updated方法。
销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在。

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

## Vue@3为什么采用`proxy`，弃用了`Object.defineProperty`?
`Object.defineProperty`本身有一定的监控**数组下标变化**的能力，从性能/体验的性价比考虑【[Vue为什么不能检测数组变动](https://segmentfault.com/a/1190000015783546)】。Vue自身内部处理一些方法来监听了数组变动：
```js
push();
pop();
shift();
unshift();
splice();
sort();
reverse();
```
只有以上方法进行了hack，具有一定的局限性。

`Object.defineProperty`只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。`Vue 2.x`里,是通过**递归 + 遍历**data对象来实现对数据的监控的,如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。**`Proxy`可以劫持整个对象,并返回一个新的对象。`Proxy`不仅可以代理对象、数组，还可以代理动态增加的属性**。

## `$nextTick`的作用
下次DOM更新循环结束之后执行延迟**回调**。在修改数据之后立即使用这个方法，获取更新后的DOM。

**有些时候在改变数据后立即要对dom进行操作**，此时获取到的DOM仍是获取到的是数据刷新前的DOM，无法满足需要，这个时候就用到`$nextTick`。
```js
this.$nextTick(() => {
    // do something
})
```

## `v-for`中`key`的作用
主要作用是**为了高效的更新`Virtual DOM`**，是因为`Virtual DOM`使用`Diff`算法实现的原因。

`key`是给每一个`vnode`的唯一id，依靠`key`，我们的`Diff`操作可以**更准确、更快速**【对于简单列表页渲染来说`Diff`节点也更快，但会产生一些隐藏的副作用，比如可能不会产生过渡效果，或者在某些节点有绑定数据（表单）状态，会出现状态错位。】

Diff 算法的过程中，先会进行新旧节点的首尾交叉对比，当无法匹配的时候会用新节点的 key 与旧节点进行比对，从而找到相应旧节点。

![keys](./images/vforkeys.jpg)

### 更准确
因为带 key 就不是就地复用了，在 sameNode 函数`a.key === b.key`对比中可以避免就地复用的情况。所以会更加准确，如果不加 key，会导致之前节点的状态被保留下来，会产生一系列的 bug。

### 更快速【降低时间复杂度】
key 的唯一性可以被 Map 数据结构充分利用，相比于遍历查找的时间复杂度 O(n)，Map 的时间复杂度仅仅为 O(1)，源码如下:
```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

## v-model 的实现原理
`v-model` 是 `v-bind:value` 和输入框 `change事件` 的语法糖.

## Vue 组件 data 为什么必须是函数？
> new Vue()实例中，data 可以直接是一个对象，为什么在 vue 组件中，data 必须是一个函数呢?

因为组件是可以复用的，JS 里对象是引用关系,如果组件 data 是一个对象，那么子组件中的 data 属性值会互相污染，产生副作用。

所以一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue 的实例是不会被复用的,因此不存在以上问题。

### 如何重置data？
```js
Object.assign(this.$data, this.$options.data())
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
[揭秘 Vue.js 九个性能优化技巧](https://juejin.cn/post/6922641008106668045)

### Vue 应用运行时性能优化建议
* 使用 v-pre、v-once
* 路由懒加载
* 通过组件懒加载优化超长应用内容初始渲染性能
* `Object.freeze()`冻结列表数据/虚拟列表-展示用户手机显示区域内的列表
* 优化无限列表性能
  - vue-virtual-scroll-list 和 vue-virtual-scroller 都是解决这类问题的开源项目。你也可以参考 Google 工程师的文章Complexities of an Infinite Scroller 来尝试自己实现一个虚拟的滚动列表来优化性能，主要使用到的技术是 DOM 回收、墓碑元素和滚动锚定。
* 使用单文件组件（.vue）预编译模板
* 提取组件的 CSS 到单独到文件
* 扁平化 Store 数据结构
* 避免持久化 Store 数据带来的性能问题
* 使用 `Functional components`
```vue
// 优化前
<template>
  <div class="cell">
    <div v-if="value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>
```

```vue
// 优化后
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>
```
* `Child component splitting` 子组件拆分
* 计算属性 `computed`
* 局部变量
* `v-show` 复用DOM
* `KeepAlive`组件缓存DOM
* 使用`Deferred`组件延时分批渲染组件
```vue
// deferred mixins
export default function (count = 10) {
  return {
    data () {
      return {
        displayPriority: 0
      }
    },

    mounted () {
      this.runDisplayPriority()
    },

    methods: {
      runDisplayPriority () {
        const step = () => {
          requestAnimationFrame(() => {
            this.displayPriority++
            if (this.displayPriority < count) {
              step()
            }
          })
        }
        step()
      },

      defer (priority) {
        return this.displayPriority >= priority
      }
    }
  }
}
```


### Vue 应用加载性能优化建议
* 利用服务端渲染（SSR）和预渲染（Prerender）来优化加载性能
* 通过组件懒加载优化超长应用内容加载性能

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

## `vm.$set()`实现原理是什么?
```js
export function set(target: Array<any> | Object, key: any, val: any): any {
  // target 为数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splice()执行有误
    target.length = Math.max(target.length, key);
    // 利用数组的splice变异方法触发响应式
    target.splice(key, 1, val);
    return val;
  }
  // target为对象, key在target或者target.prototype上 且必须不能在 Object.prototype 上,直接赋值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  // 以上都不成立, 即开始给target创建一个全新的属性
  // 获取Observer实例
  const ob = (target: any).__ob__;
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 进行响应式处理
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
```

1. 如果目标是**数组**,使用 Vue 实现的变异方法 **`splice`** 实现响应式
2. 如果目标是**对象**,判断属性存在,即为响应式,直接赋值
3. 如果 target 本身就不是响应式,直接赋值
4. 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理

## 聊聊 keep-alive 的实现原理和缓存策略

```js
export default {
  name: "keep-alive",
  abstract: true, // 抽象组件属性 ,它在组件实例建立父子关系的时候会被忽略,发生在 initLifecycle 的过程中
  props: {
    include: patternTypes, // 被缓存组件
    exclude: patternTypes, // 不被缓存组件
    max: [String, Number] // 指定缓存大小
  },

  created() {
    this.cache = Object.create(null); // 缓存
    this.keys = []; // 缓存的VNode的键
  },

  destroyed() {
    for (const key in this.cache) {
      // 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    // 监听缓存/不缓存组件
    this.$watch("include", val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch("exclude", val => {
      pruneCache(this, name => !matches(val, name));
    });
  },

  render() {
    // 获取第一个子元素的 vnode
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot);
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // name不在inlcude中或者在exlude中 直接返回vnode
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      // 获取键，优先获取组件的name字段，否则是组件的tag
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
      // 命中缓存,直接从缓存拿vnode 的组件实例,并且重新调整了 key 的顺序放在了最后一个
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      }
      // 不命中缓存,把 vnode 设置进缓存
      else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        // 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }
      // keepAlive标记位
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  }
};
```
1. 获取 keep-alive 包裹着的第一个子组件对象及其组件名
2. 根据设定的 include/exclude（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例
3. 根据组件 ID 和 tag 生成缓存 Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该 key 在 this.keys 中的位置(更新 key 的位置是实现 LRU 置换策略的关键)
4. 在 this.cache 对象中存储该组件实例并保存 key 值，之后检查缓存的实例数量是否超过 max 的设置值，超过则根据 LRU 置换策略删除最近最久未使用的实例（即是下标为 0 的那个 key）
5. 最后组件实例的 keepAlive 属性设置为 true，这个在渲染和执行被包裹组件的钩子函数会用到，这里不细说

### LRU 缓存淘汰算法
**LRU（Least recently used）** 算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。

**keep-alive 的实现正是用到了 LRU 策略，将最近访问的组件 push 到 this.keys 最后面，this.keys[0]也就是最久没被访问的组件，当缓存实例超过 max 设置值，删除 this.keys[0]**

## Vue.extend Vue构造器
Vue.extend 返回的是一个“扩展实例构造器”，也就是预设了部分选项的 Vue 的实例构造器。vue.extend() 方法其实是 Vue 的一个构造器，继承自 Vue。
```js
// 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
// data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
<div id="mount-point"></div>

// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

```js
// hello.js
import Vue from 'vue';
import HelloTemplate from './hello.vue';

// 使用extend方法创建vue的子类
const HelloConstructor = Vue.extend(HelloTemplate);

// 使用这个方法调用hello组件
function Hello(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      text: options
    }
  }
  
  // 实例化子组件，然后获取到DOM结构并挂载到body上
  const helloInstence = new HelloConstructor({data: options});
  helloInstence.vm = helloInstence.$mount();
  console.log(helloInstence.vm)
  document.body.appendChild(helloInstence.vm.$el);
}
export default Hello;
```

## Watch高级用法
```js {3,7,14,18}
watch: {
 firstName: {
  handler(newName, oldName) {
   this.fullName = newName + ' ' + this.lastName;
  },
  // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
  immediate: true,
 },
 obj: {
  handler() {
     ...
  },
  // 是否深度监听
  deep: true
 }
 
 // 或者
'obj.a': {
  handler(newName, oldName) {
   console.log('obj.a changed');
  },
  immediate: true,
  // deep: true/
 }
}
```

## 自定义指令
### 自定义指令(v-check, v-focus) 的方法有哪些? 它有哪些钩子函数? 还有哪些钩子函数参数
全局定义指令：在 vue 对象的 directive 方法里面有两个参数, 一个是指令名称, 另一个是函数。
组件内定义指令：directives
钩子函数: bind(绑定事件出发)、inserted(节点插入时候触发)、update(组件内相关更新)
钩子函数参数： el、binding

## 页面中定义一个定时器，在哪个阶段清除？
答案：在 beforeDestroy 中销毁定时器。
```js
mounted(){
 this.timer = setInterval(()=>{
    console.log(1)
 },1000)
},
beforeDestroy(){
 clearInterval(this.timer)
}
```
缺点：
它需要在这个组件实例中保存这个 timer，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。

我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化的清理我们建立的所有东西。

该方法是通过$once这个事件侦听器在定义完定时器之后的位置来清除定时器
```js
mounted(){
 const timer = setInterval(()=>{
    console.log(1)
 },1000)
 this.$once('hook:beforeDestroy',()=>{
  clearInterval(timer)
 })
}
```

## 相关文章
* [7个有用的vue开发技巧 - 掘金](https://juejin.im/post/5ce3b519f265da1bb31c0d5f)
* [12道vue高频原理面试题,你能答出几道? - 知乎](https://zhuanlan.zhihu.com/p/101330697)
