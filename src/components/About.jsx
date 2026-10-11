import Section from './Section.jsx'
import { motion, useReducedMotion } from 'framer-motion'
import { ABOUT_PARAGRAPHS, ABOUT_FACTS } from '../content.js'

export default function About() {
  const reduced = useReducedMotion()
  const v = (i) => (reduced ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.8, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] } })

  return (
    <Section id="about" num="01" kicker="About" title="The person behind the code.">
      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-silver">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <motion.p key={i} {...v(i)} className={i === 0 ? 'text-ivory' : undefined}>
              {p}
            </motion.p>
          ))}
        </div>
        <motion.aside {...v(2)} className="h-fit border border-ivory/10 p-6 font-mono text-[0.7rem] tracking-wider">
          <p className="kicker mb-4">Dossier</p>
          <dl className="space-y-4">
            {ABOUT_FACTS.map((f) => (
              <div key={f.k} className="flex justify-between gap-4 border-b border-ivory/5 pb-3">
                <dt className="text-silver/70">{f.k}</dt>
                <dd className="text-right text-ivory">{f.v}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>
    </Section>
  )
}
