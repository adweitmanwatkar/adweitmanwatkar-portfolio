import { useEffect, useState } from 'react'

const ITEMS = [
  ['About', '#about'],
  ['Journey', '#journey'],
  ['Skills', '#skills'],
  ['Work', '#work'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-ivory/10 bg-obsidian/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Primary">
        <a href="#top" className="font-mono text-sm tracking-[0.4em] text-gold">
          AM
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {ITEMS.map(([label, href], i) => (
            <li key={href}>
              <a
                href={href}
                className="group flex items-baseline gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-silver transition hover:text-ivory"
              >
                <span className="text-gold/60">0{i + 1}</span> {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-sm border border-gold/50 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold transition hover:bg-gold hover:text-obsidian md:block"
        >
          Say Hello
        </a>
      </nav>
    </header>
  )
}
