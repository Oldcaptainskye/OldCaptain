module.exports = {
  layout: "room.njk",
  eleventyComputed: {
    seoTitle: (d) => (d.T && d.T.ui.roomSeo || "{title}, {type} room | Old Captain Guest House, Portree").replace("{title}", d.title).replace("{type}", d.type),
    description: (d) => d.summary,
    ogImage: (d) => d.image
  }
};
