import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/links";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { getHero } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About us",
  description:
    "HBF Nigeria: CAC/IT/167408, SCUML, UN ECOSOC Special Consultative Status since 21 July 2026.",
};

export const dynamic = "force-dynamic";

export default async function NigeriaAboutPage() {
  const banner = await getHero("ng", "about");
  return (
    <main>
      <section className="photo-hero">
        <img src={banner.imageUrl} alt={banner.alt} />
        <div className="wrap photo-hero-bar">
          <h1>About</h1>
          <p>Nigeria</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap story">
          <img
            src="/images/gallery/idpd-2021-session.jpg"
            alt="Participants at the IDPD 2021 session in Warri"
          />
          <Reveal>
            <p className="kicker">Mission</p>
            <h2>Health, inclusion, and livelihood.</h2>
            <p>
              To improve the lives of vulnerable persons through health, inclusion, and livelihood support. Field work
              has been in Warri, Delta State, with outreach planned for Abuja.
            </p>
            <p className="notice">
              <strong>UN ECOSOC.</strong> HBF Nigeria received Special Consultative Status on 21 July 2026.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="kicker">Since 2021</p>
            <h2>A short record.</h2>
          </Reveal>
          <div className="timeline">
            <article>
              <strong>2021</strong>
              <p>HBF co-organized IDPD in Warri and distributed wheelchairs, crutches, and mobility aids with partner organizations.</p>
            </article>
            <article>
              <strong>2021–2026</strong>
              <p>Health outreach in Warri: the Free Massage Movement at Delta Mall, and a children&apos;s ward visitation.</p>
            </article>
            <article>
              <strong>21 July 2026</strong>
              <p>HBF Nigeria received Special Consultative Status with UN ECOSOC.</p>
            </article>
            <article>
              <strong>December 2026</strong>
              <p>Food hampers for 100 widows and vulnerable women in Abuja. The planning figure is about N15,000 per hamper.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <article className="card">
            <img
              className="mark"
              src="/images/gallery/logo-wordmark.jpg"
              alt="Humanitarian Betterment Foundation wordmark"
            />
            <h3>HBF Nigeria</h3>
            <p>CAC/IT/167408. SCUML. UN ECOSOC Special Consultative Status since 21 July 2026.</p>
            <p>
              <a href={`mailto:${SITE.nigeria.email}`}>{SITE.nigeria.email}</a>
              <br />
              07085709872
              <br />
              <a href={SITE.nigeria.href}>{SITE.nigeria.label}</a>
            </p>
            <Link className="btn" href="/ng/donate">
              <Icon name="heart" />
              Donate in Nigeria
            </Link>
          </article>
          <p style={{ marginTop: 22 }}>
            <Link className="btn" href="/ng/programs">
              See the programs
              <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
