import axios from "axios";
import store from "@/store";
import Vue from "vue";
import { getToken } from "./token";
import codeMessage from "./codeMessage";
import config from "./config";
// 创建服务
const service = axios.create(config);
// token封装
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    const { status, statusText } = response;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    }
    return {
      status,
      msg: codeMessage[status] || statusText
    };
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: "网络异常"
  };
}
service.interceptors.response.use(
  response => {
    // 业务处理（成功或者失败）
    return checkStatus(response);
  },
  error => {
    const { response } = error;
    // 对返回的错误进行一些处理
    return Promise.reject(checkStatus(response));
  }
);

export default service;
