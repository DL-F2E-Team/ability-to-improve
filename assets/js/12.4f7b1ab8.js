(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{215:function(t,e,s){"use strict";s.r(e);var a=s(2),n=Object(a.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"bom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bom","aria-hidden":"true"}},[t._v("#")]),t._v(" BOM")]),t._v(" "),s("h2",{attrs:{id:"跨域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨域","aria-hidden":"true"}},[t._v("#")]),t._v(" 跨域")]),t._v(" "),s("p",[t._v("狭义的跨域指游览器同源策略限制，通常我们所说的便是狭义跨域。")]),t._v(" "),s("h3",{attrs:{id:"什么是同源策略？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是同源策略？","aria-hidden":"true"}},[t._v("#")]),t._v(" 什么是同源策略？")]),t._v(" "),s("p",[t._v("同源策略是指"),s("strong",[t._v("域名相同")]),t._v("、"),s("strong",[t._v("端口号相同")]),t._v("、"),s("strong",[t._v("协议相同")]),t._v("。")]),t._v(" "),s("p",[t._v("同源策略限制以下几种行为")]),t._v(" "),s("ol",[s("li",[t._v("Cookie、LocalStorage、和IndexDB无法读取。")]),t._v(" "),s("li",[t._v("DOM和JS对象无法获得。")]),t._v(" "),s("li",[t._v("AJAX请求不能发送。")])]),t._v(" "),s("h3",{attrs:{id:"跨域解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨域解决方案","aria-hidden":"true"}},[t._v("#")]),t._v(" 跨域解决方案")]),t._v(" "),s("ul",[s("li",[t._v("jsonp - get请求")]),t._v(" "),s("li",[t._v("cors - 跨域资源共享")]),t._v(" "),s("li",[t._v("nginx代理")]),t._v(" "),s("li",[t._v("node中间件")]),t._v(" "),s("li",[t._v("postmessage")]),t._v(" "),s("li",[t._v("document.domain + iframe")]),t._v(" "),s("li",[t._v("window.name + iframe")]),t._v(" "),s("li",[t._v("websocket")])]),t._v(" "),s("h4",{attrs:{id:"_1-jsonp-get请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-jsonp-get请求","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. jsonp - get请求")]),t._v(" "),s("p",[t._v("动态创建"),s("code",[t._v("<script>")]),t._v("标签，然后利用了"),s("code",[t._v("<script>")]),t._v("标签没有跨域限制这一“漏洞”来达到与第三方通讯的目的，用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名包裹json\n数据，这样客户端就可以随意定制自己的函数自动处理返回的数据了。缺点：域不安全，判断jsonp请求是否失败并不容易，只限于get请求（本质上script加载资源就是get）。")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" script "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'script'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nscript"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/javascript'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 传参并指定回调执行函数为onBack")]),t._v("\nscript"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.domain2.com:8080/login?user=admin&callback=onBack'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("head"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("script"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 回调执行函数")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("onBack")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("res")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 服务端返回")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("onBack")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"status"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"admin"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br")])]),s("h4",{attrs:{id:"cors"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cors","aria-hidden":"true"}},[t._v("#")]),t._v(" CORS")]),t._v(" "),s("p",[t._v("CORS需要浏览器和后端同时支持。浏览器会自动进行 CORS 通信，服务端设置"),s("code",[t._v("Access-Control-Allow-Origin")]),t._v("就可以开启CORS。")]),t._v(" "),s("div",{staticClass:"warning custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),s("p",[t._v("跨域还会产生"),s("strong",[t._v("简单请求")]),t._v("和"),s("strong",[t._v("复杂请求（预请求）")]),t._v("。\n跨域默认不会发送"),s("strong",[t._v("cookie")]),t._v("，设置"),s("code",[t._v("withCredentials = true")]),t._v("。")])]),t._v(" "),s("h4",{attrs:{id:"nginx代理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx代理","aria-hidden":"true"}},[t._v("#")]),t._v(" nginx代理")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("div",{staticClass:"highlight-lines"},[s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("div",{staticClass:"highlighted"},[t._v(" ")]),s("br"),s("br"),s("br")]),s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("server{\n    # 监听9099端口\n    listen 9099;\n    # 域名是localhost\n    server_name localhost;\n    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871 \n    location ^~ /api {\n        proxy_pass http://localhost:9871;\n    }    \n}\n")])]),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br")])]),s("div",{staticClass:"tip custom-block"},[s("p",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000011145364?utm_source=tag-newest",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端常见跨域解决方案（全）"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"web-storage、cookie、session的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#web-storage、cookie、session的区别","aria-hidden":"true"}},[t._v("#")]),t._v(" web storage、cookie、session的区别")]),t._v(" "),s("h3",{attrs:{id:"cookie、session区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie、session区别","aria-hidden":"true"}},[t._v("#")]),t._v(" cookie、session区别")]),t._v(" "),s("ol",[s("li",[t._v("保持状态：")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("cookie")]),t._v(" 保存在浏览器端，")]),t._v(" "),s("li",[s("code",[t._v("session")]),t._v(" 保存在服务器端。")])]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("使用方式：")])]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("cookie机制")]),t._v("：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，\n这种cookie简称"),s("strong",[t._v("会话cookie")]),t._v("。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，\ncookie数据仍然存在，直到过期时间结束才消失。cookie是服务器发给客户端的特殊信息，cookie是以文本的方式保存在客户端，每次请求时都带上它")]),t._v(" "),s("li",[s("strong",[t._v("session机制")]),t._v("：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果\n有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的\nsession对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互\n中浏览器按照规则将sessionid发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过\nresponse.encodeURL(url) 进行实现；API对encodeURL的结束为，当浏览器支持Cookie时，url不做任何处理；当\n浏览器不支持Cookie的时候，将会重写URL将SessionID拼接到访问地址后。")])]),t._v(" "),s("p",[t._v("3、存储内容：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("cookie")]),t._v(" 只能保存字符串类型，以文本的方式；")]),t._v(" "),s("li",[s("code",[t._v("session")]),t._v(" 通过类似与Hashtable的数据结构来保存，能支持任何类型的对象(session中可含有多个对象)")])]),t._v(" "),s("p",[t._v("4、存储的大小：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("cookie")]),t._v(" 单个保存的数据不能超过4kb；")]),t._v(" "),s("li",[s("code",[t._v("session")]),t._v(" 大小没有限制。")])]),t._v(" "),s("p",[t._v("5、安全性：cookie：针对cookie所存在的攻击：Cookie欺骗，Cookie截获；session的安全性大于cookie。")]),t._v(" "),s("p",[t._v("原因如下：")]),t._v(" "),s("ul",[s("li",[t._v("sessionID存储在cookie中，若要攻破session首先要攻破cookie；")]),t._v(" "),s("li",[t._v("sessionID是要有人登录，或者启动session_start才会有，所以攻破cookie也不一定能得到sessionID；")]),t._v(" "),s("li",[t._v("第二次启动session_start后，前一次的sessionID就是失效了，session过期后，sessionID也随之失效。")]),t._v(" "),s("li",[t._v("sessionID是加密的")]),t._v(" "),s("li",[t._v("综上所述，攻击者必须在短时间内攻破加密的sessionID，这很难。")])]),t._v(" "),s("h3",{attrs:{id:"web-storage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#web-storage","aria-hidden":"true"}},[t._v("#")]),t._v(" web storage")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("sessionStorage")]),t._v("：将数据保存在session对象中。所谓session，是指用户在浏览某个网站时，从进入网站到\n浏览器关闭所经过的这段时间，也就是用户浏览这个网站所花费的时间。session对象可以用来保存在这段时间内所要求保存的任何数据。")]),t._v(" "),s("li",[s("code",[t._v("localStorage")]),t._v("：将数据保存在客户端本地的硬件设备(通常指硬盘，也可以是其他硬件设备)中，即使浏览器被关闭了，该数据仍然存在，下次打开浏览器访问网站时仍然可以继续使用。")])]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("setItem (key, value) ——  保存数据，以键值对的方式储存信息\ngetItem (key) ——  获取数据，将键值传入，即可获取到对应的value值\nremoveItem (key) ——  删除单个数据，根据键值移除对应的信息\nclear () ——  删除所有的数据\nkey (index) —— 获取某个索引的key\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("h3",{attrs:{id:"区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#区别","aria-hidden":"true"}},[t._v("#")]),t._v(" 区别")]),t._v(" "),s("ul",[s("li",[t._v("生命周期："),s("code",[t._v("sessionStorage")]),t._v(" 临时保存（同源的窗口中始终存在的数据），"),s("code",[t._v("localStorage")]),t._v(" 永久保存")]),t._v(" "),s("li",[t._v("存储大小：一般都是"),s("strong",[t._v("5MB")]),t._v(", "),s("code",[t._v("cookie")]),t._v(" 是 "),s("strong",[t._v("4KB")])]),t._v(" "),s("li",[t._v("存储位置：都在客户端")]),t._v(" "),s("li",[t._v("存储类型：字符串类型（JSON.stringify）")])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.cnblogs.com/pengc/p/8714475.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("cookies、sessionStorage和localStorage解释及区别"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"游览器特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#游览器特性","aria-hidden":"true"}},[t._v("#")]),t._v(" 游览器特性")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("游览器")]),t._v("是"),s("strong",[t._v("多进程")]),t._v("的，游览器"),s("strong",[t._v("内核")]),t._v("是"),s("strong",[t._v("多线程")]),t._v("的")]),t._v(" "),s("li",[t._v("每次打开一个页签输入 "),s("code",[t._v("URL")]),t._v(" 就相当于打开了一个线程")]),t._v(" "),s("li",[t._v("游览器会自动的将多个空白页面放入一个线程中，以便提升性能。")])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000012925872",target:"_blank",rel:"noopener noreferrer"}},[t._v("从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"http1-0、1-1、2-0、https"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http1-0、1-1、2-0、https","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP1.0、1.1、2.0、HTTPS")]),t._v(" "),s("h3",{attrs:{id:"_1-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-0","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.0")]),t._v(" "),s("ul",[s("li",[t._v("默认使用"),s("strong",[t._v("短链接")])]),t._v(" "),s("li",[t._v("定义了"),s("strong",[t._v("三种")]),t._v("请求方法： "),s("code",[t._v("GET")]),t._v(", "),s("code",[t._v("POST")]),t._v(" 和 "),s("code",[t._v("HEAD")]),t._v(" 方法。以及几种Additional Request Methods："),s("code",[t._v("PUT")]),t._v("、"),s("code",[t._v("DELETE")]),t._v("、"),s("code",[t._v("LINK")]),t._v("、"),s("code",[t._v("UNLINK")])])]),t._v(" "),s("h3",{attrs:{id:"_1-1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.1")]),t._v(" "),s("ul",[s("li",[t._v("默认使用"),s("strong",[t._v("长连接")])]),t._v(" "),s("li",[t._v("定义了"),s("strong",[t._v("八种")]),t._v("请求方法："),s("code",[t._v("GET")]),t._v("、"),s("code",[t._v("POST")]),t._v("、"),s("code",[t._v("HEAD")]),t._v("、"),s("code",[t._v("OPTIONS")]),t._v(", "),s("code",[t._v("PUT")]),t._v(", "),s("code",[t._v("DELETE")]),t._v(", "),s("code",[t._v("TRACE")]),t._v(" 和 "),s("code",[t._v("CONNECT")]),t._v(" 方法。")]),t._v(" "),s("li",[t._v("每请求一个资源，都是需要开启一个 "),s("router-link",{attrs:{to:"/http/#tcp三次握手和四次挥手"}},[t._v("tcp/ip")]),t._v(" 连接的，所以对应的结果是，每一个资源对应一个 "),s("router-link",{attrs:{to:"/http/#tcp三次握手和四次挥手"}},[t._v("tcp/ip")]),t._v(" 请求，由于 "),s("router-link",{attrs:{to:"/http/#tcp三次握手和四次挥手"}},[t._v("tcp/ip")]),t._v(" 本身有并发数限制，所以当资源一多，速度就显著慢下来")],1)]),t._v(" "),s("h3",{attrs:{id:"_2-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-0","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.0")]),t._v(" "),s("p",[s("code",[t._v("HTTP2.0")]),t._v(" 中，一个 "),s("router-link",{attrs:{to:"/http/#tcp三次握手和四次挥手"}},[t._v("tcp/ip")]),t._v(" 请求可以请求多个资源，也就是说，只要一次 "),s("router-link",{attrs:{to:"/http/#tcp三次握手和四次挥手"}},[t._v("tcp/ip")]),t._v(" 请求，就可以请求若干个资源，分割成更小的帧请求，速度明显提升。")],1),t._v(" "),s("h3",{attrs:{id:"http报文结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http报文结构","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP报文结构")]),t._v(" "),s("h4",{attrs:{id:"常见的请求头"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见的请求头","aria-hidden":"true"}},[t._v("#")]),t._v(" 常见的请求头")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("Accept")]),t._v(": 接收类型，表示浏览器支持的MIME类型（对标服务端返回的Content-Type）")]),t._v(" "),s("li",[s("code",[t._v("Accept-Encoding")]),t._v("：浏览器支持的压缩类型,如gzip等,超出类型不能接收")]),t._v(" "),s("li",[s("code",[t._v("Content-Type")]),t._v("：客户端发送出去实体内容的类型")]),t._v(" "),s("li",[s("code",[t._v("Cache-Control")]),t._v(": 指定请求和响应遵循的缓存机制，如no-cache")]),t._v(" "),s("li",[s("code",[t._v("If-Modified-Since")]),t._v("：对应服务端的Last-Modified，用来匹配看文件是否变动，只能精确到1s之内，http1.0中")]),t._v(" "),s("li",[s("code",[t._v("Expires")]),t._v("：缓存控制，在这个时间内不会请求，直接使用缓存，http1.0，而且是服务端时间")]),t._v(" "),s("li",[s("code",[t._v("Max-age")]),t._v("：代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存，http1.1中")]),t._v(" "),s("li",[s("code",[t._v("If-None-Match")]),t._v("：对应服务端的ETag，用来匹配文件内容是否改变（非常精确），http1.1中")]),t._v(" "),s("li",[s("code",[t._v("Cookie")]),t._v(": 有cookie并且同域访问时会自动带上")]),t._v(" "),s("li",[s("code",[t._v("Connection")]),t._v(": 当浏览器与服务器通信时对于长连接如何进行处理,如keep-alive")]),t._v(" "),s("li",[s("code",[t._v("Host")]),t._v("：请求的服务器URL")]),t._v(" "),s("li",[s("code",[t._v("Origin")]),t._v("：最初的请求是从哪里发起的（只会精确到端口）,Origin比Referer更尊重隐私")]),t._v(" "),s("li",[s("code",[t._v("Referer")]),t._v("：该页面的来源URL(适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段)")]),t._v(" "),s("li",[s("code",[t._v("User-Agent")]),t._v("：用户客户端的一些必要信息，如UA头部等")])]),t._v(" "),s("h4",{attrs:{id:"常见的响应头"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见的响应头","aria-hidden":"true"}},[t._v("#")]),t._v(" 常见的响应头")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("Access-Control-Allow-Headers")]),t._v(": 服务器端允许的请求Headers")]),t._v(" "),s("li",[s("code",[t._v("Access-Control-Allow-Methods")]),t._v(": 服务器端允许的请求方法")]),t._v(" "),s("li",[s("code",[t._v("Access-Control-Allow-Origin")]),t._v(": 服务器端允许的请求Origin头部（譬如为*）")]),t._v(" "),s("li",[s("code",[t._v("Content-Type")]),t._v("：服务端返回的实体内容的类型")]),t._v(" "),s("li",[s("code",[t._v("Date")]),t._v("：数据从服务器发送的时间")]),t._v(" "),s("li",[s("code",[t._v("Cache-Control")]),t._v("：告诉浏览器或其他客户，什么环境可以安全的缓存文档")]),t._v(" "),s("li",[s("code",[t._v("Last-Modified")]),t._v("：请求资源的最后修改时间")]),t._v(" "),s("li",[s("code",[t._v("Expires")]),t._v("：应该在什么时候认为文档已经过期,从而不再缓存它")]),t._v(" "),s("li",[s("code",[t._v("Max-age")]),t._v("：客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效")]),t._v(" "),s("li",[s("code",[t._v("ETag")]),t._v("：请求变量的实体标签的当前值")]),t._v(" "),s("li",[s("code",[t._v("Set-Cookie")]),t._v("：设置和页面关联的cookie，服务器通过这个头部把cookie传给客户端")]),t._v(" "),s("li",[s("code",[t._v("Keep-Alive")]),t._v("：如果客户端有keep-alive，服务端也会有响应（如timeout=38）")]),t._v(" "),s("li",[s("code",[t._v("Server")]),t._v("：服务器的一些相关信息")])]),t._v(" "),s("h2",{attrs:{id:"游览器缓存机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#游览器缓存机制","aria-hidden":"true"}},[t._v("#")]),t._v(" 游览器缓存机制")]),t._v(" "),s("h3",{attrs:{id:"强缓存-from-cache"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#强缓存-from-cache","aria-hidden":"true"}},[t._v("#")]),t._v(" 强缓存 - from cache")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("> General\nRequest URL:http://yangdongxi.seller.mockuai.com/bossmanager/wap/domain/get.do\nRequest Method:GET\nStatus Code:200 OK\nRemote Address:115.29.239.224:80\nReferrer Policy:no-referrer-when-downgrade\n\n> Response Headers\nAccept-Charset:big5, big5-hkscs, euc-jp, euc-kr, gb18030, gb2312, gbk, ibm-thai, ibm00858, ibm01140, ibm01141, ibm01142, ibm01143, ibm01144, ibm01145, ibm01146, ibm01147, ibm01148, ibm01149, ibm037, ibm1026, ibm1047, ibm273, ibm277, ibm278, ibm280, ibm284, ibm285, ibm290, ibm297, ibm420, ibm424, ibm437, ibm500, ibm775, ibm850, ibm852, ibm855, ibm857, ibm860, ibm861, ibm862, ibm863, ibm864, ibm865, ibm866, ibm868, ibm869, ibm870, ibm871, ibm918, iso-2022-cn, iso-2022-jp, iso-2022-jp-2, iso-2022-kr, iso-8859-1, iso-8859-13, iso-8859-15, iso-8859-2, iso-8859-3, iso-8859-4, iso-8859-5, iso-8859-6, iso-8859-7, iso-8859-8, iso-8859-9, jis_x0201, jis_x0212-1990, koi8-r, koi8-u, shift_jis, tis-620, us-ascii, utf-16, utf-16be, utf-16le, utf-32, utf-32be, utf-32le, utf-8, windows-1250, windows-1251, windows-1252, windows-1253, windows-1254, windows-1255, windows-1256, windows-1257, windows-1258, windows-31j, x-big5-hkscs-2001, x-big5-solaris, x-compound_text, x-euc-jp-linux, x-euc-tw, x-eucjp-open, x-ibm1006, x-ibm1025, x-ibm1046, x-ibm1097, x-ibm1098, x-ibm1112, x-ibm1122, x-ibm1123, x-ibm1124, x-ibm1364, x-ibm1381, x-ibm1383, x-ibm300, x-ibm33722, x-ibm737, x-ibm833, x-ibm834, x-ibm856, x-ibm874, x-ibm875, x-ibm921, x-ibm922, x-ibm930, x-ibm933, x-ibm935, x-ibm937, x-ibm939, x-ibm942, x-ibm942c, x-ibm943, x-ibm943c, x-ibm948, x-ibm949, x-ibm949c, x-ibm950, x-ibm964, x-ibm970, x-iscii91, x-iso-2022-cn-cns, x-iso-2022-cn-gb, x-iso-8859-11, x-jis0208, x-jisautodetect, x-johab, x-macarabic, x-maccentraleurope, x-maccroatian, x-maccyrillic, x-macdingbat, x-macgreek, x-machebrew, x-maciceland, x-macroman, x-macromania, x-macsymbol, x-macthai, x-macturkish, x-macukraine, x-ms932_0213, x-ms950-hkscs, x-ms950-hkscs-xp, x-mswin-936, x-pck, x-sjis_0213, x-utf-16le-bom, x-utf-32be-bom, x-utf-32le-bom, x-windows-50220, x-windows-50221, x-windows-874, x-windows-949, x-windows-950, x-windows-iso2022jp\nAccess-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With\nAccess-Control-Allow-Methods:GET, POST, OPTIONS\nAccess-Control-Allow-Origin:*\nConnection:keep-alive\nContent-Length:53\nContent-Type:application/json;charset=utf-8\nDate:Thu, 04 Jan 2018 02:18:10 GMT\nServer:Tengine/2.1.2\n\n> Request Headers\nAccept:application/json, text/javascript, */*; q=0.01\nAccept-Encoding:gzip, deflate\nAccept-Language:zh-CN,zh;q=0.9\nCache-Control:no-cache\nConnection:keep-alive\nCookie:JSESSIONID=72935BC33DB013063F2DF99BD89D3DBC; username=jishu; role_mark=3; root_role=undefined; is_super=0; is_multi_mall=0; session_key=null; higoMark=1; from_url=yangdongxi.seller.mockuai.com; user_id=91; biz_code=yangdongxi; user_type=1; domain=m.hzfenxianghui.com; ak=0efa3aa4c1d059043ec35cec5b6625d1; ap=6415e5876fa6c32641f4f08e1eb693be; Hm_lvt_6fbe7cc5b60c0a0fc5de3d7b387ee31f=1512548721,1513563511; Hm_lpvt_6fbe7cc5b60c0a0fc5de3d7b387ee31f=1514281204; route=debec577b74b46468980f4122a736cfa; access_token=JWT%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJ5YW5nZG9uZ3hpIiwiZXhwaXJlcyI6MTUxNTA3NTQ4MzU4Mn0.KcHh2OHWyL_16qpdOzvZFe2eE3AYfEQaPBMg_FBPvzQ\nHost:yangdongxi.seller.mockuai.com\nPragma:no-cache\nReferer:http://yangdongxi.seller.mockuai.com/bossmanager/html/seller_info/index.html\nUser-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36\nX-Requested-With:XMLHttpRequest\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br")])]),s("h4",{attrs:{id:"缓存控制头-cache-control"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存控制头-cache-control","aria-hidden":"true"}},[t._v("#")]),t._v(" 缓存控制头 - Cache-Control")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("Cache-directive")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("public")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("所有内容都将被缓存")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("private")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("内容只缓存到私有缓存中")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("no-cache")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("所有内容都不会被缓存")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("no-store")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("所有内容都不会被缓存到缓存或 Internet 临时文件中")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("must-revalidation/proxy-revalidation")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("max-age=xxx (xxx is numeric)")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高")])])])]),t._v(" "),s("p",[t._v("如果 "),s("code",[t._v("cache-control")]),t._v(" 有 "),s("code",[t._v("max-age/s-maxage")]),t._v(" 则过期时间等于 "),s("code",[t._v("date + max-age/s-maxage")]),t._v("。如果没有则用 "),s("code",[t._v("expires")]),t._v(" 作为过期时间。")]),t._v(" "),s("h4",{attrs:{id:"过期头-expires"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#过期头-expires","aria-hidden":"true"}},[t._v("#")]),t._v(" 过期头 - Expires")]),t._v(" "),s("p",[t._v("HTTP1.0中的标准，表明过期时间，注意此处的时间都是指的是服务器的时间。")]),t._v(" "),s("p",[t._v("譬如："),s("code",[t._v("Expires: Thu, 04 Jan 2018 03:15:58 GMT")]),t._v("。")]),t._v(" "),s("p",[t._v("存在的问题：服务器时间与客户端时间的不一致，就会导致缓存跟期待效果出现偏差。")]),t._v(" "),s("h3",{attrs:{id:"弱缓存（协商缓存）-304"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#弱缓存（协商缓存）-304","aria-hidden":"true"}},[t._v("#")]),t._v(" 弱缓存（协商缓存）- 304")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("HTTP/1.1 200 OK\nDate: Thu, 04 Jan 2018 03:10:58 GMT\nVia: 1.1 varnish\nCache-Control: max-age=300\nX-Served-By: cache-hnd18736-HND\nX-Cache: HIT\nX-Cache-Hits: 1\nX-Timer: S1515035459.944267,VS0,VE0\nAccess-Control-Allow-Origin: *\nX-Fastly-Request-ID: b3a6b8622c580ab51e31a6dbf42596ce537eef03\nExpires: Thu, 04 Jan 2018 03:15:58 GMT\nSource-Age: 1849727\nVary: Authorization,Accept-Encoding\nContent-Type: image/jpeg\nContent-Security-Policy: default-src 'none'\nEtag: \"5ffdaa4768eefcca6f0e3d16ce6a06c20c354792\"\nLast-Modified: Fri, 19 Aug 2016 02:03:35 GMT\nTiming-Allow-Origin: https://github.com\nX-Content-Type-Options: nosniff\nX-Frame-Options: deny\nX-Xss-Protection: 1; mode=block\nX-GitHub-Request-Id: B5E0:1A39E:8284BE:8ACF77:5A3161C3\nContent-Length: 1195\nAccept-Ranges: bytes\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br")])]),s("p",[t._v("浏览器会向服务器发送请求，同时如果上一次的缓存中有 "),s("code",[t._v("Last-modified")]),t._v(" 和 "),s("code",[t._v("Etag")]),t._v(" 字段，\n浏览器将在 "),s("code",[t._v("request header")]),t._v(" 中加入 "),s("code",[t._v("If-Modified-Since")]),t._v("（对应于 "),s("code",[t._v("Last-modified")]),t._v(" ）， 和 "),s("code",[t._v("If-None-Match")]),t._v("（对应于 "),s("code",[t._v("Etag")]),t._v(" ）。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("Cache-directive")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("Last-modified")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("表明请求的资源上次的修改时间")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("If-Modified-Since")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("客户端保留的资源上次的修改时间")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("Etag")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("资源的内容标识。"),s("br"),t._v(" 不唯一，通常为文件的md5或者一段hash值。"),s("br"),t._v("只要保证写入和验证时的方法一致即可")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("If-None-Match")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("客户端保留的资源内容标识")])])])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://juejin.im/post/5c4044cd51882524f23032eb?utm_source=gold_browser_extension",target:"_blank",rel:"noopener noreferrer"}},[t._v("掘金 - 从前端角度理解缓存"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"tcp三次握手和四次挥手"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tcp三次握手和四次挥手","aria-hidden":"true"}},[t._v("#")]),t._v(" TCP三次握手和四次挥手")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s/pSrKbVryn71kDVIXUtpXMA",target:"_blank",rel:"noopener noreferrer"}},[t._v("跟着动画学习TCP三次握手和四次挥手"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"何为dns-prefetch优化？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#何为dns-prefetch优化？","aria-hidden":"true"}},[t._v("#")]),t._v(" 何为"),s("code",[t._v("dns-prefetch")]),t._v("优化？")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://lijiahao8898.github.io/2017/08/28/dns-prefetch",target:"_blank",rel:"noopener noreferrer"}},[t._v("dns-prefetch"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"五层因特网协议栈"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五层因特网协议栈","aria-hidden":"true"}},[t._v("#")]),t._v(" 五层因特网协议栈")]),t._v(" "),s("p",[t._v("从应用层的发送http请求，到传输层通过三次握手建立tcp/ip连接，再到网络层的ip寻址，再到数据链路层的封装成帧，最后到物理层的利用物理介质传输。")]),t._v(" "),s("ol",[s("li",[t._v("应用层(dns,http) DNS解析成IP并发送http请求")]),t._v(" "),s("li",[t._v("传输层(tcp,udp) 建立tcp连接（三次握手）")]),t._v(" "),s("li",[t._v("网络层(IP,ARP) IP寻址")]),t._v(" "),s("li",[t._v("数据链路层(PPP) 封装成帧")]),t._v(" "),s("li",[t._v("物理层(利用物理介质传输比特流) 物理传输（然后传输的时候通过双绞线，电磁波等各种介质）")])]),t._v(" "),s("p",[t._v("OSI七层框架："),s("code",[t._v("物理层")]),t._v("、"),s("code",[t._v("数据链路层")]),t._v("、"),s("code",[t._v("网络层")]),t._v("、"),s("code",[t._v("传输层")]),t._v("、"),s("code",[t._v("会话层")]),t._v("、"),s("code",[t._v("表示层")]),t._v("、"),s("code",[t._v("应用层")])]),t._v(" "),s("p",[t._v("表示层：主要处理两个通信系统中交换信息的表示方式，包括数据格式交换，数据加密与解密，数据压缩与终端类型转换等")]),t._v(" "),s("p",[t._v("会话层：它具体管理不同用户和进程之间的对话，如控制登陆和注销过程")]),t._v(" "),s("h2",{attrs:{id:"cdn的好处"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cdn的好处","aria-hidden":"true"}},[t._v("#")]),t._v(" CDN的好处")]),t._v(" "),s("ul",[s("li",[t._v("增加并发请求")]),t._v(" "),s("li",[t._v("缓存文件")]),t._v(" "),s("li",[t._v("高效率，更低的网络延迟，更小的丢包率")]),t._v(" "),s("li",[t._v("使用数据分析（一般情况下CDN提供商（如百度云加速）都会提供数据统计功能，可以了解更多关于用户访问自己网站的情况，可以根据统计数据对自己的站点适时适当的做出些许调整。）")]),t._v(" "),s("li",[t._v("防止网站被攻击")])]),t._v(" "),s("h2",{attrs:{id:"xss跨站脚本攻击"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#xss跨站脚本攻击","aria-hidden":"true"}},[t._v("#")]),t._v(" "),s("code",[t._v("XSS")]),t._v("跨站脚本攻击")]),t._v(" "),s("p",[s("code",[t._v("XSS")]),t._v("跨站脚本攻击通过网页漏洞来执行恶意的"),s("code",[t._v("Javascript")]),t._v("代码。")]),t._v(" "),s("h3",{attrs:{id:"存储型xss攻击"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#存储型xss攻击","aria-hidden":"true"}},[t._v("#")]),t._v(" 存储型"),s("code",[t._v("XSS")]),t._v("攻击")]),t._v(" "),s("p",[t._v("利用漏洞提交恶意"),s("code",[t._v("JavaScript")]),t._v("代码，比如在input, textarea等所有可能输入文本信息的区域，输入javascript恶意代码等\n提交后信息会存在服务器中，当用户再次打开网站请求到相应的数据，打开页面，恶意脚本就会将用户的 Cookie 信息等数据上传到黑客服务器。")]),t._v(" "),s("h3",{attrs:{id:"反射型-xss-攻击"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#反射型-xss-攻击","aria-hidden":"true"}},[t._v("#")]),t._v(" 反射型 XSS 攻击")]),t._v(" "),s("p",[t._v("QQ邮件等发送过来的恶意链接。")]),t._v(" "),s("h3",{attrs:{id:"基于dom的xss攻击"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基于dom的xss攻击","aria-hidden":"true"}},[t._v("#")]),t._v(" 基于"),s("code",[t._v("DOM")]),t._v("的"),s("code",[t._v("XSS")]),t._v("攻击")]),t._v(" "),s("p",[t._v("基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。它的特点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。\n比如利用工具(如Burpsuite)扫描目标网站所有的网页并自动测试写好的注入脚本等。")]),t._v(" "),s("h3",{attrs:{id:"xss预防"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#xss预防","aria-hidden":"true"}},[t._v("#")]),t._v(" XSS预防")]),t._v(" "),s("ol",[s("li",[t._v("将cookie等敏感信息设置为httponly，禁止Javascript通过document.cookie获得")]),t._v(" "),s("li",[t._v("对所有的输入做严格的校验尤其是在服务器端，过滤掉任何不合法的输入，比如手机号必须是数字，通常可以采用正则表达式.")]),t._v(" "),s("li",[t._v("净化和过滤掉不必要的html标签，比如：iframe, alt,script ;净化和过滤掉不必要的Javascript的事件标签，比如：onclick, onfocus等")]),t._v(" "),s("li",[t._v("转义单引号，双引号，尖括号等特殊字符，可以采用htmlencode编码 或者过滤掉这些特殊字符")]),t._v(" "),s("li",[t._v("CSP,CSP 全称为 Content Security Policy，即内容安全策略。主要以白名单的形式配置可信任的内容来源，在网页中，能够使白名单中的内容正常执行（包含 JS，CSS，Image 等等），而非白名单的内容无法正常执行，从而减少跨站脚本攻击（XSS），当然，也能够减少运营商劫持的内容注入攻击。")])]),t._v(" "),s("p",[t._v("配置方式：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//1、meta\n<meta http-equiv=\"Content-Security-Policy\" content=\"script-src 'self'\">\n\n//2、Http 头部\nContent-Security-Policy:\nscript-src 'unsafe-inline' 'unsafe-eval' 'self' *.54php.cn *.yunetidc.com *.baidu.com *.cnzz.com *.duoshuo.com *.jiathis.com;report-uri /error/csp\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("h2",{attrs:{id:"csrf跨站请求伪造"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#csrf跨站请求伪造","aria-hidden":"true"}},[t._v("#")]),t._v(" "),s("code",[t._v("CSRF")]),t._v("跨站请求伪造")]),t._v(" "),s("p",[s("code",[t._v("CSRF")]),t._v("跨站请求伪造（Cross-site request forgery）引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。")]),t._v(" "),s("p",[t._v("发生"),s("code",[t._v("CSRF")]),t._v("的必要条件：")]),t._v(" "),s("ol",[s("li",[t._v("目标站点一定要有 CSRF 漏洞；")]),t._v(" "),s("li",[t._v("用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；")]),t._v(" "),s("li",[t._v("需要用户打开一个第三方站点，如黑客的站点等。")])]),t._v(" "),s("h3",{attrs:{id:"csrf预防"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#csrf预防","aria-hidden":"true"}},[t._v("#")]),t._v(" CSRF预防")]),t._v(" "),s("ol",[s("li",[t._v("充分利用好 Cookie 的 SameSite 属性。")])]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("set-cookie: 1P_JAR=2019-10-20-06; expires=Tue, 19-Nov-2019 06:36:21 GMT; path=/; domain=.google.com; SameSite=none\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("验证请求的来源站点\n验证HTTP请求头中的"),s("code",[t._v("Origin")]),t._v("和"),s("code",[t._v("Referer")]),t._v("。")])]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("Accept: */*\nAccept-Encoding: gzip, deflate, br\nAccept-Language: zh-CN,zh;q=0.9\nCache-Control: no-cache\nConnection: keep-alive\nHost: comment-wrapper-ms.juejin.im\nOrigin: https://juejin.im\nPragma: no-cache\nReferer: https://juejin.im/post/5dca1b376fb9a04a9f11c82e\nSec-Fetch-Mode: cors\nSec-Fetch-Site: same-site\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\nX-Juejin-Client: 1574834410506\nX-Juejin-Src: web\nX-Juejin-Token: eyJhY2Nlc3NfdG9rZW4iOiJXOXduNFBaT1RpdGhrRzdaIiwicmVmcmVzaF90b2tlbiI6ImwwVjVJcERlV3BrOGVpc0wiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==\nX-Juejin-Uid: 59c9cedbf265da06690875a6\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br")])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("在请求地址中添加token并验证\ntoken前可以增加约定好的随机的字符串")])]),t._v(" "),s("h2",{attrs:{id:"todo-lists"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#todo-lists","aria-hidden":"true"}},[t._v("#")]),t._v(" TODO LISTS")]),t._v(" "),s("ul",[s("li",[t._v("dns查询")]),t._v(" "),s("li",[t._v("getComputedStyle")]),t._v(" "),s("li",[t._v("window.getComputedStyle == document.defaultView.getComputedStyle")]),t._v(" "),s("li",[t._v('window.getComputedStyle(elem, null).getPropertyValue("height")\nwindow.getComputedStyle(elem, null).getPropertyValue("height")可能的值为100px，而且，就算是css上写的是inherit，getComputedStyle也会把它最终计算出来的。不过注意，如果元素的背景色透明，那么getComputedStyle获取出来的就是透明的这个背景（因为透明本身也是有效的），而不会是父节点的背景。所以它不一定是最终显示的颜色。')]),t._v(" "),s("li",[t._v("getComputedStyle会引起回流，因为它需要获取祖先节点的一些信息进行计算（譬如宽高等），所以用的时候慎用，回流会引起性能问题。")]),t._v(" "),s("li",[t._v("其他回流：offsetXXX，scrollXXX，clientXXX，currentStyle")])])])},[],!1,null,null,null);e.default=n.exports}}]);