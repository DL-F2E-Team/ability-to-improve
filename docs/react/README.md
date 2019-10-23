# [React](https://zh-hans.reactjs.org/)

<TOC/>

## `state`和`setState` 
[你真的理解setState吗？](https://zhuanlan.zhihu.com/p/39512941)

## `props`和`props.children`
`this.props.children` 表示组件下面所有的子节点。 <br/>
当没有的时候显示 `undefined` 当有一个的时候显示为类型 `object` 当有多个的时候显示为数组 `array`。<br/>
`React.Children.map` 来遍历子节点，不用担心数据类型。

## 生命周期
### 原生命周期
* ~~`componentWillMount(nextProps, nextState)`~~
无法保证在 `componentWillUnmount` 中取消掉相应的事件订阅，或者导致多次重复获取异步数据等问题

* `render`
* `componentDidMount`
* ~~`componentWillReceiveProps(nextProps)`~~
* ~~`componentWillUpdate(nextProps, nextState)`~~
`re-render` 问题，并且对 `DOM` 的更新操作也可能导致重新渲染

* `shouldComponentUpdate`
* `componentDidUpdate`
* `componentWillunMount`

![lifecycle](./images/lifecycle_old.jpg)

### 新生命周期
* `getDerivedStateFromProps`

`getDerivedStateFromProps(nextProps, prevState)`

```jsx harmony
class ColorPicker extends React.Component {
    state = {
        color: '#000000',
        prevPropColor: ''
    }
    static getDerivedStateFromProps (props, state) {
        if (props.color !== state.prevPropColor) {
            return {
                color: props.color
                prevPropColor: props.color
            }
        }
        return null
    }
    ... // 选择颜色方法
    render () {
        .... // 显示颜色和选择颜色操作
    }
}
```
[React 中 getDerivedStateFromProps 的用法和反模式](https://juejin.im/post/5c3ad49be51d45521053fde0)

* `getSnapshotBeforeUpdate`

`getSnapshotBeforeUpdate(prevProps, prevState)`

* `componentDidCatch`

`componentDidCatch(error, info)`

![lifecycle](./images/lifecycle.jpg)

## `ref`
* `createRef`
* `forwardRef`

## `context`
* `React.createContext`
* `Context.Provider`
* `Class.contextType`
* `Context.Consumer`

##  高阶组件（HOC）
### 代理方式的高阶组件
作用：
* 操纵props
* 访问ref
* 抽取状态
* 包装组件
```jsx harmony
export default () => WrapperComponent => class A extends Component {
    render () {
        const {...otherProps} = this.props;
        return <WrapperComponent {...otherProps}></WrapperComponent>
    }
}
```

### 继承方式的高阶组件
作用：
* 操纵props
* 操作生命周期函数
```jsx harmony
export default () => WrapperComponent => class A extends WrapperComponent {
    render () {
        const {user, ...otherProps} = this.props;
        this.props = otherProps;
        return super.render()
    }
}
```

## @16.4
* 增加 `Pointer Events`

## @16.6
### `React.memo`
`React.memo(【函数组件】)` ~ React.PureComponent   【memoization => 缓存】

### `React.lazy`
`React.lazy(() => import【组件】)`

### other
* `static contextType`
* `static getDerivedStateFromError()`
* Suspense组件【悬念组件？】
* 废弃 `React.StrictMode`

## @16.8
### `Hooks`

只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。<br/>
只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（或者自定义的 Hook 中。）

* [React Hooks](https://zh-hans.reactjs.org/docs/hooks-intro.html)
* [React Hooks 原理](https://github.com/brickspert/blog/issues/26)

#### Hooks Api
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

* `useContext`
* `useReducer`

* 自定义 `Hook`

* 额外的 `Hook`

## todo

* jsx
* `ReactDOM.render()`
* `React.Fragments`
* 组件（createReactClass，Component，SFC）、元素、实例
* createReactClass => mixins
* 时间处理（bind(this)） => bind、apply、call
* React.cloneElement(element, [props], [...children])
*  纯组件（SFC、函数式无状态组件
* 纯函数
* 受控组件、非受控组件
* propTypes
* 异步处理redux：redux-chunk、redux-saga
