export default {
  headers: {
    post: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    "X-Requested-With": "XMLHttpRequest"
  },
  // 超时设置
  timeout: 100000,
  // 跨域是否带Token
  withCredentials: false,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: "json",
  // XSRF 设置
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN"
};
