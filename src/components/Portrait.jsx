import { useState } from 'react'
import { PORTRAIT, PORTRAIT_ALT } from '../content.js'

/**
 * Renders the real portrait; if the remote image can't load
 * (e.g. a CDN blocking hotlinking), shows an elegant AM-monogram
 * placeholder instead. Drop a real file into public/portrait.jpg
 * and set PORTRAIT in content.js to '/portrait.jpg' to use it directly.
 */
export default function Portrait({ className = '', imgClassName = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-charcoal ${className}`}>
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-gold/15" aria-label={PORTRAIT_ALT} role="img">
          <span className="font-display text-6xl font-light text-gold/40 md:text-7xl">AM</span>
          <span className="px-6 text-center font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.3em] text-silver/60">
            portrait loading offline — add public/portrait.jpg
          </span>
        </div>
      ) : (
        <img
          src={PORTRAIT}
          alt={PORTRAIT_ALT}
          className={`h-full w-full object-cover ${imgClassName}`}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
