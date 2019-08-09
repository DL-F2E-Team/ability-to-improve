# HTTP

<TOC/>

## TODO LISTS
* 跨域
* 安全
* dns查询
* cookie 与 localstorage sessionstorage
* 游览器回流 重绘 渲染

## 游览器特性
游览器是多进程的，游览器内核是多线程的，每次打开一个页签输入 `URL` 就相当于打开了一个线程。
游览器会自动的将多个空白页面放入一个线程中，以便提升性能。

## http报文结构

### 常见的请求头
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

### 常见的响应头
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

## http1.0 http1.1 http2.0 / https
`http1.0` 默认使用短链接
`http1.1` 默认使用长连接

HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法。
以及几种Additional Request Methods：PUT、DELETE、LINK、UNLINK

HTTP1.1定义了八种请求方法：GET、POST、HEAD、OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。

http1.1中，每请求一个资源，都是需要开启一个tcp/ip连接的，所以对应的结果是，每一个资源对应一个tcp/ip请求，由于tcp/ip本身有并发数限制，所以当资源一多，速度就显著慢下来

http2.0中，一个tcp/ip请求可以请求多个资源，也就是说，只要一次tcp/ip请求，就可以请求若干个资源，分割成更小的帧请求，速度明显提升。
 
## 游览器缓存机制（强缓存from cache、协商缓存304）
### 强缓存
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

表一：

| Cache-directive   | 说明                |
|:----------------- |:-------------------|
| public            | 所有内容都将被缓存    |
| private           | 内容只缓存到私有缓存中 |
| no-cache          | 所有内容都不会被缓存   |
| no-store          | 所有内容都不会被缓存到缓存或 Internet 临时文件中 |
| must-revalidation/proxy-revalidation | 如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证      |
| max-age=xxx (xxx is numeric) | 缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高 |

如果 `cache-control` 有 `max-age/s-maxage` 则过期时间等于 `date + max-age/s-maxage`。如果没有则用 `expires` 作为过期时间。

#### 过期头 - Expires
Http1.0 中的标准，表明过期时间，注意此处的时间都是指的是服务器的时间。

譬如：`Expires: Thu, 04 Jan 2018 03:15:58 GMT`。

存在的问题：服务器时间与客户端时间的不一致，就会导致缓存跟期待效果出现偏差。

### 弱缓存（协商缓存）
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

* Last-modified: 表明请求的资源上次的修改时间。
* If-Modified-Since：客户端保留的资源上次的修改时间。
* Etag：资源的内容标识。（不唯一，通常为文件的md5或者一段hash值，只要保证写入和验证时的方法一致即可）
* If-None-Match： 客户端保留的资源内容标识。

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

## 资料
[从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872)
