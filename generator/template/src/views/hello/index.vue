<!--
 * @Author: 付国强
 * @Date: 2019-11-21 14:35:48
 * @LastEditors: 付国强
 * @LastEditTime: 2019-11-21 15:46:19
 * @Description: 
 -->
<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <img src="~@assets/img/logo.png" />
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
    </div>
  </div>
</template>

<script>
/**
 * 以下仅为事例代码，可以随意扩展修改
 */
// 工具类
import { formatDate } from "utils";

export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      message: "现在时间是：" + formatDate(Date.now())
    };
  },

  created() {},

  methods: {
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./style.less";
</style>
