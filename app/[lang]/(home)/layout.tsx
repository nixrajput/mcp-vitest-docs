import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { SectionNav } from "@/components/SectionNav";

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <HomeLayout {...baseOptions(lang)}>
      <SectionNav />
      {children}
    </HomeLayout>
  );
}
