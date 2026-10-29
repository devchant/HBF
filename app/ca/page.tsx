import Link from "next/link";
import { EventBoard } from "@/components/EventBoard";
import { GalleryWall } from "@/components/GalleryWall";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/links";
import { Reveal } from "@/components/Reveal";
import { getEvents, getGallery, getHero } from "@/lib/cms";

const REP = "Representative image for Surrey community work — not a specific HBF event photo";

export const dynamic = "force-dynamic";

export default async function CanadaHomePage() {
  const [hero, events, photos] = await Promise.all([getHero("ca"), getEvents("ca"), getGallery("ca")]);
  return (
    <main>
      <section className="home-hero">
        <img src={hero.imageUrl} alt={hero.alt} />
        <div className="wrap home-hero-bar">
          <div>
            <p className="kicker rise d1">Surrey · British Columbia</p>
            <h1 className="rise d2">Neighbors helping neighbors.</h1>
          </div>
          <div className="home-hero-actions rise d3">
            <Link className="btn gold" href="/ca/donate">
              <Icon name="heart" />
              Donate in Canada
            </Link>
            <Link className="btn" href="/ca/programs#surrey">
              Surrey programs
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="HBF Canada Society">
        <div className="stat">
          <strong>S0086143</strong>
          <span>BC Societies Act registration number</span>
        </div>
        <div className="stat">
          <strong>Surrey</strong>
          <span>Home base for Canada community programs</span>
        </div>
        <div className="stat">
          <strong>CRA</strong>
          <span>Registered charity application in progress</span>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">What we do</p>
            <h2>Health, inclusion, and livelihood in Surrey.</h2>
            <p className="lead">
              HBF Canada Society works in affiliation with HBF Nigeria to support vulnerable people through local
              outreach. The Surrey programs below are how the society organizes that work. Dates and sign-up details
              are also published on {SITE.canada.label}.
            </p>
          </Reveal>
          <div className="cards" style={{ marginTop: 28 }}>
            <article className="card">
              <img src="/images/ca/volunteers-team.jpg" alt={REP} />
              <Reveal>
                <div className="pillar-icon" aria-hidden="true">01</div>
                <h3>Neighbourhood outreach</h3>
                <p>
                  Volunteer days, community gatherings, and referral support for families across Surrey and the Lower
                  Mainland.
                </p>
                <Link href="/ca/programs#community">Community programs</Link>
              </Reveal>
            </article>
            <article className="card">
              <img src="/images/ca/food-hampers.jpg" alt={REP} />
              <Reveal>
                <div className="pillar-icon" aria-hidden="true">02</div>
                <h3>Canada Family Hamper Outreach</h3>
                <p>
                  Comfort hampers for newcomer and low-income families in Surrey, BC. Pilot: 25 families. Date to be
                  announced.
                </p>
                <Link href="/ca/programs#hampers">Family hamper program</Link>
              </Reveal>
            </article>
            <article className="card">
              <img src="/images/ca/together.jpg" alt={REP} />
              <Reveal>
                <div className="pillar-icon" aria-hidden="true">03</div>
                <h3>Code for 1000 Children</h3>
                <p>
                  Digital literacy and AI coding for 1000 children and youth in Surrey by 2028, in partnership with
                  Generation AI Surrey. Pilot: 10 learners.
                </p>
                <Link href="/ca/programs#coding">Quality Education · SDG 4</Link>
              </Reveal>
            </article>
          </div>
        </div>
      </section>

      <EventBoard events={events} heading="Surrey events." location="Surrey, BC" />

      <section className="section" style={{ paddingTop: 0 }} id="surrey-preview">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Surrey programs</p>
            <h2>Local work in Surrey.</h2>
            <p className="lead">
              Family hampers, Code for 1000 Children with Generation AI Surrey, neighbourhood outreach, inclusion
              gatherings, and volunteer coordination. Photos on this Canada site are representative of community work
              in British Columbia until HBF Canada event photos are added.
            </p>
          </Reveal>
          <div className="photo-strip" aria-label="Surrey program themes">
            <Link href="/ca/programs#hampers" className="photo-strip-item">
              <img src="/images/ca/produce.jpg" alt={REP} />
              <span>Food hampers</span>
            </Link>
            <Link href="/ca/programs#community" className="photo-strip-item">
              <img src="/images/ca/community-gathering.jpg" alt={REP} />
              <span>Neighbourhood</span>
            </Link>
            <Link href="/ca/programs#inclusion" className="photo-strip-item">
              <img src="/images/ca/newcomers.jpg" alt={REP} />
              <span>Inclusion</span>
            </Link>
            <Link href="/ca/programs#volunteers" className="photo-strip-item">
              <img src="/images/ca/packing.jpg" alt={REP} />
              <span>Volunteers</span>
            </Link>
          </div>
          <p style={{ marginTop: 18 }}>
            <Link className="btn" href="/ca/programs#surrey">
              Open Surrey programs
              <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap story">
          <img src="/images/ca/volunteers-team.jpg" alt={REP} />
          <Reveal>
            <p className="kicker">HBF Canada Society</p>
            <h2>A separate society, a shared mission.</h2>
            <p>
              Incorporated under the British Columbia Societies Act. Special Consultative Status with the Economic and
              Social Council is held by HBF Nigeria only.
              Donations received here stay with the Canada society unless a future grant to Nigeria is approved and
              recorded separately.
            </p>
            <p className="notice">
              <strong>Official listings.</strong> Visit{" "}
              <a href={SITE.canada.href}>{SITE.canada.label}</a> for Surrey dates and volunteer sign-up published by
              the society.
            </p>
            <Link className="btn" href="/ca/about">
              About the society
              <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="kicker">In pictures</p>
            <h2>Community, food, and gathering.</h2>
          </Reveal>
          <div style={{ marginTop: 22 }}>
            <GalleryWall photos={photos} />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="band">
            <Reveal>
              <p className="kicker">Support the work</p>
              <h2>Give to HBF Canada Society.</h2>
              <p>
                Transfer to the Canada society account, then submit proof of payment. Gifts stay with HBF Canada
                Society.
              </p>
              <div className="actions">
                <Link className="btn gold" href="/ca/donate">
                  <Icon name="heart" />
                  Donate in Canada
                </Link>
                <Link className="btn alt" href="/ca/programs#surrey">
                  Surrey programs
                  <Icon name="arrow" />
                </Link>
                <Link className="btn alt" href="/ng">
                  Nigeria site
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
