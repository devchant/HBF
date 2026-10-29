"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/links";
import { formatBytes, type MediaQuota } from "@/lib/storage-quota";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/heroes", label: "Page images" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/accounts", label: "Bank accounts" },
  { href: "/admin/donations", label: "Donations" },
  { href: "/admin/events", label: "Events" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [quota, setQuota] = useState<MediaQuota | null>(null);

  useEffect(() => {
    fetch("/api/admin/storage")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: MediaQuota | null) => setQuota(data))
      .catch(() => setQuota(null));
  }, [pathname]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <div className="admin-mobile-block">
        <div className="admin-mobile-card">
          <img src="/logo.png" alt="" />
          <h1>Use a desktop</h1>
          <p>
            The HBF admin panel is built for desktop. Open this page on a computer to sign in and edit the site.
          </p>
        </div>
      </div>
      <div className="admin-shell admin-desktop-only">
        <aside className="admin-sidebar">
          <Link href="/admin" className="admin-brand">
            <img src="/logo.png" alt="" />
            <span>
              <strong>HBF Admin</strong>
              <small>Content studio</small>
            </span>
          </Link>
          <nav>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "is-on" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="admin-sidebar-foot">
            <a href={SITE.nigeria.href} target="_blank" rel="noreferrer">
              View Nigeria
            </a>
            <a href={SITE.canada.href} target="_blank" rel="noreferrer">
              View Canada
            </a>
            <button type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        </aside>
        <div className="admin-main">
          {quota ? (
            <div className={`admin-quota${quota.locked ? " is-locked" : quota.percent >= 80 ? " is-warn" : ""}`}>
              <div className="admin-quota-top">
                <strong>Image storage</strong>
                <span>
                  {formatBytes(quota.usedBytes)} / {formatBytes(quota.maxBytes)} ({quota.percent}%)
                </span>
              </div>
              <div className="admin-quota-bar" aria-hidden="true">
                <i style={{ width: `${quota.percent}%` }} />
              </div>
              {quota.locked ? (
                <p>At the 400 MB limit. New image uploads are blocked until files are removed.</p>
              ) : quota.percent >= 80 ? (
                <p>Approaching the 400 MB maximum. Uploads stop at 380 MB used.</p>
              ) : null}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </>
  );
}
