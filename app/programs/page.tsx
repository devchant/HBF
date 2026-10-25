import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProgramFilters } from "@/components/ProgramFilters";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "HBF programs: Free Massage Movement in Warri, IDPD 2021 disability aid, children's ward visitation, and the December 2026 widows outreach in Abuja.",
};

export default function ProgramsPage() {
  return (
    <main>
      <section className="photo-hero">
        <img
          src="/images/gallery/idpd-2021-mobility.jpg"
          alt="Wheelchairs and crutches at the IDPD 2021 gathering in Warri"
        />
        <div className="wrap photo-hero-bar">
          <h1>Programs</h1>
          <p>Warri and Abuja</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Reveal>
            <p className="kicker">The record</p>
            <h2>Four programs. Three places.</h2>
            <p className="lead">
              Nigeria programs are led by HBF Nigeria, which holds UN ECOSOC status. See also{" "}
              <a href="https://humanitarianbetterment.org">humanitarianbetterment.org</a>. Surrey, British Columbia
              programs are published at <a href="https://www.hbfcanada.ca">hbfcanada.ca</a>. HBF Canada Society
              (S0086143) is a separate legal entity.
            </p>
          </Reveal>
          <ProgramFilters />

          <article className="feature-drive" id="abuja-card" data-program="upcoming">
            <Reveal>
              <p className="kicker">Mobilizing now · December 2026</p>
              <h2>Food hampers for widows in Abuja.</h2>
              <p>
                HBF Nigeria will distribute rice, oil, beans, garri, and household essentials to widows and vulnerable
                women. Nigeria gifts are received by HBF Nigeria. Canada gifts are received by HBF Canada Society and
                accounted separately.
              </p>
              <div className="actions">
                <Link className="btn gold" href="/donate-nigeria">
                  <Icon name="heart" />
                  Donate Nigeria
                </Link>
                <a className="btn alt" href="https://humanitarianbetterment.ca/donate">
                  Donate Canada
                  <Icon name="out" />
                </a>
                <a className="btn alt" href="#abuja">
                  Read the plan
                  <Icon name="arrow" />
                </a>
              </div>
            </Reveal>
            <div className="goal-board" aria-label="Abuja outreach goals">
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

          <div className="campaigns">
            <a className="campaign" href="#massage" data-program="completed">
              <div className="campaign-media">
                <div className="campaign-fallback">
                  <span className="chip">Completed · Warri</span>
                  <strong>50+</strong>
                  <span>persons served</span>
                </div>
              </div>
              <div className="campaign-body">
                <h2>Free Massage Movement</h2>
                <p>Certified therapists at Delta Mall for market women, older people, and anyone who could not pay for wellness care.</p>
                <div className="meta-row">
                  <span>Delta Mall</span>
                  <span>Health</span>
                </div>
              </div>
            </a>

            <a className="campaign" href="#idpd" data-program="completed">
              <div className="campaign-media">
                <img
                  src="/images/gallery/idpd-2021-group.jpg"
                  alt="HBF at IDPD 2021 in Warri, standing with the collaboration banner"
                />
                <span className="chip">Completed · 3 Dec 2021</span>
              </div>
              <div className="campaign-body">
                <h2>IDPD 2021</h2>
                <p>Wheelchairs, crutches, and a public session on disability inclusion with EGDAI, CEPEJ, and partner groups.</p>
                <div className="meta-row">
                  <span>100+ sensitized</span>
                  <span>Warri</span>
                </div>
              </div>
            </a>

            <a className="campaign" href="#hospital" data-program="completed">
              <div className="campaign-media">
                <img
                  src="/images/gallery/hospital-childrens-ward.jpg"
                  alt="HBF team with relief bags outside the children's ward in Warri"
                />
                <span className="chip">Completed · Warri</span>
              </div>
              <div className="campaign-body">
                <h2>Children&apos;s ward</h2>
                <p>Comfort items for children on admission and their mothers, focused on families who could not pay hospital bills.</p>
                <div className="meta-row">
                  <span>Child health</span>
                  <span>Warri</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <article className="program-story" id="massage" data-program="completed">
            <div className="massage-clips">
              <video controls preload="metadata" aria-label="Free Massage Movement at Delta Mall, Warri">
                <source src="/videos/program-video-1.mp4" type="video/mp4" />
              </video>
              <video controls preload="metadata" aria-label="Free Massage Movement at Delta Mall, Warri, second clip">
                <source src="/videos/program-video-2.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Completed · Health</p>
                <h2>Free Massage Movement</h2>
                <p>
                  In line with our health and wellness mandate, HBF mobilized certified massage therapists to provide
                  free therapeutic massage to over 50 persons at Delta Mall, Warri. The outreach targeted market women,
                  elderly persons, and persons with stress-related conditions who cannot afford wellness care.
                  Beneficiaries received health education on posture, stress management, and physical wellbeing.
                </p>
                <p className="impact">Impact: 50+ persons served. Location: Warri, Delta State.</p>
              </Reveal>
            </div>
          </article>

          <article className="program-story" id="idpd" data-program="completed">
            <div className="shot-grid">
              <img
                className="lead"
                src="/images/gallery/idpd-2021-group.jpg"
                alt="HBF at IDPD 2021 Warri - HBF logo on collaboration banner with EGDAI and CEPEJ - ECOSOC accredited NGO Nigeria"
              />
              <img
                src="/images/gallery/idpd-2021-banner.jpg"
                alt="IDPD 2021 banner listing Humanitarian Betterment Foundation with partner organisations"
              />
              <img
                src="/images/gallery/idpd-2021-mobility.jpg"
                alt="Wheelchairs and crutches at the IDPD 2021 gathering in Warri"
              />
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Completed · Inclusion</p>
                <h2>International Day of Persons with Disabilities, 2021</h2>
                <p>
                  On 3 December 2021, HBF co-organized the International Day of Persons with Disabilities with
                  Empowerment For Global Disability Aid Initiative (EGDAI), Center For Peace And Environmental Justice
                  (CEPEJ), Shola Mese Foundation, FHOPAS, and NDI.
                </p>
                <p>
                  <strong>Theme:</strong> Leadership and Participation of Persons with Disabilities toward an Inclusive,
                  Accessible and Sustainable Post-COVID-19 World.
                </p>
                <p>
                  HBF’s contribution: distribution of wheelchairs, crutches, and mobility aids to persons with
                  disabilities, advocacy for inclusive policies, and direct support to participants.
                </p>
                <p className="impact">
                  Impact: persons with disabilities received mobility aids; over 100 participants sensitized on
                  disability inclusion.
                </p>
              </Reveal>
            </div>
          </article>

          <article className="program-story reverse" id="hospital" data-program="completed">
            <div className="shot-grid">
              <img
                className="lead"
                src="/images/gallery/hospital-childrens-ward.jpg"
                alt="HBF Hospital Visitation Paediatric Ward Warri - Child health outreach"
              />
              <img
                src="/images/gallery/hospital-handover.jpg"
                alt="HBF volunteers handing support bags to children's ward staff"
              />
              <img
                src="/images/gallery/hospital-supplies.jpg"
                alt="Bags of supplies prepared by HBF for the children's ward"
              />
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Completed · Health</p>
                <h2>Children&apos;s ward visitation, Warri</h2>
                <p>
                  HBF visited the children&apos;s ward in Warri, providing comfort items and support to children on
                  admission and their mothers. The visitation focused on indigent families unable to pay hospital bills.
                  Health staff were engaged on child welfare.
                </p>
              </Reveal>
            </div>
          </article>

          <article className="program-story" id="abuja" data-program="upcoming">
            <div className="stat-slab">
              <p className="kicker">Abuja · December 2026</p>
              <strong>100</strong>
              <span>widows and vulnerable women. About N15,000 per hamper.</span>
            </div>
            <div className="program-copy">
              <Reveal>
                <p className="eyebrow">Upcoming · Livelihood</p>
                <h2>December 2026 widows outreach</h2>
                <p>
                  <strong>Project: HBF December food hampers for widows — Abuja.</strong>
                </p>
                <p>
                  This December, HBF Nigeria will distribute food hampers to widows and vulnerable women in Abuja as
                  part of our annual end-of-year humanitarian support. Each hamper contains rice, oil, beans, garri, and
                  basic household essentials to support families during the festive season.
                </p>
                <ul>
                  <li>
                    <strong>Goal:</strong> 100 widows
                  </li>
                  <li>
                    <strong>Budget:</strong> about N15,000 per hamper
                  </li>
                  <li>
                    <strong>Donate Nigeria:</strong>{" "}
                    <Link href="/donate-nigeria">Donate in Nigeria</Link>
                  </li>
                  <li>
                    <strong>Donate Canada:</strong>{" "}
                    <a href="https://humanitarianbetterment.ca/donate">humanitarianbetterment.ca/donate</a> — received by
                    HBF Canada Society for Canada programs, with any future grant to Nigeria accounted separately
                  </li>
                </ul>
                <p>
                  Donations to HBF Nigeria and HBF Canada Society are received by separate legal entities and accounted
                  separately.
                </p>
                <Link className="btn donate" href="/donate-nigeria">
                  <Icon name="heart" />
                  Support the Abuja widows outreach
                </Link>
              </Reveal>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="gallery" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="kicker">Photographs</p>
            <h2>Gallery</h2>
            <p className="lead">
              Pictures from IDPD 2021 and the children&apos;s ward visit in Warri. The Abuja outreach is still ahead.
            </p>
          </Reveal>
          <div className="gallery-wall">
            <figure>
              <img src="/images/gallery/idpd-2021-group.jpg" alt="HBF at IDPD 2021 Warri - HBF logo on collaboration banner with EGDAI and CEPEJ - ECOSOC accredited NGO Nigeria" />
              <figcaption>HBF at IDPD 2021 Warri — collaboration banner with EGDAI and CEPEJ</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/idpd-2021-banner.jpg" alt="IDPD 2021 banner listing Humanitarian Betterment Foundation with partner organisations" />
              <figcaption>Official banner naming HBF with EGDAI, CEPEJ, Shola Mese Foundation, FHOPAS, and NDI</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/idpd-2021-high-table.jpg" alt="Speakers at the IDPD 2021 high table in Warri" />
              <figcaption>HBF leadership on the high table at IDPD 2021</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/idpd-2021-mobility.jpg" alt="Wheelchairs and crutches at the IDPD 2021 gathering in Warri" />
              <figcaption>Mobility aids — wheelchairs and crutches</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/idpd-2021-session.jpg" alt="Participants seated at the IDPD 2021 session in Warri" />
              <figcaption>IDPD 2021 session on disability inclusion and participation</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/hospital-childrens-ward.jpg" alt="HBF Hospital Visitation Paediatric Ward Warri - Child health outreach" />
              <figcaption>Children&apos;s ward visitation, Warri</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/hospital-handover.jpg" alt="HBF volunteers handing support bags to children's ward staff" />
              <figcaption>Support items handed to children&apos;s ward staff</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/hospital-ward.jpg" alt="HBF team inside the children's ward in Warri" />
              <figcaption>Inside the children&apos;s ward</figcaption>
            </figure>
            <figure>
              <img src="/images/gallery/hospital-supplies.jpg" alt="Bags of supplies prepared by HBF for the children's ward" />
              <figcaption>Relief bags prepared for the children&apos;s ward</figcaption>
            </figure>
          </div>
        </div>
      </section>

    </main>
  );
}
