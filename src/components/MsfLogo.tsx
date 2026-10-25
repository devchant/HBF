export function MsfLogo({ className = '' }: { className?: string }) {
  return (
    <a href="#" className={`inline-flex items-center gap-2 no-underline ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="22" fill="#e02020" />
        <path
          fill="#fff"
          d="M24 8c-2 0-3.5 1.2-4 3.2-.3 1.2-.2 2.5.3 3.6l-5.2 3.8c-.9.7-1.1 2-.4 2.9.7.9 2 .9 2.9.2l5.2-3.8c.8.6 1.8 1 2.9 1.1v6.5c0 1.1.9 2 2 2s2-.9 2-2v-6.5c1.1-.1 2.1-.5 2.9-1.1l5.2 3.8c.9.7 2.2.5 2.9-.2.7-.9.5-2.2-.4-2.9l-5.2-3.8c.5-1.1.6-2.4.3-3.6-.5-2-2-3.2-4-3.2z"
        />
        <ellipse cx="24" cy="38" rx="8" ry="3" fill="#fff" opacity="0.9" />
      </svg>
      <span className="hidden text-sm font-semibold leading-tight text-msf-black sm:block">
        Médecins Sans
        <br />
        Frontières
      </span>
    </a>
  )
}
