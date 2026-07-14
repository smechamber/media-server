export const ALLOWED_FOLDERS = [
  "events",
  "gallery",
  "profile",
  "speakers",
  "sponsors",
  "membership",
  "documents",
  "videos",
  "misc",
] as const;

export function isAllowedFolder(folder: string) {
  return ALLOWED_FOLDERS.includes(folder as any);
}