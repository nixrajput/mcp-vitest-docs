import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import { i18n, localeNames } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_TAGLINE, SITE_URL } from "@/lib/shared";
import "../global.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `mcp-vitest - ${SITE_TAGLINE}`, template: "%s - mcp-vitest" },
  description: SITE_DESCRIPTION,
  openGraph: { type: "website", url: SITE_URL, siteName: "mcp-vitest" },
};

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          i18n={{
            locale: lang,
            locales: i18n.languages.map((locale) => ({ locale, name: localeNames[locale] })),
          }}
        >
          {children}
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
