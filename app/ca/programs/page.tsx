import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/links";
import { EventBoard } from "@/components/EventBoard";
import { Reveal } from "@/components/Reveal";
import { getEvents, getHero } from "@/lib/cms";

export const metadata = {
  title: "Programs",
  description: `HBF Canada Society Surrey programs: food hampers, neighbourhood outreach, inclusion, and volunteers. Details also on ${SITE.canada.label}.`,
};

const REP = "Representative image for Surrey community work — not a specific HBF event photo";

export const dynamic = "force-dynamic";

export default async function CanadaProgramsPage() {
  const [events, banner] = await Promise.all([getEvents("ca"), getHero("ca", "programs")]);
  return (
    <main>
      <section className="photo-hero">
        <img src={banner.imageUrl} alt={banner.alt} />
        <div className="wrap photo-hero-bar">
          <h1>Surrey programs</h1>
          <p>HBF Canada Society</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }} id="surrey">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Canada</p>
            <h2>Local work in Surrey.</h2>
            <p className="lead">
              HBF Canada Society runs community programs from Surrey, British Columbia. Event dates, volunteer
              sign-up, and program contact information are also maintained on{" "}
              <a href={SITE.canada.href}>{SITE.canada.label}</a>.
            </p>
          </Reveal>
        </div>
      </section>
      <EventBoard events={events} heading="Surrey events." />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <article className="feature-drive" id="hampers">
            <Reveal>
              <p className="kicker">Livelihood · Surrey</p>
              <h2>Surrey food hampers.</h2>
              <p>
                The Canada society organizes hamper-style food and household support for families facing hardship —
                rice, staples, and basic essentials in the same livelihood spirit as HBF Nigeria&apos;s hamper work,
                adapted for Surrey.
              </p>
              <div className="actions">
                <Link className="btn gold" href="/ca/donate">
                  <Icon name="heart" />
                  Support Surrey programs
                </Link>
                <a className="btn alt" href={SITE.canada.href} target="_blank" rel="noopener noreferrer">
                  Dates on {SITE.canada.label}
                  <Icon name="out" />
                </a>
              </div>
            </Reveal>
            <div className="goal-board" aria-label="Surrey hamper program">
              <div>
                <strong>Surrey</strong>
                <span>primary service area</span>
              </div>
              <div>
                <strong>Food</strong>
                <span>hampers and household items</span>
              </div>
              <div>
                <strong>BC</strong>
                <span>Lower Mainland outreach</span>
              </div>
            </div>
          </article>

          <div className="campaigns campaigns-4" style={{ marginTop: 22 }}>
            <a className="campaign" href="#hampers">
              <div className="campaign-media">
                <img src="/images/ca/food-hampers.jpg" alt={REP} />
                <span className="chip">Livelihood</span>
              </div>
              <div className="campaign-body">
                <h2>Food hampers</h2>
                <p>Hamper-style food and household items for Surrey households facing hardship.</p>
                <div className="meta-row">
                  <span>Surrey</span>
                  <span>Essentials</span>
                </div>
              </div>
            </a>
            <a className="campaign" href="#community">
              <div className="campaign-media">
                <img src="/images/ca/community-gathering.jpg" alt={REP} />
                <span className="chip">Surrey</span>
              </div>
              <div className="campaign-body">
                <h2>Neighbourhood outreach</h2>
                <p>Community gatherings, referral support, and local events across Surrey.</p>
                <div className="meta-row">
                  <span>Local</span>
                  <span>Families</span>
                </div>
              </div>
            </a>
            <a className="campaign" href="#inclusion">
              <div className="campaign-media">
                <img src="/images/ca/together.jpg" alt={REP} />
                <span className="chip">Inclusion</span>
              </div>
              <div className="campaign-body">
                <h2>Inclusion &amp; belonging</h2>
                <p>Welcome for newcomers, seniors, and people with disabilities.</p>
                <div className="meta-row">
                  <span>Inclusion</span>
                  <span>BC</span>
                </div>
              </div>
            </a>
            <a className="campaign" href="#volunteers">
              <div className="campaign-media">
                <img src="/images/ca/volunteers-team.jpg" alt={REP} />
                <span className="chip">Volunteers</span>
              </div>
              <div className="campaign-body">
                <h2>Volunteer network</h2>
                <p>Packing days, distribution, and neighbour-to-neighbour coordination.</p>
                <div className="meta-row">
                  <span>Surrey</span>
                  <span>Hands-on</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <article className="program-story" id="community">
            <div className="shot-grid">
              <img className="lead" src="/images/ca/neighbourhood.jpg" alt={REP} />
              <img src="/images/ca/community-gathering.jpg" alt={REP} />
              <img src="/images/ca/newcomers.jpg" alt={REP} />
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Surrey · Community</p>
                <h2>Neighbourhood outreach</h2>
                <p>
                  HBF Canada Society coordinates volunteers and partners in Surrey to meet people where they are —
                  community centres, faith groups, and local events. Specific dates and locations are posted on{" "}
                  {SITE.canada.label} as they are confirmed.
                </p>
                <p className="impact">Focus: stronger local networks and direct support for vulnerable households.</p>
              </Reveal>
            </div>
          </article>

          <article className="program-story reverse" id="essentials">
            <div className="shot-grid">
              <img className="lead" src="/images/ca/food-hampers.jpg" alt={REP} />
              <img src="/images/ca/produce.jpg" alt={REP} />
              <img src="/images/ca/packing.jpg" alt={REP} />
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Livelihood · Hampers</p>
                <h2>Food and household support</h2>
                <p>
                  Surrey food hampers are the Canada society&apos;s livelihood program: staples and basic household
                  items assembled with volunteers. Participation criteria and distribution times are announced on the
                  official program site.
                </p>
                <Link className="btn" href="/ca/donate">
                  <Icon name="heart" />
                  Give toward hampers
                </Link>
              </Reveal>
            </div>
          </article>

          <article className="program-story" id="inclusion">
            <div className="shot-grid">
              <img className="lead" src="/images/ca/together.jpg" alt={REP} />
              <img src="/images/ca/newcomers.jpg" alt={REP} />
              <img src="/images/ca/volunteers.jpg" alt={REP} />
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Inclusion</p>
                <h2>Participation for everyone</h2>
                <p>
                  HBF Nigeria&apos;s disability-inclusion work inspires how the Canada society designs accessible
                  gatherings and volunteer roles for newcomers, seniors, and people with disabilities. ECOSOC status
                  remains with HBF Nigeria only.
                </p>
              </Reveal>
            </div>
          </article>

          <article className="program-story reverse" id="volunteers">
            <div className="shot-grid">
              <img className="lead" src="/images/ca/volunteers-team.jpg" alt={REP} />
              <img src="/images/ca/packing.jpg" alt={REP} />
              <img src="/images/ca/food-support.jpg" alt={REP} />
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Surrey · Volunteers</p>
                <h2>Hands-on in the community</h2>
                <p>
                  Volunteers pack hampers, welcome neighbours at gatherings, and help with distribution. If you live
                  in Surrey or the Lower Mainland, watch {SITE.canada.label} for the next volunteer call.
                </p>
                <a className="btn" href={SITE.canada.href} target="_blank" rel="noopener noreferrer">
                  Volunteer updates
                  <Icon name="out" />
                </a>
              </Reveal>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="gallery">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Gallery</p>
            <h2>Images of community work.</h2>
            <p className="lead">
              These photographs are representative of food support, volunteering, and gathering in Canada. They are
              not claimed as specific HBF Canada Society events. Field photos from Surrey can replace them when
              available.
            </p>
          </Reveal>
          <div className="gallery-wall" style={{ marginTop: 22 }}>
            <figure>
              <img src="/images/ca/packing.jpg" alt={REP} />
              <figcaption>Volunteer packing — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/food-hampers.jpg" alt={REP} />
              <figcaption>Food hampers — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/neighbourhood.jpg" alt={REP} />
              <figcaption>Neighbourhood gathering — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/together.jpg" alt={REP} />
              <figcaption>Inclusion — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/produce.jpg" alt={REP} />
              <figcaption>Essentials — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/volunteers-team.jpg" alt={REP} />
              <figcaption>Volunteer team — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/newcomers.jpg" alt={REP} />
              <figcaption>Welcome — representative</figcaption>
            </figure>
            <figure>
              <img src="/images/ca/community-gathering.jpg" alt={REP} />
              <figcaption>Community — representative</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}
