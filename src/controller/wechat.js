import WechatService from "../service/wechat.js";

class WeixinController {
    static async signature (ctx) {
        const url = ctx.request.query.url;
        if (!url) {
            ctx.body = {
                success: false,
                message: "url参数缺失"
            }
        } else {
            try {
                const signatureObj = await WechatService.signature(url);
                ctx.body = {
                    success: true,
                    data: signatureObj
                };
            } catch (e) {
                ctx.body = {
                    success: false,
                    message: e.message
                }
            }
        }
    }
}

export default WeixinController;
