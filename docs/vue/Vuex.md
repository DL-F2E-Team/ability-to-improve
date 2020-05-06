# [Vuex](https://vuex.vuejs.org/zh/)
`Vuex` 并没有实现一套响应式系统，而是**直接通过 new Vue，实例化了一个 Vue 对象**来实现数据响应式的。`Vuex`使用单一状态树，每个应用将仅仅包含一个`store`实例。

不过刷新浏览器，vuex 中的 state 会重新变为初始状态，可以使用插件`vuex-along`，`vuex-persistedstate`来解决。本质上是使用了 `sessionStorage` 或者 `localStorage` 持久化存储数据。

其核心可以简单理解为：
* state: 单一状态树
* Getter: 从s tate 派生出的一些状态，（本质就是 computed， 无 side effects 的纯函数）
* action: 提交 mutation，(而不是直接 change state)。
* Mutation: change state

那么？你会把请求都放在 action 还是组件 methods 里面

一般的结构
```{8,9,10,11,12,13,14}
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

可以看下面的入门文章了解如何使用：
::: tip
[VueJS中学习使用Vuex详解](https://segmentfault.com/a/1190000015782272)
:::

## Vuex 如何解决组件间数据通讯
 Vuex 暴露出 Store、install，通过`Vue.use(Vuex)`调用 Vuex 的`install`中的`applyMixin`方法，在
`Vue2.*`中调用`Vue.mixin({ beforeCreate: vuexInit })`全局混合`vuexInit`。在每一个 Vue 实例的 beforeCreate hook 中添加`$store`。

store.js
```js {4}
export function install (_Vue) {
  ...
  Vue = _Vue
  applyMixin(Vue)
}
```
applyMixin
```js
export default function (Vue) {

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    ...
  }
  
  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
  
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

## Vuex 如何将 state 转变成响应式
其核心在 resetStoreVM，位于 vuex/src/store.js：
```js {26,27,28,29,30,31}
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```
**Vuex 通过使用 Vue 的响应式系统，实例化一个 Vue 对象，把 state 装载到 data 属性上面，并且把 getters 装载到 computed 属性上面，来实现数据的响应式化。**

## State
在Vue根实例中注册`store`之后，获取`state`
```js
export default {
  data () {
    return {}
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

### mapState 辅助函数

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。
```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

对象展开运算符
```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

## Getter
`Getter`【想象成store中的计算属性】 接受 state 作为其第一个参数.
```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

### 通过属性访问
注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：
```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```
Getter 也可以接受其他 getter 作为第二个参数：
```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

### 通过方法访问
注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

### mapGetters 辅助函数
mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

## Mutation
**`mutation`必须是同步函数，使用 commit 提交 mutation**。

定义
```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import { SOME_MUTATION } from './mutation-types'
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    // payload形参又叫载荷（Payload）
    [SOME_MUTATION] (state, payload) {
      // 变更状态
      state.count += payload
    }
  }
})
```

调用
```js
store.commit('increment', 10)

store.commit('increment', {
  amount: 10
})

store.commit({
  type: 'increment',
  amount: 10
})
```

### mapMutations辅助函数
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## Action
类似于 Mutation，不同的是 Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。

Actions 支持同样的载荷方式和对象方式进行派发。

注册 Action：
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    // 或者
    increment2 ({commit, state, gatters}) {
      commit('increment')
    }
  }
})
```

派发 Action：
```js
store.dispatch('increment')
```

### mapActions辅助函数
```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## Module
```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 模块的局部状态
对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state, gatters, rootState) {
      return state.count * 2
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

### 命名空间 namespaced: true
默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的。

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

### 在带命名空间的模块内访问全局内容（Global Assets）
```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

### 在带命名空间的模块注册全局 action
```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

### 带命名空间的绑定函数
```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  }),
  // 或者
  ...mapState('some/nested/module', {
    a: state => state.a,
     b: state => state.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ]),
  // 或者
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
   ])
}
```

又或者使用 `createNamespacedHelpers`
```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

