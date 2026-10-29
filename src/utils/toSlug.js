 export const toSlug = (...parts) => {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .normalize?.("NFD") // remove diacritics if available
    .replace?.(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}


