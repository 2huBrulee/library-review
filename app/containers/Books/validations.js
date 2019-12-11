export const validateEditFields = (baseBook, changes) => {
  const {
    title,
    img_url,
    duplicate,
    hidden,
    series,
    series_index,
    trusted,
    text_variety,
  } = baseBook;

  const validatedChanges = {};

  if (title !== changes.title && changes.title.length > 0)
    validatedChanges.title = changes.title;
  if (img_url !== changes.img_url) {
    if (changes.img_url.length > 0) validatedChanges.img_url = changes.img_url;
    else validatedChanges.img_url = null;
  }
  if (duplicate !== changes.duplicate) {
    if (changes.duplicate.length > 0)
      validatedChanges.duplicate = changes.duplicate;
    else validatedChanges.duplicate = null;
  }
  if (series !== changes.series) {
    if (changes.series.length > 0) validatedChanges.title = changes.series;
    else validatedChanges.series = null;
  }
  if (text_variety !== changes.text_variety) {
    if (changes.text_variety.length > 0)
      validatedChanges.text_variety = changes.text_variety;
    else validatedChanges.text_variety = null;
  }
  if (series_index !== changes.series_index) {
    if (changes.text_variety.length > 0)
      validatedChanges.text_variety = changes.text_variety;
    else validatedChanges.text_variety = null;
  }
  if (hidden !== changes.hidden) validatedChanges.hidden = changes.hidden;
  if (trusted !== changes.trusted) validatedChanges.trusted = changes.trusted;

  console.log(validatedChanges);
  return validatedChanges;
};
