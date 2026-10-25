import { regions } from '../data/content'

export function WhereWeWork() {
  return (
    <section id="where-we-work" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="text-2xl font-bold md:text-3xl">Where we work</h2>
        <p className="mt-4 max-w-3xl text-lg text-msf-gray">
          In more than 70 countries, Médecins Sans Frontières provides medical
          humanitarian assistance to save lives and ease the suffering of people in
          crisis situations.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-sm bg-msf-black px-4 py-2 text-sm font-semibold text-white"
          >
            List View
          </button>
          <button
            type="button"
            className="rounded-sm border border-black/20 px-4 py-2 text-sm font-semibold text-msf-black hover:border-msf-red hover:text-msf-red"
          >
            Map View
          </button>
          <a
            href="#where-we-work"
            className="ml-auto self-center text-sm font-bold uppercase tracking-wide text-msf-red hover:underline"
          >
            View All Countries →
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-sm border border-black/10 bg-[#e8eef2]">
          <div className="flex aspect-[2/1] min-h-[240px] items-center justify-center bg-gradient-to-br from-[#c5d4de] to-[#8fa9b8] p-8 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-msf-gray">
                Interactive map
              </p>
              <p className="mt-2 max-w-md text-xs text-msf-gray">
                The place names and boundaries in this map do not reflect any position
                by MSF on their legal status. This map uses the Gall-Peters equal-area
                map projection.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <button
              key={region.name}
              type="button"
              className="group flex flex-col items-start border border-black/10 bg-white p-5 text-left transition hover:border-msf-red hover:shadow-sm"
            >
              <span className="text-lg font-bold group-hover:text-msf-red">
                {region.name}
              </span>
              <span className="mt-2 text-sm text-msf-gray">{region.examples}</span>
              <span className="mt-3 text-sm font-bold text-msf-red">
                + {region.more} More
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
