# @ohu/cli
> [中文](./README.zh.md) | [English](./README.md)

📦 `WebApp`/`Library` development toolkit.

## Usage

```bash
pnpm install @ohu/cli -g
# or
pnpm install @ohu/cli -g
```

or used in project:

```bash
pnpm add @ohu/cli --dev
# or
pnpm install @ohu/cli --dev
```


## Current Feature

+ Generate icons for `ohu-mobile`

  Basic usage

  ```bash
  ohu icon ./remixicon
  ```

  You can also classfied by directory.

  ```bash
  ohu icon ./remixicon --sort-dir
  ```

  You can generate react tsx file.

  ```bash
  ohu icon ./remixicon --tsx
  ```

  For more usage:

  ```bash
  ohu icon --help
  ```
+ Generate documentation from `TS`, `Yargs`

  Basic usage

  ```bash
  ohu doc ./lib/cli.js
  ```
+ Build Vue Component Library

  Basic usage

  ```bash
  ohu build --vue-lib
  ```


## Future Support Features

+ Mobile/PC webapp development scaffolding (monorepos or single repo)
+ TypeScript library development scaffolding(monorepos or single repo)
+ Component development scaffolding (monorepos or single repo)
+ CLI development scaffolding
