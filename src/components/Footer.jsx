import { LINKS, IDENTITY } from '../content.js'

export default function Footer() {
  return (
    <footer className="rule mt-10 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-5xl font-light text-gold/30">AM</p>
          <p className="mt-4 max-w-sm leading-relaxed text-silver">
            Student now. Builder always. Everything on this page was made, broken,
            fixed, and made again by hand — and there&apos;s more coming.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-silver md:items-end">
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-gold">GitHub ↗</a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-gold">LinkedIn ↗</a>
          <a href={LINKS.email} className="hover:text-gold">Email</a>
          <span className="mt-4 text-silver/50">© {new Date().getFullYear()} {IDENTITY.name} — Nagpur, India</span>
        </div>
      </div>
    </footer>
  )
}
