const referenceToolPageUrls = new Set([
  "/docs/reference/past-question-theme-index",
  "/docs/reference/yearly-question-trends",
  "/docs/reference/important-terms-glossary",
  "/docs/reference/important-formulas",
  "/docs/reference/study-time-model",
]);

export function isReferenceToolPage(url: string) {
  return referenceToolPageUrls.has(url);
}
