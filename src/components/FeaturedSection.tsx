import { featured } from '../data/content'

export function FeaturedSection() {
  return (
    <section id="what-we-do" className="bg-msf-light py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-msf-gray">
          Featured
        </h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col overflow-hidden bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-msf-red">
                  {item.topic}
                </p>
                {'tag' in item ? (
                  <p className="mt-1 text-xs text-msf-gray">{item.tag}</p>
                ) : null}
                <h4 className="mt-2 flex-1 text-base font-bold leading-snug group-hover:text-msf-red">
                  {item.title}
                </h4>
                <time className="mt-3 text-sm text-msf-gray">{item.date}</time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
