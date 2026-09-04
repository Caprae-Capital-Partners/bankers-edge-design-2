/* Shared UI: icons, rich-text, block content. Exposed on window.UI. */
const { useState, useEffect } = React;

const IcMail = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg>);
const IcPhone = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3h3.2l1.5 4.2-2 1.4a13 13 0 0 0 6.2 6.2l1.4-2 4.2 1.5V18a2 2 0 0 1-2.1 2A16 16 0 0 1 3 5.1 2 2 0 0 1 5 3Z"/></svg>);
const IcPin = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>);
const IcLinked = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.65 4.78 6.1V21H18.6v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H10V9Z"/></svg>);
const IcArrow = () => (<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
const IcBack = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>);
const IcPlus = ({open}) => (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14"/>{!open && <path d="M12 5v14"/>}</svg>);
const IcImg = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 18 5-5 4 4 3-3 4 4"/></svg>);

/* paragraph with optional "Label — text" bold lead */
function Para({ text, className }) {
  const m = text.match(/^([^\u2014]{3,60})\u2014\s*(.*)$/);
  if (m) return <p className={className}><strong>{m[1].trim()}</strong> — {m[2]}</p>;
  return <p className={className}>{text}</p>;
}
function RichText({ items, pClass }) {
  return <>{items.map((t, i) => <Para key={i} text={t} className={pClass} />)}</>;
}
function ImgNote({ note }) {
  return <div className="be-imgnote"><IcImg/> Image: {note}</div>;
}

/* full block content (used inside every design's expanded state) */
function BlockContent({ b }) {
  return (
    <div className="be-blk-content">
      {b.imageNote && <ImgNote note={b.imageNote} />}
      <RichText items={b.body} pClass="be-blk-p" />
      {b.list && <ul className="be-blk-list">{b.list.map(x => <li key={x}>{x}</li>)}</ul>}
    </div>
  );
}

window.UI = { useState, useEffect, IcMail, IcPhone, IcPin, IcLinked, IcArrow, IcBack, IcPlus, IcImg, Para, RichText, ImgNote, BlockContent };
