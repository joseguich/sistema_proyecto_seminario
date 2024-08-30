import path from "path";
export default {
  mode: "development",
  entry: {
    setTimeout: "./src/js/setTimeout.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("public/js"),
  },
};
