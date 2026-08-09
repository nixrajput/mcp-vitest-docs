import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { docsContentRoute, docsRoute } from '@/lib/shared';
import { i18n } from '@/lib/i18n';

const { rewrite: rewriteDocs } = rewritePath(
  `/:lang${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `/:lang${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);
const i18nProxy = createI18nMiddleware(i18n);

// Fixed, non-localized endpoints (build assets, favicon, utility routes) - not
// docs content, so they must never be redirected into a locale-prefixed URL
// by the i18n proxy below.
const NON_LOCALIZED_ROUTES = [
  '/_next',
  '/favicon.ico',
  '/llms.txt',
  '/llms-full.txt',
  '/llms.mdx',
  '/og',
  '/api',
];

function isNonLocalizedRoute(pathname: string) {
  return NON_LOCALIZED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (isNonLocalizedRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: 'Accept' },
      });
    }
  }

  return i18nProxy(request, event);
}
