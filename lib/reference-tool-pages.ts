const referenceToolPageUrls = new Set([
  "/reference/past-question-theme-index",
  "/reference/yearly-question-trends",
  "/reference/important-terms-glossary",
  "/reference/important-formulas",
  "/reference/study-time-model",
]);

export function isReferenceToolPage(url: string) {
  return referenceToolPageUrls.has(url);
}
