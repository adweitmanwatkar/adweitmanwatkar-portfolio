export default function Section({ id, num, kicker, title, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-20 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="rule mb-12 flex items-baseline justify-between gap-6 pt-6">
          <p className="kicker">
            <span className="text-gold/70">{num}</span>
            {'  '}{kicker}
          </p>
          <span className="font-mono text-[0.6rem] tracking-[0.3em] text-silver/50">{num} / 09</span>
        </div>
        {title && (
          <h2 className="font-display mb-14 text-[clamp(1.9rem,4.5vw,3.4rem)] font-light leading-tight tracking-tight text-ivory">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}
