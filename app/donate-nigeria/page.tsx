import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Donate in Nigeria",
  description:
    "Give to HBF Nigeria for the December 2026 widows outreach in Abuja. Request the HBF Nigeria Sterling Bank details by email or phone.",
};

export default function DonateNigeriaPage() {
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
              <Link className="btn gold" href="/programs#abuja">
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
            <article className="card">
              <Reveal>
                <h3>How to give</h3>
                <p>
                  Email{" "}
                  <a href="mailto:info@humanitarianbetterment.org?subject=Nigeria%20donation">
                    info@humanitarianbetterment.org
                  </a>{" "}
                  or call 07085709872. Ask for the HBF Nigeria account at Sterling Bank. The account number is sent on
                  request.
                </p>
                <p>In your message, include your name, the amount in naira, and the Abuja widows outreach if that is the gift you intend.</p>
                <a className="btn" href="mailto:info@humanitarianbetterment.org?subject=Nigeria%20donation">
                  <Icon name="mail" />
                  Email Nigeria
                </a>
              </Reveal>
            </article>
            <article className="card">
              <Reveal>
                <h3>Who receives the gift</h3>
                <p>
                  HBF Nigeria. CAC/IT/167408. SCUML. Special Consultative Status with UN ECOSOC since 21 July 2026.
                </p>
                <p className="notice">
                  <strong>Separate accounts.</strong> Gifts to HBF Nigeria and HBF Canada Society are received by
                  separate legal entities and accounted separately. Canada gifts go to{" "}
                  <a href="https://humanitarianbetterment.ca/donate">humanitarianbetterment.ca/donate</a>.
                </p>
              </Reveal>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
