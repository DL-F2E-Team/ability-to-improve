# HTML

<TOC/>

## :bookmark: 标准模式和怪异模式

### 什么是标准模式和怪异模式

标准模式：浏览器按W3C标准解析

怪异模式：使用浏览器自己的方式解析（IE）

### 区别

- 盒模型
    * 标准模式为W3C盒模型（`box-sizing: content-box`）【content + padding + border + margin】
    * 怪异模式为IE盒模型（`box-sizing: border-box`）【content + margin（padding和border包含在content宽高中）】
- 行内元素的垂直对齐
    * 基于 Gecko 的浏览器【Mozilla Firefox、HotBrowser、Mozilla Suite、Camino】标准模式对齐至基线
    * 怪异模式对齐至底部
- 怪异模式中，IE6/7/8都不认识!important声明
- 设置行内元素的高宽
    * 标准模式下，给等行内元素设置 `width` 和 `height` 都不会生效
    * 怪异模式模式下，则会生效。
- 使用 `margin:0 auto`
    * 标准模式下可以使元素水平居中
    * 怪异模式下却会失效。
    
## :bookmark: 渲染HTML的过程

* 1.游览器解析 `HTML` => `DOM树`，并发请求资源 `javascript/css/image`.
* 2.解析 `CSS` => `CSSOM树`
* 3.`DOM树` + `CSSOM树` => 渲染树（和DOM很像但是有差异）
* 4.渲染树创建完成，游览器将渲染树绘制到屏幕上

`重构`和`回流`会重复执行以上步骤。
