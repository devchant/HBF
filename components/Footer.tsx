import Link from "next/link";
import { SITE } from "@/lib/links";
import type { SiteRegion, UrlMode } from "@/lib/site";
import { otherSocietyHref, siteBase } from "@/lib/site";

export function SiteFooter({ region, urlMode = "prefixed" }: { region: SiteRegion; urlMode?: UrlMode }) {
  const base = siteBase(region, urlMode);
  const other = otherSocietyHref(region, urlMode);
  const otherIsExternal = urlMode === "bare";

  if (region === "ng") {
    return (
      <footer className="site-footer" id="contact">
        <div className="wrap footer-grid">
          <RevealBlock title="Contact">
            <p>
              <a href={`mailto:${SITE.nigeria.email}`}>{SITE.nigeria.email}</a>
              <br />
              07085709872
              <br />
              <a href={SITE.nigeria.href}>{SITE.nigeria.label}</a>
            </p>
          </RevealBlock>
          <RevealBlock title="HBF Nigeria">
            <p>CAC/IT/167408 | SCUML compliant</p>
            <p>
              Humanitarian Betterment Foundation in Special Consultative Status with the Economic and Social Council
              since 2025.
            </p>
            <p>
              <Link href={`${base}/donate`}>Donate in Nigeria</Link>
            </p>
          </RevealBlock>
          <RevealBlock title="Affiliation">
            <p>
              Humanitarian Betterment Foundation Canada Society (S0086143) is a separate legal entity in Surrey, BC,
              Canada. Gifts are accounted for separately.{" "}
              {otherIsExternal ? (
                <a href={other}>Visit the Canada site</a>
              ) : (
                <Link href={other}>Visit the Canada site</Link>
              )}
              .
            </p>
          </RevealBlock>
        </div>
        <div className="wrap fine">
          <p>© 2021–2026 Humanitarian Betterment Foundation (Nigeria).</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-grid">
        <RevealBlock title="HBF Canada">
          <p>
            Humanitarian Betterment Foundation Canada Society (S0086143) is a separate legal entity in Surrey, BC,
            Canada. Gifts are accounted for separately.
          </p>
          <p>
            <a href={SITE.canada.href}>{SITE.canada.label}</a>
          </p>
        </RevealBlock>
        <RevealBlock title="Registration">
          <p>
            Incorporated under the BC Societies Act. Registration No. S0086143. Not a registered charity under the CRA
            (application in progress). Special Consultative Status with the Economic and Social Council is held by HBF
            Nigeria only.
          </p>
          <p>
            <Link href={`${base}/donate`}>Donate in Canada</Link>
          </p>
        </RevealBlock>
        <RevealBlock title="Affiliation">
          <p>
            Affiliated with HBF Nigeria. A gift to this society stays with Humanitarian Betterment Foundation Canada
            Society unless a future grant to Nigeria is approved and recorded separately.{" "}
            {otherIsExternal ? (
              <a href={other}>Visit the Nigeria site</a>
            ) : (
              <Link href={other}>Visit the Nigeria site</Link>
            )}
            .
          </p>
        </RevealBlock>
      </div>
      <div className="wrap fine">
        <p>© 2021–2026 Humanitarian Betterment Foundation Canada Society.</p>
      </div>
    </footer>
  );
}

function RevealBlock({ title, children }: { title: string; children: import("react").ReactNode }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
