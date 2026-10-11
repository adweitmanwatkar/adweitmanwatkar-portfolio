import Section from './Section.jsx'
import { motion, useReducedMotion } from 'framer-motion'
import { LINKS } from '../content.js'

export default function Contact() {
  const reduced = useReducedMotion()
  const v = (d) => (reduced ? {} : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: d, ease: [0.19, 1, 0.22, 1] } })

  return (
    <Section id="contact" num="08" kicker="Contact" title={
      <>
        Good ideas deserve <span className="italic text-gold">to be built.</span>
      </>
    }>
      <motion.p {...v(0)} className="max-w-xl text-lg leading-relaxed text-silver">
        Recruiter, developer, collaborator, or hackathon team — if you&apos;re working on
        something real, I&apos;d like to hear about it. The fastest way to reach me is a
        short, direct email.
      </motion.p>

      <motion.div {...v(0.15)} className="mt-12 grid gap-px border border-ivory/10 md:grid-cols-3">
        {[
          { label: 'Email', href: LINKS.email, display: LINKS.emailLabel, external: false, primary: true },
          { label: 'GitHub', href: LINKS.github, display: LINKS.githubLabel, external: true },
          { label: 'LinkedIn', href: LINKS.linkedin, display: LINKS.linkedinLabel, external: true },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className={`group flex flex-col justify-between gap-8 border border-ivory/10 p-7 transition-colors hover:border-gold/40 ${l.primary ? 'bg-gold/5' : 'bg-charcoal/30'}`}
          >
            <span className="kicker">{l.label}</span>
            <span className={`font-mono text-sm tracking-wide ${l.primary ? 'text-gold' : 'text-ivory'} group-hover:underline`}>
              {l.display}
              <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">{l.external ? '↗' : '→'}</span>
            </span>
          </a>
        ))}
      </motion.div>

      <motion.p {...v(0.3)} className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-silver/60">
        Responses usually within a day or two — Nagpur time (IST).
      </motion.p>
    </Section>
  )
}
