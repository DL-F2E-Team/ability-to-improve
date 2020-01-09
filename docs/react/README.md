# [React](https://zh-hans.reactjs.org/)

## `state`和`setState` 
### 为什么要setState，而不是直接this.state.xx = oo
**`setState`做的事情不仅仅只是修改了`this.state`的值，另外最重要的是它会触发`React`的更新机制，会进行`diff`，然后将`patch`部分更新到真实`dom`里**。

### setState是同步还是异步相关问题

1. setState 是同步还是异步？

执行过程代码同步的，**只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”**，所以表现出来有时是同步，有时是“异步”。

2. 何时是同步，何时是异步呢？

只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout/setInterval等原生 API 中都是同步的。简单的可以理解为被 React 控制的函数里面就会表现出“异步”，反之表现为同步。

3. 那为什么会出现异步的情况呢？

为了做性能优化，将 state 的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实 dom，那么它将带来巨大的性能消耗。

4. 那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？

通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
或者可以通过给 setState 传递函数来表现出同步的情况：
```
this.setState((state) => {
    return { val: newVal }
})
```
5. 那表现出异步的原理是怎么样的呢？

可以看这篇文章：[你真的理解setState吗？](https://zhuanlan.zhihu.com/p/39512941)。

我这里还是用最简单的语言让你理解：在 React 的 setState 函数实现中，会根据 isBatchingUpdates(默认是 false) 变量判断是否直接更新 this.state 还是放到队列中稍后更新。然后有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 true，当 React 调用事件处理函数之前，或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新。

这样你就可以理解为什么原生事件和 setTimeout/setinterval 里面调用 this.state 会同步更新了吧，因为通过这些函数调用的 React 没办法去调用 batchedUpdate 函数将 isBatchingUpdates 设置为 true，那么这个时候 setState 的时候默认就是 false，那么就会同步更新。

[你真的理解setState吗？ - 知乎](https://zhuanlan.zhihu.com/p/39512941)

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

### 阅读
[一网打尽 React 重难点 - 知乎](https://zhuanlan.zhihu.com/p/83079398)
