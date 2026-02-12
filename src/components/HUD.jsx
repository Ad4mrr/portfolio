export default function HUD({ item, activeIndex, total, onPrev, onNext }) {
  return (
    <div className="hud">
      <div className="topBar">
        <div className="brand">THE ARSENAL</div>
        <div className="subtitle">Select a module • Scroll / Arrow keys</div>
      </div>

      <div className="help">
        <div><kbd>←</kbd> <kbd>→</kbd> move selection</div>
        <div><kbd>Home</kbd> first • <kbd>End</kbd> last</div>
        <div style={{ marginTop: 6, opacity: 0.9 }}>
          Tip: Vertical page scroll adds a subtle camera push-in.
        </div>
      </div>

      <div className="footerHint">
        Active: <kbd>{activeIndex + 1}</kbd> / <kbd>{total}</kbd>
      </div>

      <div className="panel">
        <div className="panelTitle">
          <h3>{item.title}</h3>
          <span className="tag">{item.tag}</span>
        </div>

        <div className="grid">
          <div className="item">
            <span className="label">Primary</span>
            <span className="value">{item.primary}</span>
          </div>
          <div className="item">
            <span className="label">Secondary</span>
            <span className="value">{item.secondary}</span>
          </div>
          <div className="item">
            <span className="label">{item.statA.label}</span>
            <span className="value">{item.statA.value}</span>
          </div>
          <div className="item">
            <span className="label">{item.statB.label}</span>
            <span className="value">{item.statB.value}</span>
          </div>
          <div className="item">
            <span className="label">{item.statC.label}</span>
            <span className="value">{item.statC.value}</span>
          </div>
          <div className="item">
            <span className="label">{item.statD.label}</span>
            <span className="value">{item.statD.value}</span>
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={onPrev}>Prev</button>
          <button className="btn" onClick={onNext}>Next</button>
          <a className="btn" href={item.ctaHref} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            {item.ctaLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
