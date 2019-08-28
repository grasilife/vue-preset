<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <h1 @click="alertName">{{ useName }}</h1>

    <!-- 增加h2 展示 localJobTitle -->
    <h2>{{ localJobTitle }}</h2>
    <!-- 添加按钮 -->
    <div>
      <button @click="changeName">change to json</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  computed: {
    // 对象中的state 和数组中的localJobTitle 都是和login中的参数一一对应。
    ...mapState("login", {
      useName: state => state.useName
    }),
    ...mapGetters("login", ["localJobTitle"])
  },
  methods: {
    changeName() {
      this.$store.dispatch("login/changeName", "Jason");
    },
    ...mapActions("login", ["alertName"])
  }
};
</script>
