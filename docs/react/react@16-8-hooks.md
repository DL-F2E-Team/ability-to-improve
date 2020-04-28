# React@16.8 Hooks
Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数，它们的名字通常以`use`开头。
Hook 不能在 class 组件中使用 — 这使得你不使用 class 也能使用 React。

**只能在函数最外层调用 Hook，不要在循环、条件判断或者子函数中调用，否则会导致bug的产生。**

**只能在 React 的函数组件中（或者自定义的 Hook 中）调用 Hook，不要在其他 JavaScript 函数中调用。**

----

Hooks Api
* 基础的 Hook
  * useState
  * useEffect
  * useContext
* 额外的 Hook
  * useReducer
  * useCallback
  * useMemo
  * useRef
  * useImperativeHandle
  * useLayoutEffect - 测量布局
  * useDebugValue
  
----  
     
了解更多：
* [React Hooks](https://zh-hans.reactjs.org/docs/hooks-intro.html)
* [React Hooks 索引](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
* [React Hooks 原理](https://github.com/brickspert/blog/issues/26)  

## useState
useState 又叫 State Hook。
```jsx {6,8,13}
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量，
  // 声明一个叫 "setCount" 的更新函数，类似于 this.setState
  const [count, setCount] = useState(0);
  // 或者
  const [count, setCount] = useState({number: 0})

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

setCount 不会把新的 state 和 旧的 state 合并。
```jsx
setCount((prevState) => ({
  ...prevState,
  left: e.pageX,
  top: e.pageY,
}))
```

## useEffect
useEffect 又叫 Effect Hook。

其相当于 `componentDidMount`、 `componentDidUpdate`、`componentWillUnmount`。

### 无需清除的 effect
```jsx {1,7,8,9,10}
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
### 需要清除的 effect

如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：
```jsx {12,13,14}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
当然这不是必须的。

**通过跳过某些 effect 进行性能优化**。可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可：
```jsx {3}
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```
上面这个示例中，我们传入 count 作为第二个参数。这个参数是什么作用呢？如果 count 的值是 5，而且我们的组件重渲染的时候 count 还是等于 5，React 
将对前一次渲染的 5 和后一次渲染的 5 进行比较。因为数组中的所有元素都是相等的(5 === 5)，React 会跳过这个 effect，这就实现了性能的优化。

**如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect。**

**如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数**。这就告诉 React 你的 effect 不依赖于 props 或
 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
```jsx {3}
// 只有 当函数（以及它所调用的函数）不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略。
useEffect(() => {
  document.title = `You clicked many times`;
}, []); // 仅在组件挂载和卸载时执行 
```

像这种接受依赖数组的除了`useEffect`以外，还有 useMemo ， useCallback , useImperativeHandle 。

## useContext
useContext 让你不使用组件嵌套就可以订阅 React 的 Context。

## useReducer
useReducer 可以让你通过 reducer 来管理组件本地的复杂 state。

## useMemo
当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的**更改后**运行你的“副作用”函数

**传入 useMemo 的函数会在渲染期间执行，而 useEffect 只能在DOM更新后再触发**，所以使用 useMemo 就能解决"怎么**在DOM改变的时候**，控制某些函数不被触发"。

和 useMemo 相近的还有一个 useCallback，只是后者返回一个函数 useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

简言之 **useEffect 是在渲染之后完成的， useMemo 是在渲染期间完成的。而 useMemo(() => fn, deps) 等价于 useCallback(fn, deps)**
```jsx {28,29,30,31,38}
import React, {Fragment} from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'


const nameList = ['apple', 'peer', 'banana', 'lemon']
const Example = observer((props) => {
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('apple')
    
    
    function getProductName() {
        console.log('getProductName触发')
        return name
    }
    // 只对name响应
    useEffect(() => {
        console.log('name effect 触发')
        getProductName()
    }, [name])
    
    // 只对price响应
    useEffect(() => {
        console.log('price effect 触发')
    }, [price])
  
    // memo化的name属性
    const memo_name = useMemo(() => {
        console.log('name memo 触发')
        return () => name  // 返回一个函数
    }, [name])

    return (
        <Fragment>
            <p>{name}</p>
            <p>{price}</p>
            <p>普通的name：{getProductName()}</p>
            <p>memo化的：{memo_name()}</p>
            <button onClick={() => setPrice(price+1)}>价钱+1</button>
            <button onClick={() => setName(nameList[Math.random() * nameList.length << 0])}>修改名字</button>
        </Fragment>
    )
})
export default Example
```
点击价钱 +1 按钮会发生什么 ？
```
> getProductName触发
> price effect 触发

// 首先DOM改变，触发在p标签中的getProductName函数
// 然后调用effect
```
显然我们已经成功的控制了触发（没有触发memo_name），**这也是官方为什么说不能在useMemo中操作DOM之类的副作用操作，不要在这个函数内部执行与渲染无关的
操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo**，你可以试一下，在useMemo中使用setState你会发现会产生死循环，并且会有警
告，因为useMemo是在渲染中进行的，你在其中操作DOM后，又会导致触发memo

点击修改名字按钮会发生什么 ？
```jsx
> name memo 触发
> getProductName触发
> name effect 触发
> getProductName触发
```

从这里也可以看出，memo是在DOM更新前触发的，就像官方所说的，类比生命周期就是`shouldComponentUpdate`

## 自定义 Hook

自定义 Hook 是一种复用状态逻辑的方式，它不复用 state 本身。

事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook，自定义 Hook 内部可以调用其他 Hook。
