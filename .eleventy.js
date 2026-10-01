const ejsPlugin = require("@11ty/eleventy-plugin-ejs");
const interpolate = require("./utils/interpolate");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(ejsPlugin);
  eleventyConfig.addGlobalData("templateUtils", { interpolate });
  eleventyConfig.addPassthroughCopy("src/icon-circle.svg");
  eleventyConfig.addPassthroughCopy("src/icon-with-avatar.png");

  return {
    dir: {
      input: "src",
    },
  };
};
