"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import type { SiteRegion, UrlMode } from "@/lib/site";
import { otherSocietyHref, siteBase } from "@/lib/site";
import { useEffect, useState } from "react";

function navLinks(region: SiteRegion, base: string, otherHref: string, otherExternal: boolean) {
  const home = base || "/";
  return [
    { href: home, label: "Home" },
    { href: `${base}/about`, label: "About" },
    { href: `${base}/programs`, label: "Programs" },
    { href: `${base}/programs#gallery`, label: "Gallery" },
    { href: otherHref, label: region === "ng" ? "Canada" : "Nigeria", switcher: true, external: otherExternal },
  ] as const;
}

function isCurrent(pathname: string, href: string, homeHref: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  const target = href.split("#")[0] || "/";
  const home = target === homeHref || target === "/" || target === "/ng" || target === "/ca";
  if (home) return path === "/" || path === "/ng" || path === "/ca";
  return (
    path === target ||
    path.startsWith(`${target}/`) ||
    path === `/ng${target}` ||
    path === `/ca${target}` ||
    path.startsWith(`/ng${target}/`) ||
    path.startsWith(`/ca${target}/`)
  );
}

export function SiteHeader({ region, urlMode = "prefixed" }: { region: SiteRegion; urlMode?: UrlMode }) {
  const pathname = usePathname();
  const base = siteBase(region, urlMode);
  const otherHref = otherSocietyHref(region, urlMode);
  const links = navLinks(region, base, otherHref, urlMode === "bare");
  const homeHref = base || "/";
  const donateHref = `${base}/donate`;
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

  return (
    <header className={`site-header${topbarVisible ? "" : " topbar-hidden"}`}>
      <div className="topbar">
        <div className="wrap topbar-inner">
          {region === "ng" ? (
            <span>
              HBF Nigeria · Special Consultative Status with the Economic and Social Council since 2025 · CAC/IT/167408
            </span>
          ) : (
            <span>HBF Canada Society · BC S0086143 · Surrey, British Columbia</span>
          )}
        </div>
      </div>
      <div className="wrap nav-bar">
        <Link className="brand" href={homeHref}>
          <img src="/logo.png" alt="Humanitarian Betterment Foundation logo" />
          <span>
            <strong>Humanitarian Betterment Foundation</strong>
            <small>{region === "ng" ? "Nigeria foundation" : "Canada society"}</small>
          </span>
        </Link>
        <nav className="desk-nav" aria-label="Primary">
          {links.map((link) =>
            "external" in link && link.external ? (
              <a key={link.label} href={link.href} className={"switcher" in link && link.switcher ? "nav-switch" : undefined}>
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isCurrent(pathname, link.href, homeHref) ? "page" : undefined}
                className={"switcher" in link && link.switcher ? "nav-switch" : undefined}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link className="donate" href={donateHref} aria-current={isCurrent(pathname, donateHref, homeHref) ? "page" : undefined}>
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
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
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
