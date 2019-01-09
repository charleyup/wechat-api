import localConfig from "./config.local.js";
const config = {
    APPID: process.env.APPID || localConfig.APPID,
    APPSECRET: process.env.APPSECRET || localConfig.APPSECRET
}

export default config;
