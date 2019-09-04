
## Vue CLI 3 基本认识
> [Vue CLI 3官网文档](https://cli.vuejs.org/zh/guide/)

用于交互式搭建基于 vue 技术栈项目的工具，通常安装在全局 node_module 中。它提供的命令主要有以下几个：
```bash
# 用于创建项目
vue create

# 启动 VUE GUI
vue ui

```

::: tip 提示
可以试试vue ui 界面很炫酷
:::


## Preset 项目开发
一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。

官方 preset 示例：
```json
{
  "useConfigFiles": true,
  "plugins": {...},
  "router": true,
  "vuex": true,
  "cssPreprocessor": "sass",
  "configs": {
    "vue": {...},
    "postcss": {...},
    "eslintConfig": {...},
    "jest": {...}
  }
}
```

### 项目特点
* 可以预设项目的 vue-plugin-xxx
* 可以预设 router、vuex
* 可以预设css预编译器 cssPreprocessor
* 可以预设 vue.config.js
* 可以开启或者关闭插件的 prompts
* 可以提供一套文件目录结构
* 可以执行 [Generator](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#generator) 和 [Prompt](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6%E7%9A%84%E5%AF%B9%E8%AF%9D)
* preset 可以是本地或者远程项目

### preset 项目的结构
```
.
├── README.md
├── projectTemplate
├── generator.js  # generator (可选)
├── prompts.js    # prompt 文件 (可选)
├── index.js      # service 插件
└── package.json
```

### preset 项目的调试
通过引用本地 preset 创建项目的方式进行代码调试
```bash
# ./my-preset 应当是一个包含 preset.json 的文件夹
vue create --preset ./ my-project

# 或者，直接使用当前工作目录下的 json 文件：
vue create --preset my-preset.json my-project
```

## 项目特性
- CSS 预编译语言：[less](http://lesscss.org/)

- 移动 web 的适配方案：引入了 `postcss-pxtorem` 及 `lib-flexible`

- 常用的 js 工具类： [cloud-utils](https://cklwblove.github.io/cloud-utils/)

- `style-resources-loader` 可以为我们的样式文件（css、less、scss、sass、stylus）注入样式资源，统一管理资源文件，如常用的 **变量(variable)，混合函数(mixins)等**。
```js
// vue.config.js
chainWebpack: (config) => {
    // module
    /* config.module.rule('less').oneOf('vue').use('style-resources-loader') */
    config.module
      .rule('less')
      .oneOf('vue')
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({
        patterns: [path.resolve(__dirname, 'src/assets/less/variable.less'), path.resolve(__dirname, 'node_modules/magicless/magicless.less')],
        injector: 'prepend'
      }).end();
}
```
- Ajax: [axios](https://github.com/axios/axios)，做了一定的封装，详见 `src/services/index.js`
```js
import axios from "axios";
import { getToken } from "./token";
import codeMessage from "./codeMessage";
import config from "./config";
// 创建服务
const service = axios.create(config);
// token封装
service.interceptors.request.use(
  config => {
    if (getToken()) {
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
```

## 目录介绍

```
.
├── build              # 生成压缩包
├── public             # 静态资源，不需要 webpack 处理
└── src
    ├── assets
    │   ├── fonts      # 字体文件
    │   ├── img
    │   ├── js         # 不经过 npm 或 yarn 下载的第三方依赖包
    │   └── less       # reset 样式，及定义的常量文件等
    ├── components
    │   ├── SendCode   # tree shaking 组件
    │   └── global     # 全局注册组件
    │       └── SvgIcon
    ├── filters        # 全局过滤器
    ├── icons          # svg 文件
    │   └── svg
    ├── router         # 路由及拦截器
    ├── services       # 统一的服务接口请求处理
    └── views
        └── hello

```
## 删除创建的默认目录或文件
#### 背景
* 自己编写的 preset 有一套自定义目录结构，但是 vue-cli3 创建项目后总会有一些默认结构：
```
/public
/src/main.js
/src/App.vue
/src/components/HelloWorld.vue
```
#### 结论
* 在 /generator/index.js 中利用 [GeneratorAPI](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/GeneratorAPI.js) 进行目录文件编辑：
```js
// generator
module.exports = (api, options, rootOptions) => {
  // 删除 vue-cli3 默认的 /src 和 /public 目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  // 根据自定义模板生成项目结构
  api.render('./template')
}
```

### 自定义README.md
#### 结论
* 在 /generator/index.js 中修改环境变量:
```js
// 屏蔽 generator 之后的文件写入操作
api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
})
```
目的是令 writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过。

### preset 项目如何将配置保存成单个文件，而不是包含在 package.json ？
#### 结论
* 在 preset.json 中修改变量：
```bash
useConfigFiles: true
```
