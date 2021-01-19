# umi-plugin-bundle-compress

[![NPM version](https://img.shields.io/npm/v/umi-plugin-compress.svg?style=flat)](https://npmjs.org/package/umi-plugin-bundle-compress)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-compress.svg?style=flat)](https://npmjs.org/package/umi-plugin-bundle-compress)

## Install

```bash
# or yarn
$ npm install umi-plugin-bundle-compress
```

这个 umi 插件目的是为了帮助开发者缩小项目打包体积，下面是缩小项目包体积的具体内容：

- 将插件 moment 替换成插件 dayjs
- 将插件 lodash 替换成插件 lodash-es，同时修改 webpack 配置压缩插件 lodash 体积
- 配置额外的 babel plugin: @antv/l7-react，替换对应库的 package.json 的 main 入口，以此达到缩小@antv/l7-react 体积
- 自动生成 icon.js（此文件里包含项目中所需要的所有 icon），以及将该文件引入到 webpack 配置中替换 antd 对于 icon 的引用
- 暴露 externals，用来自动配置外部 scripts

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
            name: "React",
            pkgName: "react",
            url:
              "https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js",
          },
        ],
        l7: false, // 是否需要定义额外的@antv/l7-react，默认为false
        lodash: true, // 是否需要压缩lodash插件同时换成es导出，默认为true
        moment: true, // 是否需要替换为dayjs同时压缩dayjs插件，默认为true
        antdIcon: true, // 是否需要替换替换 antd 对于 icon 的引用，默认为true
      },
    ],
  ],
};
```

## LICENSE

MIT
