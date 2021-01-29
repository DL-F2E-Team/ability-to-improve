# the work problems

## react vue 路由 history 模式配置
history 模式需要 nginx 做配置 vue 和 react 都是
```
location / {
    try_files $uri /index.html;
}
```

## 浙里办App使用定位不准确的原因
浙里办App返回的是经纬度（地球坐标系）。高德地图使用的是火星坐标系。所以需要转换一下。
```
地球坐标系 => 加密 => 火星坐标系 => 加密 => 百度坐标系
```

## 一个域名下配置两套系统的 vue 配置
[https://my.oschina.net/u/4612980/blog/4514593](https://my.oschina.net/u/4612980/blog/4514593)
1. 在vue.config.js文件下找到publicPath配置，添加如下配置（vuecli2就是config文件夹下的assetsPublicPath配置）
```
process.env.NODE_ENV === 'production' ? '/newProject/' : '/'
```

这个配置在官方文档上有说明，就是要注意区分开发环境与生产部署环境。生产环境上我们跑起项目时是不需要在url上加上这个newProject的，加上这个，是因为后面部署的时候nginx会根据这个来区分不同的项目。

2. 在模板文件下添加base

在部署环境下， a、img、link、form这些标签要找到对应资源，也要先匹配nginx环境，所以要在head节点下加上base配置

```
<meta base=/newProject/ >
```

base标签为页面上的所有链接规定默认地址或默认目标。

3. 将'/newProject/'应用到vue项目路由中

```
const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/newProject/index/' : '/index/',
  routes
})
```

4. ngx
```
server {
        listen       20000;
        server_name  localhost;
        
  # root   D:/deploy/web
  location ^~ /api/ {
   proxy_pass http://ip:端口/;
  }
  
  location / {
            root   D:/deploy/web/a;
   try_files $uri $uri/ @router;
            index  index.html;
        }
  
  location /newProject {
            alias   D:/deploy/web/newProject;
   try_files $uri $uri/ /b/index.html;
            index  index.html;
        }
  location @router {
            rewrite ^.*$ /index.html last;
        }
 }
```
