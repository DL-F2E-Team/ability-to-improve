# HTTP

<TOC/>

## 1. 游览器缓存机制（强缓存，弱缓存）

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