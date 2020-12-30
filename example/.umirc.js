import { join } from "path";

export default {
  routes: [{ path: "/", component: "./index" }],
  plugins: [
    // join(__dirname, "..", require("../package").main || "index.js"),
    [
      join(__dirname, "..", require("../package").main || "index.js"),
      {
        externals: [
          { name: "Bar", url: "https://bar.js" },
          { name: "Foo", url: "https://foo.js" },
        ],
      },
    ],
  ],
};
