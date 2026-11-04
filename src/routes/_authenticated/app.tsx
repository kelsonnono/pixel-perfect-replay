import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Video Speed Reader" },
      { name: "description", content: "Your Video Speed Reader dashboard." },
      { property: "og:title", content: "Dashboard — Video Speed Reader" },
      { property: "og:description", content: "Your Video Speed Reader dashboard." },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/signin", replace: true });
  }

  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader right={<Button variant="outline" onClick={signOut}>Sign out / 登出</Button>} />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Hi <span className="text-gradient">{user.email}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl rounded-2xl border border-border bg-card p-6 text-muted-foreground">
          Your dashboard is coming soon. Upload functionality will be added in the next milestone.
        </p>
      </main>
    </div>
  );
}
