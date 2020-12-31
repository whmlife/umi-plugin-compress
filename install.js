const { execSync } = require("child_process");
execSync(
  "yarn",
  ["add", "dayjs", "antd-dayjs-webpack-plugin", "lodash-webpack-plugin"],
  { stdio: "inherit" }
);
