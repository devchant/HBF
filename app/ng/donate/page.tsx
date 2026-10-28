import type { Metadata } from "next";
import Link from "next/link";
import { DonatePanel } from "@/components/DonatePanel";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { getDonateAccount } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give to HBF Nigeria for the December 2026 widows outreach in Abuja. Transfer to the HBF Nigeria account and submit proof of payment.",
};

export const dynamic = "force-dynamic";

export default async function DonateNigeriaPage() {
  const account = await getDonateAccount("ng");
  return (
    <main>
      <section className="photo-hero">
        <img
          src="/images/gallery/hospital-supplies.jpg"
          alt="Relief bags prepared by HBF"
        />
        <div className="wrap photo-hero-bar">
          <h1>Donate in Nigeria</h1>
          <p>HBF Nigeria</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <article className="feature-drive">
            <Reveal>
              <p className="kicker">December 2026 · Abuja</p>
              <h2>Food hampers for widows.</h2>
              <p>
                HBF Nigeria will distribute rice, oil, beans, garri, and household essentials to widows and vulnerable
                women in Abuja.
              </p>
              <Link className="btn gold" href="/ng/programs#abuja">
                Read the plan
                <Icon name="arrow" />
              </Link>
            </Reveal>
            <div className="goal-board" aria-label="Abuja outreach">
              <div>
                <strong>100</strong>
                <span>widows is the goal</span>
              </div>
              <div>
                <strong>N15,000</strong>
                <span>planning figure per hamper</span>
              </div>
              <div>
                <strong>Abuja</strong>
                <span>led by HBF Nigeria</span>
              </div>
            </div>
          </article>

          <div className="grid-2" style={{ marginTop: 18 }}>
            <Reveal>
              <DonatePanel region="ng" account={account} />
            </Reveal>
            <article className="card">
              <Reveal>
                <h3>Who receives the gift</h3>
                <p>
                  HBF Nigeria. CAC/IT/167408. SCUML. Special Consultative Status with UN ECOSOC since 21 July 2026.
                </p>
                <p className="notice">
                  <strong>Canada gifts.</strong> HBF Canada Society receives donations separately on{" "}
                  <Link href="/ca/donate">the Canada site</Link>.
                </p>
              </Reveal>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
