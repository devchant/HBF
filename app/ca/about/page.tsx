import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/links";
import { Reveal } from "@/components/Reveal";
import { getHero } from "@/lib/cms";

export const metadata = {
  title: "About",
  description:
    "HBF Canada Society, BC S0086143, Surrey. Affiliated with HBF Nigeria. Not a CRA registered charity (application in progress).",
};

const REP = "Representative image for Surrey community work — not a specific HBF event photo";

export const dynamic = "force-dynamic";

export default async function CanadaAboutPage() {
  const banner = await getHero("ca", "about");
  return (
    <main>
      <section className="photo-hero">
        <img src={banner.imageUrl} alt={banner.alt} />
        <div className="wrap photo-hero-bar">
          <h1>About</h1>
          <p>Canada society</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap story">
          <img src="/images/ca/volunteers-team.jpg" alt={REP} />
          <Reveal>
            <p className="kicker">Mission</p>
            <h2>Health, inclusion, and livelihood in Surrey.</h2>
            <p>
              HBF Canada Society improves the lives of vulnerable persons through health, inclusion, and livelihood
              support at the community level. It is affiliated with HBF Nigeria and incorporated under the British
              Columbia Societies Act, registration S0086143.
            </p>
            <p className="notice">
              <strong>Consultative status is held by HBF Nigeria only.</strong> Humanitarian Betterment Foundation Canada
              Society does not hold Special Consultative Status with the Economic and Social Council.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="kicker">From Surrey</p>
            <h2>A society rooted in the Lower Mainland.</h2>
            <p className="lead">
              Programs are organized from Surrey: food hampers, neighbourhood outreach, inclusion gatherings, and
              volunteer days. The photographs here stand in for that community work until Surrey field photos are
              added.
            </p>
          </Reveal>
          <div className="figures">
            <figure>
              <img src="/images/ca/food-hampers.jpg" alt={REP} />
              <figcaption>Surrey food hampers — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/together.jpg" alt={REP} />
              <figcaption>Inclusion and belonging — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/packing.jpg" alt={REP} />
              <figcaption>Volunteer packing — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/newcomers.jpg" alt={REP} />
              <figcaption>Welcome in community — representative</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="kicker">Governance</p>
            <h2>Registration and affiliation.</h2>
          </Reveal>
          <div className="timeline">
            <article>
              <strong>Affiliation</strong>
              <p>HBF Canada Society works in affiliation with HBF Nigeria. Each entity maintains separate accounts.</p>
            </article>
            <article>
              <strong>BC S0086143</strong>
              <p>Incorporated under the BC Societies Act. Based in Surrey, British Columbia.</p>
            </article>
            <article>
              <strong>CRA</strong>
              <p>Not a registered charity under the Canada Revenue Agency. A charity application is in progress.</p>
            </article>
            <article>
              <strong>Surrey programs</strong>
              <p>
                Family hampers, Code for 1000 Children with Generation AI Surrey, neighbourhood outreach, inclusion, and
                volunteers are listed on this site. Schedules are also published at{" "}
                <a href={SITE.canada.href}>{SITE.canada.label}</a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid-2">
          <article className="card">
            <img src="/images/ca/produce.jpg" alt={REP} />
            <Reveal>
              <h3>Give in Canada</h3>
              <p>Donations are received by HBF Canada Society. Transfer, then submit proof of payment.</p>
              <Link className="btn" href="/ca/donate">
                <Icon name="heart" />
                Donate in Canada
              </Link>
            </Reveal>
          </article>
          <article className="card">
            <img src="/images/ca/community-gathering.jpg" alt={REP} />
            <Reveal>
              <h3>HBF Nigeria</h3>
              <p>
                Warri and Abuja field programs, consultative status, and Nigeria donations are on the Nigeria site.
              </p>
              <Link className="btn" href="/ng">
                Visit Nigeria site
                <Icon name="arrow" />
              </Link>
            </Reveal>
          </article>
        </div>
      </section>
    </main>
  );
}
