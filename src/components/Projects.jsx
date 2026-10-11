import { useEffect, useRef, useState } from 'react'
import Section from './Section.jsx'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PROJECTS, ARCHIVE_NOTE } from '../content.js'

const ease = [0.19, 1, 0.22, 1]

/* Abstract "preview" generative glyph per project — no fake screenshots */
function ProjectGlyph({ id, accent }) {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="240" fill="#131110" />
      {id === 'sarasx' &&
        Array.from({ length: 7 }).map((_, i) => (
          <g key={i}>
            <line x1={70} y1={30 + i * 30} x2={230 + (i % 3) * 30} y2={30 + i * 30} stroke={i === 2 ? accent : 'rgba(242,237,227,0.18)'} strokeWidth="3" strokeLinecap="round" />
            <circle cx={236 + (i % 3) * 30} cy={30 + i * 30} r="3.4" fill={i === 2 ? accent : 'rgba(242,237,227,0.4)'} />
          </g>
        ))}
      {id === 'vajra' && (
        <g fill="none" strokeWidth="2.4">
          <path d="M120 190 L200 60 L280 190 Z" stroke="rgba(242,237,227,0.4)" />
          <path d="M150 140 Q200 100 250 140" stroke={accent} />
          <path d="M140 160 Q200 118 260 160" stroke={accent} opacity="0.55" />
          <path d="M130 178 Q200 132 270 178" stroke={accent} opacity="0.3" />
        </g>
      )}
      {id === 'aquapulse' &&
        Array.from({ length: 5 }).map((_, r) => (
          <g key={r}>
            <line x1={40} y1={40 + r * 40} x2={360} y2={40 + r * 40} stroke="rgba(242,237,227,0.14)" strokeWidth="1" />
            {[80, 160, 240, 320].map((x, c) => (
              <circle key={c} cx={x} cy={40 + r * 40} r={(Math.sin(r * 2 + c) + 1) * 3 + 2} fill={(r * 4 + c) % 7 === 0 ? accent : 'rgba(242,237,227,0.3)'} />
            ))}
          </g>
        ))}
      {id === 'swarmshield' &&
        [0, 1, 2, 3, 4, 5].map((n) => {
          const angle = (n / 6) * Math.PI * 2
          const cx = 200 + Math.cos(angle) * 72
          const cy = 120 + Math.sin(angle) * 55
          return (
            <g key={n}>
              <line x1={200} y1={120} x2={cx} y2={cy} stroke="rgba(242,237,227,0.22)" strokeWidth="1" />
              {[0, 1, 2, 3, 4, 5].map((m) => (
                <line key={m} x1={cx} y1={cy} x2={200 + Math.cos((m / 6) * Math.PI * 2) * 72} y2={120 + Math.sin((m / 6) * Math.PI * 2) * 55} stroke="rgba(201,138,94,0.14)" strokeWidth="0.7" />
              ))}
              <circle cx={cx} cy={cy} r={n === 0 ? 7 : 5} fill="none" stroke={n === 0 ? accent : 'rgba(242,237,227,0.55)'} strokeWidth={n === 0 ? 2 : 1.4} />
              <circle cx={cx} cy={cy} r={2.4} fill={n === 0 ? accent : 'rgba(242,237,227,0.5)'} />
            </g>
          )
        })}
      <circle cx={200} cy={120} r={4} fill={accent} opacity={0.9} />
    </svg>
  )
}

function CaseStudy({ p, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm" onClick={onClose} aria-label="Close case study" />
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${p.name} case study`}
        className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto border border-ivory/15 bg-charcoal p-6 md:p-10"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="kicker">{p.number} — {p.category}</p>
            <h3 className="font-display mt-2 text-3xl font-light text-ivory md:text-4xl">{p.name}</h3>
          </div>
          <button onClick={onClose} className="font-mono text-xs uppercase tracking-[0.25em] text-silver hover:text-gold" aria-label="Close">
            Close ✕
          </button>
        </div>

        <div className="rule mt-8 pt-6">
          <p className="kicker mb-3">The problem</p>
          <p className="leading-relaxed text-silver">{p.problem}</p>
        </div>

        <div className="rule mt-6 pt-6">
          <p className="kicker mb-3">Architecture & engineering decisions</p>
          <ul className="space-y-2.5">
            {p.architecture.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-silver">
                <span className="font-mono text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="border border-gold/25 p-5">
            <p className="kicker mb-3 text-gold/80">Implemented</p>
            <ul className="space-y-1.5 text-sm text-silver">
              {p.implemented.map((x) => <li key={x}>▸ {x}</li>)}
            </ul>
          </div>
          <div className="border border-ivory/10 p-5">
            <p className="kicker mb-3">Planned</p>
            <ul className="space-y-1.5 text-sm text-silver/70">
              {p.planned.map((x) => <li key={x}>○ {x}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="border border-ivory/10 px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.15em] text-silver">{t}</span>
          ))}
        </div>

        <p className="mt-6 border-l-2 border-gold/50 pl-4 font-mono text-[0.68rem] leading-relaxed text-silver/80">
          STATUS — {p.status}
        </p>

        {(p.team || p.collaborators) && (
          <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-silver">
            TEAM — {p.team}{p.collaborators?.length ? ' · Collaborator: ' + p.collaborators.join(', ') : ''}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          {p.links.repo && (
            <a href={p.links.repo} target="_blank" rel="noreferrer" className="border border-gold/50 bg-gold/10 px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold transition hover:bg-gold hover:text-obsidian">
              View Repository ↗
            </a>
          )}
          {p.links.demo && (
            <a href={p.links.demo} target="_blank" rel="noreferrer" className="border border-ivory/25 px-5 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ivory transition hover:border-gold hover:text-gold">
              Live Demo ↗
            </a>
          )}
          {!p.links.repo && !p.links.demo && (
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-silver/60">
              Repository link pending — will be added once the code is published.
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [open, setOpen] = useState(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Section id="work" num="04" kicker="Featured Projects" title="Built, not just planned.">
      <div className="space-y-px">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
            className="group relative border border-ivory/10 bg-charcoal/30 transition-colors hover:border-gold/30"
          >
            <button onClick={() => setOpen(p)} className="grid w-full grid-cols-1 text-left md:grid-cols-[1.1fr_1fr] md:items-center" aria-haspopup="dialog">
              <div className="p-8 md:p-12">
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-5xl font-light text-gold/25 transition-colors group-hover:text-gold/60 md:text-7xl">{p.number}</span>
                  <div>
                    <h3 className="font-display text-2xl font-light tracking-wide text-ivory md:text-4xl">{p.name}</h3>
                    <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-silver">{p.category} · {p.year}</p>
                  </div>
                </div>
                <p className="mt-6 max-w-md leading-relaxed text-silver">{p.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                  Open Case Study
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
              <div className="relative h-44 border-t border-ivory/10 md:h-48 md:border-l md:border-t-0">
                <ProjectGlyph id={p.id} accent={p.accent} />
              </div>
            </button>
          </motion.article>
        ))}
      </div>

      {/* archive note */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-ivory/10 px-6 py-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-silver">
          <span className="text-gold/60">ARCHIVE</span> — {ARCHIVE_NOTE.name} & other experiments
        </p>
        <a href={ARCHIVE_NOTE.link} target="_blank" rel="noreferrer" className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-silver hover:text-gold">
          Browse GitHub ↗
        </a>
      </div>

      <AnimatePresence>{open && <CaseStudy p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  )
}
