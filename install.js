const { spawn } = require("child_process");
const ls = spawn("yarn", [
  "add",
  "dayjs",
  "antd-dayjs-webpack-plugin",
  "lodash-webpack-plugin",
]);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
