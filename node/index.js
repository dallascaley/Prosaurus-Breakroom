/* Lets see what ChatGPT can do? */

// app.js
const Koa = require('koa');
const app = new Koa();

// Define the /hello route
app.use(async (ctx, next) => {
  if (ctx.path === '/hello') {
    ctx.body = 'Hello, world!';
  } else {
    await next();
  }
});

// Define the /hello route
app.use(async (ctx, next) => {
  if (ctx.path === '/whatever') {
    ctx.body = 'Whatever who care?!';
  } else {
    await next();
  }
});

// Set the app to listen on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


/*  This shit from the tutorial doesn't fucking work

var koa = require('koa');
var router = require('koa-router');
var app = new koa();

var _ = new router();

function *getMessage() {
   console.log('what the fuck?');
   this.body = "Hello world!";
};

_.get('/hello', getMessage);

app.use(_.routes()); 
app.listen(3000);
*/

/* neither does this...

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
* /

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
*/
