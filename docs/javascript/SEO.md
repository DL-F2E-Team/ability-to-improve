---
layout: article
title: 前端优化
article_header:
  type: overlay
  theme: dark
  background_color: '#123'
  background_image: false
---

# 前端优化

## 性能优化

* 减少DOM操作
  - 最小化DOM访问次数，暂存DOM
* 采用更优的API替代消费高的API
  - 用`querySelectorAll()`替代`getElementByXX()`.
  - 开启动画GPU，把渲染计算交给GPU
  - 少用HTML集合（类数组）来遍历.
  - 用事件委托
* 减少重排
  - 避免设置大量的style属性，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow，所以最好是使用class属性。
  - 实现元素的动画，它的position属性，最好是设为absoulte或fixed，这样不会影响其他元素的布局
  - 动画实现的速度的选择。比如实现一个动画，以1个像素为单位移动这样最平滑，但是reflow就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多。
  - 不要使用table布局
* css及动画处理
  - 少用css表达式
  - 减少通过JavaScript代码修改元素样式，尽量使用修改class名方式操作样式或动画；
  - 动画尽量使用在绝对定位或固定定位的元素上；
  - 隐藏在屏幕外，或在页面滚动时，尽量停止动画；
* CDN
* gzip压缩
* 减少HTTP请求（CSS sprite，文件压缩合并）
* 延迟加载defer async
* 防抖和节流
* webpack 

## SEO优化
- 合理的`title`、`description`、`keywords`
  - 搜索对着三项的权重逐个减小
  - title值强调重点、不同页面title要有所不同
  - 重要关键词出现不要超过2次，而且要靠前
  - description把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面description有所不同
  - keywords列举出重要关键词
- 语义化HTML标签，符合W3C规范，让搜索引擎容易理解网页
- 重要内容HTML代码放在最前
  - 搜索引擎抓取HTML顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 重要内容不要用js输出
  -   爬虫不会执行js获取内容
- 少用iframe
  - 搜索引擎不会抓取iframe中的内容
- 非装饰性图片必须加alt
- 提高网站速度【网站速度是搜索引擎排序的一个重要指标】
