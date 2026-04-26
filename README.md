# [Tool Name]
[One line description of what the tool does.]

**Live:** https://[toolname].dataontap.dev
**Stack:** React, Vite, Claude API, Vercel
**Data on Tap:** https://dataontap.dev

## Notes
[Any tool-specific notes — API keys needed, Google Sheet ID, special config etc.]

---

## Setup checklist
- [ ] Update `package.json` → `name`
- [ ] Update `index.html` → title, meta description, canonical URL, OG image
- [ ] Update `src/App.jsx` → hero title, hero desc, input label, button label, footer tool name
- [ ] Update `src/App.jsx` → `app: "[toolname]"` in EmailModal fetch body
- [ ] Update `src/components/SubscribeBar.jsx` → default `app` prop
- [ ] Write `src/prompt.js` system prompt
- [ ] Add `ANTHROPIC_API_KEY` to Vercel environment variables
- [ ] Add `/public/favicon.svg` (already included — update if needed)
- [ ] Add `/public/[toolname]-hero.png` and `/public/[toolname]-social.png`
- [ ] Add subdomain in Vercel + CNAME in Namecheap
- [ ] Add `<url>` block to `sitemap.xml` on dataontap.dev repo
- [ ] Add tool card to `index.html` on dataontap.dev
