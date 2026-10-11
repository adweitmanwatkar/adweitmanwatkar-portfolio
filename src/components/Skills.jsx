import { useState } from 'react'
import Section from './Section.jsx'
import { motion, useReducedMotion } from 'framer-motion'
import { SKILL_GROUPS } from '../content.js'

const POSITIONS = {
  core: { x: 32, y: 30 },
  web: { x: 68, y: 42 },
  growing: { x: 46, y: 72 },
}

export default function Skills() {
  const [selected, setSelected] = useState('core')
  const group = SKILL_GROUPS.find((g) => g.id === selected) || SKILL_GROUPS[0]
  const reduced = useReducedMotion()

  // nodes distributed in a small orbit around the group's anchor
  const nodesFor = (g) => {
    const base = POSITIONS[g.id] || { x: 50, y: 50 }
    const n = g.skills.length
    if (g.id === 'learning') return null // not on the canvas; shown in the side rail
    return g.skills.map((s, i) => {
      const angle = (i / n) * Math.PI * 2 + g.id.length
      const r = 11 + (i % 3) * 4
      return {
        name: s,
        x: base.x + Math.cos(angle) * r,
        y: base.y + Math.sin(angle) * r * 0.72,
      }
    })
  }

  return (
    <Section id="skills" num="03" kicker="Capabilities" title="What I work with.">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative border border-ivory/10 bg-charcoal/40">
          <svg viewBox="0 0 100 100" className="h-auto w-full" role="img" aria-label="A constellation-style map of skill categories">
            {/* connective lines between category anchors */}
            {(['core', 'web', 'growing'].flatMap((a, i) =>
              ['core', 'web', 'growing'].slice(i + 1).map((b) => [a, b])
            )).map(([a, b]) => {
              const p1 = POSITIONS[a]
              const p2 = POSITIONS[b]
              return (
                <line
                  key={a + b}
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={selected === a || selected === b ? 'rgba(210,164,77,0.35)' : 'rgba(242,237,227,0.07)'}
                  strokeWidth="0.22"
                />
              )
            })}

            {SKILL_GROUPS.filter((g) => POSITIONS[g.id]).map((g) => {
              const nodes = nodesFor(g)
              const active = selected === g.id
              return (
                <g key={g.id} onClick={() => setSelected(g.id)} className="cursor-pointer" tabIndex={0} role="button" aria-label={g.title} onKeyDown={(e) => e.key === 'Enter' && setSelected(g.id)}>
                  {nodes.map((n) => (
                    <motion.circle
                      key={n.name}
                      cx={n.x} cy={n.y}
                      r={active ? 1.7 : 1.1}
                      fill={active ? '#d2a44d' : 'rgba(242,237,227,0.45)'}
                      initial={false}
                      animate={{ opacity: active ? 1 : 0.55 }}
                    />
                  ))}
                  <circle cx={POSITIONS[g.id].x} cy={POSITIONS[g.id].y} r={active ? 4.4 : 3.4} fill="none" stroke={active ? '#d2a44d' : 'rgba(242,237,227,0.3)'} strokeWidth="0.3" />
                  <text
                    x={POSITIONS[g.id].x}
                    y={POSITIONS[g.id].y + 0.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={active ? '#d2a44d' : '#9d9a90'}
                    fontSize="2.6"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {g.code}
                  </text>
                </g>
              )
            })}
          </svg>
          <p className="px-4 pb-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-silver/50">
            fig. 02 — skill constellation · click a cluster
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <motion.div key={selected} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="kicker mb-2">Cluster {group.code}</p>
            <h3 className="font-display text-2xl font-light text-ivory">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className={`border px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.15em] ${
                    group.builtWith ? 'border-gold/40 text-gold' : 'border-ivory/15 text-silver'
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-silver">{group.note}</p>
            <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-silver/60">
              {group.builtWith ? '● used in real projects' : '○ in active learning — not claimed as experience'}
            </p>
          </motion.div>

          <ul className="mt-auto space-y-1">
            {SKILL_GROUPS.map((g) => (
              <li key={g.id}>
                <button
                  onClick={() => setSelected(g.id)}
                  className={`flex w-full items-baseline gap-3 border-b border-ivory/5 py-2 text-left font-mono text-[0.68rem] uppercase tracking-[0.2em] transition ${
                    selected === g.id ? 'text-gold' : 'text-silver hover:text-ivory'
                  }`}
                >
                  <span className="text-gold/60">{g.code}</span> {g.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
