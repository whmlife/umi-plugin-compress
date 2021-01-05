import { join } from "path";

export default {
  routes: [{ path: "/", component: "./index" }],
  plugins: [
    // join(__dirname, "..", require("../package").main || "index.js"),
    [
      join(__dirname, "..", require("../package").main || "index.js"),
      {
        externals: [
          {
            name: "React",
            pkgName: "react",
            url:
              "https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js"
          },
          {
            name: "ReactDOM",
            pkgName: "react-dom",
            url:
              "https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js"
          }
        ]
      }
    ]
  ]
};
