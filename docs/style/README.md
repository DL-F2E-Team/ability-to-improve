# CSS
[[toc]]

## 两个div如何实现左边div固定宽度，右边div自适应？（圣杯布局和双飞燕布局）

[链接](https://lijiahao8898.github.io/question/)
[圣杯布局和双飞翼布局](https://www.jianshu.com/p/f9bcddb0e8b4)

## 什么是外边距塌陷？如何解决？

## 什么是BFC(块级格式上下文)？

`BFC（块级格式上下文）`

### BFC布局规则
* 内部的Box会在垂直方向，一个接一个地放置
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算。

### 触发条件

* 根元素
* overflow != visible
* display: inline-block / table
* float 元素
* position: absolute / fixed

```
1. 两列自适应
2. 边距塌陷
3.  BFC
4.  伪元素，伪类
5.  css - mask镂空
6. clip-path裁剪
7. 自定义css属性
8.  :empty
9.  position: [relative, absolute, fixed, static, inherit, sticky]
10. 重绘和重排
11. CSS Flex / CSS Grid（网格）布局
CSS transform, perspective
```
