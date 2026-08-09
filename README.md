<div align="center">

# mcp-vitest docs

Documentation site for [mcp-vitest](https://github.com/nixrajput/mcp-vitest), a Vitest-native testing harness for Model Context Protocol servers.

<br />

[![Stars](https://img.shields.io/github/stars/nixrajput/mcp-vitest-docs?color=159F7C)][repo]
[![Contributors](https://img.shields.io/github/contributors/nixrajput/mcp-vitest-docs?color=159F7C)][contributors]
[![License: MIT](https://img.shields.io/github/license/nixrajput/mcp-vitest-docs?color=159F7C)][license]
[![Last commit](https://img.shields.io/github/last-commit/nixrajput/mcp-vitest-docs?label=last%20commit)][repo]
[![Issues](https://img.shields.io/github/issues/nixrajput/mcp-vitest-docs?label=issues)][issues]
[![PRs](https://img.shields.io/github/issues-pr/nixrajput/mcp-vitest-docs?label=PRs)][pulls]

</div>

---

## Contents

- [mcp-vitest docs](#mcp-vitest-docs)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Tech stack](#tech-stack)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Install](#install)
    - [Run](#run)
  - [Project structure](#project-structure)
  - [The checks a PR must pass](#the-checks-a-pr-must-pass)
  - [Adding a language](#adding-a-language)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [License](#license)
  - [Support the project](#support-the-project)
  - [Connect](#connect)

## Overview

This repo holds the documentation content and the site that serves it, live at [mcp-vitest.nixrajput.com](https://mcp-vitest.nixrajput.com). It does not hold the `mcp-vitest` package itself - that lives at [nixrajput/mcp-vitest](https://github.com/nixrajput/mcp-vitest). Package-behavior changes go there; documentation changes come here, in a separate PR.

## Tech stack

| Area        | Choice                        |
| ----------- | ----------------------------- |
| Framework   | Next.js 16 (App Router)       |
| UI          | React 19                      |
| Docs engine | Fumadocs 16                   |
| Styling     | Tailwind CSS 4                |
| Language    | TypeScript (strict), ESM only |
| Deployment  | Vercel                        |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) `>=20`
- npm

### Install

```bash
git clone https://github.com/nixrajput/mcp-vitest-docs.git
cd mcp-vitest-docs
npm install
```

### Run

```bash
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/[lang]/...    route segments (i18n-aware; [lang] currently resolves to "en")
content/docs/en/  MDX documentation source
components/       site chrome and homepage components
lib/source.ts     Fumadocs content source adapter
lib/i18n.ts       i18n config (locales, default locale)
lib/shared.ts     shared site constants (URLs, copy, developer info)
proxy.ts          i18n routing
```

## The checks a PR must pass

CI runs exactly this set, and `.githooks/pre-push` runs the first five locally if you opt in (`git config core.hooksPath .githooks`):

```bash
npm run lint          # eslint
npm run types:check   # next typegen + tsc --noEmit
npm run check:samples # extract + typecheck docs code samples
npm run format:check  # prettier --check
npm run build         # next build
npm run check:routes  # end-to-end route check, against `npm start`
```

`npm run format` rewrites formatting if `format:check` complains. No version bump is required - this site is not versioned or published.

## Adding a language

The i18n wiring supports additional locales already. Adding one takes exactly two steps:

1. Add the language code to `languages` and its display name to `localeNames`, both in `lib/i18n.ts`.
2. Create `content/docs/<code>/` mirroring `content/docs/en/` - the same file and directory names, including each `meta.json`, with translated frontmatter `title`/`description` and body.

No layout, provider, proxy, or route file needs any edit.

A few things worth knowing before you start:

- Untranslated pages fall back to English automatically, so a partial translation is a valid PR - you do not need to translate everything at once.
- Code samples inside MDX should not be translated. They are typechecked against the real package by `npm run check:samples`, and translating identifiers will fail that check. Translate the prose around them instead.
- Every URL carries its locale (`/en/...`, `/<code>/...`), so a new language never changes existing URLs.
- Run [the checks a PR must pass](#the-checks-a-pr-must-pass) before opening the PR.

## Contributing

Contributions are welcome. Fork, branch, and open a PR - see [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow. Bugs and ideas go to [Issues][issues]; vulnerabilities follow [SECURITY.md](SECURITY.md).

## Contributors

Thanks to everyone who has contributed to the mcp-vitest docs.

<a href="https://github.com/nixrajput/mcp-vitest-docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nixrajput/mcp-vitest-docs" alt="Contributors" />
</a>

## License

Licensed under the **MIT** license - see [LICENSE](LICENSE).

## Support the project

<div align="center">

This site is MIT licensed and free to use, always. If it helps you get more out of mcp-vitest, sponsorship is welcome.

<br />

<a href="https://github.com/sponsors/nixrajput">
  <img src="https://img.shields.io/badge/Sponsor_on_GitHub-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" />
</a>
<a href="https://ko-fi.com/nixrajput">
  <img src="https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white" alt="Ko-fi" />
</a>
<a href="https://www.buymeacoffee.com/nixrajput">
  <img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy Me a Coffee" />
</a>

</div>

## Connect

<div align="center">

**Nikhil Rajput**

<a href="https://github.com/nixrajput"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://linkedin.com/in/nixrajput"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://x.com/nixrajput"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
<a href="https://instagram.com/nixrajput"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
<a href="https://telegram.me/nixrajput"><img src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
<a href="mailto:nkr.nikhil.nkr@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>

</div>

[repo]: https://github.com/nixrajput/mcp-vitest-docs
[issues]: https://github.com/nixrajput/mcp-vitest-docs/issues
[pulls]: https://github.com/nixrajput/mcp-vitest-docs/pulls
[contributors]: https://github.com/nixrajput/mcp-vitest-docs/graphs/contributors
[license]: https://github.com/nixrajput/mcp-vitest-docs/blob/main/LICENSE
