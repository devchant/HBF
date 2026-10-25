import { stats } from '../data/content'

export function MissionSection() {
  return (
    <section id="about" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold leading-snug md:text-3xl">
              An international, independent medical humanitarian organisation
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-msf-gray">
              We provide medical assistance to people affected by conflict, epidemics,
              disasters, or exclusion from healthcare. Our teams are made up of tens of
              thousands of health professionals, logistic and administrative staff — most
              of them hired locally. Our actions are guided by medical ethics and the{' '}
              <strong className="font-bold text-msf-black">
                principles of impartiality, independence and neutrality
              </strong>
              .
            </p>
            <a
              href="#about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-msf-red hover:underline"
            >
              Learn more →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-4 border-msf-red pl-4">
                <p className="text-3xl font-bold text-msf-red md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm leading-snug text-msf-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#resources"
          className="mt-12 flex flex-col gap-2 border border-black/10 bg-msf-light p-6 transition hover:border-msf-red/40 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-lg font-bold">International Activity Report 2025</span>
          <span className="text-sm font-bold uppercase tracking-wide text-msf-red">
            Read report →
          </span>
        </a>
      </div>
    </section>
  )
}
