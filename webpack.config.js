import path from "path";
export default {
  mode: "development",
  entry: {
    setTimeout: "./src/js/setTimeout.js",
    viewPass: "./src/js/viewPass.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("public/js"),
  },
};
