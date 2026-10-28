import Link from "next/link";
import { EventBoard } from "@/components/EventBoard";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/links";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { getEvents, getHero } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, events] = await Promise.all([getHero("ng"), getEvents("ng")]);
  return (
    <main>
      <section className="home-hero">
        <img src={hero.imageUrl} alt={hero.alt} />
        <div className="wrap home-hero-bar">
          <div>
            <p className="kicker rise d1">Warri · Abuja</p>
            <h1 className="rise d2">Empowering lives, restoring dignity.</h1>
          </div>
          <div className="home-hero-actions rise d3">
            <Link className="btn gold" href="/ng/donate">
              <Icon name="heart" />
              Donate in Nigeria
            </Link>
            <Link className="btn" href="/ng/programs">
              See the work
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Impact">
        <StatCounter value={50} suffix="+" label="People served at the Free Massage Movement, Delta Mall, Warri" />
        <StatCounter value={100} suffix="+" label="Participants sensitized on disability inclusion at IDPD 2021" />
        <StatCounter
          value={2026}
          grouping={false}
          label="Year HBF Nigeria received UN ECOSOC Special Consultative Status"
        />
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">What we do</p>
            <h2>Health, inclusion, and livelihood.</h2>
            <p className="lead">
              The mission is to improve the lives of vulnerable persons through health, inclusion, and livelihood
              support. HBF Nigeria leads programs in Delta State and Abuja.
            </p>
          </Reveal>
          <div className="cards" style={{ marginTop: 28 }}>
            <article className="card">
              <Reveal>
                <div className="pillar-icon" aria-hidden="true">01</div>
                <h3>Health</h3>
                <p>
                  Free therapeutic massage for more than 50 people at Delta Mall, Warri, plus a children&apos;s ward
                  visit with comfort items for families who could not pay hospital bills.
                </p>
                <Link href="/ng/programs#massage">Warri health outreach</Link>
              </Reveal>
            </article>
            <article className="card">
              <Reveal>
                <div className="pillar-icon" aria-hidden="true">02</div>
                <h3>Inclusion</h3>
                <p>
                  On 3 December 2021, HBF co-organized IDPD in Warri and distributed wheelchairs, crutches, and
                  mobility aids with EGDAI, CEPEJ, and partner groups.
                </p>
                <Link href="/ng/programs#idpd">IDPD 2021</Link>
              </Reveal>
            </article>
            <article className="card">
              <Reveal>
                <div className="pillar-icon" aria-hidden="true">03</div>
                <h3>Livelihood</h3>
                <p>
                  This December, HBF Nigeria will take food hampers to 100 widows and vulnerable women in Abuja. The
                  planning figure is about N15,000 per hamper.
                </p>
                <Link href="/ng/programs#abuja">Abuja widows outreach</Link>
              </Reveal>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap story">
          <img
            src="/images/gallery/hospital-childrens-ward.jpg"
            alt="HBF team outside the children's ward in Warri with relief bags"
          />
          <Reveal>
            <p className="kicker">From the field</p>
            <h2>A children&apos;s ward, and a banner with our name on it.</h2>
            <p>
              In Warri, HBF stood with families at the children&apos;s ward and, on International Day of Persons with
              Disabilities, with people who needed wheelchairs and crutches. The photographs are from those days.
            </p>
            <p className="notice">
              <strong>ECOSOC status.</strong> Special Consultative Status with UN ECOSOC is held by HBF Nigeria since
              21 July 2026.
            </p>
            <Link className="btn" href="/ng/about">
              Who we are
              <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      <EventBoard events={events} heading="Upcoming and current events." />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="band">
            <Reveal>
              <p className="kicker">Support the work</p>
              <h2>Give to HBF Nigeria.</h2>
              <p>This site does not take card payments. Request Sterling Bank details by email or phone.</p>
              <div className="actions">
                <Link className="btn gold" href="/ng/donate">
                  <Icon name="heart" />
                  Donate in Nigeria
                </Link>
                <a className="btn alt" href={`mailto:${SITE.nigeria.email}`}>
                  <Icon name="mail" />
                  Email Nigeria
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
