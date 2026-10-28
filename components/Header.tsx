"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import type { SiteRegion } from "@/lib/site";
import { siteBase } from "@/lib/site";
import { useEffect, useState } from "react";

function navLinks(region: SiteRegion, base: string) {
  const other = region === "ng" ? "/ca" : "/ng";
  const otherLabel = region === "ng" ? "Canada" : "Nigeria";
  return [
    { href: base, label: "Home" },
    { href: `${base}/about`, label: "About" },
    ...(region === "ng"
      ? [
          { href: `${base}/programs`, label: "Programs" },
          { href: `${base}/programs#gallery`, label: "Gallery" },
        ]
      : [
          { href: `${base}/programs`, label: "Programs" },
          { href: `${base}/programs#gallery`, label: "Gallery" },
        ]),
    { href: other, label: otherLabel, switcher: true },
  ] as const;
}

export function SiteHeader({ region }: { region: SiteRegion }) {
  const pathname = usePathname();
  const base = siteBase(region);
  const links = navLinks(region, base);
  const donateHref = region === "ng" ? `${base}/donate` : `${base}/donate`;
  const [open, setOpen] = useState(false);
  const [topbarVisible, setTopbarVisible] = useState(true);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setTopbarVisible(window.scrollY < 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => {
    if (href === base) return pathname === base;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`site-header${topbarVisible ? "" : " topbar-hidden"}`}>
      <div className="topbar">
        <div className="wrap topbar-inner">
          {region === "ng" ? (
            <span>HBF Nigeria · UN ECOSOC since 21 July 2026 · CAC/IT/167408</span>
          ) : (
            <span>HBF Canada Society · BC S0086143 · Surrey, British Columbia</span>
          )}
        </div>
      </div>
      <div className="wrap nav-bar">
        <Link className="brand" href={base}>
          <img src="/logo.png" alt="Humanitarian Betterment Foundation logo" />
          <span>
            <strong>Humanitarian Betterment Foundation</strong>
            <small>{region === "ng" ? "Nigeria foundation" : "Canada society"}</small>
          </span>
        </Link>
        <nav className="desk-nav" aria-label="Primary">
          {links.map((link) =>
            "external" in link && link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={"switcher" in link && link.switcher ? "nav-switch" : undefined}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link className="donate" href={donateHref} aria-current={pathname === donateHref ? "page" : undefined}>
            <Icon name="heart" />
            Donate
          </Link>
        </nav>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={open ? "sheet is-open" : "sheet"} aria-hidden={!open}>
        <div className="sheet-top">
          <img src="/logo.png" alt="" />
          <button type="button" className="burger burger-light is-open" aria-label="Close menu" onClick={() => setOpen(false)}>
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav className="sheet-links" aria-label="Mobile">
          {links.map((link) =>
            "external" in link && link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ),
          )}
          <Link className="sheet-donate" href={donateHref} onClick={() => setOpen(false)}>
            <Icon name="heart" />
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}
