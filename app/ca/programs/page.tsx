import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/links";
import { EventBoard } from "@/components/EventBoard";
import { GalleryWall } from "@/components/GalleryWall";
import { Reveal } from "@/components/Reveal";
import { getEvents, getGallery, getHero } from "@/lib/cms";

export const metadata = {
  title: "Programs",
  description: `HBF Canada Society Surrey programs: family hampers, Code for 1000 Children with Generation AI Surrey, neighbourhood outreach, inclusion, and volunteers.`,
};

const REP = "Representative image for Surrey community work — not a specific HBF event photo";

export const dynamic = "force-dynamic";

export default async function CanadaProgramsPage() {
  const [events, banner, photos] = await Promise.all([
    getEvents("ca"),
    getHero("ca", "programs"),
    getGallery("ca"),
  ]);
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
      <EventBoard events={events} heading="Surrey events." location="Surrey, BC" />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <article className="feature-drive" id="hampers">
            <Reveal>
              <p className="kicker">Upcoming · Surrey, BC</p>
              <h2>Surrey food hampers.</h2>
              <p>Food hampers and household essentials for families in need — our livelihood program in Surrey.</p>
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
                <strong>25</strong>
                <span>families in the pilot</span>
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
                <h2>Surrey food hampers</h2>
                <p>Food hampers and essential household items for Surrey families in need.</p>
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
                <p>Bringing neighbours together through community gatherings, referrals and local events across Surrey.</p>
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
                <p>A welcoming space for newcomers, seniors and people with disabilities in Surrey.</p>
                <div className="meta-row">
                  <span>Inclusion</span>
                  <span>BC</span>
                </div>
              </div>
            </a>
            <a className="campaign" href="#coding">
              <div className="campaign-media">
                <img src="/images/ca/community-gathering.jpg" alt={REP} />
                <span className="chip">SDG 4</span>
              </div>
              <div className="campaign-body">
                <h2>Code for 1000 Children</h2>
                <p>
                  Digital literacy and AI coding for 1000 children and youth in Surrey by 2028, in partnership with
                  Generation AI Surrey.
                </p>
                <div className="meta-row">
                  <span>Pilot: 10 learners</span>
                  <span>2027–2029</span>
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
                <p>Volunteer packing days, food distribution and neighbour-to-neighbour support across Surrey.</p>
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
                  HBF Canada Society works with volunteers and partners at community centres, faith groups, and local
                  events. Confirmed dates are posted on {SITE.canada.label}.
                </p>
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
                  Volunteers assemble staples and household items for distribution in Surrey. Times and how to take
                  part are posted on {SITE.canada.label} as they are set.
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
                <h2>Our Inclusion Program</h2>
                <p>
                  Welcoming newcomers, seniors and people with disabilities, bringing HBF Nigeria&apos;s spirit of
                  inclusion to communities here in Canada.
                </p>
              </Reveal>
            </div>
          </article>

          <article className="program-story reverse" id="coding">
            <div className="shot-grid">
              <img className="lead" src="/images/ca/community-gathering.jpg" alt={REP} />
              <img src="/images/ca/together.jpg" alt={REP} />
              <img src="/images/ca/newcomers.jpg" alt={REP} />
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Upcoming · Surrey, BC · SDG 4</p>
                <h2>Code for 1000 Children</h2>
                <p>
                  Digital literacy and coding for 1000 children and youth in Surrey by 2028, in line with SDG 4 Quality
                  Education, in partnership with Generation AI Surrey. Starting with a pilot cohort of 10 learners.
                </p>
                <p className="impact">Goal: 2027-2029 | Pilot: 10 learners.</p>
              </Reveal>
            </div>
          </article>

          <article className="program-story" id="volunteers">
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
                  If you live in Surrey or the Lower Mainland, watch {SITE.canada.label} for the next volunteer call.
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
          <div style={{ marginTop: 22 }}>
            <GalleryWall photos={photos} />
          </div>
        </div>
      </section>
    </main>
  );
}
