import { Hero } from "@/components/Hero";
import { getLatestVersion } from "@/lib/version";
import { LifecycleMatrix } from "@/components/LifecycleMatrix";
import { ReporterDemo } from "@/components/ReporterDemo";
import { FeatureGrid } from "@/components/FeatureGrid";
import { SupportMatrix } from "@/components/SupportMatrix";
import { Comparison } from "@/components/Comparison";
import { ProjectStats } from "@/components/ProjectStats";
import { InstallCommand } from "@/components/InstallCommand";
import { Reveal } from "@/components/Reveal";
import { SectionNav } from "@/components/SectionNav";

// Stats fetches revalidate every 10 minutes (see lib/stats.ts); pinning the route to the
// same window stops static generation from freezing them at build time regardless.
export const revalidate = 600;

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  const version = await getLatestVersion();

  return (
    <main>
      {/* This page's own sections, so the bar belongs to it rather than to the shared layout. */}
      <SectionNav />
      <Hero lang={lang} version={version} />
      <Reveal>
        <ReporterDemo />
      </Reveal>
      <Reveal>
        <LifecycleMatrix />
      </Reveal>
      <Reveal>
        <FeatureGrid />
      </Reveal>
      <Reveal>
        <SupportMatrix />
      </Reveal>
      <Reveal>
        <Comparison />
      </Reveal>
      <Reveal>
        <ProjectStats />
      </Reveal>
      <Reveal>
        <section className="mx-auto flex w-full max-w-(--content-width) flex-col items-center gap-4 px-4 py-16 text-center">
          <p className="text-fd-muted-foreground text-sm">
            Same suite. Both SDK majors. Both protocol eras.
          </p>
          <InstallCommand />
        </section>
      </Reveal>
    </main>
  );
}
