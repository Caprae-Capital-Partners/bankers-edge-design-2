/* Team section redesigns for the Bankers Edge Advisory "About" page.
   Shared data + Layout 1 (1×4 row, circular headshots). */

const TEAM = [
  {
    id: 'richard',
    name: 'Richard Consul',
    creds: 'CFA',
    title: 'Managing Partner',
    photo: 'assets/headshot-richard.png',
    email: 'raconsul@bankersedgeadvisory.com',
    phone: '(248) 953-5163',
    phoneHref: '+12489535163',
    linkedin: '#',
    bio: 'Founder and Managing Partner of Bankers Edge Advisory, a boutique investment bank delivering custom capital markets solutions for sponsor-driven transactions. Richard brings over twenty years of buy-side experience as a multi-award-winning Senior Portfolio Manager and FICC Strategist, managing multi-billion-dollar portfolios across distressed credit, securitized assets, convertibles, and rates and FX derivatives.',
  },
  {
    id: 'mitch',
    name: 'Mitch Vermet',
    creds: 'CFA, CAIA',
    title: 'Managing Partner',
    photo: 'assets/headshot-mitch.png',
    email: 'mvermet@bankersedgeadvisory.com',
    phone: '(313) 670-3339',
    phoneHref: '+13136703339',
    linkedin: '#',
    bio: 'Mitch brings nearly a decade of experience in institutional asset management and investment banking, having played a key role in managing over $30 billion in institutional capital across portfolio construction, tactical asset allocation, and strategic asset-liability management solutions.',
  },
  {
    id: 'neal',
    name: 'Neal Searle',
    creds: '',
    title: 'Vice President',
    photo: 'assets/headshot-neal.png',
    email: 'nsearle@bankersedgeadvisory.com',
    phone: '(248) 752-4097',
    phoneHref: '+12487524097',
    linkedin: '#',
    bio: 'Neal brings more than 20 years of executive leadership, commercial banking, and capital structuring experience to middle-market companies — helping business owners and investors navigate complex acquisitions, recapitalizations, restructurings, commercial real estate development, and growth capital.',
  },
  {
    id: 'sean',
    name: 'Sean Brennan',
    creds: '',
    title: 'Vice President',
    photo: 'assets/headshot-sean.png',
    email: 'sbrennan@bankersedgeadvisory.com',
    phone: '(248) 231-8035',
    phoneHref: '+12482318035',
    linkedin: '#',
    bio: 'Sean brings more than 15 years of experience across Commercial Real Estate, Capital Markets, and Investment Banking — focused on the origination and structuring of sophisticated debt and equity solutions for developers, investors, and C-suite executives across all major CRE asset classes.',
  },
];

/* ---- inline icons ---- */
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3h3.2l1.5 4.2-2 1.4a13 13 0 0 0 6.2 6.2l1.4-2 4.2 1.5V18a2 2 0 0 1-2.1 2A16 16 0 0 1 3 5.1 2 2 0 0 1 5 3Z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.65 4.78 6.1V21H18.6v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H10V9Z" />
  </svg>
);

function ContactIcons({ p }) {
  return (
    <div className="tm-icons">
      <a className="tm-ic" href={`mailto:${p.email}`} title={p.email} aria-label="Email"><IconMail /></a>
      <a className="tm-ic" href={`tel:${p.phoneHref}`} title={p.phone} aria-label="Phone"><IconPhone /></a>
      <a className="tm-ic" href={p.linkedin} title="LinkedIn" aria-label="LinkedIn"><IconLinkedIn /></a>
    </div>
  );
}

function TeamLayout1() {
  return (
    <section className="tm-section">
      <header className="tm-head">
        <span className="tm-eyebrow">Bankers Edge Advisory</span>
        <h2 className="tm-title">Meet Our Team</h2>
        <p className="tm-sub">Seasoned capital market advisors guiding you with expertise and precision.</p>
      </header>

      <div className="tm-row">
        {TEAM.map((p) => (
          <article className="tm-col" key={p.id}>
            <div className="tm-photo-wrap">
              <img className="tm-photo" src={p.photo} alt={p.name} />
            </div>
            <h3 className="tm-name">
              {p.name}{p.creds && <span className="tm-creds">, {p.creds}</span>}
            </h3>
            <p className="tm-role">{p.title}</p>
            <ContactIcons p={p} />
            <p className="tm-bio">{p.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { TEAM, TeamLayout1, ContactIcons });
