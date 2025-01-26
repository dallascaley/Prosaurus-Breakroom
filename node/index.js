'use strict';

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = '<p>Hello, World!</p>';
});

app.listen(3000);