import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About us",
  description:
    "HBF Nigeria holds UN ECOSOC Special Consultative Status. HBF Canada Society is a separate BC society, registration S0086143, and does not hold ECOSOC status.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="photo-hero">
        <img
          src="/images/gallery/idpd-2021-high-table.jpg"
          alt="HBF leadership at the IDPD 2021 high table in Warri"
        />
        <div className="wrap photo-hero-bar">
          <h1>About</h1>
          <p>Nigeria and Canada</p>
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
              To improve the lives of vulnerable persons through health, inclusion, and livelihood support. The work
              has been in Warri, with outreach planned for Abuja, and community programs in Surrey.
            </p>
            <p className="notice">
              <strong>ECOSOC status is held by HBF Nigeria only,</strong> since 21 July 2026. HBF Canada Society is a
              separate British Columbia society, registration S0086143, and does not hold ECOSOC status. It works in
              affiliation with HBF Nigeria.
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
          <Reveal>
            <p className="kicker">Two legal entities</p>
            <h2>Gifts stay with the entity that receives them.</h2>
          </Reveal>
          <div className="grid-2" style={{ marginTop: 22 }}>
            <article className="card">
              <img
                className="mark"
                src="/images/gallery/logo-wordmark.jpg"
                alt="Humanitarian Betterment Foundation wordmark"
              />
              <h3>HBF Nigeria</h3>
              <p>CAC/IT/167408. SCUML. UN ECOSOC Special Consultative Status since 21 July 2026.</p>
              <p>
                <a href="mailto:info@humanitarianbetterment.org">info@humanitarianbetterment.org</a>
                <br />
                07085709872
                <br />
                <a href="https://humanitarianbetterment.org">humanitarianbetterment.org</a>
              </p>
              <Link className="btn" href="/donate-nigeria">
                <Icon name="heart" />
                Donate in Nigeria
              </Link>
            </article>
            <article className="card">
              <h3>HBF Canada Society</h3>
              <p>British Columbia Societies Act. Registration No. S0086143. Based in Surrey.</p>
              <p>
                Not a registered charity under the Canada Revenue Agency. A charity application is in progress. This
                society does not hold UN ECOSOC status.
              </p>
              <p>
                Affiliated with HBF Nigeria. A gift to the Canada society stays with that entity unless a future grant
                to Nigeria is approved and recorded separately.
              </p>
              <p>
                <a href="https://humanitarianbetterment.ca">humanitarianbetterment.ca</a>
                <br />
                Surrey programs: <a href="https://www.hbfcanada.ca">hbfcanada.ca</a>
              </p>
              <a className="btn" href="https://humanitarianbetterment.ca/donate">
                Donate in Canada
                <Icon name="out" />
              </a>
            </article>
          </div>
          <p style={{ marginTop: 22 }}>
            <Link className="btn" href="/programs">
              See the programs
              <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
