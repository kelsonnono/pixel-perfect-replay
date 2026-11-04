import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Video Speed Reader" },
      { name: "description", content: "Sign in to Video Speed Reader to get your video transcripts." },
      { property: "og:title", content: "Sign in — Video Speed Reader" },
      { property: "og:description", content: "Sign in to Video Speed Reader to get your video transcripts." },
    ],
  }),
  component: () => <AuthForm mode="signin" />,
});
