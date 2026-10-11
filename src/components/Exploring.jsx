import Section from './Section.jsx'
import { motion, useReducedMotion } from 'framer-motion'

const CURRENT = [
  'Node.js',
  'Docker',
  'TypeScript',
  'LLM tooling — agents & evals',
  'System design fundamentals',
  'Open-source contribution workflow',
]

export default function Exploring() {
  const reduced = useReducedMotion()
  return (
    <Section id="exploring" num="06" kicker="Currently Exploring" title="What's on the bench right now.">
      <div className="flex flex-wrap gap-3">
        {CURRENT.map((c, i) => (
          <motion.span
            key={c}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="border border-gold/25 bg-charcoal/40 px-4 py-2.5 font-mono text-[0.7rem] tracking-[0.18em] text-gold"
          >
            {c}
          </motion.span>
        ))}
      </div>
      <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-silver/60">
        updated as the stack grows — last touched October 2026
      </p>
    </Section>
  )
}
