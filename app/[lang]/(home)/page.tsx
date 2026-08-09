import { Hero } from "@/components/Hero";
import { getLatestVersion } from "@/lib/version";
import { LifecycleMatrix } from "@/components/LifecycleMatrix";
import { FeatureGrid } from "@/components/FeatureGrid";
import { InstallCommand } from "@/components/InstallCommand";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  const version = await getLatestVersion();

  return (
    <main>
      <Hero lang={lang} version={version} />
      <Reveal>
        <LifecycleMatrix />
      </Reveal>
      <Reveal>
        <FeatureGrid />
      </Reveal>
      <Reveal>
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 border-t border-(--line) px-4 py-8 text-center">
          <p className="text-fd-muted-foreground text-sm">
            Same suite. Both SDK majors. Both protocol eras.
          </p>
          <InstallCommand />
        </section>
      </Reveal>
      <SiteFooter lang={lang} />
    </main>
  );
}
