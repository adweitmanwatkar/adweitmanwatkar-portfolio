import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IDENTITY, PORTRAIT, PORTRAIT_ALT } from '../content.js'
import useIntroAudio from '../hooks/useIntroAudio.js'

/**
 * Cinematic photo-based intro — two scenes, one gate.
 *
 * Scene 1: nearly black stage, drifting particles, restrained amber glow,
 *          ENTER EXPERIENCE button. Nothing else runs until that click.
 * Scene 2: the untouched original photograph reveals with premium fade,
 *          slow zoom, one light sweep; name + tagline; smooth hand-off
 *          into the portfolio.
 *
 * Skip Intro is reachable at all times; Escape/Enter/Space also skip.
 * Reduced motion: straight to content. Audio only after user interaction
 * and only if a real file exists at public/audio/intro.mp3.
 */
const EASE = [0.19, 1, 0.22, 1]
const HOLD_PARAM = 'introhold'

export default function Intro({ onDone }) {
  const reduced = useReducedMotion()
  const [entered, setEntered] = useState(false) // Scene 1 → Scene 2 gate
  const [phase, setPhase] = useState(0) // 0 photo · 1 name · 2 tagline
  const [leaving, setLeaving] = useState(false)
  const { audioReady, playing, soundOn, mute } = useIntroAudio()
  const leavingRef = useRef(false)
  const timersRef = useRef([])

  const finish = () => {
    if (leavingRef.current) return
    leavingRef.current = true
    setLeaving(true)
    timersRef.current.push(setTimeout(onDone, 950))
  }

  // Scene 2 timeline — armed only after the ENTER click.
  useEffect(() => {
    if (!entered || reduced) return undefined
    const t = timersRef.current
    t.push(setTimeout(() => setPhase(1), 2000)) // name reveal
    t.push(setTimeout(() => setPhase(2), 3500)) // tagline
    t.push(setTimeout(() => {
      // ?introhold — deterministic inspection hook: pause the assembled
      // timeline on the final stage instead of auto-finishing.
      if (new URLSearchParams(window.location.search).has(HOLD_PARAM)) return
      finish()
    }, 6300)) // smooth hand-off into the portfolio
    return () => t.forEach(clearTimeout)
  }, [entered, reduced])

  // Escape skips from the very first frame (Scene 1 included).
  // Enter/Space are deliberately NOT skip keys: they must keep their native
  // role of activating the focused button (ENTER EXPERIENCE / Skip).
  useEffect(() => {
    if (reduced) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Reduced motion: no cinematic sequence at all — straight to content.
  useEffect(() => {
    if (reduced) onDone()
  }, [reduced, onDone])

  const enter = () => {
    setEntered(true)
    soundOn() // the intro click IS the user gesture; no-op when there's no audio file
  }

  if (reduced) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-obsidian"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.03 : 1 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      data-testid="intro"
      aria-label="Cinematic intro"
    >
      {/* Scene 1 ambience — black stage + drifting particles + amber glow */}
      <Particles />
      <div
        className="absolute top-1/2 left-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(210,164,77,0.16) 0%, rgba(210,164,77,0.05) 45%, transparent 72%)' }}
        aria-hidden="true"
      />

      {!entered ? (
        /* Scene 1 — minimal, premium, one clear action */
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <motion.p
            className="font-mono text-[0.6rem] uppercase tracking-[0.5em] text-gold/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Portfolio · MMXXVI
          </motion.p>
          <motion.button
            onClick={enter}
            className="mt-8 cursor-pointer border border-gold/50 px-10 py-4 font-mono text-xs tracking-[0.45em] text-gold uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:tracking-[0.55em] focus-visible:outline-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: EASE }}
            data-testid="enter-btn"
          >
            Enter Experience
          </motion.button>
        </div>
      ) : (
        <>
          {/* Scene 2 — the original photograph: fade-in, gentle zoom, one light sweep */}
          <motion.div
            className="relative z-10 mt-[4vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.9, ease: 'easeOut' }}
          >
            <div className="relative h-[46vh] max-h-[430px] w-[min(72vw,320px)] overflow-hidden border border-gold/25">
              <motion.img
                src={PORTRAIT}
                alt={PORTRAIT_ALT}
                className="h-full w-full object-cover object-top"
                fetchPriority="high"
                initial={{ scale: 1.16 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7.5, ease: [0.16, 0.7, 0.3, 1] }}
              />
              {/* elegant light sweep — one pass only */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
                style={{
                  background:
                    'linear-gradient(100deg, transparent 0%, rgba(255,238,204,0) 32%, rgba(255,238,204,0.30) 50%, rgba(255,238,204,0) 68%, transparent 100%)',
                  mixBlendMode: 'screen',
                }}
                initial={{ x: '-170%' }}
                animate={{ x: '340%' }}
                transition={{ duration: 2.2, delay: 1.5, ease: [0.4, 0, 0.2, 1] }}
                aria-hidden="true"
              />
              {/* blend photo edges into the black stage */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: 'inset 0 0 90px 46px rgba(10,9,8,0.92)' }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* name + tagline */}
          <div className="absolute inset-x-0 bottom-[9vh] z-10 px-6 text-center">
            <motion.h1
              className="font-display text-[clamp(2.4rem,8.5vw,6rem)] leading-[1.02] font-semibold tracking-tight text-ivory"
              initial={{ opacity: 0, y: 34, letterSpacing: '0.28em' }}
              animate={phase >= 1 ? { opacity: 1, y: 0, letterSpacing: '-0.01em' } : {}}
              transition={{ duration: 1.5, ease: EASE }}
            >
              {IDENTITY.name.toUpperCase().split(' ')[0]}{' '}
              <span className="text-gold">{IDENTITY.name.toUpperCase().split(' ')[1]}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <motion.div
                className="mx-auto mt-5 h-px w-24 origin-center bg-gold/70"
                initial={{ scaleX: 0 }}
                animate={phase >= 2 ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, ease: EASE }}
                aria-hidden="true"
              />
              <p className="mt-5 font-mono text-[clamp(0.6rem,1.6vw,0.8rem)] uppercase tracking-[0.42em] text-silver">
                {IDENTITY.taglineCaps}
              </p>
            </motion.div>
          </div>
        </>
      )}

      {/* controls — Skip from the very first frame; Mute only when real audio plays */}
      <div className="absolute right-5 bottom-5 z-20 flex items-center gap-6">
        {audioReady && (
          <button
            onClick={playing ? mute : soundOn}
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-silver transition hover:text-gold"
          >
            {playing ? '♪ Mute' : '♪ Sound On'}
          </button>
        )}
        <button
          onClick={finish}
          className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-silver transition hover:text-gold"
        >
          Skip Intro →
        </button>
      </div>
    </motion.div>
  )
}

/* Scene 1 ambience: ~24 slow-drifting gold motes, CSS-only, cheap and subtle. */
function Particles() {
  const motes = useRef(
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 53) % 100}%`,
      size: 1 + (i % 3),
      drift: 14 + (i % 7) * 3,
      delay: (i % 9) * 0.8,
      opacity: 0.25 + (i % 4) * 0.12,
    })),
  ).current

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full bg-gold"
          style={{ left: m.left, top: m.top, width: m.size, height: m.size, opacity: m.opacity }}
          animate={{ y: [-m.drift, m.drift], opacity: [m.opacity * 0.4, m.opacity, m.opacity * 0.4] }}
          transition={{ duration: 9, repeat: Infinity, delay: m.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
