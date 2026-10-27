"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/links";

export function SocietyPicker() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push("/ng");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="society-shell" aria-hidden={!ready}>
      <div className="society-shell-bg" aria-hidden="true" />
      <div className="society-modal-wrap">
        <div
          ref={dialogRef}
          className="society-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="society-modal-title"
        >
          <img src="/logo.png" alt="" className="society-modal-logo" />
          <p className="kicker">Welcome</p>
          <h1 id="society-modal-title">Which society are you here for?</h1>
          <p className="lead">
            HBF Nigeria and HBF Canada Society are separate legal entities. Gifts, programs, and registration details
            are not shared between them.
          </p>
          <div className="society-modal-options">
            <Link className="society-option society-option-ng" href="/ng">
              <span className="society-option-tag">Nigeria</span>
              <strong>HBF Nigeria</strong>
              <span>UN ECOSOC since 21 July 2026 · Warri &amp; Abuja · CAC/IT/167408</span>
              <span className="society-option-cta">
                Continue to Nigeria
                <Icon name="arrow" />
              </span>
            </Link>
            <Link className="society-option society-option-ca" href="/ca">
              <span className="society-option-tag">Canada</span>
              <strong>HBF Canada Society</strong>
              <span>Surrey, BC · Registration S0086143 · CRA application in progress</span>
              <span className="society-option-cta">
                Continue to Canada
                <Icon name="arrow" />
              </span>
            </Link>
          </div>
          <p className="society-modal-foot">
            Not sure? Nigeria field programs are on the Nigeria site. Surrey programs are on{" "}
            <a href={SITE.canada.href} target="_blank" rel="noopener noreferrer">{SITE.canada.label}</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
