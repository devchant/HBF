import { donationBreakdown } from '../data/content'

export function WorkWithMSF() {
  return (
    <section id="donate" className="bg-msf-black py-16 text-white lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div id="resources">
            <p className="text-sm font-bold uppercase tracking-widest text-white/60">
              Working with MSF
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              What&apos;s it like to work with MSF?
            </h2>
            <p className="mt-4 text-lg font-semibold text-white/90">
              We rely on a strong network of professionals to deliver life-saving medical
              aid.
            </p>
            <p className="mt-4 leading-relaxed text-white/75">
              Each year, thousands of international and locally-hired staff work together
              around the globe to provide lifesaving medical assistance to people who
              would otherwise be denied access to healthcare.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 border-b-2 border-msf-red pb-0.5 text-sm font-bold uppercase tracking-wide hover:text-msf-red"
            >
              Learn more →
            </a>
          </div>

          <div className="rounded-sm bg-white/5 p-8">
            <h3 className="text-xl font-bold">How your donations are used</h3>
            <p className="mt-2 text-sm text-white/70">
              Your donations pay for millions of consultations, surgeries, treatments and
              vaccinations every year.
            </p>

            <div className="mt-8 flex h-4 w-full overflow-hidden rounded-full">
              {donationBreakdown.map((slice, i) => (
                <div
                  key={slice.label}
                  className="h-full"
                  style={{
                    width: `${slice.percent}%`,
                    backgroundColor:
                      i === 0 ? '#e02020' : i === 1 ? '#888' : '#444',
                  }}
                  title={`${slice.label}: ${slice.percent}%`}
                />
              ))}
            </div>

            <ul className="mt-8 space-y-4">
              {donationBreakdown.map((slice, i) => (
                <li key={slice.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          i === 0 ? '#e02020' : i === 1 ? '#888' : '#444',
                      }}
                    />
                    <span className="text-sm">{slice.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-msf-red">{slice.percent}%</span>
                </li>
              ))}
            </ul>

            <a
              href="#donate"
              className="mt-8 inline-block text-sm font-bold uppercase tracking-wide text-msf-red hover:underline"
            >
              Find out more →
            </a>
          </div>
        </div>

        <div className="mt-16 aspect-video overflow-hidden rounded-sm bg-black/40">
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-msf-red">
              <svg className="ml-1 h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="max-w-lg text-lg font-semibold">
              Welcome to Médecins Sans Frontières / Doctors Without Borders
            </p>
            <p className="text-sm text-white/60">Video placeholder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
