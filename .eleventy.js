module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("icon-circle.svg");
  eleventyConfig.addPassthroughCopy("icon-with-avatar.png");

  return {
    dir: {
      input: "src",
    },
  };
};
