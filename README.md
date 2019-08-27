# vue-preset
结合 vue-cli3 的 preset 搭建基于 git repo 的前端项目模板

## 快速开始

```bash
# 安装 vue-cli 3.0
npm install -g @vue/cli
# 本地调试
vue create --preset ./ my-project
# 远端调试 根据远程 preset 创建项目
vue create --preset grasilife/vue-preset my-project
# or
vue create --preset direct:https://github.com/grasilife/vue-preset.git my-project --clone

# 本地预览
cd my-project && yarn run serve

```

## 文档
```bash
# 本地预览
npm run docs:dev

# 构建部署版本
npm run docs:build
```