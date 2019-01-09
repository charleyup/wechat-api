import http from "../plugin/axios.js";
import log4js from "log4js";
const logger = log4js.getLogger();
logger.level = "debug";

const APPID = process.env.APPID;
const APPSECRET = process.env.APPSECRET;
const GET_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET"
                    .replace("APPID", APPID)
                    .replace("APPSECRET", APPSECRET);

const GET_TICKET_URL = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";

let access_token_obj = null;
let jsapi_ticket_obj = null;

const calcExpiresIn = (data) => {
    data.expires_in = data.expires_in - (Date.now() - data.timestamp) / 1000;
    return data;
};

const getAccessToken = async () => {
    logger.debug("获取access_token。。。");
    if (access_token_obj && access_token_obj.access_token && (calcExpiresIn(access_token_obj).expires_in > 0)) {
        const access_token_obj = calcExpiresIn(access_token_obj)
        logger.debug(`原access_token${access_token_obj.expires_in}秒后过期`);
        return access_token_obj;
    }
    logger.debug("access_token已过期，重新获取。。。");
    const res = await http.get(GET_TOKEN_URL);
    if (res.access_token) {
        access_token_obj = {
            ...res,
            timestamp: Date.now()
        };
        logger.debug("access_token重新获取成功");
        return access_token_obj;
    } else {
        throw new Error(res.errmsg);
    }
}

const getJsapiTicket = async () => {
    logger.debug("获取jsapi_ticket。。。", jsapi_ticket_obj);
    try {
        if (jsapi_ticket_obj && jsapi_ticket_obj.ticket && (calcExpiresIn(jsapi_ticket_obj).expires_in > 0)) {
            const access_token_obj = calcExpiresIn(access_token_obj);
            logger.debug(`access_token${access_token_obj.expires_in}秒后过期`);
            return access_token_obj;
        }
    } catch (e) {
        logger.debug(e);
    }
    logger.debug("jsapi_ticket已过期，重新获取。。。");
    const access_token_obj = await getAccessToken();
    const res = await http.get(GET_TICKET_URL.replace("ACCESS_TOKEN", access_token_obj.access_token));
    if (res.ticket) {
        jsapi_ticket_obj =  {
            ...res,
            timestamp: Date.now()
        };
        return jsapi_ticket_obj;
    } else {
        throw new Error(res.errmsg);
    }
}

export { getJsapiTicket, getAccessToken };
