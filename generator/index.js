module.exports = (api, options, rootOptions) => {
  const utils = require("./utils")(api);
  // 命令
  // api.extendPackage : 负责给初始化项目中的 package.json 添加额外依赖并安装；
  // api.render : 负责将模板项目中提前定义好的目录和文件拷贝到初始化的项目中；
  // api.postProcessFiles : 负责具体处理模板项目中的文件，
  api.extendPackage({
    scripts: {
      serve: "vue-cli-service serve",
      build: "node build/index.js",
      lint: "vue-cli-service lint",
      "lint:style": "vue-cli-service lint:style",
      analyz: "vue-cli-service build --mode analyz",
      report: "vue-cli-service build --report",
      svg: "vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6",
      new: "plop",
      deploy: "npm run build && node build/zip.js",
      release: "sh build/release.sh"
    },
    "scripts-info": {
      serve: "运行开发服务器",
      build: "生产环境执行构建",
      analyz: "生产环境执行构建打包分析",
      deploy: "生产环境执行构建并压缩zip包"
    }
  });

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      vuex: "^3.0.1",
      "@liwb/cloud-utils": "*",
      axios: "^0.19.0",
      "js-cookie": "*",
      magicless: "*",
      "normalize.css": "^8.0.1",
      "vue-svgicon": "^3.2.2"
    },
    devDependencies: {
      //archiver解压缩
      archiver: "^3.0.0",
      //终端字符串样式
      chalk: "^2.4.1",
      //webpack构建时压缩
      "compression-webpack-plugin": "^3.0.0",
      //类似于umi的区块
      plop: "^2.3.0",
      //编译进度条插件
      "progress-bar-webpack-plugin": "^1.12.1",
      //webpack优化插件
      "script-ext-html-webpack-plugin": "^2.1.3",
      //全局使用less 、sass
      "style-resources-loader": "^1.2.1",
      // stylelint
      stylelint: "^10.1.0",
      "stylelint-config-standard": "^18.2.0",
      "stylelint-order": "^3.0.0",
      // 通过YAML使用bash命令支持并行化npm的任务
      tasksfile: "^5.1.0"
    }
  });

  // postcss
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    }
  });

  // application 应用类型为 mobile
  if (options.application === "mobile") {
    api.extendPackage({
      dependencies: {
        "lib-flexible": "^0.3.2"
      },
      devDependencies: {
        //postcss-pxtorem是PostCSS的插件，用于将像素单元生成rem单位
        "postcss-pxtorem": "^4.0.1"
      },
      postcss: {
        plugins: {
          "postcss-pxtorem": {
            rootValue: 37.5,
            unitPrecision: 5,
            propList: [
              "height",
              "width",
              "padding",
              "margin",
              "top",
              "left",
              "right",
              "bottom"
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 1
          }
        }
      }
    });
  }

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith("src/") || path.startsWith("public/"))
      .forEach(path => delete files[path]);
  });

  if (options["ui-framework"] === "element-ui") {
    require("./element.js")(api, options);
  } else if (options["ui-framework"] === "iview") {
    require("./iview.js")(api, options);
  } else if (options["ui-framework"] === "ant") {
    require("./ant.js")(api, options);
  }

  // 公共基础目录和文件
  api.render("./template");
  // 文件替换把./template/src/main.js拷贝带到./src/main.js
  api.render({
    "./src/main.js": "./template/src/main.js"
  });

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
    if (options.application === "mobile") {
      utils.deleteDir("./src/vendor");
    }
  });
};
