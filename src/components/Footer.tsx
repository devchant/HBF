import { MsfLogo } from './MsfLogo'

const exploreLinks = [
  'What we do',
  'Medical activities',
  'Crisis settings',
  'In focus',
  'Where we work',
  'News',
  'Resource centre',
  'International Activity Report',
]

const aboutLinks = ['Who we are', "How we're run", 'How we work', 'Contact us']

const involvedLinks = ['Work with MSF', 'Donate']

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <MsfLogo />
            <p className="mt-4 text-sm text-msf-gray">
              Medical humanitarian assistance worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide">Explore</h4>
            <ul className="mt-4 space-y-2">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-msf-gray transition hover:text-msf-red"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide">About MSF</h4>
            <ul className="mt-4 space-y-2">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-msf-gray transition hover:text-msf-red"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide">Get involved</h4>
            <ul className="mt-4 space-y-2">
              {involvedLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#donate"
                    className="text-sm text-msf-gray transition hover:text-msf-red"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="text-msf-gray hover:text-msf-red">
              Privacy policy
            </a>
            <a href="#" className="text-msf-gray hover:text-msf-red" aria-label="X">
              X
            </a>
            <a href="#" className="text-msf-gray hover:text-msf-red" aria-label="Bluesky">
              Bluesky
            </a>
          </div>
          <p className="text-xs text-msf-gray">
            © Médecins Sans Frontières
            <br />
            140, Route de Ferney, 1202 Geneva, Switzerland
            <br />
            Federal identification number: UID CH-660.1.555.004-1
          </p>
        </div>
      </div>
    </footer>
  )
}
