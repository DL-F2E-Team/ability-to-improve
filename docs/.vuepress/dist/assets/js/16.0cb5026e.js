(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{209:function(v,_,l){"use strict";l.r(_);var i=l(0),e=Object(i.a)({},(function(){var v=this,_=v.$createElement,l=v._self._c||_;return l("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[l("h1",{attrs:{id:"前端优化"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#前端优化"}},[v._v("#")]),v._v(" 前端优化")]),v._v(" "),l("h2",{attrs:{id:"性能优化"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#性能优化"}},[v._v("#")]),v._v(" 性能优化")]),v._v(" "),l("ul",[l("li",[v._v("减少DOM操作\n"),l("ul",[l("li",[v._v("最小化DOM访问次数，暂存DOM")])])]),v._v(" "),l("li",[v._v("采用更优的API替代消费高的API\n"),l("ul",[l("li",[v._v("用"),l("code",[v._v("querySelectorAll()")]),v._v("替代"),l("code",[v._v("getElementByXX()")]),v._v(".")]),v._v(" "),l("li",[v._v("开启动画GPU，把渲染计算交给GPU")]),v._v(" "),l("li",[v._v("少用HTML集合（类数组）来遍历.")]),v._v(" "),l("li",[v._v("用事件委托")])])]),v._v(" "),l("li",[v._v("减少重排\n"),l("ul",[l("li",[v._v("避免设置大量的style属性，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow，所以最好是使用class属性。")]),v._v(" "),l("li",[v._v("实现元素的动画，它的position属性，最好是设为absoulte或fixed，这样不会影响其他元素的布局")]),v._v(" "),l("li",[v._v("动画实现的速度的选择。比如实现一个动画，以1个像素为单位移动这样最平滑，但是reflow就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多。")]),v._v(" "),l("li",[v._v("不要使用table布局")])])]),v._v(" "),l("li",[v._v("css及动画处理\n"),l("ul",[l("li",[v._v("少用css表达式")]),v._v(" "),l("li",[v._v("减少通过JavaScript代码修改元素样式，尽量使用修改class名方式操作样式或动画；")]),v._v(" "),l("li",[v._v("动画尽量使用在绝对定位或固定定位的元素上；")]),v._v(" "),l("li",[v._v("隐藏在屏幕外，或在页面滚动时，尽量停止动画；")])])]),v._v(" "),l("li",[v._v("CDN")]),v._v(" "),l("li",[v._v("gzip压缩")]),v._v(" "),l("li",[v._v("减少HTTP请求（CSS sprite，文件压缩合并）")]),v._v(" "),l("li",[v._v("延迟加载defer async")]),v._v(" "),l("li",[v._v("防抖和节流")]),v._v(" "),l("li",[v._v("webpack")])]),v._v(" "),l("h2",{attrs:{id:"seo优化"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#seo优化"}},[v._v("#")]),v._v(" SEO优化")]),v._v(" "),l("ul",[l("li",[v._v("合理的"),l("code",[v._v("title")]),v._v("、"),l("code",[v._v("description")]),v._v("、"),l("code",[v._v("keywords")]),v._v(" "),l("ul",[l("li",[v._v("搜索对着三项的权重逐个减小")]),v._v(" "),l("li",[v._v("title值强调重点、不同页面title要有所不同")]),v._v(" "),l("li",[v._v("重要关键词出现不要超过2次，而且要靠前")]),v._v(" "),l("li",[v._v("description把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面description有所不同")]),v._v(" "),l("li",[v._v("keywords列举出重要关键词")])])]),v._v(" "),l("li",[v._v("语义化HTML标签，符合W3C规范，让搜索引擎容易理解网页")]),v._v(" "),l("li",[v._v("重要内容HTML代码放在最前\n"),l("ul",[l("li",[v._v("搜索引擎抓取HTML顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取")])])]),v._v(" "),l("li",[v._v("重要内容不要用js输出\n"),l("ul",[l("li",[v._v("爬虫不会执行js获取内容")])])]),v._v(" "),l("li",[v._v("少用iframe\n"),l("ul",[l("li",[v._v("搜索引擎不会抓取iframe中的内容")])])]),v._v(" "),l("li",[v._v("非装饰性图片必须加alt")]),v._v(" "),l("li",[v._v("提高网站速度【网站速度是搜索引擎排序的一个重要指标】")])])])}),[],!1,null,null,null);_.default=e.exports}}]);