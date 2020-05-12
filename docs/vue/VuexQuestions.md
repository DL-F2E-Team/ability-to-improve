# the questions of Vuex

## 什么是 Vuex？
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态。

## Vuex 解决了什么问题？什么时候使用？
1. 多个组件依赖于同一状态时，对于多层嵌套的组件的传参将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
2. 来自不同组件的行为需要变更同一状态。以往采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

## Vuex 中状态储存在哪里，怎么改变它？
存储在 state 中

改变 Vuex 中的状态的唯一途径就是显式地提交 （commit）mutation。

## Vuex 中状态是对象，使用时候注意什么？
因为对象是引用类型，复制后改变属性还是会影响原始数据，这样会改变 state 里面的状态，是不允许，所以先用深度克隆复制对象，再修改。

## 怎么在组件中批量使用 state 状态？
使用 mapState 辅助函数，利用对象展开运算符将 state 混入 computed 对象中

```js
import {mapState} from 'vuex'

export default{
  computed:{
    ...mapState(['price','number'])
  }
}
```

## Vuex 要从 state 派生一些状态出来，且多个组件使用它，该怎么做？
使用 getter 属性，相当 Vue 中的计算属性 computed，只有原状态改变派生状态才会改变。

```js
const store = new Vuex.Store({
  state: {
    price: 10,
    number: 10,
    discount: 0.7,
  },
  getters: {
    total: state => {
      return state.price * state.number
    },
    // getter 接收两个参数，第一个是 state，第二个是 getters (可以用来访问其他 getter)。
    discountTotal: (state, getters) => {
      return state.discount * getters.total
    }
  },
});
```

然后在组件中可以用计算属性 computed 通过 this.$store.getters.total 这样来访问这些派生转态。

```js
computed: {
  total() {
    return this.$store.getters.total
  },
  discountTotal() {
    return this.$store.getters.discountTotal
  }
}
```

## 怎么通过 getter 来实现在组件内可以通过特定条件获取 state 的状态？
通过让 getter 返回一个函数，来实现给 getter 传参。然后通过参数来进行判断从而获取 state 中满足要求的状态。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true},
      { id: 2, text: '...', done: false}
    ]
  },
  getters: {
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
});
```

然后在组件中可以用计算属性 computed 通过 this.$store.getters.getTodoById(2) 这样来访问这些派生转态。

```js
computed: {
  getTodoById () {
    return this.$store.getters.getTodoById
  },
}
mounted () {
  console.log(this.getTodoById(2).done)//false
}
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

## 怎么在组件中批量使用 Vuex 的 getter 属性
使用 mapGetters 辅助函数, 利用对象展开运算符将 getter 混入 computed 对象中

```js
import {mapGetters} from 'vuex'

export default{
  computed:{
    ...mapGetters(['total','discountTotal'])
  }
}
```

## 怎么在组件中批量给 Vuex 的 getter 属性取别名并使用
使用 mapGetters 辅助函数, 利用对象展开运算符将 getter 混入 computed 对象中
```js
import {mapGetters} from 'vuex'

export default{
  computed: {
    ...mapGetters({
      myTotal:'total',
      myDiscountTotal:'discountTotal',
    })
  }
}
```

## 使用 mutation 要注意什么？
mutation 必须是同步函数

## 在组件中多次提交同一个 mutation，怎么写使用更方便
使用 mapMutations 辅助函数，在组件中这么使用

```js
methods: {
  ...mapMutations({
    setNumber:'SET_NUMBER',
  })
}
```

然后调用 this.setNumber(10) 相当调用 this.$store.commit('SET_NUMBER', 10)

## 在组件中多次提交同一个action，怎么写使用更方便

使用 mapActions 辅助函数，在组件中这么使用

```js
methods: {
  ...mapActions({
    setNumber:'SET_NUMBER',
  })
}
```

然后调用 this.setNumber(10) 相当调用 this.$store.dispatch('SET_NUMBER'，10)

## 有两个 action，分别是 actionA 和 actionB，都是异步操作，在 actionB 要提交 actionA，需在 actionA 处理结束再处理其它操作，怎么实现？
利用 ES6 的`async`和`await`来实现。
```js
actions:{
  async actionA({commit}){
    //...
  },
  async actionB({dispatch}){
    await dispatch ('actionA')
    // ...
  }
}
```

## 有用过 Vuex 模块吗，为什么要使用，怎么使用？
有，因为使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。所以将 store 分割成模块（module）。每个模块拥有自己的 state、mutations、actions、getters，甚至是嵌套子模块，从上至下进行同样方式的分割。

在 module 文件新建 moduleA.js 和 moduleB.js 文件。在文件中写入：

```js
const state = {
  //...
}

const getters = {
  //...
}

const mutations = {
  //...
}

const actions = {
  //...
}

export default{
  state,
  getters,
  mutations,
  actions
}
```

然后再index.js引入模块

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import moduleA from './module/moduleA'
import moduleB from './module/moduleB'

const store = newVuex.Store({
  modules: {
    moduleA,
    moduleB
  }
})

export default store
```

## 在模块中，getter 和 mutation 接收的第一个参数 state，是全局的还是模块的？
第一个参数 state 是模块的 state，也就是局部的 state。

## 在模块中，getter、mutation、action 中怎么访问全局的 state 和 getter
* getter： 通过第三个参数 rootState 访问到全局的 state，可以通过第四个参数 rootGetters 访问到全局的 getter。
* mutation：不可以访问全局的 state 和 getter，只能访问到局部的 state。
* action：第一个参数 context 中的 context.rootState 访问到全局的 state，context.rootGetters 访问到全局的 getter。

## 在组件中怎么访问 Vuex 模块中的 getter 和 state，怎么提交 mutation 和 action？

直接通过 this.$store.getters 和 this.$store.state 来访问模块中的 getter 和 state。

直接通过 this.$store.commit('mutationA', data) 提交模块中的 mutation。

直接通过 this.$store.dispatch('actionA, data') 提交模块中的 action。

## 用过Vuex模块的命名空间吗？为什么使用，怎么使用？
默认情况下，模块内部的 action、mutation、getter 是注册在全局命名空间，如果多个模块中 action、mutation 的命名是一样的，那么提交 mutation、action 时，将会触发所有模块中命名相同的 mutation、action。

这样有太多的耦合，如果要使你的模块具有更高的封装度和复用性，你可以通过添加`namespaced: true`的方式使其成为带命名空间的模块。

```js
export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
```

## 怎么在带命名空间的模块内提交全局的 mutation 和 action？
将`{root: true}`作为第三参数传给 dispatch 或 commit 即可。

this.$store.dispatch('actionA', null, { root: true})

this.$store.commit('mutationA', null, { root: true})

## 怎么在带命名空间的模块内注册全局的 action？
```js
actions: {
  actionA: {
    root: true,
    handler (context, data) { ... }
  }
}
```

## 组件中怎么提交 modules 中的 moduleA 中的 mutationA？
this.$store.commit('moduleA/mutationA',data)

## 怎么使用 mapState，mapGetters，mapActions、mapMutations 这些函数来绑定带命名空间的模块？
首先使用 createNamespacedHelpers 创建基于某个命名空间辅助函数
```js
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('moduleA');

export default{
  computed: {
    // 在 `module/moduleA` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `module/moduleA` 中查找
    ...mapActions([
      'actionA',
      'actionB'
    ])
  }
}
```

## 在 v-model 上怎么用 Vuex 中 state 的值？
需要通过computed计算属性来转换。
```js
<input v-model="message">
// ...
computed: {
  message: {
    get () {
       return this.$store.state.message
    },
    set (value) {
       this.$store.commit('updateMessage', value)
    }
  }
}
```

## actions 和 mutations 有什么区别？
1. mutations 主要执行同步的操作【其实是可以进行异步操作的，但是 BUG 不易通过 devtools 进行定位】，actions 则可以发起异步操作，会默认将自身封装为一个 Promise
2. actions 提交的是 mutations，而不是直接变更状态。mutations 可以直接变更状态。**改变 state 的唯一途径是提交 （commit）mutation。**
3. 提交方式不同，actions 是用 this.$store.dispatch('ACTION_NAME', data) 来提交。mutations 是用 this.$store.commit('SET_NUMBER', 10) 来提交。
4. 接收参数不同，mutations 第一个参数是 state，而 actions 第一个参数是 context，其包含了：
```js
{
  state,      // 等同于 `store.state`，若在模块中则为局部状态
  rootState,  // 等同于 `store.state`，只存在于模块中
  commit,     // 等同于 `store.commit`
  dispatch,   // 等同于 `store.dispatch`
  getters,    // 等同于 `store.getters`
  rootGetters // 等同于 `store.getters`，只存在于模块中
}
```

## 在 Vuex 和 Vue 的源码中，作者都使用了`Object.create(null)`来初始化一个新对象。为什么不用更简洁的`{}`呢？

可以简单理解为便于编写自身的一些方法和属性，而不用担心在原型脸上有相同的属性或者方法
 
**{} = Object.create(Object.prototype)**

具体请看：[详解Object.create(null)](https://juejin.im/post/5acd8ced6fb9a028d444ee4e)

{} 新创建的对象继承了 Object 自身的方法，如`hasOwnProperty`、`toString`等，在新对象上可以直接使用。
Object.create(null) 新创建的对象除了自身属性 a 之外，原型链上没有任何属性，也就是没有继承 Object 的任何东西

使用 create 创建的对象，没有任何属性，显示 No properties，我们可以把它当作一个非常纯净的 map 来使用，我们可以自己定义 hasOwnProperty、toString 方法，不管是有意还是不小心，我们完全不必担心会将原型链上的同名方法覆盖掉。

```js
// Demo1
var a = {...省略很多属性和方法...};
// 如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
if(Object.prototype.hasOwnProperty.call(a, 'toString')){
    ...
}
// 为什么不能直接用a.hasOwnProperty('toString')?因为你可能给a添加了一个自定义的hasOwnProperty
// 你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
if(a.toString){}

// Demo2
var a = Object.create(null)
// 你可以直接使用下面这种方式判断，因为存在的属性，都将定义在a上面，除非手动指定原型：
if(a.toString){}
```

另一个使用 create(null) 的理由是，在我们使用 for..in 循环的时候会遍历对象原型链上的属性，使用 create(null) 就不必再对属性进行检查了，当然，我们也可以直接使用 Object.keys[]。

## 如何区分 state 是外部直接修改，还是通过 mutation 方法修改的？
Vuex 中修改 state 的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 this._withCommit(fn) 设置_committing 标志变量为 true，然后才能修改 state，修改完毕还需要还原_committing 变量。外部修改虽然能够直接修改 state，但是并没有修改_committing 标志位，所以只要 watch 一下 state，state change 时判断是否_committing 值为 true，即可判断修改的合法性。

```js
_withCommit (fn) {
  const committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
}
  
// commit 截取 在 commit 的时候将 function 传入 _withCommit
... 省略
this._withCommit(() => {
  entry.forEach(function commitIterator (handler) {
    handler(payload)
  })
})
... 省略
```

## action 通常是异步的，那么如何知道 action 什么时候结束呢？
在action函数中返回Promise，然后再提交时候用then处理
```js
actions: {
    SET_NUMBER_A ({commit},data) {
        return newPromise((resolve,reject) => {
            setTimeout(() =>{
                commit('SET_NUMBER',10)
            }, 2000)
        })
    }
}

this.$store.dispatch('SET_NUMBER_A').then(() => {
  // ...
})
```

## 在执行 dispatch 触发 action(commit 同理)的时候，只需传入(type, payload)，action 执行函数中第一个参数 store 从哪里获取的？

```js {11,12,13,14,15,16,17,18}
module.forEachAction((action, key) => {
  const type = action.root ? key : namespace + key
  const handler = action.handler || action
  registerAction(store, type, handler, local)
})

// 返回一个绑定过store的handler
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}

// dispatch 截取的代码，执行了上面的handle
... 省略
const result = entry.length > 1
  ? Promise.all(entry.map(handler => handler(payload)))
  : entry[0](payload)
... 省略
```

store 初始化时，所有配置的 action 和 mutation 以及 getters 均被封装过。在执行如 dispatch('submitOrder', payload)的时候，actions 中 type 为 submitOrder 的所有处理方法都是被封装后的，其第一个参数为当前的 store 对象，所以能够获取到 { dispatch, commit, state, rootState } 等数据。

## 为什么有 action 了还需要 mutation ？
因为 Vuex 需要保证将全部的状态改变都用同步方式实现。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态，这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。

## 多人同时使用 Vuex 如何防止数据污染
module

## state 内部支持模块配置和模块嵌套，如何实现的?
在 store 构造方法中有 makeLocalContext 方法，所有 module 都会有一个 local context，根据配置时的 path 进行匹配。所以执行如 dispatch('submitOrder', payload)这类 action 时，默认的拿到都是 module 的 local state，如果要访问最外层或者是其他 module 的 state，只能从 rootState 按照 path 路径逐步进行访问。

## 调试时的"时空穿梭"功能是如何实现的?
devtoolPlugin 中提供了此功能。因为 dev 模式下所有的 state change 都会被记录下来，'时空穿梭' 功能其实就是将当前的 state 替换为记录中某个时刻的 state 状态，利用 store.replaceState(targetState) 方法将执行 this._vm.state = state 实现。

## Vuex插件有用过吗？怎么用简单介绍一下？
Vuex 插件就是一个函数，它接收 store 作为唯一参数。在 Vuex.Store 构造器选项 plugins 引入。

在store/plugin.js文件中写入

```js
export default function createPlugin (param) {
    return store => {
        //...
    }
}

// 然后在store/index.js文件中写入
import createPlugin from './plugin.js'

const plugin = createPlugin()
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

## Vuex 插件中怎么监听组件中提交 mutation 和 action？
用 Vuex.Store 的实例方法 subscribe 监听组件中提交 mutation，用 Vuex.Store 的实例方法 subscribeAction 监听组件中提交 action。

在store/plugin.js文件中写入

```js
export default function createPlugin (param) {
  return store => {
    store.subscribe((mutation, state) => {
      // 是那个 mutation
      console.log(mutation.type)
      console.log(mutation.payload)
      console.log(state)
    })
    store.subscribeAction({
       // 提交 action 之前
       before: (action, state) => {
          console.log(`before action ${action.type}`)
       },
       // 提交 action 之后
       after: (action, state) => {
          console.log(`after action ${action.type}`)
       }
    })
  }
}
```

然后在store/index.js文件中写入

```js
import createPlugin from './plugin.js'

const plugin = createPlugin()
const store = new Vuex.Store({
  // ...
  plugins: [plugin]
})
```

## mutations 里的方法，为什么可以修改 state？
在Vuex实例化的时候，会调用 Store ，Store 会调用 installModule，来对传入的配置进行模块的注册和安装。对 mutations 进行注册和安装，调用了 registerMutation 方法：

```js
/**
 * 注册 mutation 作用同步修改当前模块的 state
 * @param {*} store  Store实例
 * @param {*} type  mutation 的 key
 * @param {*} handler  mutation 执行的函数
 * @param {*} local  当前模块
 */
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = []) 
  entry.push(function wrappedMutationHandler (payload) { 
    handler.call(store, local.state, payload)
  })
}
```

该方法对mutation方法进行再次封装，注意 handler.call(store, local.state, payload)，这里改变 mutation 执行的函数的 this 指向为 Store实例，local.state 为当前模块的 state，payload 为额外参数。

因为改变了 mutation 执行的函数的 this 指向为 Store实例，就方便对 this.state 进行修改。

## 为什么可以通过 this.commit 来调用 mutation 函数？
在 Vuex 中，mutation 的调用是通过 store 实例的 API 接口 commit 来调用的。来看一下 commit 函数的定义：

```js
/**
   * 
   * @param {*} _type mutation 的类型
   * @param {*} _payload 额外的参数
   * @param {*} _options 一些配置
   */
  commit (_type, _payload, _options) {
    // check object-style commit
    // unifyObjectStyle 方法对 commit 多种形式传参 进行处理
    // commit 的载荷形式和对象形式的底层处理
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options) 

    const mutation = { type, payload }

    // 根据 type 去查找对应的 mutation
    const entry = this._mutations[type]
    // 没查到 报错提示
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }

    // 使用了 this._withCommit 的方法提交 mutation
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })

    // 遍历 this._subscribers，调用回调函数，并把 mutation 和当前的根 state 作为参数传入
    this._subscribers.forEach(sub => sub(mutation, this.state))

    if (
      process.env.NODE_ENV !== 'production' &&
      options && options.silent
    ) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
        'Use the filter functionality in the vue-devtools'
      )
    }
}
```

this.commmit() 接收mutation的类型和外部参数，在 commmit 的实现中通过 this._mutations[type] 去匹配到对应的 mutation 函数，然后调用。

## 通过 this.$store.getters.xx，是如何可以访问到 getter 函数的执行结果的？

在 Vuex 源码的 Store 实例的实现中有这样一个方法 resetStoreVM:
```js
function resetStoreVM (store, state, hot) {
    const oldVm = store._vm

    // bind store public getters
    store.getters = {}
    const wrappedGetters = store._wrappedGetters
    const computed = {}
    Object.keys(wrappedGetters).forEach(key => {
        const fn = wrappedGetters[key]
        // use computed to leverage its lazy-caching mechanism
        computed[key] = () => fn(store)
        Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
        })
    })
    
    // ...
    
    store._vm = new Vue({
        data: { state },
        computed
    })
    
    // ...
}
```

遍历 store._wrappedGetters 对象，在遍历过程中拿到每个 getter 的包装函数，并把这个包装函数执行的结果用 computed 临时保存。

然后实例化了一个 Vue实例，把上面的 computed 作为计算属性传入，把 状态树state 作为 data 传入，这样就完成了注册。

我们就可以在组件中访问 this.$store.getters.xxgetter了，相当于访问了 store._vm[xxgetter]，也就是在访问 computed[xxgetter]，这样就访问到 xxgetter 的回调函数了。
