# Plan — Remove the narrative text below the service tabs

## What that text actually is

Every service detail page is assembled in `service-app.jsx` in this order:

1. hero → 2. `intro` → 3. `blocksHeading` + **the tabs** (`blocks`) → 4. **`NarrativeSections`** → 5. back/next nav → 6. ContactBand

The "extra text after the tabs" is step 4 only: `NarrativeSections`
(`service-base.jsx:27`), which renders `service.sections[]` from
`service-data.js`. The tabs themselves come from `service.blocks[]` and are
untouched by everything below.

Both screenshots are `sections` content:
- "Your Strategic Advantage | Bankers Edge Advisory" → capital-market `sections[0]`
- "Mastering a Legacy of Trust in Capital Market Dynamics" → capital-market `sections[1]`
- "A Legacy of Excellence and Innovation in Loan Portfolio Solutions" → loan-portfolio `sections[0]`
- "A Step-by-Step Path to Success" → loan-portfolio `sections[1]`

## Scope: 3 services × 4 sections = 12 blocks

| Service | `sections[]` headings to remove |
|---|---|
| capital-market-solutions | Your Strategic Advantage \| Bankers Edge Advisory · Mastering a Legacy of Trust in Capital Market Dynamics · Step-by-Step Engagement \| Collaborative Success · Your Trusted Partner in Capital Market Solutions |
| loan-portfolio-solutions | A Legacy of Excellence and Innovation in Loan Portfolio Solutions · A Step-by-Step Path to Success · Pioneering Approaches With Proven Results · Your Loan Portfolio Solution Experts |
| mergers-acquisitions-advisory | Redefining Expertise in Merger & Acquisition Advisory · A Formula-Driven Approach to M&A Advisory · Guided by a Team of Industry Veterans · Start Your M&A Journey with Confidence |

There are 6 design variants (`DESIGNS = 1,3,4,6,7,8`) × 3 services = **18 detail
pages**, all rendering through the same one line. So this is *not* an 18-place
edit — it is 1 place.

## Option A — recommended: delete one render call

**Edit count: 1 line deleted + 2 orphan cleanups.**

1. `service-app.jsx:104` — delete `<NarrativeSections service={s} />`. All 12
   blocks vanish from all 18 pages at once. **1 edit.**
2. `service-base.jsx:27-50` — delete the now-unused `NarrativeSections`
   function and drop it from the `window.UI` export. **1 edit.** (Orphan created
   by step 1. `ImgNote` stays — `BlockContent` still uses it.)
3. `service-styles.css:193-205` — delete `.be-narr*` and `.be-steps*` rules
   (13 lines, now unreferenced). **1 edit.**

Leaves `sections[]` intact in `service-data.js` (28KB of real client copy), so
restoring is a one-line revert. Page ends: tabs → back/next nav → ContactBand.

## Option B — also delete the copy

Everything in Option A, **plus** delete the `sections: [ ... ]` array from each
of the 3 service objects in `service-data.js` (lines 44-77, 118-155, 200-231 —
line numbers shift after each delete, so work bottom-up). **3 more edits.**

Only if you want the copy gone from the repo, not just off the page.

## Verify

Open each of the 18 routes and confirm the tabs render and nothing follows them
but the nav band: `#/1/capital-market-solutions` … `#/8/mergers-acquisitions-advisory`
(designs 1,3,4,6,7,8 × 3 slugs). Spot-check design 7 (Tabs) and design 8
(Overview) — those two lean hardest on the block area.

## Not touched

- `blocks[]` — the tabs, their titles, teasers, bodies, lists.
- `intro`, `blocksHeading`, `blocksIntro`, hero, ContactBand.
- The `teaser` fields duplicate `body[0]`'s first sentence inside each tab. That
  is a separate redundancy *inside* the tabs, not after them — out of scope
  unless you say otherwise.
