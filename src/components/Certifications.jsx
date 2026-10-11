import Section from './Section.jsx'
import { CERTIFICATIONS, ACHIEVEMENTS } from '../content.js'

export default function Certifications() {
  return (
    <Section id="credentials" num="05" kicker="Credentials & Certifications" title="Certifications & achievements.">
      {ACHIEVEMENTS.length > 0 && (
        <ul className="mb-8 grid gap-px md:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <li key={a.name} className="border border-gold/25 bg-charcoal/30 p-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-lg font-light text-ivory">{a.name}</p>
                <span className="font-mono text-[0.65rem] text-silver">{a.year}</span>
              </div>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-silver/80">{a.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-silver">{a.detail}</p>
              {a.link && (
                <a href={a.link} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold hover:underline">
                  Verify achievement ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {CERTIFICATIONS.length === 0 ? (
        <div className="border border-dashed border-ivory/15 p-10 text-center">
          <p className="font-display text-xl font-light text-ivory">Curated, not padded.</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-silver">
            Certificates and achievements appear here only once they&apos;re verified — issuing
            organization, exact credential name, and a real link. Nothing is added on assumption.
          </p>
          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">gallery populating soon</p>
        </div>
      ) : (
        <ul className="grid gap-px md:grid-cols-2">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name} className="group border border-ivory/10 bg-charcoal/30 p-6 transition-colors hover:border-gold/40">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-lg font-light text-ivory">{c.name}</p>
                <span className="font-mono text-[0.65rem] text-silver">{c.year}</span>
              </div>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-silver/80">{c.org}</p>
              {c.link && (
                <a href={c.link} target="_blank" rel="noreferrer" className="mt-3 inline-block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gold hover:underline">
                  Verify credential ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
