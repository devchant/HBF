import { hero } from '../data/content'

export function Hero() {
  return (
    <section className="relative bg-msf-black text-white lg:min-h-[70vh]">
      <div className="relative aspect-[16/9] max-h-[85vh] w-full overflow-hidden lg:absolute lg:inset-0 lg:max-h-none lg:aspect-auto md:aspect-[21/9]">
        <img
          src={hero.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:pb-14 lg:pt-0 lg:px-6">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white/90">
          {hero.tag}
        </p>
        <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80">
          {hero.caption}
        </p>
        <p className="mt-1 text-xs text-white/60">{hero.credit}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
            {hero.type} · {hero.date}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-base text-white/90">{hero.summary}</p>
        <a
          href="#latest"
          className="mt-6 inline-flex items-center gap-2 border-b-2 border-msf-red pb-0.5 text-sm font-bold uppercase tracking-wide text-white transition hover:text-msf-red"
        >
          Read more
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  )
}
