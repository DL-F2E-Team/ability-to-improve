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
