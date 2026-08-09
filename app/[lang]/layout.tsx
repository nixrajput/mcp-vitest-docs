import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TAGLINE, SITE_URL } from "@/lib/shared";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `mcp-vitest - ${SITE_TAGLINE}`, template: "%s - mcp-vitest" },
  description: SITE_DESCRIPTION,
  openGraph: { type: "website", url: SITE_URL, siteName: "mcp-vitest" },
};

export default function Layout({ children }: LayoutProps<"/[lang]">) {
  return children;
}
