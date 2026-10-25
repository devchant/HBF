"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/programs#gallery", label: "Gallery" },
  { href: "https://humanitarianbetterment.org", label: "Nigeria", external: true },
  { href: "https://humanitarianbetterment.ca", label: "Canada", external: true },
];

export function Header() {
  const pathname = usePathname();
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
          <span>HBF Nigeria · UN ECOSOC since 21 July 2026</span>
          <span>HBF Canada Society · BC S0086143 · Surrey</span>
        </div>
      </div>
      <div className="wrap nav-bar">
        <Link className="brand" href="/">
          <img src="/logo.png" alt="Humanitarian Betterment Foundation logo" />
          <span>
            <strong>Humanitarian Betterment Foundation</strong>
            <small>Nigeria foundation · Canada society</small>
          </span>
        </Link>
        <nav className="desk-nav" aria-label="Primary">
          {links.map((link) =>
            link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link className="donate" href="/donate-nigeria" aria-current={pathname === "/donate-nigeria" ? "page" : undefined}>
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
            link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ),
          )}
          <Link className="sheet-donate" href="/donate-nigeria" onClick={() => setOpen(false)}>
            <Icon name="heart" />
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}
