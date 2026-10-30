import Link from "next/link";
import { DonatePanel } from "@/components/DonatePanel";
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
      <section className="section" style={{ paddingTop: 36 }} id="give">
        <div className="wrap">
          <p className="kicker">HBF Canada Society</p>
          <h1>Donate in Canada</h1>
          <DonatePanel region="ca" account={account} />

          <article className="feature-drive" style={{ marginTop: 22 }}>
            <Reveal>
              <p className="kicker">Surrey · British Columbia</p>
              <h2>Gifts for Canada programs.</h2>
              <p>
                Donations are received by Humanitarian Betterment Foundation Canada Society, registration S0086143.
                They support Canada programs unless a future grant to Nigeria is approved and recorded separately.
              </p>
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

          <article className="card" style={{ marginTop: 18 }}>
            <Reveal>
              <h3>Nigeria gifts</h3>
              <p>
                HBF Nigeria receives Nigeria donations separately. Special Consultative Status with the Economic and
                Social Council applies to the Nigeria foundation only.
              </p>
              <Link className="btn" href="/ng/donate">
                Nigeria donate page
              </Link>
            </Reveal>
          </article>
        </div>
      </section>
    </main>
  );
}
