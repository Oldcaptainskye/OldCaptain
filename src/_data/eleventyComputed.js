// Language bundle for the current page: T.ui, T.home, T.house, T.contact, T.reviews
const pageMeta = {
  "home":    (T) => [T.home.metaTitle, T.home.metaDescription],
  "house":   (T) => [T.house.metaTitle, T.house.metaDescription],
  "contact": (T) => [T.contact.metaTitle, T.contact.metaDescription],
  "thanks":  (T) => [T.ui.thanks.title + " | Old Captain Guest House", T.ui.thanks.meta],
  "404":     (T) => [T.ui.notFound.pageTitle, T.ui.notFound.meta],
};
module.exports = {
  T: (data) => data.i18n[data.lang || "en"],
  langPrefix: (data) => (data.lang && data.lang !== "en") ? "/" + data.lang : "",
  title: (data) => {
    if (data.title) return data.title;
    const key = data.metaKey || (data.page && data.page.fileSlug);
    const T = data.i18n[data.lang || "en"];
    return (pageMeta[key] && T) ? pageMeta[key](T)[0] : data.title;
  },
  description: (data) => {
    if (data.description) return data.description;
    const key = data.metaKey || (data.page && data.page.fileSlug);
    const T = data.i18n[data.lang || "en"];
    return (pageMeta[key] && T) ? pageMeta[key](T)[1] : data.description;
  }
};
