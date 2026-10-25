import { inFocus } from '../data/content'

export function InFocusSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <h3 className="text-2xl font-bold md:text-3xl">In focus</h3>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {inFocus.map((item) => (
            <article
              key={item.title}
              className="group grid overflow-hidden border border-black/10 sm:grid-cols-2"
            >
              <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-msf-gray">
                  In Focus
                </p>
                <h4 className="mt-2 text-xl font-bold group-hover:text-msf-red">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-msf-gray">
                  {item.description}
                </p>
                <span className="mt-4 text-sm font-bold uppercase tracking-wide text-msf-red">
                  Learn more →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="text-sm font-bold uppercase tracking-wide text-msf-red hover:underline"
          >
            View more
          </a>
        </div>
      </div>
    </section>
  )
}
