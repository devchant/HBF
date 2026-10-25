import { latestArticles } from '../data/content'

export function LatestSection() {
  return (
    <section id="latest" className="bg-msf-light py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h2 className="text-2xl font-bold md:text-3xl">Latest</h2>
        <hr className="mt-4 border-black/10" />

        <ul className="mt-8 divide-y divide-black/10">
          {latestArticles.map((article) => (
            <li key={article.title}>
              <a
                href="#"
                className="group flex gap-4 py-6 transition hover:bg-white/60 sm:gap-6"
              >
                <div className="h-20 w-28 shrink-0 overflow-hidden sm:h-24 sm:w-36">
                  <img
                    src={article.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-msf-red">
                    {article.topic}
                  </p>
                  <h3 className="mt-1 text-base font-bold leading-snug group-hover:text-msf-red sm:text-lg">
                    {article.title}
                  </h3>
                  <time className="mt-2 block text-sm text-msf-gray">{article.date}</time>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <a
            href="#latest"
            className="inline-flex border-2 border-msf-black px-8 py-3 text-sm font-bold uppercase tracking-wide transition hover:bg-msf-black hover:text-white"
          >
            View more
          </a>
        </div>
      </div>
    </section>
  )
}
