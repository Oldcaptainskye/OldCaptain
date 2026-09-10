const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

const markdownIt = require("markdown-it");
const md = markdownIt({ html: false, linkify: true });

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("md", (s) => md.render(String(s || "")));
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  // Originals are copied for the CMS preview and social sharing images;
  // every <img> on the site is served from resized WebP copies in /img/ (see below).
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });

  // The Decap admin page is a plain HTML file: copy it, do not treat it as a page.
  eleventyConfig.ignores.add("src/admin/index.html");

  // Resize every image at build time, whatever size the owners upload.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp"],
    widths: [480, 900, 1600],
    urlPath: "/img/",
    failOnError: false,
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async", sizes: "(min-width: 860px) 50vw, 100vw" },
      pictureAttributes: {}
    }
  });

  eleventyConfig.addCollection("rooms", (c) =>
    c.getFilteredByGlob("src/rooms/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
