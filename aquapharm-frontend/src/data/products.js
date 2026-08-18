/* Canonical product catalogue — the single source of truth.
   Consumed by the products listing, the hero search and the Sales Enquiry
   typeahead. Keep every consumer reading from here: three divergent copies
   previously drifted apart, and the hero linked to ids that did not exist. */

export const moleculeImages = [
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=150&q=80',
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=150&q=80',
  'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=150&q=80',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=150&q=80'
];

/* Text-safe on white and on their own 12% tint. */
export const categoryColors = {
  'PHOSPHONATE': '#0F62AE',
  'BIODEGRADABLE CHELATE': '#15754F',
  'POLYMER': '#0E7FA8',
  'BIOCIDE': '#6B46C1',
  'DETERGENT ADDITIVE': '#9A6410'
};

export const categoryColor = (category) => categoryColors[category] || '#55677A';

export const products = [
  {
    id: 'hedp', name: 'HEDP', brand: 'AQUACID 105EX · Etidronic Acid', cas: '2809-21-4',
    category: 'PHOSPHONATE', tagClass: 'tg-phos', img: 0,
    desc: 'Scale & corrosion inhibitor for cooling water, detergents and oilfield.',
    application: 'Scale & corrosion inhibition',
    industries: ['Water Treatment', 'Oil & Gas']
  },
  {
    id: 'atmp', name: 'ATMP', brand: 'Amino Trimethylene Phosphonic Acid', cas: '6419-19-8',
    category: 'PHOSPHONATE', tagClass: 'tg-phos', img: 1,
    desc: 'Scale inhibitor and chelating agent for water treatment systems.',
    application: 'Water treatment, metal cleaning',
    industries: ['Water Treatment', 'Industrial Cleaning']
  },
  {
    id: 'dtpmp', name: 'DTPMP', brand: 'Diethylenetriamine Penta(methylene…)', cas: '15827-60-8',
    category: 'PHOSPHONATE', tagClass: 'tg-phos', img: 2,
    desc: 'High-performance scale inhibitor and metal-ion sequestrant.',
    application: 'Detergents, peroxide stabilisation',
    industries: ['Detergents', 'Textile']
  },
  {
    id: 'pbtc', name: 'PBTC', brand: 'Phosphonobutane Tricarboxylic Acid', cas: '37971-36-1',
    category: 'PHOSPHONATE', tagClass: 'tg-phos', img: 3,
    desc: 'Scale inhibitor stable at high temperature and chlorine tolerance.',
    application: 'Cooling water treatment',
    industries: ['Water Treatment', 'HVAC']
  },
  {
    id: 'hpaa', name: 'HPAA', brand: '2-Hydroxyphosphonoacetic Acid', cas: '23783-26-8',
    category: 'PHOSPHONATE', tagClass: 'tg-phos', img: 0,
    desc: 'Corrosion inhibitor for carbon steel in cooling water.',
    application: 'Carbon steel corrosion inhibition',
    industries: ['Water Treatment', 'Oil & Gas']
  },
  {
    id: 'glda', name: 'GLDA', brand: 'Tetrasodium Glutamate Diacetate', cas: '51981-21-6',
    category: 'BIODEGRADABLE CHELATE', tagClass: 'tg-chel', img: 1,
    desc: 'Readily biodegradable chelant for detergents and personal care.',
    application: 'Personal care, cleaning products',
    industries: ['Personal Care', 'Home Care']
  },
  {
    id: 'heida', name: 'HEIDA', brand: 'Hydroxyethyl Iminodiacetic Acid', cas: '93-62-9',
    category: 'BIODEGRADABLE CHELATE', tagClass: 'tg-chel', img: 2,
    desc: 'Biodegradable chelating agent for cleaning and industrial use.',
    application: 'Industrial cleaning, chelation',
    industries: ['Industrial Cleaning', 'Home Care']
  },
  {
    id: 'ids', name: 'IDS', brand: 'Tetrasodium Iminodisuccinate', cas: '144538-83-0',
    category: 'BIODEGRADABLE CHELATE', tagClass: 'tg-chel', img: 3,
    desc: 'Readily biodegradable chelant, alternative to EDTA.',
    application: 'Detergents, EDTA replacement',
    industries: ['Detergents', 'Industrial Cleaning']
  },
  {
    id: 'pesa', name: 'PESA', brand: 'Maxinol 600 · Polyepoxysuccinic Acid', cas: '51274-37-4',
    category: 'POLYMER', tagClass: 'tg-poly', img: 0,
    desc: 'Phosphorus-free, biodegradable scale inhibitor and dispersant.',
    application: 'Phosphorus-free scale inhibition',
    industries: ['Water Treatment', 'Oil & Gas']
  },
  {
    id: 'paa', name: 'Polyacrylate', brand: 'Polyacrylic Acid (PAA)', cas: '9003-01-4',
    category: 'POLYMER', tagClass: 'tg-poly', img: 1,
    desc: 'Dispersant and anti-scalant for water treatment and detergents.',
    application: 'Dispersant, anti-scalant',
    industries: ['Water Treatment', 'Detergents']
  },
  {
    id: 'mbt', name: 'MBT', brand: '2-Mercaptobenzothiazole', cas: '149-30-4',
    category: 'BIOCIDE', tagClass: 'tg-bio', img: 2,
    desc: 'Copper & non-ferrous metal corrosion inhibitor for cooling water.',
    application: 'Copper & yellow-metal protection',
    industries: ['Automotive', 'Metalworking']
  },
  {
    id: 'acetyl', name: 'Acetyl Chloride', brand: 'Acetyl Chloride', cas: '75-36-5',
    category: 'DETERGENT ADDITIVE', tagClass: 'tg-add', img: 3,
    desc: 'Acetylating intermediate for specialty and detergent synthesis.',
    application: 'Acetylating intermediate',
    industries: ['Detergents', 'Specialty Synthesis']
  }
];

/* Ranked match: name hits beat CAS hits beat brand/application hits.
   `scope` of 'Industries' searches the industry and application fields only. */
export function searchProducts(query, { limit = 8, scope = 'Products' } = {}) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matchesIndustry = (p) =>
    p.industries.some((i) => i.toLowerCase().includes(q)) ||
    p.application.toLowerCase().includes(q);

  if (scope === 'Industries') return products.filter(matchesIndustry).slice(0, limit);

  return products
    .map((p) => {
      const name = p.name.toLowerCase();
      let score = -1;
      if (name === q) score = 0;
      else if (name.startsWith(q)) score = 1;
      else if (name.includes(q)) score = 2;
      else if (p.cas.includes(q)) score = 3;
      else if (p.brand.toLowerCase().includes(q)) score = 4;
      else if (p.category.toLowerCase().includes(q)) score = 5;
      else if (p.application.toLowerCase().includes(q)) score = 6;
      return { p, score };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((r) => r.p);
}
