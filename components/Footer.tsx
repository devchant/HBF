import Link from "next/link";
import { SITE } from "@/lib/links";
import type { SiteRegion } from "@/lib/site";
import { siteBase } from "@/lib/site";

export function SiteFooter({ region }: { region: SiteRegion }) {
  const base = siteBase(region);
  const other = region === "ng" ? "/ca" : "/ng";

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
            <p>CAC/IT/167408. SCUML. Special Consultative Status with UN ECOSOC since 21 July 2026.</p>
            <p>
              <Link href={`${base}/donate`}>Donate in Nigeria</Link>
            </p>
          </RevealBlock>
          <RevealBlock title="Affiliation">
            <p>
              HBF Canada Society (S0086143) is a separate legal entity in Surrey. Gifts are accounted separately.{" "}
              <Link href={other}>Visit the Canada site</Link>.
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
        <RevealBlock title="HBF Canada Society">
          <p>Surrey, British Columbia</p>
          <p>
            <a href={SITE.canada.href}>{SITE.canada.label}</a>
          </p>
        </RevealBlock>
        <RevealBlock title="Registration">
          <p>
            Incorporated under the BC Societies Act. Registration No. S0086143. Not a registered charity under the CRA
            (application in progress). Does not hold UN ECOSOC status.
          </p>
          <p>
            <Link href={`${base}/donate`}>Donate in Canada</Link>
          </p>
        </RevealBlock>
        <RevealBlock title="Affiliation">
          <p>
            Affiliated with HBF Nigeria. A gift to this society stays with HBF Canada Society unless a future grant to
            Nigeria is approved and recorded separately. <Link href={other}>Visit the Nigeria site</Link>.
          </p>
        </RevealBlock>
      </div>
      <div className="wrap fine">
        <p>© 2021–2026 HBF Canada Society.</p>
      </div>
    </footer>
  );
}

function RevealBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
