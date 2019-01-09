import Axios from "axios";

const http = Axios.create({
    timeout: 8000,
    validateStatus: function (status) {
        return status >= 200;
    }
});

http.interceptors.request.use((data, headers) => {
    return data;
});

http.interceptors.response.use(response => {
    const data = response.data;
    // switch (data.success) {
    //     case true:
    //         return data.data;
    //     default:
    //         throw new Error(data.msg);
    // }
    return data;
}, err => {
    throw new Error("网络请求错误");
});

export default http;
