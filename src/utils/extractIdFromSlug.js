export const extractIdFromSlug = (slug) => {
  if (!slug) return null;
  const parts = slug.split("-");
  const id = parts[parts.length - 1]; // last part
  return Number(id) || null; // convert to number if possible
};