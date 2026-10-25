#!/usr/bin/env python3
"""Apply HBF copy to index, about, and programs pages."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"

ORG = "Humanitarian Betterment Foundation (HBF)"
SUB = "Canada Society | Nigeria Foundation"
TAGLINE = "Empowering Lives, Restoring Dignity — From Warri to Abuja to Surrey"
ORG_NG = "https://humanitarianbetterment.org"
ORG_CA = "https://humanitarianbetterment.ca"
ORG_CA_PROGRAMS = "https://www.hbfcanada.ca"

SIMPLE_NAV = """
        <div class="navigation__menu [ flex flex-col md:flex-row md:items-center md:flex-wrap ] [ font-america md:font-america-condensed ]">
          <div class="navigation__menu-item [ md:mr-19 ] [ lg:mr-25 ]"><a href="/" class="[ inline-flex items-center no-underline ]"><span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase ] [ lg:text-12 ] [ text-black ]">Home</span></a></div>
          <div class="navigation__menu-item [ md:mr-19 ] [ lg:mr-25 ]"><a href="/about.html" class="[ inline-flex items-center no-underline ]"><span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase ] [ lg:text-12 ] [ text-black ]">About Us</span></a></div>
          <div class="navigation__menu-item [ md:mr-19 ] [ lg:mr-25 ]"><a href="/programs.html" class="[ inline-flex items-center no-underline ]"><span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase ] [ lg:text-12 ] [ text-black ]">Programs</span></a></div>
          <div class="navigation__menu-item [ md:mr-19 ] [ lg:mr-25 ]"><a href="{org_ng}" class="[ inline-flex items-center no-underline ]" target="_blank" rel="noopener noreferrer"><span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase ] [ lg:text-12 ] [ text-black ]">Nigeria</span></a></div>
          <div class="navigation__menu-item [ md:mr-19 ] [ lg:mr-25 ]"><a href="{org_ca_programs}" class="[ inline-flex items-center no-underline ]" target="_blank" rel="noopener noreferrer"><span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase ] [ lg:text-12 ] [ text-black ]">Surrey Programs</span></a></div>
          <div class="navigation__menu-item [ md:mr-19 ] [ lg:mr-25 ]"><a href="{org_ca}" class="[ inline-flex items-center no-underline ]" target="_blank" rel="noopener noreferrer"><span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase ] [ lg:text-12 ] [ text-black ]">Canada</span></a></div>
          <div class="navigation__menu-item navigation__menu-item--donate [ md:mr-19 ] [ lg:mr-25 ]"><a href="{org_ng}/donate-nigeria" class="[ inline-flex items-center no-underline ]"><span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase ] [ lg:text-12 ] [ text-red ]">Donate</span></a></div>
        </div>
""".format(org_ng=ORG_NG, org_ca=ORG_CA, org_ca_programs=ORG_CA_PROGRAMS)

FOOTER_LEGAL = f"""<p>© 2021–2026 Humanitarian Betterment Foundation</p>
<p><strong>HBF Nigeria:</strong> CAC/IT/167408, SCUML, Special Consultative Status with UN ECOSOC since July 21, 2026 — <a href="{ORG_NG}" class="text-grey" target="_blank" rel="noopener noreferrer">humanitarianbetterment.org</a></p>
<p><strong>HBF Canada Society:</strong> Incorporated in British Columbia, Canada — Registration No. S0086143 — Not a registered charity under CRA (application in progress) — Affiliated with HBF Nigeria — <a href="{ORG_CA}" class="text-grey" target="_blank" rel="noopener noreferrer">humanitarianbetterment.ca</a></p>
<p>Contact Nigeria: <a href="mailto:info@humanitarianbetterment.org" class="text-grey">info@humanitarianbetterment.org</a> · 07085709872 | Contact Canada: Surrey, BC — <a href="mailto:info@humanitarianbetterment.ca" class="text-grey">info@humanitarianbetterment.ca</a></p>
<p>Donate Nigeria: <a href="{ORG_NG}/donate-nigeria" class="text-grey">{ORG_NG}/donate-nigeria</a> | Donate Canada: <a href="{ORG_CA}/donate" class="text-grey">{ORG_CA}/donate</a></p>
<p>Surrey programs: <a href="{ORG_CA_PROGRAMS}" class="text-grey" target="_blank" rel="noopener noreferrer">hbfcanada.ca</a></p>"""

PROGRAMS_BODY = """
<section class="component info-text-block [ mb-40 ml-1/10 mr-1/10 ] [ md:w-16/20 md:ml-5/20 ]" id="programs">
  <div class="container">
    <h1 class="typo-component-title [ m-0 mb-20 font-america text-44 leading-40 ] [ lg:text-54 ]">Our Programs</h1>
    <p class="[ font-tiempos text-16 leading-24 mb-40 ]">Nigeria programs are led by HBF Nigeria (UN ECOSOC) — see also <a href="{org_ng}" target="_blank" rel="noopener noreferrer">humanitarianbetterment.org</a>. Surrey, BC programs are published at <a href="{org_ca_programs}" target="_blank" rel="noopener noreferrer">hbfcanada.ca</a>. HBF Canada Society (S0086143) operates separately from HBF Nigeria.</p>

    <article class="[ mb-50 pb-40 border-b border-grey-light ]" id="program-massage">
      <p class="eyebrow [ font-america-condensed text-10 uppercase text-red ]">Completed Program</p>
      <h2 class="[ font-america text-28 leading-32 mt-10 mb-15 ]">1. Free Massage Movement — Delta Mall, Warri, Delta State</h2>
      <p class="[ font-tiempos leading-22 ]">In line with our health and wellness mandate, HBF mobilized certified massage therapists to provide <strong>free therapeutic massage to over 50 persons</strong> at Delta Mall, Warri. The outreach targeted market women, elderly persons, and persons with stress-related conditions who cannot afford wellness care. Beneficiaries received health education on posture, stress management, and physical wellbeing.</p>
      <p class="[ font-america-condensed text-12 uppercase mt-20 ]"><strong>Impact:</strong> 50+ persons served | Location: Warri, Delta State</p>
      <p class="[ font-tiempos-italic text-14 mt-15 ]">Photos from this outreach were not in the latest image set. Caption reserved: HBF Free Massage Movement Delta Mall Warri - over 50 persons benefited.</p>
    </article>

    <article class="[ mb-50 pb-40 border-b border-grey-light ]" id="program-idpd">
      <p class="eyebrow [ font-america-condensed text-10 uppercase text-red ]">Completed Program — Collaboration</p>
      <h2 class="[ font-america text-28 leading-32 mt-10 mb-15 ]">2. International Day of Persons with Disabilities (IDPD) 2021 — Disability Aid &amp; Mobility Support</h2>
      <p class="[ font-tiempos leading-22 ]">On December 3, 2021, HBF co-organized the International Day of Persons with Disabilities with Empowerment For Global Disability Aid Initiative (EGDAI), Center For Peace And Environmental Justice (CEPEJ), Shola Mese Foundation, FHOPAS, and NDI.</p>
      <p class="[ font-tiempos leading-22 mt-15 ]"><em>Theme:</em> Leadership and Participation of Persons with Disabilities toward an Inclusive, Accessible and Sustainable Post-COVID-19 World</p>
      <p class="[ font-tiempos leading-22 mt-15 ]">HBF's contribution: <strong>distribution of wheelchairs, crutches, and mobility aids</strong> to persons with disabilities, advocacy for inclusive policies, and direct support to participants.</p>
      <p class="[ font-tiempos leading-22 mt-15 ]"><em>Evidence:</em> Photos of HBF leadership on high table and HBF logo on official event banner (see Gallery).</p>
      <p class="[ font-america-condensed text-12 uppercase mt-20 ]"><strong>Impact:</strong> Mobility aids distributed; 100+ participants sensitized on disability inclusion</p>
      <figure class="[ mt-25 ]"><img src="/images/gallery/idpd-2021-group.jpg" alt="HBF at IDPD 2021 Warri - HBF logo on collaboration banner with EGDAI and CEPEJ - ECOSOC accredited NGO Nigeria" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">HBF at IDPD 2021 Warri - HBF logo on collaboration banner with EGDAI and CEPEJ - ECOSOC accredited NGO Nigeria</figcaption></figure>
      <figure class="[ mt-25 ]"><img src="/images/gallery/idpd-2021-banner.jpg" alt="IDPD 2021 banner naming Humanitarian Betterment Foundation with EGDAI and CEPEJ" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">Official IDPD 2021 banner — HBF listed with EGDAI, CEPEJ, Shola Mese Foundation, FHOPAS, and NDI</figcaption></figure>
      <figure class="[ mt-25 ]"><img src="/images/gallery/idpd-2021-high-table.jpg" alt="HBF leadership at IDPD 2021 high table, Warri" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">HBF leadership on the high table at IDPD 2021</figcaption></figure>
      <figure class="[ mt-25 ]"><img src="/images/gallery/idpd-2021-mobility.jpg" alt="Wheelchairs and mobility support at HBF IDPD 2021 Warri" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">Mobility aids at IDPD 2021 — wheelchairs and crutches</figcaption></figure>
      <figure class="[ mt-25 ]"><img src="/images/gallery/idpd-2021-session.jpg" alt="IDPD 2021 session with participants and wheelchairs, Warri" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">IDPD 2021 session — disability inclusion and participation</figcaption></figure>
    </article>

    <article class="[ mb-50 pb-40 border-b border-grey-light ]" id="program-hospital">
      <p class="eyebrow [ font-america-condensed text-10 uppercase text-red ]">Completed Program</p>
      <h2 class="[ font-america text-28 leading-32 mt-10 mb-15 ]">3. Hospital Visitation — Children's Ward, Warri</h2>
      <p class="[ font-tiempos leading-22 ]">HBF visited the children's ward in Warri, providing comfort items and support to children on admission and their mothers. The visitation focused on indigent families unable to pay hospital bills.</p>
      <p class="[ font-america-condensed text-12 uppercase mt-20 ]"><strong>Impact:</strong> Children and mothers visited | Health staff engaged on child welfare</p>
      <figure class="[ mt-25 ]"><img src="/images/gallery/hospital-childrens-ward.jpg" alt="HBF Hospital Visitation Paediatric Ward Warri - Child health outreach" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">HBF Hospital Visitation Paediatric Ward Warri - Child health outreach</figcaption></figure>
      <figure class="[ mt-25 ]"><img src="/images/gallery/hospital-handover.jpg" alt="HBF volunteers handing support bags to children's ward staff in Warri" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">Support items handed to children's ward staff</figcaption></figure>
      <figure class="[ mt-25 ]"><img src="/images/gallery/hospital-ward.jpg" alt="HBF inside the children's ward during the Warri hospital visitation" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">Inside the children's ward during the visitation</figcaption></figure>
      <figure class="[ mt-25 ]"><img src="/images/gallery/hospital-supplies.jpg" alt="HBF relief bags prepared for the children's ward visitation" width="800" height="500" loading="lazy" class="[ w-full ]"><figcaption class="[ font-tiempos-italic text-12 mt-10 ]">Relief bags prepared for the children's ward</figcaption></figure>
    </article>

    <article class="[ mb-50 ]" id="program-abuja">
      <p class="eyebrow [ font-america-condensed text-10 uppercase text-red ]">Mobilizing Now — Donate</p>
      <h2 class="[ font-america text-28 leading-32 mt-10 mb-15 ]">4. Upcoming — December 2026 Widows Outreach, Abuja</h2>
      <p class="[ font-tiempos leading-22 ]"><strong>Project: HBF December Food Hampers for Widows — Abuja</strong></p>
      <p class="[ font-tiempos leading-22 mt-15 ]">This December, HBF Nigeria will distribute <strong>food hampers to widows and vulnerable women in Abuja</strong> as part of our annual end-of-year humanitarian support. Each hamper contains rice, oil, beans, garri, and basic household essentials.</p>
      <ul class="[ font-tiempos leading-22 mt-15 pl-20 ]">
        <li><strong>Goal:</strong> 100 widows</li>
        <li><strong>Budget:</strong> N15,000 per hamper (indicative)</li>
        <li><strong>Donate Nigeria:</strong> Sterling Bank — HBF Nigeria Account [last 4 digits on request]</li>
        <li><strong>Donate Canada:</strong> Vancity Credit Union / Interac via <a href="{org_ca}">{org_ca}</a> (Canada programs; future grants to Nigeria as approved)</li>
      </ul>
      <p class="[ font-tiempos-italic text-14 mt-20 ]">Donations to HBF Nigeria and HBF Canada Society are received by separate legal entities and accounted separately.</p>
      <a href="{org_ng}/donate-nigeria" class="cta [ inline-block mt-25 bg-red pt-9 pb-8 pl-23 pr-23 font-america-condensed text-white text-10 uppercase rounded no-underline ]">Support Abuja widows outreach</a>
    </article>
  </div>
</section>

<section class="component [ mb-60 ml-1/10 mr-1/10 ] [ md:ml-5/20 md:w-16/20 ]" id="gallery">
  <div class="container">
    <h2 class="typo-component-title [ font-america text-36 mb-25 ]">Gallery</h2>
    <div class="[ grid ]" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">
      <figure><img src="/images/gallery/idpd-2021-group.jpg" alt="HBF at IDPD 2021 Warri - HBF logo on collaboration banner with EGDAI and CEPEJ - ECOSOC accredited NGO Nigeria" class="[ w-full ]" loading="lazy"><figcaption class="[ font-tiempos-italic text-12 mt-8 ]">HBF at IDPD 2021 Warri - HBF logo on collaboration banner with EGDAI and CEPEJ - ECOSOC accredited NGO Nigeria</figcaption></figure>
      <figure><img src="/images/gallery/hospital-childrens-ward.jpg" alt="HBF Hospital Visitation Paediatric Ward Warri - Child health outreach" class="[ w-full ]" loading="lazy"><figcaption class="[ font-tiempos-italic text-12 mt-8 ]">HBF Hospital Visitation Paediatric Ward Warri - Child health outreach</figcaption></figure>
      <figure><img src="/images/gallery/idpd-2021-mobility.jpg" alt="HBF mobility support at IDPD 2021 Warri" class="[ w-full ]" loading="lazy"><figcaption class="[ font-tiempos-italic text-12 mt-8 ]">Mobility aids — IDPD 2021</figcaption></figure>
      <figure><img src="/images/gallery/hospital-supplies.jpg" alt="HBF children's ward supply bags Warri" class="[ w-full ]" loading="lazy"><figcaption class="[ font-tiempos-italic text-12 mt-8 ]">Children's ward supply bags</figcaption></figure>
    </div>
    <p class="[ font-tiempos text-14 mt-25 ]">Captions still reserved for photos not in this set: HBF Free Massage Movement Delta Mall Warri - over 50 persons benefited · HBF Canada Society - Surrey Food Hampers - BC Registration S0086143</p>
    <div class="[ mt-30 ]">
      <p class="[ font-america text-18 mb-10 ]">Program videos</p>
      <video controls preload="metadata" class="[ w-full mb-20 ]" style="max-width:720px"><source src="/videos/program-video-1.mp4" type="video/mp4"></video>
      <video controls preload="metadata" class="[ w-full ]" style="max-width:720px"><source src="/videos/program-video-2.mp4" type="video/mp4"></video>
    </div>
  </div>
</section>
""".format(org_ca=ORG_CA, org_ng=ORG_NG, org_ca_programs=ORG_CA_PROGRAMS)

ABOUT_BODY = """
<section class="component info-text-block [ mb-60 ml-1/10 mr-1/10 ] [ md:w-16/20 md:ml-5/20 ]" id="about">
  <div class="container">
    <h1 class="typo-component-title [ m-0 mb-20 font-america text-44 leading-40 ] [ lg:text-54 ]">Who We Are</h1>
    <p class="[ font-tiempos text-16 leading-26 mb-20 ]">{ORG} is a non-profit NGO registered in Nigeria and affiliated in Canada as HBF Canada Society S0086143. In 2026, HBF Nigeria was granted <strong>Special Consultative Status with UN ECOSOC</strong> in recognition of our work on disability inclusion, health outreach, and humanitarian support.</p>
    <p class="[ font-tiempos text-16 leading-26 mb-30 p-20 bg-grey-lightest border-l-4 border-red ]"><em>Important Notice:</em> ECOSOC Special Consultative Status is held by <strong>HBF Nigeria only</strong>. HBF Canada Society is a separate legal entity incorporated under the BC Societies Act and does not hold ECOSOC status. It operates in affiliation with HBF Nigeria.</p>
    <h2 class="[ font-america text-28 mb-15 ]">Mission</h2>
    <p class="[ font-tiempos text-16 leading-26 mb-30 ]">To improve the lives of vulnerable persons through health, inclusion, and livelihood support.</p>
    <p class="[ font-tiempos leading-22 ]"><a href="{org_ng}" target="_blank" rel="noopener noreferrer">humanitarianbetterment.org</a> (Nigeria — ECOSOC) · <a href="{org_ca}" target="_blank" rel="noopener noreferrer">humanitarianbetterment.ca</a> (Canada Society S0086143)</p>
    <figure class="[ mt-30 ]" style="max-width:280px"><img src="/logo.png" alt="Humanitarian Betterment Foundation logo" class="[ w-full ]"></figure>
    <a href="/programs.html" class="cta [ inline-block mt-30 bg-red pt-9 pb-8 pl-23 pr-23 font-america-condensed text-white text-10 uppercase rounded no-underline ]">View our programs</a>
  </div>
</section>
""".format(ORG=ORG, org_ng=ORG_NG, org_ca=ORG_CA)

HOME_EXTRA = """
<section class="component info-text-block [ mb-40 ml-1/10 mr-1/10 ] [ md:w-16/20 md:ml-5/20 ]" id="programs-preview">
  <div class="container">
    <h2 class="typo-component-title [ font-america text-36 mb-25 ]">Our Programs</h2>
    <ul class="[ font-tiempos leading-24 pl-20 mb-30 ]">
      <li>Free Massage Movement — Delta Mall, Warri (50+ served)</li>
      <li>IDPD 2021 — wheelchairs, crutches &amp; mobility aids (Warri)</li>
      <li>Hospital visitation — paediatric ward, Warri</li>
      <li><strong>Upcoming:</strong> December 2026 widows food hampers — Abuja</li>
    </ul>
    <p class="[ font-tiempos text-14 leading-22 mb-20 ]">Nigeria: <a href="{org_ng}" target="_blank" rel="noopener noreferrer">humanitarianbetterment.org</a> · Surrey: <a href="{org_ca_programs}" target="_blank" rel="noopener noreferrer">hbfcanada.ca</a></p>
    <a href="/programs.html" class="cta [ inline-block bg-red pt-9 pb-8 pl-23 pr-23 font-america-condensed text-white text-10 uppercase rounded no-underline ]">Read full program details</a>
  </div>
</section>
""".format(org_ng=ORG_NG, org_ca_programs=ORG_CA_PROGRAMS)


def patch_index(html: str) -> str:
    html = re.sub(
        r'<div class="navigation__menu \[ flex flex-col md:flex-row md:items-center md:flex-wrap \][^>]*>.*?</div>\n\n\s*</div>\n    </nav><!-- /\.navigation__items -->',
        SIMPLE_NAV + "\n\n                </div>\n    </nav><!-- /.navigation__items -->",
        html,
        count=1,
        flags=re.S,
    )

    html = re.sub(
        r'<div class="hero__article__container">\s*<div class="container \[ pl-1/10 pr-1/10 \] ">.*?</div><!-- /\.container -->',
        f'''<div class="hero__article__container">    <div class="container [ pl-1/10 pr-1/10 ] ">
                <span class="eyebrow [ block font-tiempos-italic text-13 leading-22 text-black mb-13 ]">UN ECOSOC · Nigeria</span>
                        <h1 class="typo-headline [ m-0 ] [ font-america text-44 leading-40 ] [ lg:text-72 lg:leading-58 ] [ text-black ] [ md:pr-2/8 ]">{ORG}</h1>
          </div><!-- /.container -->''',
        html,
        count=1,
        flags=re.S,
    )

    html = re.sub(
        r'<div class="hero__article \[.*?</div><!-- /\.hero__article -->',
        f'''<div class="hero__article [ mt-10 pl-1/10 pr-1/10 text-white ] [ md:w-half md:pl-0 md:pr-0 md:mt-0 ]">
        <div class="hero__article__description [ md:block ] [ font-tiempos text-14 leading-22 ]">
            NGO in Special Consultative Status with the United Nations Economic and Social Council (ECOSOC) since July 21, 2026 — Nigeria<br><br>
            Affiliated in Canada: Humanitarian Betterment Foundation Canada Society (BC Registration S0086143)
          </div>
      </div><!-- /.hero__article -->''',
        html,
        count=1,
        flags=re.S,
    )

    if 'id="tagline"' not in html:
        html = re.sub(
            r'<section class="component info-text-block.*?id="principles".*?</section><!-- /\.info-text-block -->',
            f'''<section class="component info-text-block [ mb-40 ml-1/10 mr-1/10 ] [ md:w-14/20 md:mb-50 md:ml-5/20 md:mr-0 ] [ lg:w-13/20 lg:mb-60 ]" id="tagline" data-component="info-text-block">
    <div class="container">
        <h2 class="typo-component-title [ relative m-0 font-america text-44 leading-40 ] [ lg:text-54 lg:leading-48 ] [ mb-20 ]">{TAGLINE}</h2>
    <div class="info-text-block__container">
            <div class="info-text-block__content">
          <p class="[ font-tiempos text-16 leading-26 ]">{ORG} serves communities across Nigeria with health outreach, disability inclusion, and humanitarian support. Our Canada Society affiliate extends food security and community programs in British Columbia.</p>
          <div class="[ block mt-30 ]"><a href="/about.html" class="cta [ inline-block bg-red pt-9 pb-8 pl-23 pr-23 font-america-condensed text-white text-10 uppercase rounded no-underline ]">About us</a></div>
        </div>
    </div>
      </div>
    </section><!-- /.info-text-block -->''',
            html,
            count=1,
            flags=re.S,
        )

    if 'id="programs-preview"' not in html:
        html = re.sub(
            r'(id="tagline"[\s\S]*?</section><!-- /\.info-text-block -->)',
            r"\1\n" + HOME_EXTRA,
            html,
            count=1,
        )

    def _counter_item(val: str, digit: str, suffix: str, copy_extra: str, label: str) -> str:
        return f'''<div class="counter [ relative ]  js-counter " data-counter-value="{val}">
    <div class="counter__value"><span class="js-counter-digit">{digit}</span><span>{suffix}</span></div>
    <div class="counter__copy">{digit}{copy_extra}</div>
  </div>

                            <span class="eyebrow [ m-0 ] [ font-america-condensed text-10 leading-15 tracking-wide uppercase no-underline ] [ lg:text-12 lg:leading-22 ] js-ellipsis [ overflow-hidden block break-words mt-7 md:mt-6 lg:mt-5 ]" >{label}</span>'''

    def _key_figures_item(mb: str, counter_html: str) -> str:
        return f'''                                                      <div class="key-figures__item [ {mb} ] [ md:mb-0 ]">
                              {counter_html}
  
                    </div><!-- /.key-figures__item -->'''

    stats = [
        ("  mb-40 ", "50", "50", "+", "+", "massage outreach beneficiaries"),
        ("  mb-40 ", "100", "100", "+", "+", "IDPD participants sensitized"),
        ("  mb-40 ", "2026", "2026", "", "", "ECOSOC consultative status (2026)"),
        ("  ", "2", "2", "", "", "Nigeria &amp; Canada affiliates"),
    ]
    figures_inner = (
        '                          <div class="key-figures__group carousel__item js-carousel-item [ relative w-full ] [ md:flex md:flex-row ] ">\n'
        '                <img src="https://www.msf.org/themes/custom/msf_theme/src/kss/components/image/assets/bg-transparent.png" alt="" class="fallback-swipe">\n'
    )
    for mb, val, digit, suffix, copy_extra, label in stats:
        figures_inner += _key_figures_item(
            mb, _counter_item(val, digit, suffix, copy_extra, label)
        )
    figures_inner += "                              </div><!-- /.key-figures__group -->"

    html = re.sub(
        r'<div class="key-figures__group carousel__item js-carousel-item.*?</div><!-- /\.key-figures__group -->',
        figures_inner,
        html,
        count=1,
        flags=re.S,
    )

    html = html.replace(
        'https://placehold.co/1600x900/e4e0d4/5a5648/jpg?text=Image 1x',
        '/images/gallery/idpd-2021-group.jpg',
    )
    html = html.replace(
        'https://placehold.co/1200x800/e4e0d4/5a5648/jpg?text=Image 1x',
        '/images/gallery/idpd-2021-group.jpg',
    )
    html = html.replace(
        'https://placehold.co/800x600/ddd9e4/4a4458/jpg?text=Image 1x',
        '/images/gallery/idpd-2021-group.jpg',
    )
    html = html.replace(
        'https://placehold.co/1600x900/d9d3cc/5c534c/jpg?text=Image',
        '/images/gallery/idpd-2021-group.jpg',
        1,
    )

    html = re.sub(
        r'<a href="/donate" class="cta[^"]*navigation__donate[^"]*"[^>]*>Lorem</a>',
        f'<a href="{ORG_NG}/donate-nigeria" class="cta [ inline-block min-w-6/8 bg-red pt-9 pb-8 pl-23 pr-23 ] [ font-america-condensed text-white text-center text-10 leading-22 tracking-semi-wide uppercase rounded no-underline ] [ md:min-w-auto ] navigation__donate [ hidden md:inline-block md:mr-0 ]" title="Donate">Donate</a>',
        html,
        count=1,
    )

    html = re.sub(
        r'<div class="footer-string__text">.*?</div><!-- /\.container -->',
        f'<div class="footer-string__text">{FOOTER_LEGAL}</div><!-- /.container -->',
        html,
        count=1,
        flags=re.S,
    )
    html = re.sub(
        r'<div class="footer__copyright[^>]*>\s*lorem ipsum dolor sit',
        '<div class="footer__copyright [ mt-30 md:mt-0 ] [ font-tiempos text-12 leading-18 text-white text-center ] [ md:text-left ] [ lg:text-16 lg:leading-23 ]">\n          Humanitarian Betterment Foundation',
        html,
        count=1,
        flags=re.I,
    )

    desc = (
        f"{ORG}. ECOSOC Special Consultative Status (Nigeria, July 21, 2026). "
        f"Canada Society S0086143. {TAGLINE}"
    )
    html = re.sub(
        r'<meta name="description" content="[^"]*" />',
        f'<meta name="description" content="{desc}" />',
        html,
        count=1,
    )
    html = html.replace(
        '"description": "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim"',
        f'"description": "{desc}"',
    )
    return html


def build_subpage(title: str, body: str, index_html: str) -> str:
    head_end = index_html.find("<header class=\"navigation")
    head = index_html[:head_end]
    head = re.sub(r"<title>[^<]+</title>", f"<title>{title}</title>", head)
    nav_end = index_html.find("</header><!-- /.navigation -->") + len(
        "</header><!-- /.navigation -->"
    )
    nav = patch_index(index_html)  # ensure nav patched
    nav_start = nav.find("<header class=\"navigation")
    nav_end = nav.find("</header><!-- /.navigation -->") + len(
        "</header><!-- /.navigation -->"
    )
    navigation = nav[nav_start:nav_end]
    footer_start = index_html.find("<footer")
    footer_end = index_html.rfind("</html>")
    tail = index_html[footer_start:footer_end]
    tail = re.sub(
        r'<div class="footer-string__text">.*?</div><!-- /\.container -->',
        f'<div class="footer-string__text">{FOOTER_LEGAL}</div><!-- /.container -->',
        tail,
        count=1,
        flags=re.S,
    )
    return (
        head
        + "\n"
        + navigation
        + '\n\n  <main class="main js-main" role="main"><div class="content wrap js-content is-current">\n'
        + body
        + "\n</div></main>\n\n"
        + tail
    )


def main():
    raise SystemExit(
        "index.html, about.html, and programs.html are now a standalone site. "
        "This script would restore the old MSF layout. It is disabled."
    )
    html = INDEX.read_text(encoding="utf-8")
    html = patch_index(html)
    INDEX.write_text(html, encoding="utf-8")

    (ROOT / "about.html").write_text(
        build_subpage(f"About Us | {ORG}", ABOUT_BODY, html),
        encoding="utf-8",
    )
    (ROOT / "programs.html").write_text(
        build_subpage(f"Programs | {ORG}", PROGRAMS_BODY, html),
        encoding="utf-8",
    )
    print("Updated index.html, about.html, programs.html")


if __name__ == "__main__":
    main()
