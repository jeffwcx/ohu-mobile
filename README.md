<h1 align="center">
<a href="https://www.getohu.dev/" alt="ohu-mobile"><img width="400px" src="https://raw.githubusercontent.com/jeffwcx/ohu-mobile/master/docs/storybook/src/assets/logo-color.svg" alt="ohu-mobile" /></a>
</h1>
<p align="center">Only Vue2 available now! Vue3 version is on the road.</p>
<p align="center">
    <a href="https://github.com/jeffwcx/ohu-mobile/actions?query=branch%3Amaster" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/jeffwcx/ohu-mobile/.github/workflows/build.yml?branch=master&style=for-the-badge" alt="CI" /></a>
    <a href="https://codecov.io/gh/jeffwcx/ohu-mobile" target="_blank"><img src="https://img.shields.io/codecov/c/github/jeffwcx/ohu-mobile?style=for-the-badge" alt="Coverage" /></a>
    <img src="https://img.shields.io/github/languages/top/jeffwcx/ohu-mobile?style=for-the-badge" alt="Language" />
    <img src="https://img.shields.io/github/license/jeffwcx/ohu-mobile?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/npm/v/@ohu-mobile/core?style=for-the-badge" alt="Version" />
</p>


## Install

`@ohu-mobile/core`  contains all the components.

```bash
npm install @ohu-mobile/core

# or

pnpm add @ohu-mobile/core
```

For more documentation and demos of this package, visit [https://getohu.dev](https://getohu.dev).


If you want to use offical svg icons. You can install `@ohu-mobile/icons`. It's a subset of [Remix Icon](https://remixicon.com/).

```bash
npm install @ohu-mobile/icons

# or

pnpm add @ohu-mobile/icons
```

If you use [sass](https://sass-lang.com/), I recommand you use `@ohu-mobile/styles`. It's a mixin library, it will save you a lot of time writing styles.


```bash
npm install @ohu-mobile/styles

# or

pnpm add @ohu-mobile/styles
```

## How to import Components in Vue.js

+ Import on Demand

    Strongly Recommand👇

    ```ts
    import { Button } from '@ohu-mobile/core';
    ```
    To achieve this effect, please use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import).

    Or Manually import

    ```ts
    import Button from '@ohu-mobile/core/lib/Button';
    import Buttom from '@ohu-mobile/core/lib/Button/style';
    ```

+ Import all components

    ```ts
    import Vue from 'vue';
    import Ohu from '@ohu-mobile/core';
    import '@ohu-mobile/core/dist/ohu-mobile.css';

    Vue.use(Ohu);
    ```

+ Use CDN

## Three ways to customize.

+ Use theme variables.

+ Change default behavior of component.

+ Import the component library into your source code.

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fjeffwcx%2Fohu-mobile.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fjeffwcx%2Fohu-mobile?ref=badge_large)



