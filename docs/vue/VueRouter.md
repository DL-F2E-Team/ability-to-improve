# Vue-router

## active-class 是哪个组件的属性?
vue-router 模块的 router-link 组件。

## 路由之间跳转？
声明式（标签跳转）
编程式（ js 跳转） router.push('index')

## 懒加载（按需加载路由）
webpack 中提供了 require.ensure()来实现按需加载。以前引入路由是通过 import 这样的方式引入，改为 const 定义的方式进行引入。

不进行页面按需加载引入方式：
```jsx
import  home   from '../../common/home.vue'
```

进行页面按需加载的引入方式：
```jsx
const  home = r => require.ensure( [], () => r (require('../../common/home.vue')))
```

## vue-router 有哪几种导航钩子?
三种

全局导航钩子
router.beforeEach(to, from, next),
router.beforeResolve(to, from, next),
router.afterEach(to, from ,next)
组件内钩子
beforeRouteEnter,
beforeRouteUpdate,
beforeRouteLeave
单独路由独享
beforeEnter

## 路由引入异步组件和同步组件的区别?
1. 缓存组件供未来重渲染
2. 将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块

异步组件与`webpack`的代码分隔组合使用
```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```
webpack 2 和 ES2015 语法加在一起：
```js
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

当使用局部注册的时候，你也可以直接提供一个返回 Promise 的函数：
```js
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

## 切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？

```js
注意: 这个功能只在 HTML5 history 模式下可用。
const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
```
