const ejsPlugin = require("@11ty/eleventy-plugin-ejs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(ejsPlugin);
  eleventyConfig.addPassthroughCopy("src/icon-circle.svg");
  eleventyConfig.addPassthroughCopy("src/icon-with-avatar.png");

  return {
    dir: {
      input: "src",
    },
  };
};
