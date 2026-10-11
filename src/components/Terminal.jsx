import { useEffect, useRef, useState } from 'react'
import { LINKS } from '../content.js'

const PROMPT = 'adweit@ycce:~$'

const HELP = [
  'help        — this list',
  'whoami      — quick summary',
  'about       — who I am',
  'education   — timeline of milestones',
  'skills      — current capability clusters',
  'projects    — featured builds',
  'achievement — top 40 @ IIIT Gwalior Hackathon 2025',
  'contact     — verified links',
  'clear       — wipe the screen',
]

const RESPONSES = {
  about: 'IT engineering student @ YCCE Nagpur. First-year CGPA 8.60, expected graduation 2029. I learn by building — ideas → repos → honest notes.',
  whoami: 'Adweit. Developer · Problem Solver · Aspiring Builder. Still a student, and honest about it.',
  education: 'Class 10 — Shangrila English School, 93%  |  Class 12 — Maharashtra State Board, 72.5%  |  JEE Main 2025 — 88.94 / 86.74 percentile  |  B.Tech IT @ YCCE — CGPA 8.60, 2029 (expected).',
  skills: 'Comfortable: C · C++ · Python · HTML · CSS · JavaScript. Basic / learning: Java · React.js · Tailwind CSS.',
  projects: [
    '01 SarasX — AI assistant platform (routing, streaming, RAG).',
    '02 VAJRA — SIH 2026 climate-aware shelter design (PS 26051).',
    '03 AquaPulse — water management: monitoring & leak detection.',
    '04 SWARMSHIELD — distributed SWARM coordination (12 drones, peer-to-peer, auction-based allocation).',
  ],
  achievement: 'Top 40 teams — IIIT Gwalior Hackathon 2025 (qualification tier, not a win).',
}

export default function Terminal() {
  const [lines, setLines] = useState([
    'portfolio-shell — type "help" for commands.',
  ])
  const [value, setValue] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  const submit = (e) => {
    e.preventDefault()
    const cmd = value.trim().toLowerCase()
    if (!cmd) return
    const out = []
    if (cmd === 'clear') setLines([])
    else if (cmd === 'help') {
      out.push(...HELP)
    } else if (cmd === 'projects') {
      out.push(...RESPONSES.projects)
    } else if (RESPONSES[cmd]) {
      out.push(RESPONSES[cmd])
    } else if (cmd === 'contact') {
      out.push(`email    — ${LINKS.emailLabel} (${LINKS.email.slice(0, 6)}…)`, `github   — ${LINKS.githubLabel}`, `linkedin — ${LINKS.linkedinLabel}`)
    } else {
      out.push(`command not found: ${cmd} — try "help"`)
    }
    setLines((prev) => [...prev, `${PROMPT} ${value.trim()}`, ...out])
    setValue('')
  }

  return (
    <section id="terminal" className="scroll-mt-20 py-20" aria-label="Interactive portfolio terminal">
      <div className="mx-auto max-w-4xl px-6">
        <div className="border border-ivory/15 bg-obsidian">
          <div className="flex items-center justify-between border-b border-ivory/10 px-4 py-2.5">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-silver">adweit@portfolio — shell</span>
            <span className="font-mono text-[0.6rem] text-silver/50">100%</span>
          </div>
          <div
            ref={bodyRef}
            className="h-64 space-y-1 overflow-y-auto p-4 font-mono text-[0.72rem] leading-relaxed text-silver"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <p key={i} className={l.startsWith(PROMPT) ? 'text-gold' : undefined}>
                {l.startsWith(PROMPT) ? `${l}` : l}
              </p>
            ))}
            <form onSubmit={submit} className="flex items-center gap-2">
              <span className="text-gold">{PROMPT}</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-transparent text-ivory outline-none"
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[0.58rem] uppercase tracking-[0.3em] text-silver/50">
          try: help · about · projects · contact
        </p>
      </div>
    </section>
  )
}
