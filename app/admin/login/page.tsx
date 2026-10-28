"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setBusy(false);
    if (!res.ok) {
      setError("That email or password is not right.");
      return;
    }
    router.push(params.get("next") || "/admin");
    router.refresh();
  }

  return (
    <>
      <div className="admin-mobile-block">
        <div className="admin-mobile-card">
          <img src="/logo.png" alt="" />
          <h1>Use a desktop to sign in</h1>
          <p>The admin panel is not available on phones. Please open this page on a computer.</p>
        </div>
      </div>
      <main className="admin-login admin-desktop-only">
        <form className="admin-login-card" onSubmit={onSubmit}>
          <img src="/logo.png" alt="" />
          <p className="admin-kicker">HBF</p>
          <h1>Sign in</h1>
          <p>Edit heroes, bank details, and events for Nigeria and Canada.</p>
          <label className="admin-field">
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          </label>
          <label className="admin-field">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="admin-status error">{error}</p> : null}
          <button className="btn gold" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
