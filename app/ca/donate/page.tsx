import Link from "next/link";
import { DonatePanel } from "@/components/DonatePanel";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/links";
import { Reveal } from "@/components/Reveal";
import { getDonateAccount } from "@/lib/cms";

export const metadata = {
  title: "Donate in Canada",
  description: `Give to HBF Canada Society in Surrey. Transfer and submit proof of payment on ${SITE.canada.label}.`,
};

export const dynamic = "force-dynamic";

export default async function CanadaDonatePage() {
  const account = await getDonateAccount("ca");
  return (
    <main>
      <section className="photo-hero">
        <img src="/images/ca/food-hampers.jpg" alt="Community food support — representative image for Canada giving" />
        <div className="wrap photo-hero-bar">
          <h1>Donate in Canada</h1>
          <p>HBF Canada Society</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <article className="feature-drive">
            <Reveal>
              <p className="kicker">Surrey · British Columbia</p>
              <h2>Gifts for Canada programs.</h2>
              <p>
                Donations are received by HBF Canada Society, registration S0086143. They support Canada programs unless
                a future grant to Nigeria is approved and recorded separately.
              </p>
              <Link className="btn gold" href="#give">
                <Icon name="heart" />
                How to give below
                <Icon name="arrow" />
              </Link>
            </Reveal>
            <div className="goal-board" aria-label="Canada society">
              <div>
                <strong>S0086143</strong>
                <span>BC Societies Act registration</span>
              </div>
              <div>
                <strong>Surrey</strong>
                <span>programs on {SITE.canada.label}</span>
              </div>
              <div>
                <strong>CRA</strong>
                <span>charity application in progress</span>
              </div>
            </div>
          </article>

          <div className="grid-2" style={{ marginTop: 18 }} id="give">
            <Reveal>
              <DonatePanel region="ca" account={account} />
            </Reveal>
            <article className="card">
              <Reveal>
                <h3>Nigeria gifts</h3>
                <p>
                  HBF Nigeria receives Nigeria donations separately. Special Consultative Status with the Economic and
                  Social Council applies to the Nigeria foundation only.
                </p>
                <Link className="btn" href="/ng/donate">
                  Nigeria donate page
                  <Icon name="arrow" />
                </Link>
              </Reveal>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
