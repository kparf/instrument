const Koa = require('koa');
const serve = require('koa-static');
const ssr = require('./src/ssr');

const app = new Koa();

app.use(serve(`${__dirname}/dist`));
app.use(async ctx => {
  const { html, ttRenderMs } = await ssr(`${ctx.protocol}://${ctx.host}/index.html`);
  ctx.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
  ctx.body = html;
});

app.listen(3000);