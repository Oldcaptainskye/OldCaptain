module.exports = {
  layout: "room.njk",
  eleventyComputed: {
    seoTitle: (d) => `${d.title}, ${d.type} room | Old Captain Guest House, Portree`,
    description: (d) => d.summary,
    ogImage: (d) => d.image
  }
};
