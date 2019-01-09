import http from "../plugin/axios.js";
import config from "../config.js";
import log4js from "log4js";
import util from "../util/index.js";
const logger = log4js.getLogger();
logger.level = "debug";

const GET_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET"
                    .replace("APPID", config.APPID)
                    .replace("APPSECRET", config.APPSECRET);

const GET_TICKET_URL = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";

let access_token = null;
let jsapi_ticket = null;

const calcExpiresIn = (data) => {
    const expires_in = data.expires_in - (Date.now() - data.timestamp) / 1000;
    return expires_in;
};

class WechatService {
    static async getAccessToken () {
        if (access_token && access_token.access_token && (calcExpiresIn(access_token) > 0)) {
            access_token.expires_in = calcExpiresIn(access_token);
            return access_token;
        }
        logger.debug("access_token不存在或已过期，重新获取...");
        const res = await http.get(GET_TOKEN_URL);
        if (res.access_token) {
            access_token = {
                ...res,
                timestamp: Date.now()
            };
            return access_token;
        } else {
            throw new Error(res.errmsg);
        }
    }

    static async getJsapiTicket () {
        if (jsapi_ticket && jsapi_ticket.ticket && (calcExpiresIn(jsapi_ticket) > 0)) {
            jsapi_ticket.expires_in = calcExpiresIn(jsapi_ticket);
            return jsapi_ticket;
        }
        const access_token_obj = await this.getAccessToken();
        logger.debug("jsapi_ticket不存在或已过期，重新获取...");
        const res = await http.get(GET_TICKET_URL.replace("ACCESS_TOKEN", access_token_obj.access_token));
        if (res.ticket) {
            jsapi_ticket =  {
                ...res,
                timestamp: Date.now()
            };
            return jsapi_ticket;
        } else {
            throw new Error(res.errmsg);
        }
    }

    static async signature (url) {
        const jsapi_ticket = await this.getJsapiTicket();
        const ticket = jsapi_ticket.ticket;
        logger.debug("jsapi_ticket: ", ticket);
        const paramObj = {
            noncestr: util.noncestr(),
            jsapi_ticket: ticket,
            timestamp: (Date.parse(new Date())/1000).toString(),
            url: url
        }
        const string1 = util.raw(paramObj);
        logger.debug("string1: ", string1);
        const signature = util.sha1(string1);

        return {
            noncestr: paramObj.noncestr,
            timestamp: (Date.parse(new Date())/1000).toString(),
            appId: config.APPID,
            signature: signature
        }
    }
}

export default WechatService;
