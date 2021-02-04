# Vue SSR

* 利于SEO搜索引擎优化
* 可以被爬虫抓取
* SSR直接将HTML字符串传递给游览器，大大加快首屏加载时间
* SSR占用更多的内存和CPU资源
* 一些常用的游览器API可能无法正常使用
* 在Vue中只支持 `beforeCreate` 和 `created` 两个生命周期

## nuxtjs
在 vue-cli 老版本中使用 `vue init nuxt/starter`安装，新版本使用`npx create-nuxt-app 项目名`。

### 配置ip和端口号
在 package.json 中
```
"config": {
    "nuxt": {
      "host": "192.168.18.179",
      "port": "1818"
    }
  },
```

### 引用css
在 nuxt.config.js 中 css 下
```
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/normalize.css'
  ],
```

### 配置loader
在 nuxt.config.js 中 build 下

### 路由
使用 `nuxt-link`

动态路由：创建文件的时候的格式`_id.vue`

参数校验：
```
export default {
    validate ({params}) {
        return /^\d+$/.test(params.id)
    }
}
```

### 动画 
nuxt定义好的css名称，全局：
```css
.page-enter-active,.page-leave-active {
    
}
```

### 默认模板
根目录下新建 app.html 使用 `{{HEAD}}`,`{{APP}}`

### 错误页面
pages 下 新建 error.vue

### 个性 meta
```
head () {
    return {
        title: '',
        meta: [{
        
        }]
    }
}
```

### 异步请求 asyncData 
```
async asyncData () {
    let {data} = await axios.get()
    return {
        info: data
    }
}
```

