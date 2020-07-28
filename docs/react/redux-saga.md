# [redux-sage](https://redux-saga-in-chinese.js.org/)
[redux-sage 英文](https://redux-saga.js.org/)


## Effects
### call、apply、cps
```jsx
import { call } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // ...
}
```
