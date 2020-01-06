# ohu-mobile

> Mobile UI Component Library.

## Installation

```shell
npm install @ohu-mobile/core

# or

yarn add @ohu-mobile/core
```


## Usage

1. Import on Demand

    Strongly Recommand👇
    ```ts
    import { Button } from '@ohu-mobile/core';
    ```
    Or Manually import

    ```ts
    import Button from '@ohu-mobile/core/lib/Button';
    ```


2. Import all components

    ```ts
    import Vue from 'vue';
    import Ohu from '@ohu-mobile/core';
    import '@ohu-mobile/core/dist/ohu-mobile.css';

    Vue.use(Ohu);
    ```



## Size

```
┌─────────────────────────────────────┐
│                                     │
│   Destination: dist/ohu-mobile.js   │
│   Bundle Size:  235.99 KB           │
│   Minified Size:  119.55 KB         │
│   Gzipped Size:  30.77 KB           │
│                                     │
└─────────────────────────────────────┘
```
