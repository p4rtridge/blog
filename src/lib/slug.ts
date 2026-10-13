export function noteSlug(title: string) {
  return title.replace(/[/?#]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
}
