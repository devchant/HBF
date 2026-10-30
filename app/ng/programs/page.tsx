import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/links";
import { Icon } from "@/components/Icon";
import { EventBoard } from "@/components/EventBoard";
import { GalleryWall } from "@/components/GalleryWall";
import { ProgramFilters } from "@/components/ProgramFilters";
import { Reveal } from "@/components/Reveal";
import { getEvents, getGallery, getHero } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "HBF programs: Free Massage Movement in Warri, IDPD 2021 disability aid, children's ward visitation, and the December 2026 widows outreach in Abuja.",
};

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const [events, banner, photos] = await Promise.all([
    getEvents("ng"),
    getHero("ng", "programs"),
    getGallery("ng"),
  ]);
  return (
    <main>
      <section className="photo-hero">
        <img src={banner.imageUrl} alt={banner.alt} />
        <div className="wrap photo-hero-bar">
          <h1>Programs</h1>
          <p>Warri and Abuja</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="wrap">
          <Reveal>
            <p className="kicker">The record</p>
            <h2>Four programs. Warri and Abuja.</h2>
            <p className="lead">
              HBF Nigeria holds Special Consultative Status with the Economic and Social Council. Public updates are also
              on{" "}
              <a href={SITE.nigeria.href}>{SITE.nigeria.label}</a>.
            </p>
          </Reveal>
          <ProgramFilters />
        </div>
      </section>
      <EventBoard events={events} heading="Upcoming and current events." />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">

          <article className="feature-drive" id="abuja-card" data-program="upcoming">
            <Reveal>
              <p className="kicker">Mobilizing now · December 2026</p>
              <h2>Food hampers for widows in Abuja.</h2>
              <p>
                HBF Nigeria will distribute rice, oil, beans, garri, and household essentials to widows and vulnerable
                women in Abuja.
              </p>
              <div className="actions">
                <Link className="btn gold" href="/ng/donate">
                  <Icon name="heart" />
                  Donate in Nigeria
                </Link>
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
                  src="/images/gallery/idpd-2021-high-table.jpg"
                  alt="HBF leadership at the IDPD 2021 high table in Warri"
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
                  src="/images/gallery/hospital-ward.jpg"
                  alt="Inside the children's ward during HBF's visitation in Warri"
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
                alt="HBF at IDPD 2021 Warri - HBF logo on collaboration banner with EGDAI and CEPEJ"
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
                    <strong>Donate:</strong> <Link href="/ng/donate">Give to HBF Nigeria</Link>
                  </li>
                </ul>
                <Link className="btn donate" href="/ng/donate">
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
          <GalleryWall photos={photos} />
        </div>
      </section>

    </main>
  );
}
