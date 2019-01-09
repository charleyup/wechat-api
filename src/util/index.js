import Hashes from "jshashes";
export default {
    // 随机字符串
    noncestr: () => {
        return Math.random().toString(36).substr(2);
    },
    // sha1加密
    sha1: (str) => {
        return new Hashes.SHA1().hex(str);
    },
    // 将键值对排序并转为字符串
    raw: (obj) => {
        let keys = Object.keys(obj);
        keys = keys.sort();
        const newobj = {};
        keys.forEach(function (key) {
            newobj[key.toLowerCase()] = obj[key];
        });

        let string = "";
        const newKeys = Object.keys(newobj);
        for (let i = 0; i < newKeys.length; i++) {
            const k = newKeys[i];
            string += "&" + k + "=" + newobj[k];
        }
        return string.substr(1);
    }
};
