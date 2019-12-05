# BOM

## 跨域
狭义的跨域指游览器同源策略限制，通常我们所说的便是狭义跨域。

### 什么是同源策略？
同源策略是指**域名相同**、**端口号相同**、**协议相同**。

同源策略限制以下几种行为
1. Cookie、LocalStorage、和IndexDB无法读取。
2. DOM和JS对象无法获得。
3. AJAX请求不能发送。

### 跨域解决方案
* jsonp - get请求
* cors - 跨域资源共享
* nginx代理
* node中间件
* postmessage
* document.domain + iframe
* window.name + iframe
* websocket

#### 1. jsonp - get请求
动态创建`<script>`标签，然后利用了`<script>`标签没有跨域限制这一“漏洞”来达到与第三方通讯的目的，用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名包裹json
数据，这样客户端就可以随意定制自己的函数自动处理返回的数据了。缺点：域不安全，判断jsonp请求是否失败并不容易，只限于get请求（本质上script加载资源就是get）。
```js
var script = document.createElement('script');
script.type = 'text/javascript';
// 传参并指定回调执行函数为onBack
script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
document.head.appendChild(script);
// 回调执行函数
function onBack(res) {
    alert(JSON.stringify(res));
}

// 服务端返回
onBack({"status": true, "user": "admin"})
```

#### CORS
CORS需要浏览器和后端同时支持。浏览器会自动进行 CORS 通信，服务端设置`Access-Control-Allow-Origin`就可以开启CORS。

::: warning 提示
跨域还会产生**简单请求**和**复杂请求（预请求）**。
跨域默认不会发送**cookie**，设置`withCredentials = true`。
:::

#### nginx代理
``` {8}
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871 
    location ^~ /api {
        proxy_pass http://localhost:9871;
    }    
}
```
::: tip
[前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364?utm_source=tag-newest)
:::

## web storage、cookie、session的区别

### cookie、session区别

1. 保持状态：
* `cookie` 保存在浏览器端，
* `session` 保存在服务器端。

2. 使用方式：
* **cookie机制**：如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随浏览器的关闭而结束，
这种cookie简称**会话cookie**。如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，
cookie数据仍然存在，直到过期时间结束才消失。cookie是服务器发给客户端的特殊信息，cookie是以文本的方式保存在客户端，每次请求时都带上它
* **session机制**：当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果
 有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的
 session对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互
 中浏览器按照规则将sessionid发送给服务器。如果用户禁用cookie，则要使用URL重写，可以通过
 response.encodeURL(url) 进行实现；API对encodeURL的结束为，当浏览器支持Cookie时，url不做任何处理；当
 浏览器不支持Cookie的时候，将会重写URL将SessionID拼接到访问地址后。
 
3、存储内容：
* `cookie` 只能保存字符串类型，以文本的方式；
* `session` 通过类似与Hashtable的数据结构来保存，能支持任何类型的对象(session中可含有多个对象)

4、存储的大小：
* `cookie` 单个保存的数据不能超过4kb；
* `session` 大小没有限制。

5、安全性：cookie：针对cookie所存在的攻击：Cookie欺骗，Cookie截获；session的安全性大于cookie。

原因如下：
* sessionID存储在cookie中，若要攻破session首先要攻破cookie；
* sessionID是要有人登录，或者启动session_start才会有，所以攻破cookie也不一定能得到sessionID；
* 第二次启动session_start后，前一次的sessionID就是失效了，session过期后，sessionID也随之失效。
* sessionID是加密的
* 综上所述，攻击者必须在短时间内攻破加密的sessionID，这很难。

### web storage

* `sessionStorage`：将数据保存在session对象中。所谓session，是指用户在浏览某个网站时，从进入网站到
浏览器关闭所经过的这段时间，也就是用户浏览这个网站所花费的时间。session对象可以用来保存在这段时间内所要求保存的任何数据。
* `localStorage`：将数据保存在客户端本地的硬件设备(通常指硬盘，也可以是其他硬件设备)中，即使浏览器被关闭了，该数据仍然存在，下次打开浏览器访问网站时仍然可以继续使用。

```
setItem (key, value) ——  保存数据，以键值对的方式储存信息
getItem (key) ——  获取数据，将键值传入，即可获取到对应的value值
removeItem (key) ——  删除单个数据，根据键值移除对应的信息
clear () ——  删除所有的数据
key (index) —— 获取某个索引的key
```

### 区别

* 生命周期：`sessionStorage` 临时保存（同源的窗口中始终存在的数据），`localStorage` 永久保存
* 存储大小：一般都是**5MB**, `cookie` 是 **4KB**
* 存储位置：都在客户端
* 存储类型：字符串类型（JSON.stringify）

[cookies、sessionStorage和localStorage解释及区别](https://www.cnblogs.com/pengc/p/8714475.html)

## 游览器特性
* **游览器**是**多进程**的，游览器**内核**是**多线程**的
* 每次打开一个页签输入 `URL` 就相当于打开了一个线程
* 游览器会自动的将多个空白页面放入一个线程中，以便提升性能。

[从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872)

## HTTP1.0、1.1、2.0、HTTPS

### 1.0
* 默认使用**短链接**
* 定义了**三种**请求方法： `GET`, `POST` 和 `HEAD` 方法。以及几种Additional Request Methods：`PUT`、`DELETE`、`LINK`、`UNLINK`

### 1.1
* 默认使用**长连接**
* 定义了**八种**请求方法：`GET`、`POST`、`HEAD`、`OPTIONS`, `PUT`, `DELETE`, `TRACE` 和 `CONNECT` 方法。
* 每请求一个资源，都是需要开启一个 [tcp/ip](/http/#tcp三次握手和四次挥手) 连接的，所以对应的结果是，每一个资源对应一个 [tcp/ip](/http/#tcp三次握手和四次挥手) 请求，由于 [tcp/ip](/http/#tcp三次握手和四次挥手) 本身有并发数限制，所以当资源一多，速度就显著慢下来

### 2.0
`HTTP2.0` 中，一个 [tcp/ip](/http/#tcp三次握手和四次挥手) 请求可以请求多个资源，也就是说，只要一次 [tcp/ip](/http/#tcp三次握手和四次挥手) 请求，就可以请求若干个资源，分割成更小的帧请求，速度明显提升。

### HTTP报文结构

#### 常见的请求头
* `Accept`: 接收类型，表示浏览器支持的MIME类型（对标服务端返回的Content-Type）
* `Accept-Encoding`：浏览器支持的压缩类型,如gzip等,超出类型不能接收
* `Content-Type`：客户端发送出去实体内容的类型
* `Cache-Control`: 指定请求和响应遵循的缓存机制，如no-cache
* `If-Modified-Since`：对应服务端的Last-Modified，用来匹配看文件是否变动，只能精确到1s之内，http1.0中
* `Expires`：缓存控制，在这个时间内不会请求，直接使用缓存，http1.0，而且是服务端时间
* `Max-age`：代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存，http1.1中
* `If-None-Match`：对应服务端的ETag，用来匹配文件内容是否改变（非常精确），http1.1中
* `Cookie`: 有cookie并且同域访问时会自动带上
* `Connection`: 当浏览器与服务器通信时对于长连接如何进行处理,如keep-alive
* `Host`：请求的服务器URL
* `Origin`：最初的请求是从哪里发起的（只会精确到端口）,Origin比Referer更尊重隐私
* `Referer`：该页面的来源URL(适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段)
* `User-Agent`：用户客户端的一些必要信息，如UA头部等

#### 常见的响应头
* `Access-Control-Allow-Headers`: 服务器端允许的请求Headers
* `Access-Control-Allow-Methods`: 服务器端允许的请求方法
* `Access-Control-Allow-Origin`: 服务器端允许的请求Origin头部（譬如为*）
* `Content-Type`：服务端返回的实体内容的类型
* `Date`：数据从服务器发送的时间
* `Cache-Control`：告诉浏览器或其他客户，什么环境可以安全的缓存文档
* `Last-Modified`：请求资源的最后修改时间
* `Expires`：应该在什么时候认为文档已经过期,从而不再缓存它
* `Max-age`：客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效
* `ETag`：请求变量的实体标签的当前值
* `Set-Cookie`：设置和页面关联的cookie，服务器通过这个头部把cookie传给客户端
* `Keep-Alive`：如果客户端有keep-alive，服务端也会有响应（如timeout=38）
* `Server`：服务器的一些相关信息

## 游览器缓存机制
### 强缓存 - from cache
```
> General
Request URL:http://yangdongxi.seller.mockuai.com/bossmanager/wap/domain/get.do
Request Method:GET
Status Code:200 OK
Remote Address:115.29.239.224:80
Referrer Policy:no-referrer-when-downgrade

> Response Headers
Accept-Charset:big5, big5-hkscs, euc-jp, euc-kr, gb18030, gb2312, gbk, ibm-thai, ibm00858, ibm01140, ibm01141, ibm01142, ibm01143, ibm01144, ibm01145, ibm01146, ibm01147, ibm01148, ibm01149, ibm037, ibm1026, ibm1047, ibm273, ibm277, ibm278, ibm280, ibm284, ibm285, ibm290, ibm297, ibm420, ibm424, ibm437, ibm500, ibm775, ibm850, ibm852, ibm855, ibm857, ibm860, ibm861, ibm862, ibm863, ibm864, ibm865, ibm866, ibm868, ibm869, ibm870, ibm871, ibm918, iso-2022-cn, iso-2022-jp, iso-2022-jp-2, iso-2022-kr, iso-8859-1, iso-8859-13, iso-8859-15, iso-8859-2, iso-8859-3, iso-8859-4, iso-8859-5, iso-8859-6, iso-8859-7, iso-8859-8, iso-8859-9, jis_x0201, jis_x0212-1990, koi8-r, koi8-u, shift_jis, tis-620, us-ascii, utf-16, utf-16be, utf-16le, utf-32, utf-32be, utf-32le, utf-8, windows-1250, windows-1251, windows-1252, windows-1253, windows-1254, windows-1255, windows-1256, windows-1257, windows-1258, windows-31j, x-big5-hkscs-2001, x-big5-solaris, x-compound_text, x-euc-jp-linux, x-euc-tw, x-eucjp-open, x-ibm1006, x-ibm1025, x-ibm1046, x-ibm1097, x-ibm1098, x-ibm1112, x-ibm1122, x-ibm1123, x-ibm1124, x-ibm1364, x-ibm1381, x-ibm1383, x-ibm300, x-ibm33722, x-ibm737, x-ibm833, x-ibm834, x-ibm856, x-ibm874, x-ibm875, x-ibm921, x-ibm922, x-ibm930, x-ibm933, x-ibm935, x-ibm937, x-ibm939, x-ibm942, x-ibm942c, x-ibm943, x-ibm943c, x-ibm948, x-ibm949, x-ibm949c, x-ibm950, x-ibm964, x-ibm970, x-iscii91, x-iso-2022-cn-cns, x-iso-2022-cn-gb, x-iso-8859-11, x-jis0208, x-jisautodetect, x-johab, x-macarabic, x-maccentraleurope, x-maccroatian, x-maccyrillic, x-macdingbat, x-macgreek, x-machebrew, x-maciceland, x-macroman, x-macromania, x-macsymbol, x-macthai, x-macturkish, x-macukraine, x-ms932_0213, x-ms950-hkscs, x-ms950-hkscs-xp, x-mswin-936, x-pck, x-sjis_0213, x-utf-16le-bom, x-utf-32be-bom, x-utf-32le-bom, x-windows-50220, x-windows-50221, x-windows-874, x-windows-949, x-windows-950, x-windows-iso2022jp
Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With
Access-Control-Allow-Methods:GET, POST, OPTIONS
Access-Control-Allow-Origin:*
Connection:keep-alive
Content-Length:53
Content-Type:application/json;charset=utf-8
Date:Thu, 04 Jan 2018 02:18:10 GMT
Server:Tengine/2.1.2

> Request Headers
Accept:application/json, text/javascript, */*; q=0.01
Accept-Encoding:gzip, deflate
Accept-Language:zh-CN,zh;q=0.9
Cache-Control:no-cache
Connection:keep-alive
Cookie:JSESSIONID=72935BC33DB013063F2DF99BD89D3DBC; username=jishu; role_mark=3; root_role=undefined; is_super=0; is_multi_mall=0; session_key=null; higoMark=1; from_url=yangdongxi.seller.mockuai.com; user_id=91; biz_code=yangdongxi; user_type=1; domain=m.hzfenxianghui.com; ak=0efa3aa4c1d059043ec35cec5b6625d1; ap=6415e5876fa6c32641f4f08e1eb693be; Hm_lvt_6fbe7cc5b60c0a0fc5de3d7b387ee31f=1512548721,1513563511; Hm_lpvt_6fbe7cc5b60c0a0fc5de3d7b387ee31f=1514281204; route=debec577b74b46468980f4122a736cfa; access_token=JWT%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJ5YW5nZG9uZ3hpIiwiZXhwaXJlcyI6MTUxNTA3NTQ4MzU4Mn0.KcHh2OHWyL_16qpdOzvZFe2eE3AYfEQaPBMg_FBPvzQ
Host:yangdongxi.seller.mockuai.com
Pragma:no-cache
Referer:http://yangdongxi.seller.mockuai.com/bossmanager/html/seller_info/index.html
User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36
X-Requested-With:XMLHttpRequest
```
#### 缓存控制头 - Cache-Control

| Cache-directive                      | 说明                |
|:-------------------------------------|:-------------------|
| public                               | 所有内容都将被缓存    |
| private                              | 内容只缓存到私有缓存中 |
| no-cache                             | 所有内容都不会被缓存   |
| no-store                             | 所有内容都不会被缓存到缓存或 Internet 临时文件中 |
| must-revalidation/proxy-revalidation | 如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证      |
| max-age=xxx (xxx is numeric)         | 缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高 |

如果 `cache-control` 有 `max-age/s-maxage` 则过期时间等于 `date + max-age/s-maxage`。如果没有则用 `expires` 作为过期时间。

#### 过期头 - Expires
HTTP1.0中的标准，表明过期时间，注意此处的时间都是指的是服务器的时间。

譬如：`Expires: Thu, 04 Jan 2018 03:15:58 GMT`。

存在的问题：服务器时间与客户端时间的不一致，就会导致缓存跟期待效果出现偏差。

### 弱缓存（协商缓存）- 304
```
HTTP/1.1 200 OK
Date: Thu, 04 Jan 2018 03:10:58 GMT
Via: 1.1 varnish
Cache-Control: max-age=300
X-Served-By: cache-hnd18736-HND
X-Cache: HIT
X-Cache-Hits: 1
X-Timer: S1515035459.944267,VS0,VE0
Access-Control-Allow-Origin: *
X-Fastly-Request-ID: b3a6b8622c580ab51e31a6dbf42596ce537eef03
Expires: Thu, 04 Jan 2018 03:15:58 GMT
Source-Age: 1849727
Vary: Authorization,Accept-Encoding
Content-Type: image/jpeg
Content-Security-Policy: default-src 'none'
Etag: "5ffdaa4768eefcca6f0e3d16ce6a06c20c354792"
Last-Modified: Fri, 19 Aug 2016 02:03:35 GMT
Timing-Allow-Origin: https://github.com
X-Content-Type-Options: nosniff
X-Frame-Options: deny
X-Xss-Protection: 1; mode=block
X-GitHub-Request-Id: B5E0:1A39E:8284BE:8ACF77:5A3161C3
Content-Length: 1195
Accept-Ranges: bytes
```

浏览器会向服务器发送请求，同时如果上一次的缓存中有 `Last-modified` 和 `Etag` 字段，
浏览器将在 `request header` 中加入 `If-Modified-Since`（对应于 `Last-modified` ）， 和 `If-None-Match`（对应于 `Etag` ）。

| Cache-directive                      | 说明                |
|:-------------------------------------|:-------------------|
| Last-modified                        | 表明请求的资源上次的修改时间    |
| If-Modified-Since                    | 客户端保留的资源上次的修改时间 |
| Etag                                 | 资源的内容标识。<br/> 不唯一，通常为文件的md5或者一段hash值。<br/>只要保证写入和验证时的方法一致即可|
| If-None-Match                        | 客户端保留的资源内容标识 |

[掘金 - 从前端角度理解缓存](https://juejin.im/post/5c4044cd51882524f23032eb?utm_source=gold_browser_extension)

## TCP三次握手和四次挥手
[跟着动画学习TCP三次握手和四次挥手](https://mp.weixin.qq.com/s/pSrKbVryn71kDVIXUtpXMA)

## 何为`dns-prefetch`优化？
[dns-prefetch](https://lijiahao8898.github.io/2017/08/28/dns-prefetch)

## 五层因特网协议栈
从应用层的发送http请求，到传输层通过三次握手建立tcp/ip连接，再到网络层的ip寻址，再到数据链路层的封装成帧，最后到物理层的利用物理介质传输。
1. 应用层(dns,http) DNS解析成IP并发送http请求
2. 传输层(tcp,udp) 建立tcp连接（三次握手）
3. 网络层(IP,ARP) IP寻址
4. 数据链路层(PPP) 封装成帧
5. 物理层(利用物理介质传输比特流) 物理传输（然后传输的时候通过双绞线，电磁波等各种介质）

OSI七层框架：`物理层`、`数据链路层`、`网络层`、`传输层`、`会话层`、`表示层`、`应用层`

表示层：主要处理两个通信系统中交换信息的表示方式，包括数据格式交换，数据加密与解密，数据压缩与终端类型转换等

会话层：它具体管理不同用户和进程之间的对话，如控制登陆和注销过程

## CDN的好处

* 增加并发请求
* 缓存文件
* 高效率，更低的网络延迟，更小的丢包率
* 使用数据分析（一般情况下CDN提供商（如百度云加速）都会提供数据统计功能，可以了解更多关于用户访问自己网站的情况，可以根据统计数据对自己的站点适时适当的做出些许调整。）
* 防止网站被攻击

## `XSS`跨站脚本攻击
`XSS`跨站脚本攻击通过网页漏洞来执行恶意的`Javascript`代码。

### 存储型`XSS`攻击
利用漏洞提交恶意`JavaScript`代码，比如在input, textarea等所有可能输入文本信息的区域，输入javascript恶意代码等
提交后信息会存在服务器中，当用户再次打开网站请求到相应的数据，打开页面，恶意脚本就会将用户的 Cookie 信息等数据上传到黑客服务器。

### 反射型 XSS 攻击
QQ邮件等发送过来的恶意链接。

### 基于`DOM`的`XSS`攻击
基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。它的特点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。
比如利用工具(如Burpsuite)扫描目标网站所有的网页并自动测试写好的注入脚本等。

### XSS预防

1. 将cookie等敏感信息设置为httponly，禁止Javascript通过document.cookie获得
2. 对所有的输入做严格的校验尤其是在服务器端，过滤掉任何不合法的输入，比如手机号必须是数字，通常可以采用正则表达式.
3. 净化和过滤掉不必要的html标签，比如：iframe, alt,script ;净化和过滤掉不必要的Javascript的事件标签，比如：onclick, onfocus等
4. 转义单引号，双引号，尖括号等特殊字符，可以采用htmlencode编码 或者过滤掉这些特殊字符
5. CSP,CSP 全称为 Content Security Policy，即内容安全策略。主要以白名单的形式配置可信任的内容来源，在网页中，能够使白名单中的内容正常执行（包含 JS，CSS，Image 等等），而非白名单的内容无法正常执行，从而减少跨站脚本攻击（XSS），当然，也能够减少运营商劫持的内容注入攻击。
   
配置方式： 
```
//1、meta
<meta http-equiv="Content-Security-Policy" content="script-src 'self'">

//2、Http 头部
Content-Security-Policy:
script-src 'unsafe-inline' 'unsafe-eval' 'self' *.54php.cn *.yunetidc.com *.baidu.com *.cnzz.com *.duoshuo.com *.jiathis.com;report-uri /error/csp
```

## `CSRF`跨站请求伪造
`CSRF`跨站请求伪造（Cross-site request forgery）引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。

发生`CSRF`的必要条件：
1. 目标站点一定要有 CSRF 漏洞；
2. 用户要登录过目标站点，并且在浏览器上保持有该站点的登录状态；
3. 需要用户打开一个第三方站点，如黑客的站点等。

### CSRF预防

1. 充分利用好 Cookie 的 SameSite 属性。
```
set-cookie: 1P_JAR=2019-10-20-06; expires=Tue, 19-Nov-2019 06:36:21 GMT; path=/; domain=.google.com; SameSite=none
```

2. 验证请求的来源站点
验证HTTP请求头中的`Origin`和`Referer`。
```
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: no-cache
Connection: keep-alive
Host: comment-wrapper-ms.juejin.im
Origin: https://juejin.im
Pragma: no-cache
Referer: https://juejin.im/post/5dca1b376fb9a04a9f11c82e
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36
X-Juejin-Client: 1574834410506
X-Juejin-Src: web
X-Juejin-Token: eyJhY2Nlc3NfdG9rZW4iOiJXOXduNFBaT1RpdGhrRzdaIiwicmVmcmVzaF90b2tlbiI6ImwwVjVJcERlV3BrOGVpc0wiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==
X-Juejin-Uid: 59c9cedbf265da06690875a6
```
3. 在请求地址中添加token并验证
token前可以增加约定好的随机的字符串

## TODO LISTS
* dns查询
* getComputedStyle
* window.getComputedStyle == document.defaultView.getComputedStyle
* window.getComputedStyle(elem, null).getPropertyValue("height")
window.getComputedStyle(elem, null).getPropertyValue("height")可能的值为100px，而且，就算是css上写的是inherit，getComputedStyle也会把它最终计算出来的。不过注意，如果元素的背景色透明，那么getComputedStyle获取出来的就是透明的这个背景（因为透明本身也是有效的），而不会是父节点的背景。所以它不一定是最终显示的颜色。
* getComputedStyle会引起回流，因为它需要获取祖先节点的一些信息进行计算（譬如宽高等），所以用的时候慎用，回流会引起性能问题。
* 其他回流：offsetXXX，scrollXXX，clientXXX，currentStyle
