// ref:
// - https://umijs.org/plugin/develop.htm
// import { IApi } from "umi-types";
import { execSync } from "child_process";
import path from "path";

function updateExternals(value) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return {};
  }
  return value.reduce((prev, next) => {
    const { pkgName, name } = next;
    prev[pkgName] = `${name}`;
    return prev;
  }, {});
}

/**
 *
 * @param {IApi} api
 * @param {*} options
 */
export default function(api, options) {
  const { cwd, compatDirname } = api;

  const { lodash = true, moment = true, antdIcon = true } = options;
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

  console.log("====================================");
  console.log(options, moment, lodash, antdIcon);
  console.log("====================================");

  const externals = updateExternals(options?.externals);
  api.chainWebpackConfig(webpackConfig => {
    if (!webpackConfig) {
      return;
    }
    console.log("====================================");
    console.log(externals, "--- externals");
    console.log("====================================");
    webpackConfig.externals(externals);

    if (moment) {
      webpackConfig.resolve.alias.set(
        "dayjs",
        compatDirname(
          "dayjs/package.json",
          cwd,
          path.dirname(require.resolve("dayjs/package.json"))
        )
      );

      webpackConfig.plugin("moment2dayjs").use("antd-dayjs-webpack-plugin", [
        {
          preset: "antdv3"
        }
      ]);
      webpackConfig.resolve.alias.set("moment/locale", "dayjs/locale");
    }

    if (lodash) {
      webpackConfig
        .plugin("lodash")
        .use("lodash-webpack-plugin", [{ paths: true }]);
      webpackConfig.resolve.alias.set("lodash", "lodash-es");
    }

    if (antdIcon) {
      webpackConfig.resolve.alias.set("@ant-design/icons/lib/dist$", iconPath);
    }

    return webpackConfig;
  });
}
