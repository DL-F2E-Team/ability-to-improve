# VueRouter

## VueRouter引入异步组件和同步组件的区别?
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
