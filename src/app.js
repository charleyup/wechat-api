import Koa from "koa";
import router from "./router.js";
// import KoaLogger from "koa-logger";

const app = new Koa();

app
    // .use(KoaLogger())
    .use(router.routes())
    .use(router.allowedMethods());

export default app;
