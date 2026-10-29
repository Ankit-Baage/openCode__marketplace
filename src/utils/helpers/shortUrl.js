export const shortUrl = (url) => {
  if (!url) return "No URL Available"; // Placeholder for null URLs
  return `...${url.slice(-11)}`;
};
