module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/icon-circle.svg");
  eleventyConfig.addPassthroughCopy("src/icon-with-avatar.png");

  return {
    dir: {
      input: "src",
    },
  };
};
