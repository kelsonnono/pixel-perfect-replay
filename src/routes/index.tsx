import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Speed Reader — Transcripts in three minutes" },
      { name: "description", content: "Upload your video, get a clean transcript in three minutes. Chinese and English, powered by Whisper." },
      { property: "og:title", content: "Video Speed Reader — Transcripts in three minutes" },
      { property: "og:description", content: "Upload your video, get a clean transcript in three minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: "◎", title: "高準確度逐字稿", en: "High-accuracy transcripts", body: "Powered by OpenAI Whisper, supports Chinese and English." },
  { icon: "⏱", title: "三分鐘交付", en: "Three-minute turnaround", body: "Processed in the background — you get an email when it's ready." },
  { icon: "✓", title: "可商用授權", en: "Commercial-use ready", body: "You own the output. Use it however you like." },
];

function Index() {
  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader
        right={
          <Button asChild variant="hero" size="sm">
            <Link to="/signin">Sign in / 登入</Link>
          </Button>
        }
      />
      <main>
        <section className="mx-auto max-w-4xl px-4 pb-20 pt-24 text-center sm:pt-32">
          <FadeIn>
            <p className="mx-auto inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              For creators, educators & engineers
            </p>
            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="text-gradient">Video Speed Reader</span>
            </h1>
            <p className="mt-6 text-2xl font-medium sm:text-3xl">上傳影片，三分鐘內拿到逐字稿。</p>
            <p className="mt-3 text-lg text-muted-foreground">Upload your video, get a clean transcript in three minutes.</p>
            <div className="mt-10 flex justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/signup">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/signin">Sign in</Link>
              </Button>
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-28 sm:px-6 md:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.en} delay={i * 120}>
              <div className="h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-lg text-primary">{f.icon}</div>
                <h3 className="mt-5 text-lg font-semibold">
                  {f.title} <span className="block text-sm font-normal text-muted-foreground">{f.en}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </FadeIn>
          ))}
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© 2026 Video Speed Reader</footer>
    </div>
  );
}
