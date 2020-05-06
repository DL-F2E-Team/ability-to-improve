# 面试

## javascript
* 什么是浅拷贝和深拷贝？
* 什么是防抖和节流？
* 用户输入URL到底发生了啥？
* 什么是重排和重绘？
* 如何解决跨域问题
* 数组去重的方法有哪些（6个）
* 数组扁平化的方法有哪些（6个）
* 数组排序的方法有哪些（4个）
* 数组清空的方法有哪些（4个）

## Vue
* event & v-model 事件和 v-model 的实现原理
* slot & keep-alive 内置组件的实现原理
* transition 过渡的实现原理
* vue-router 官方路由的实现原理
* vuex 官方状态管理的实现原理

## Vuex

### :star:
* 什么是 Vuex？
* Vuex 解决了什么问题？
* 什么时候用 Vuex？
* Vuex 的5个核心属性是什么？
* Vuex 中状态储存在哪里，怎么改变它？
* Vuex 中状态是对象，使用时候注意什么？
* 怎么在组件中批量使用 Vuex 的 state 状态？
* Vuex 中要从 state 派生一些状态出来，且多个组件使用它，该怎么做？
* 怎么通过 getter 来实现在组件内可以通过特定条件来获取 state 的状态？
* 怎么在组件中批量使用 Vuex 的getter属性
* 怎么在组件中批量给 Vuex 的 getter 属性取别名并使用
* 在 Vuex 中使用 mutation 要注意什么？
* 在组件中多次提交同一个 mutation，怎么写使用更方便。
* 在组件中多次提交同一个action，怎么写使用更方便。
* Vuex 中有两个 action，分别是 actionA 和 actionB，其内都是异步操作，在 actionB 要提交 actionA，需在 actionA 处理结束再处理其它操作，怎么实现？
* 有用过 Vuex 模块吗，为什么要使用，怎么使用。
* 在模块中，getter 和 mutation 接收的第一个参数 state，是全局的还是模块的？
* 在模块中，getter、mutation、action 中怎么访问全局的 state 和 getter
* 在组件中怎么访问 Vuex 模块中的 getter 和 state，怎么提交 mutation 和 action？
* 用过Vuex模块的命名空间吗？为什么使用，怎么使用？
* 怎么在带命名空间的模块内提交全局的 mutation 和 action？
* 怎么在带命名空间的模块内注册全局的 action？
* 组件中怎么提交 modules 中的 moduleA 中的 mutationA？
* 怎么使用 mapState，mapGetters，mapActions、mapMutations 这些函数来绑定带命名空间的模块？
* 在 v-model 上怎么用 Vuex 中 state 的值？
* actions 和 mutations 有什么区别？

### :star::star:
* 在 Vuex 和 Vue 的源码中，作者都使用了`Object.create(null)`来初始化一个新对象。为什么不用更简洁的`{}`呢？
* 如何区分 state 是外部直接修改，还是通过 mutation 方法修改的？
* action 通常是异步的，那么如何知道 action 什么时候结束呢？
* 在执行 dispatch 触发 action(commit 同理)的时候，只需传入(type, payload)，action 执行函数中第一个参数 store 从哪里获取的？
* 为什么有 action 了还需要 mutation ？
* Vuex 中要从 state 派生一些状态出来，且多个组件使用它，该怎么做？
* 多人同时使用 Vuex 如何防止数据污染
* state 内部支持模块配置和模块嵌套，如何实现的?
* 调试时的"时空穿梭"功能是如何实现的?
* Vuex 插件有用过吗？怎么用简单介绍一下？
* Vuex 插件中怎么监听组件中提交 mutation 和 action？
