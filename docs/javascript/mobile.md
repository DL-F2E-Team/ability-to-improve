# 移动端适配方案

window对象有一个`devicePixelRatio`属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是`devicePixelRatio = 物理像素 / 独立像素`。

1. 百分比适配（拉钩）
  - 高度定死，宽度百分比适配或者flex布局。最简单易用，不够灵活，字体大小固定

2. viewport适配

inital-scale = phone scale (window.screen.width) / 750;
viewport的 content width设为750，禁止用户缩放，target-densitydpi=device-dpi，css中的1px会等于物理像素中的1px。然后设计图会给750的尺寸的

```js
if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
    var version = parseFloat(RegExp.$1);
    if (version > 2.3) {
        var phoneScale = parseInt(window.screen.width) /
            750;
        document.write('<meta name=\'viewport\' content=\'width=750, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', user-scalable=no, target-densitydpi=device-dpi\'>');
    } else {
        document.write('<meta name=\'viewport\' content=\'width=750, user-scalable=no, target-densitydpi=device-dpi\'>');
    }
} else {
    document.write('<meta name=\'viewport\' content=\'width=750, user-scalable=no, target-densitydpi=device-dpi, viewport-fit=contain \'>');
}
```

3. 手淘的flexible布局

动态设置viewport的scale
scale = 1 / devicePixelRatio;
metaEl = doc.createElement('meta');
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
动态计算html的font-size
var width = docEl.getBoundingClientRect().width;
var rem = width / 10;
docEl.style.fontSize = rem + 'px';
布局的时候，各元素的css尺寸=设计稿标注尺寸/设计稿横向分辨率/10
