export function toRawGithubUrl(url: string): string {
  const trimmed = url.trim();
  const m = trimmed.match(
    /^https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/(.+)$/,
  );

  if (m) return `https://raw.githubusercontent.com/${m[1]}/${m[2]}`;

  return trimmed;
}
