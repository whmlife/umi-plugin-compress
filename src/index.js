// ref:
// - https://umijs.org/plugin/develop.htm
import { execSync } from "child_process";
import path from "path";

function updateExternals(value) {
  var newParams = {};
  if (!value) {
    return newParams;
  }
  value.reduce((prev, next) => {
    newParams = Object.assign(newParams, { [`${next?.name}`]: next?.url });
  }, newParams);
  return newParams;
}

export default function(api, options) {
  const { cwd, compatDirname } = api;
  // 用来自动配置外部script
  options?.externals?.map(v => {
    return api.addHTMLHeadScript({
      content: v?.name,
      src: v?.url
    });
  });

  api.modifyAFWebpackOpts(memo => {
    memo.extraBabelPlugins = [
      ...(memo.extraBabelPlugins || []),
      [
        require.resolve("babel-plugin-import"),
        {
          libraryName: "@antv/l7-react",
          libraryDirectory: "es/component",
          camel2DashComponentName: false
        },
        "@antv/l7-react"
      ]
    ];
    return memo;
  });

  api.registerCommand("generate-icons", () => {
    execSync("npx gen-project-icons && npx generate-icons", {
      stdio: "inherit"
    });
  });

  const iconPath = path.resolve(cwd, "icon.js");

  api.chainWebpackConfig(webpackConfig => {
    if (!webpackConfig) {
      return;
    }
    webpackConfig.externals(updateExternals(options?.externals));
    webpackConfig.resolve.alias.set(
      "dayjs",
      compatDirname(
        "dayjs/package.json",
        cwd,
        path.dirname(require.resolve("dayjs/package.json"))
      )
    );
    webpackConfig
      .plugin("lodash")
      .use("lodash-webpack-plugin", [{ paths: true }]);
    webpackConfig.plugin("moment2dayjs").use("antd-dayjs-webpack-plugin", [
      {
        preset: "antdv3"
      }
    ]);

    webpackConfig.resolve.alias.set("@ant-design/icons/lib/dist$", iconPath);

    return webpackConfig;
  });
}
