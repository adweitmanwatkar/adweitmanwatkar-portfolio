import { useState } from 'react'
import Section from './Section.jsx'
import { motion, useReducedMotion } from 'framer-motion'
import { EDUCATION } from '../content.js'

export default function Education() {
  const [active, setActive] = useState('btech')
  const reduced = useReducedMotion()

  return (
    <Section id="journey" num="02" kicker="Education & Journey" title="Milestones, in order.">
      <ol className="relative ml-2 space-y-2 border-l border-ivory/15 md:ml-6">
        {EDUCATION.map((e, i) => {
          const open = active === e.id
          return (
            <li key={e.id} className="relative">
              <button
                onClick={() => setActive(open ? '' : e.id)}
                aria-expanded={open}
                className="group relative w-full text-left"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full border transition-colors ${
                    open ? 'border-gold bg-gold' : 'border-ivory/40 bg-obsidian group-hover:border-gold'
                  }`}
                />
                <motion.div
                  className="px-6 py-4 transition-colors md:px-10"
                  animate={open && !reduced ? { x: 6 } : { x: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className={`font-display text-xl font-light md:text-2xl ${open ? 'text-gold' : 'text-ivory'}`}>
                      {e.year}
                    </h3>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-silver">{e.score}</span>
                  </div>
                  <p className="mt-1 text-sm text-silver">{e.school}</p>
                  <motion.div
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pt-3 text-sm leading-relaxed text-silver/90">{e.note}</p>
                    <div className="flex flex-wrap gap-2 pt-3">
                      {e.tags.map((t) => (
                        <span key={t} className="border border-ivory/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-silver/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </button>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
