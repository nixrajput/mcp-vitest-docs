import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;

  return (
    <main>
      <Hero lang={lang} />
      <FeatureGrid />
    </main>
  );
}
