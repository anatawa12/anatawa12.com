const ejsPlugin = require("@11ty/eleventy-plugin-ejs");
const interpolate = require("./src/utils/interpolate");

const links = {
  GitHub: '<a href="https://github.com/anatawa12/anatawa12.com" target="_blank" rel="noopener">GitHub</a>',
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(ejsPlugin);
  eleventyConfig.addGlobalData("templateUtils", { interpolate, links });
  eleventyConfig.addPassthroughCopy("src/icon-circle.svg");
  eleventyConfig.addPassthroughCopy("src/icon-with-avatar.png");

  return {
    dir: {
      input: "src",
    },
  };
};
