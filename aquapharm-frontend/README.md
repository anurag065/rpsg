# APChem® frontend

Marketing site for **APChem®** (Aquapharm PChem, LLC) — the 40-acre oilfield and
water treatment chemicals plant at Crockett, Texas, part of the RP-Sanjiv Goenka Group.

## Stack

React 19 + Vite 8, `react-router-dom` v7, plain CSS (no Tailwind or CSS Modules),
`oxlint` for linting, `gsap` and `lucide-react` for animation and icons.
Deployed to Vercel with an SPA catch-all rewrite in `vercel.json`.

## Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint |

## Layout

```
public/            served as-is at /  (hero-vid.mp4, favicon.svg)
src/
  App.jsx          Router, Preloader, Header/main/Footer shell, all routes
  App.css          every component's styles, led by the design-token block
  assets/          imported through Vite (logos, Crockett aerial)
  components/      layout (Header, Footer, Preloader) + home sections
  data/products.js canonical product catalogue — single source of truth
  hooks/           useScrollAnimation + useCountUp
  pages/           route-level components
```

### Styling

All colour, spacing, shadow and radius values live as custom properties in the
`DESIGN TOKENS` block at the top of `src/App.css`. Change the palette there
rather than editing rules — the blue/white theme is driven entirely from it.

### Product data

`src/data/products.js` is the only catalogue definition. The products listing,
the hero search and the Sales Enquiry typeahead all read from it. Do not
reintroduce local copies.

## Known gaps

- `/about` and `/industries` render the shared `Placeholder` stub.
- `ProductDetailPage` renders HEDP regardless of the `:productId` route param.
- The Sales Enquiry form's submit handler is stubbed — there is no backend yet.
- Capability copy on `/rd-laboratory` and buyer-benefit copy on `/certifications`
  are drafted and awaiting sign-off; both pages carry a visible `page-note`
  saying so. Remove those notes once the content is confirmed.
