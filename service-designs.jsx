/* The service-detail block presentations. Each takes {service}. */

/* 1 — Expanding Panels: 3 equal rectangles; hover opens ONE full-width rectangle (same for all), grows in height, ✕ to close */
function DesignPanels({ service }) {
  const { useState, BlockContent } = window.UI;
  const [active, setActive] = useState(null);
  const b = active != null ? service.blocks[active] : null;
  return (
    <div className="d1-row">
      {service.blocks.map((x, i) => (
        <article key={i} className={`d1-card ${active === i ? 'is-active' : ''}`} onClick={() => setActive(active === i ? null : i)} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(active === i ? null : i); } }}>
          <span className="d1-num">{String(i+1).padStart(2,'0')}</span>
          <h3 className="d1-title">{x.title}</h3>
          <p className="d1-teaser">{x.teaser}</p>
          <span className="d1-hint">Click to read more →</span>
        </article>
      ))}
      {b && (
        <div className="d1-expand">
          <button className="d1-close" onClick={() => setActive(null)} aria-label="Close">×</button>
          <div className="d1-expand-side">
            <span className="d1-num">{String(active+1).padStart(2,'0')}</span>
            <h3 className="d1-expand-title">{b.title}</h3>
            <p className="d1-expand-teaser">{b.teaser}</p>
          </div>
          <div className="d1-expand-body"><BlockContent b={b} /></div>
        </div>
      )}
    </div>
  );
}

/* 3 — Spotlight Modal: hover opens a large pop-up over a blurred page, no scroll */
function DesignCards({ service }) {
  const { useState, BlockContent } = window.UI;
  const [open, setOpen] = useState(null);
  const b = open != null ? service.blocks[open] : null;
  return (
    <>
      <div className="d3-grid">
        {service.blocks.map((x, i) => (
          <article key={i} className="d3-card" onMouseEnter={() => setOpen(i)} onClick={() => setOpen(i)} tabIndex={0} onFocus={() => setOpen(i)}>
            <span className="d3-num">{String(i+1).padStart(2,'0')}</span>
            <h3 className="d3-title">{x.title}</h3>
            <p className="d3-teaser">{x.teaser}</p>
            <span className="d3-hint">Open detail →</span>
          </article>
        ))}
      </div>
      {b && (
        <div className="d3-backdrop" onClick={() => setOpen(null)}>
          <div className="d3-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="d3-close" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <span className="d3-modal-num">{String(open+1).padStart(2,'0')}</span>
            <h3 className="d3-modal-title">{b.title}</h3>
            <p className="d3-modal-teaser">{b.teaser}</p>
            <BlockContent b={b} />
          </div>
        </div>
      )}
    </>
  );
}

/* 4 — Split Master–Detail (no inner scroll, list fills height) */
function DesignSplit({ service }) {
  const { useState, BlockContent } = window.UI;
  const [active, setActive] = useState(0);
  const b = service.blocks[active];
  const n = service.blocks.length;
  return (
    <div className="d4-wrap">
      <nav className="d4-list">
        {service.blocks.map((x, i) => (
          <button key={i} className={`d4-item ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
            <span className="d4-num">{String(i+1).padStart(2,'0')}</span>
            <span className="d4-txt"><span className="d4-title">{x.title}</span><span className="d4-teaser">{x.teaser}</span></span>
          </button>
        ))}
      </nav>
      <div className="d4-pane" key={active}>
        <span className="d4-kicker">Solution {String(active+1).padStart(2,'0')} / {String(n).padStart(2,'0')}</span>
        <h3 className="d4-pane-title">{b.title}</h3>
        <BlockContent b={b} />
      </div>
    </div>
  );
}

/* 6 — Editorial Stack: everything visible, no interaction */
function DesignEditorial({ service }) {
  const { BlockContent } = window.UI;
  return (
    <div className="d6-stack">
      {service.blocks.map((b, i) => (
        <article className="d6-item" key={i}>
          <div className="d6-aside">
            <span className="d6-num">{String(i+1).padStart(2,'0')}</span>
            <h3 className="d6-title">{b.title}</h3>
            <p className="d6-teaser">{b.teaser}</p>
          </div>
          <div className="d6-content"><BlockContent b={b} /></div>
        </article>
      ))}
    </div>
  );
}

/* 7 — Tabbed Panel: pick a solution, concise detail appears below (Stripe/Apple-style) */
function DesignTabs({ service }) {
  const { useState, BlockContent } = window.UI;
  const [active, setActive] = useState(0);
  const b = service.blocks[active];
  return (
    <div className="d7-wrap">
      <div className="d7-tabs" role="tablist">
        {service.blocks.map((x, i) => (
          <button key={i} className={`d7-tab ${active === i ? 'is-active' : ''}`} onClick={() => setActive(i)}>
            <span className="d7-tab-n">{String(i+1).padStart(2,'0')}</span>{x.title}
          </button>
        ))}
      </div>
      <div className="d7-panel" key={active}>
        <p className="d7-teaser">{b.teaser}</p>
        <BlockContent b={b} />
      </div>
    </div>
  );
}

/* 8 — Overview Grid: essentials only, all at a glance, minimal & scannable */
function DesignOverview({ service }) {
  return (
    <div className="d8-grid">
      {service.blocks.map((b, i) => (
        <article className="d8-card" key={i}>
          <span className="d8-num">{String(i+1).padStart(2,'0')}</span>
          <h3 className="d8-title">{b.title}</h3>
          <p className="d8-teaser">{b.teaser}</p>
          {b.list && (
            <ul className="d8-list">
              {b.list.slice(0, 4).map(x => <li key={x}>{x}</li>)}
              {b.list.length > 4 && <li className="d8-more">+{b.list.length - 4} more</li>}
            </ul>
          )}
          {b.imageNote && <span className="d8-imgnote">Image: {b.imageNote}</span>}
        </article>
      ))}
    </div>
  );
}

window.DESIGNS = { '1': DesignPanels, '3': DesignCards, '4': DesignSplit, '6': DesignEditorial, '7': DesignTabs, '8': DesignOverview };
