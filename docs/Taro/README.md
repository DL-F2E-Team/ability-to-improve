# Taro

## Taro与React的区别

* `setState`一定是异步的
* props必须设置 `defaultProps`
* 子组件向父组件传递的function必须是 `on` + 函数名的形式
* 生命周期支持 React 外，还有独有的小程序生命周期
* 组件导出的名称和引用的名称必须一致，不然在小程序会报错
* `jsx`组件在`Render`外不支持
* Taro区分页面和组件，页面没有`componentWillReceiveProps`
