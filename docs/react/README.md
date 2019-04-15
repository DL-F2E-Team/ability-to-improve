# React

## React

* jsx

* `ReactDOM.render()`

* 组件（createClass，Component，SFC）、元素、实例

* state、props

* 时间处理（bind(this)） => bind、apply、call

*  高阶组件（HOC）

*  纯组件（SFC、函数式无状态组件

* 纯函数

* 受控组件、非受控组件

* 生命周期：constructor => componentWillMount => render => componentDidMount

* propTypes

* ref

* 异步处理redux：redux-chunk、redux-saga

* context

* getDerivedStateFromProps，getSnapshotBeforeUpdate

## @v16.4
* 增加Pointer Events

## @v16.6
* React.memo(【函数组件】) ~ React.PureComponent   【memoization => 缓存】
* React.lazy(() => import【组件】)
* static contextType
* static getDerivedStateFromError()
* Suspense组件【悬念组件？】
* 废弃 React.StrictMode

## @v16.8
### `Hook`

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。<br/>
只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（或者自定义的 Hook 中。）

* [https://zh-hans.reactjs.org/docs/hooks-intro.html](https://zh-hans.reactjs.org/docs/hooks-intro.html)
* [https://github.com/brickspert/blog/issues/26](https://github.com/brickspert/blog/issues/26)

@Api
* `useState`
```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
* `useEffect`

相当于 `componentDidMount`、 `componentDidUpdate`、`componentWillUnmount`.
```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
* 自定义 `Hook`

* 额外的 `Hook`

## dva
```
1. redux-saga
```