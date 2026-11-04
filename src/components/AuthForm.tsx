import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSignUp = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = isSignUp
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/app" } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (!data.session) return setError("Please check your email to confirm your account.");
    navigate({ to: "/app" });
  }

  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-glow">
          <h1 className="text-2xl font-semibold tracking-tight">{isSignUp ? "Create account / 註冊" : "Sign in / 登入"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp ? "Start turning videos into transcripts." : "Welcome back."}
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : isSignUp ? "Sign up" : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account? " : "No account yet? "}
            <Link to={isSignUp ? "/signin" : "/signup"} className="text-primary hover:underline">
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
