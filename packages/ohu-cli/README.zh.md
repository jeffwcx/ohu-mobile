# @ohu/cli

> [中文](./README.zh.md) | [English](./README.md)

📦 `WebApp`及`类库`开发工具箱

## 安装

```bash
pnpm i -g @ohu/cli
# 或者
pnpm i -g @ohu/cli
```

或者在项目中使用：

```bash
pnpm add @ohu/cli --dev
# 或者
npm install @ohu/cli --dev
```

## 当前特性

+ 为任意SVG生成`ohu-mobile`格式的图标

  基础使用

  ```bash
  ohu icon ./remixicon/**
  ```

  通过目录对图标风格进行分类

  ```bash
  ohu icon ./remixicon/** --sort-dir
  ```

  更多使用方法：

  ```bash
  ohu icon --help
  ```
+ 从`TS`, `Yargs`中生成文档

  基础使用

  ```bash
  ohu doc ./lib/cli.js
  ```
+ 构建Vue组件库

  Basic usage

  ```bash
  ohu build --vue-lib
  ```


## 未来特性支持

+ Mobile/PC webapp开发脚手架 (monorepos or single repo)
+ TypeScript库开发脚手架 (monorepos或者单库)
+ 组件库开发脚手架 (monorepos或者单库)
