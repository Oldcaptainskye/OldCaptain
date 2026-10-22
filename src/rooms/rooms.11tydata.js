module.exports = {
  layout: "room.njk",
  eleventyComputed: {
    seoTitle: (d) => d.metaTitle || (d.T && d.T.ui.roomSeo || "{title}, {type} room | Old Captain Guest House, Portree").replace("{title}", d.title).replace("{type}", d.type),
    description: (d) => d.metaDescription || d.summary,
    ogImage: (d) => d.image,
    beds24RoomId: (d) => ({1: 733643, 2: 733644, 3: 733641, 4: 733642, 5: 733645}[d.order])
  }
};
