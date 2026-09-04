/* App: chrome, hash router, index, landing, detail wrapper. */
(function () {
  const { useState, useEffect, IcMail, IcPhone, IcPin, IcLinked, IcArrow, IcBack, RichText } = window.UI;
  const SERVICES = window.SERVICES;
  const DESIGN_META = window.DESIGN_META;
  const DESIGNS = window.DESIGNS;
  const bySlug = (s) => SERVICES.find(x => x.slug === s);

  function TopBar() {
    return <div className="be-announce">Read our latest <strong>Credit Market Update</strong> — Now available <a href="#/">Read Now</a></div>;
  }
  function Logo() {
    return (<a className="be-logo" href="#/" aria-label="Bankers Edge Advisory">
      <span className="be-logo-mark"><i>B</i><i>E</i></span>
      <span className="be-logo-word">BANKERS EDGE<em>ADVISORY</em></span></a>);
  }
  function NavBar() {
    return (<header className="be-nav"><Logo/>
      <nav className="be-nav-links"><a href="#/">Home</a><a href="#/">About</a><a className="be-active" href="#/">Services</a><a href="#/">News &amp; Updates</a><a href="#/">Careers</a></nav>
      <div className="be-nav-right"><span className="be-nav-ic"><IcPin/></span><span className="be-nav-ic"><IcPhone/></span><span className="be-nav-ic"><IcMail/></span><span className="be-nav-ic"><IcLinked/></span><a className="be-contact-btn" href="#/">Contact</a></div>
    </header>);
  }
  function Footer() {
    return (<footer className="be-footer"><div className="be-footer-grid">
      <div className="be-footer-brand"><span className="be-logo-mark be-mark-light"><i>B</i><i>E</i></span><span className="be-logo-word be-word-light">BANKERS EDGE<em>ADVISORY</em></span></div>
      <div className="be-footer-col"><h4>Contact</h4><p>280 N. Old Woodward Ave. Suite 100<br/>Birmingham, MI 48009</p><p>(248) 953-5163</p><p>Email · LinkedIn</p></div>
      <div className="be-footer-col"><h4>Services</h4>{SERVICES.map(s => <a key={s.slug} href="#/">{s.name}</a>)}</div>
    </div>
    <p className="be-legal">Securities Products and Investment Banking Services are offered through BA Securities, LLC. Member FINRA / SIPC. Bankers Edge Advisory, LLC and BA Securities, LLC are separate, unaffiliated entities. Past performance, awards, or testimonials are not indicative of future results.</p></footer>);
  }
  function ContactBand() {
    return (<section className="be-cta-band"><div className="be-cta-inner">
      <div><h3>Need more details? Contact us</h3><p>We are here to assist. Contact us by phone or email today.</p></div>
      <a className="be-cta-btn" href="#/">Contact Us</a></div></section>);
  }

  function IndexPage() {
    return (<main className="be-index">
      <div className="be-index-head"><span className="be-eyebrow">Bankers Edge Advisory</span>
        <h1>Service Page — Design Options</h1>
        <p>Six directions for the Services experience. Every option carries the complete service copy — open one to explore its full, clickable flow.</p></div>
      <div className="be-opt-grid">{DESIGN_META.map((o, i) => (
        <a key={o.id} className={`be-opt is-ready ${o.top ? 'is-top' : ''}`} href={`#/${o.id}`}>
          {o.top && <span className="be-opt-star" title="Top choice">★ Top choice</span>}
          <span className="be-opt-num">{String(i+1).padStart(2,'0')}</span>
          <h3>{o.title}</h3><span className="be-opt-tag">{o.tag}</span>
          <p>{o.desc}</p><span className="be-opt-foot">Open flow <IcArrow/></span>
        </a>))}</div>
    </main>);
  }

  function Landing({ opt }) {
    const meta = DESIGN_META.find(m => m.id === opt);
    return (<main>
      <section className="be-hero"><div className="be-hero-inner">
        <nav className="be-crumb"><a href="#/">Options</a> <span>/</span> <b>{meta.title}</b></nav>
        <h1>Services</h1><p>Tailored solutions that drive growth and resilience.</p>
        <span className="be-hero-tag">Design {String(opt).padStart(2,'0')} · {meta.title}</span>
      </div></section>
      <section className="be-serv-list">
        <div className="be-serv-intro"><span className="be-eyebrow">What we do</span>
          <h2>Debt capital market solutions, forged for the middle market</h2>
          <p>Backed by over three decades of experience, Bankers Edge Advisory serves privately owned middle-market companies, private equity sponsors, and financial institutions with customized capital strategies.</p></div>
        <div className="be-serv-cards">{SERVICES.map((s, i) => (
          <article className="be-serv-card" key={s.slug}>
            <span className="be-serv-index">{String(i+1).padStart(2,'0')}</span>
            <h3>{s.name}</h3><p>{s.tagline}</p>
            <ul>{s.blocks.map(b => <li key={b.title}>{b.title}</li>)}</ul>
            <a className="be-learn" href={`#/${opt}/${s.slug}`}>Learn More <IcArrow/></a>
          </article>))}</div>
      </section>
      <ContactBand/>
    </main>);
  }

  function Detail({ opt, slug }) {
    const s = bySlug(slug);
    if (!s) return <Landing opt={opt} />;
    const meta = DESIGN_META.find(m => m.id === opt);
    const Design = DESIGNS[opt];
    const idx = SERVICES.findIndex(x => x.slug === slug);
    const next = SERVICES[(idx + 1) % SERVICES.length];
    return (<main>
      <section className="be-hero be-hero-detail"><div className="be-hero-inner">
        <nav className="be-crumb"><a href="#/">Options</a> <span>/</span> <a href={`#/${opt}`}>{meta.title}</a> <span>/</span> <b>{s.short}</b></nav>
        <h1>{s.name}</h1><p>{s.tagline}</p>
        <span className="be-hero-tag be-tag-img">Image: {s.heroImage}</span>
      </div></section>

      <section className="be-detail-intro"><div className="be-detail-intro-in">
        <RichText items={s.intro} pClass="be-intro-p" />
      </div></section>

      <section className="be-blocks-wrap">
        <div className="be-blocks-head">
          <h2>{s.blocksHeading}</h2>
          <span className="be-detail-hint">Design {String(opt).padStart(2,'0')} · {meta.tag}</span>
        </div>
        {s.blocksIntro && <p className="be-blocks-intro">{s.blocksIntro}</p>}
        <Design service={s} />
      </section>

      <div className="be-detail-nav">
        <button className="be-back" onClick={() => { window.location.hash = `#/${opt}`; }}><IcBack/> Back to Services</button>
        <a className="be-next" href={`#/${opt}/${next.slug}`}>Next: {next.short} <IcArrow/></a>
      </div>
      <ContactBand/>
    </main>);
  }

  function parse() {
    const h = window.location.hash.replace(/^#/, '') || '/';
    const p = h.split('/').filter(Boolean); // [opt, slug]
    if (!p.length) return { view: 'index' };
    if (!DESIGN_META.find(m => m.id === p[0])) return { view: 'index' };
    if (p[1]) return { view: 'detail', opt: p[0], slug: p[1] };
    return { view: 'landing', opt: p[0] };
  }
  function App() {
    const [route, setRoute] = useState(parse());
    useEffect(() => {
      const on = () => { setRoute(parse()); window.scrollTo(0, 0); };
      window.addEventListener('hashchange', on);
      return () => window.removeEventListener('hashchange', on);
    }, []);
    return (<div className="be-root"><TopBar/><NavBar/>
      {route.view === 'index' && <IndexPage/>}
      {route.view === 'landing' && <Landing opt={route.opt} />}
      {route.view === 'detail' && <Detail opt={route.opt} slug={route.slug} />}
      <Footer/></div>);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
})();
