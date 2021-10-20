# CSS
[[toc]]

## 两个div如何实现左边div固定宽度，右边div自适应？
（圣杯布局和双飞燕布局）

[链接](https://lijiahao8898.github.io/question/)

[圣杯布局和双飞翼布局](https://www.jianshu.com/p/f9bcddb0e8b4)

## 三栏布局方式两边固定中间自适应

1. margin 负值法：左右两栏均左浮动，左右两栏采用负的 margin 值。 中间栏被宽度为 100%的浮动元素包起来
2. 自身浮动法：左栏左浮动，右栏右浮动，中间栏放最后
3. 绝对定位法：左右两栏采用绝对定位，分别固定于页面的左右两侧， 中间的主体栏用左右 margin 值撑开距离。
4. flex 左右固定宽 中间 flex：1
5. 网格布局
6. table 布局

## 什么是外边距塌陷？如何解决？
多个相邻（兄弟或者父子关系）普通流的块元素垂直方向 margin 会重叠

折叠的结果为： 
1. 两个相邻的外边距都是正数时，折叠结果是**它们两者之间较大的值**。
2. 两个相邻的外边距都是负数时，折叠结果是**两者绝对值的较大值**。
3. 两个外边距一正一负时，折叠结果是**两者的相加的和**。

### 解决
* **浮动**元素不会与任何元素发生叠加，也包括它的子元素
* 创建了**BFC**的元素不会和它的子元素发生外边距叠加
* **绝对定位**元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
* **inline-block**元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
* 普通流中的块级元素的margin-bottom永远和它相邻的下一个块级元素的margin-top叠加，除非相邻的兄弟元素**clear**
* 普通流中的块级元素（没有border-top、没有padding-top）的margin-top和它的第一个普通流中的子元素（没有clear）发生margin-top叠加
* 普通流中的块级元素（height为auto、min-height为0、没有border-bottom、没有padding-bottom）和它的最后一个普通流中的子元素（没有自身发生margin叠加或clear）发生margin-bottom叠加
* 如果一个元素的min-height为0、没有border、没有padding、高度为0或者auto、不包含子元素，那么它自身的外边距会发生叠加

## 什么是BFC？
BFC 又叫 `块级格式上下文`

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

## 定位 position
position: 【relative, absolute, fixed, static, inherit, sticky】


### 粘性定位 sticky
元素先按照普通文档流定位，然后相对于该元素在流中的 flow root （BFC）和 containing block（最近的块级祖先元素）定位。
而后， 元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

```
1. 两列自适应
2. 边距塌陷
3.  BFC
4.  伪元素，伪类
5.  css - mask镂空
6. clip-path裁剪
7. 自定义css属性
8.  :empty
10. 重绘和重排
11. CSS Flex / CSS Grid（网格）布局
CSS transform, perspective
```
