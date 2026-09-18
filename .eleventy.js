const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const md = markdownIt({ html: true, linkify: true });

const LANGS = ["en", "es", "fr", "de", "it"];

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("md", (s) => md.render(String(s || "")));

  // /es/rooms/room-1/ -> /rooms/room-1/ ; /rooms/room-1/ unchanged
  eleventyConfig.addFilter("stripLang", (url) => {
    const m = String(url || "/").match(/^\/(es|fr|de|it)(\/.*)?$/);
    return m ? (m[2] || "/") : url;
  });
  // base path + language -> localised URL
  eleventyConfig.addFilter("localeUrl", (basePath, lang) =>
    lang === "en" ? basePath : "/" + lang + (basePath === "/" ? "/" : basePath)
  );

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });
  eleventyConfig.ignores.add("src/admin/index.html");

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

  // One rooms collection per language: rooms_en from src/rooms, rooms_es from src/es/rooms, ...
  for (const lang of LANGS) {
    const dir = lang === "en" ? "src/rooms/*.md" : `src/${lang}/rooms/*.md`;
    eleventyConfig.addCollection("rooms_" + lang, (c) =>
      c.getFilteredByGlob(dir).sort((a, b) => a.data.order - b.data.order)
    );
  }

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
