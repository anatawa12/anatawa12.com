const ejsPlugin = require("@11ty/eleventy-plugin-ejs");
const interpolate = require("./src/utils/interpolate");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(ejsPlugin);
  eleventyConfig.addGlobalData("templateUtils", { interpolate });
  eleventyConfig.addPassthroughCopy("src/icon-circle.svg");
  eleventyConfig.addPassthroughCopy("src/icon-with-avatar.png");
  eleventyConfig.addPassthroughCopy("src/common.css");

  return {
    dir: {
      input: "src",
    },
  };
};
