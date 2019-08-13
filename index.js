const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const logger = require('koa-logger')
const ssr = require('./src/ssr');
const ssrBody = require('./src/ssr-body');
const createMainTemplate = require('./src/tempaltes/main');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  const body = await ssrBody(`${ctx.protocol}://${ctx.host}/index.html`);
  const mainTemplate = await createMainTemplate()
  ctx.body = mainTemplate({ body });
});


app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(`${__dirname}/dist`));

app.listen(3000);