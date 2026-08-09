import { defineI18n } from "fumadocs-core/i18n";

// hideLocale stays "never" on purpose: every URL carries its locale from day one,
// so adding a language later needs no redirects on already-indexed URLs.
export const i18n = defineI18n({
  languages: ["en"],
  defaultLanguage: "en",
  hideLocale: "never",
  // content/docs/en holds files per-locale in directories, not dot-suffixed filenames.
  parser: "dir",
});
