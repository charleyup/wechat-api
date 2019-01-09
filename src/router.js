import KoaRouter from "koa-router";
const router = new KoaRouter();
import IndexController from "./controller/index.js";
import WeixinController from "./controller/wechat.js";

router.prefix("/api");

router.get("/", IndexController.index)
      .get("/signature", WeixinController.signature);
      
export default router;
