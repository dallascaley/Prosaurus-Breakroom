'use strict';

const Koa = require('koa');
var router = require('koa-router');
//const bodyParser = require('koa-body');
const { koaBody } = require('koa-body');

const app = new Koa();

var _ = new router();

/*
app.use(async ctx => {
  ctx.body = '<p>Hello, World!</p>';
});
*/

// stolen from https://www.tutorialspoint.com/koajs/koajs_restful_apis.htm
app.use(koaBody({
   formidable:{uploadDir: './uploads'},
   multipart: true,
   urlencoded: true
}));

//Require the Router we defined in movies.js
var movies = require('./movies.js');

//Use the Router on the sub route /movies
app.use(movies.routes());

_.get('/', sendMovies);

function *sendMovies(next){
   this.body = movies;
   yield next;
}

app.listen(3000);
