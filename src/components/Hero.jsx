import { motion, useReducedMotion } from 'framer-motion'
import { IDENTITY, LINKS } from '../content.js'
import Portrait from './Portrait.jsx'

const ease = [0.19, 1, 0.22, 1]

function Rise({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center">
      {/* atmospheric depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_20%,rgba(210,164,77,0.06),transparent_70%)]" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-28 pb-20 md:grid-cols-[1.25fr_1fr] md:pt-24">
        <div>
          <Rise delay={0.1}>
            <p className="kicker">
              Portfolio · 2026 — Nagpur, India
            </p>
          </Rise>

          <Rise delay={0.2} className="mt-6">
            <h1 className="font-display text-[clamp(2.4rem,7vw,5.2rem)] leading-[1.02] font-light tracking-tight">
              <span className="block text-ivory">I don&apos;t just learn</span>
              <span className="block text-ivory">technology.</span>
              <span className="mt-1 block italic text-gold">I build with it.</span>
            </h1>
          </Rise>

          <Rise delay={0.35} className="mt-8 max-w-xl">
            <p className="text-base leading-relaxed text-silver md:text-lg">
              Exploring software engineering, AI, and web technologies by turning ideas into practical
              projects and learning through the process.
            </p>
          </Rise>

          <Rise delay={0.45} className="mt-6">
            <div className="inline-flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-silver">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              {IDENTITY.status}
            </div>
          </Rise>

          <Rise delay={0.55} className="mt-10">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-ivory px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-obsidian transition hover:bg-gold"
              >
                Explore Projects
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border border-ivory/25 px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ivory transition hover:border-gold hover:text-gold"
              >
                Get In Touch
              </a>
            </div>
          </Rise>

          <Rise delay={0.65} className="mt-12">
            <ul className="flex flex-wrap items-center gap-6 pt-6 text-silver" style={{ borderTop: '1px solid rgba(242,237,227,0.12)' }}>
              <li>
                <a href={LINKS.github} target="_blank" rel="noreferrer" className="font-mono text-[0.65rem] uppercase tracking-[0.25em] transition hover:text-gold">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[0.65rem] uppercase tracking-[0.25em] transition hover:text-gold">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={LINKS.email} className="font-mono text-[0.65rem] uppercase tracking-[0.25em] transition hover:text-gold">
                  Email
                </a>
              </li>
            </ul>
          </Rise>
        </div>

        {/* portrait */}
        <Rise delay={0.5} className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative">
            <div
              className="absolute -inset-3 border border-gold/20"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
              <Portrait
                eager
                className="absolute inset-0 h-full w-full"
                imgClassName="object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.55), transparent 45%)' }}
                aria-hidden="true"
              />
            </div>
            {/* technical annotation */}
            <div className="mt-3 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.25em] text-silver">
              <span>fig. 01 — the builder</span>
              <span className="text-gold/70">ycce · it</span>
            </div>
          </div>
        </Rise>
      </div>

      {/* scroll hint */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-silver"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      >
        scroll ↓
      </motion.div>
    </section>
  )
}
