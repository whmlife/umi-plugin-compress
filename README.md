# umi-plugin-bundle-compress

[![NPM version](https://img.shields.io/npm/v/umi-plugin-bundle-compress.svg?style=flat)](https://www.npmjs.com/package/umi-plugin-bundle-compress)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-bundle-compress.svg?style=flat)](https://www.npmjs.com/package/umi-plugin-bundle-compress)

compress project bundle

## Install

```bash
# or yarn add -D umi-plugin-bundle-compress
$ npm install umi-plugin-bundle-compress --save --dev
```

这个 umi 插件目的是为了帮助开发者缩小项目打包体积，下面是缩小项目包体积的具体内容：

- 将 `moment` 替换成 `dayjs`, 实现体积压缩
- `lodash` 体积压缩
- `@antv/l7-react` 体积压缩
- 自动生成 `icon.js`（此文件里包含项目中自行引入/antd 使用的所有 `icon`）, 并修改
- 提供 `externals` 配置项，用来在 `html` 文档中添加外部 scripts, 以及使用 externals

## Usage

Configure in `.umirc.js` And `config/config.js`,

.umirc.js

```js
export default {
  plugins: [
    [
      "umi-plugin-bundle-compress",
      {
        externals: [
          // 用来自动配置外部 scripts, 同时暴露externals
          {
            // 挂载到`window`上的变量名称
            name: "React",
            // 对应的npm包名称
            pkgName: "react",
            //  加载外部script的url
            url:
              "https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js",
          },
        ],
        l7: false, // 是否需要压缩@antv/l7-react，默认为false, 不开启
        lodash: true, // 是否需要压缩lodash，默认为true
        moment: true, // 是否需要压缩moment(替换为dayjs)，默认为true
        antdIcon: true, // 是否需要替换替换 antd3 对于 icon 的引用，默认为true
      },
    ],
  ],
};
```

### 如果遇到问题或者需要支持新的功能, 欢迎向我们提出 issue, 以及需要支持的新特性; 欢迎 PR

[Issues](https://github.com/whmlife/umi-plugin-compress/issues)

[Pull Requests](https://github.com/whmlife/umi-plugin-compress/pulls)

## LICENSE

MIT
