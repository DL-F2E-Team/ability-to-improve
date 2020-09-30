# Node

```js
// 当前node命令执行时所在的文件夹目录
process.cwd()

// __dirname是指被执行js文件所在的文件夹目录
```

## stream

```js
let text = ''
stream.on('data', data => {
    text += data;
})

stream.on('end', () => {
    console.log(text)
})
```

## Koa 中间件执行顺序
```js
const Koa = require("koa");
const app = new Koa();

let arr;
// 第一个中间件
app.use(async (ctx, next) => {
  arr = [];
  arr.push(1);
  await next();
  arr.push(2);
});

// 第二个中间件
app.use(async (ctx, next) => {
  arr.push(3);
  await next();
  arr.push(4);
});

// 第三个中间件
app.use(async (ctx, next) => {
  arr.push(5);
  await next();
  arr.push(6);
});

// 输出
app.use(async ctx => {
  arr.push(7);
  ctx.body = arr;
});

app.listen(3000, () => {
  console.log("server start at http://127.0.0.1:3000");
});
// 最后方法 http://127.0.0.1 的结果就得到 [1,3,5,7,6,4,2]
```
