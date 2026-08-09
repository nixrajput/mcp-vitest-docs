import { Hero } from "@/components/Hero";
import { LifecycleMatrix } from "@/components/LifecycleMatrix";
import { FeatureGrid } from "@/components/FeatureGrid";
import { InstallCommand } from "@/components/InstallCommand";
import { Reveal } from "@/components/Reveal";
import { NPM_URL, REPO_URL } from "@/lib/shared";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;

  return (
    <main>
      <Hero lang={lang} />
      <Reveal>
        <LifecycleMatrix />
      </Reveal>
      <Reveal>
        <FeatureGrid />
      </Reveal>
      <Reveal>
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 border-t border-(--line) px-4 py-16 text-center">
          <p className="text-fd-muted-foreground text-sm">
            Same suite. Both SDK majors. Both protocol eras.
          </p>
          <InstallCommand />
          <div className="flex gap-4 text-sm">
            <a
              href={REPO_URL}
              className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={NPM_URL}
              className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              npm
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
