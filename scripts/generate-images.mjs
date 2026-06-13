// Generates lightweight, self-contained SVG scene placeholders (mountain
// landscapes of the Almaty region with a stylised jeep). Drop real photos into
// /public/images/{tours,fleet}/ with the same filenames to replace them.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const W = 1200;
const H = 750;

function mountains(colors) {
  // three layered ridgelines back-to-front
  const ridge = (yBase, jag, color, opacity) => {
    const pts = [];
    const steps = 9;
    for (let i = 0; i <= steps; i++) {
      const x = (W * i) / steps;
      const y = yBase - Math.abs(Math.sin(i * 1.7 + jag)) * 180 - (i % 2 === 0 ? 40 : 0);
      pts.push(`${x.toFixed(0)},${y.toFixed(0)}`);
    }
    return `<polygon points="0,${H} ${pts.join(' ')} ${W},${H}" fill="${color}" opacity="${opacity}"/>`;
  };
  return [
    ridge(H * 0.62, 0.4, colors[0], 0.55),
    ridge(H * 0.72, 1.9, colors[1], 0.8),
    ridge(H * 0.82, 3.2, colors[2], 1)
  ].join('');
}

function jeep(x, y, scale, body) {
  const s = scale;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-90" y="-34" width="180" height="40" rx="10" fill="${body}"/>
    <rect x="-58" y="-62" width="120" height="34" rx="9" fill="${body}"/>
    <rect x="-50" y="-56" width="40" height="22" rx="4" fill="#cfe8ff" opacity="0.85"/>
    <rect x="2" y="-56" width="40" height="22" rx="4" fill="#cfe8ff" opacity="0.85"/>
    <circle cx="-54" cy="10" r="22" fill="#0b1120"/><circle cx="-54" cy="10" r="9" fill="#586079"/>
    <circle cx="54" cy="10" r="22" fill="#0b1120"/><circle cx="54" cy="10" r="9" fill="#586079"/>
    <rect x="78" y="-22" width="10" height="12" rx="2" fill="#ffd27a"/>
  </g>`;
}

function scene({ sky, mtn, car = '#1d2b45', title, accent = '#f59e0b', sun = true }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${sun ? `<circle cx="${W * 0.78}" cy="${H * 0.24}" r="70" fill="#ffe7a8" opacity="0.9"/>` : ''}
  ${mountains(mtn)}
  <rect x="0" y="${H - 70}" width="${W}" height="70" fill="#0b1120" opacity="0.55"/>
  ${jeep(W * 0.32, H - 62, 1.15, car)}
  <text x="44" y="${H - 110}" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">${title}</text>
  <text x="46" y="56" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="800" fill="#ffffff">JEEP<tspan fill="${accent}">.ALATAU</tspan></text>
</svg>`;
}

const tours = {
  'hero': { sky: ['#1e3a8a', '#0ea5e9'], mtn: ['#1e293b', '#334155', '#0f172a'], title: 'Almaty mountains' },
  'big-almaty-lake': { sky: ['#0e7490', '#22d3ee'], mtn: ['#155e63', '#0e7490', '#0b3b40'], title: 'Big Almaty Lake' },
  'charyn-canyon': { sky: ['#b45309', '#f59e0b'], mtn: ['#7c2d12', '#c2410c', '#5b1d0c'], title: 'Charyn Canyon' },
  'kolsai-kaindy': { sky: ['#065f46', '#10b981'], mtn: ['#064e3b', '#047857', '#053d2e'], title: 'Kolsai & Kaindy' },
  'assy-plateau': { sky: ['#3730a3', '#6366f1'], mtn: ['#365314', '#4d7c0f', '#1a2e05'], title: 'Assy Plateau' },
  'turgen-gorge': { sky: ['#0f766e', '#5eead4'], mtn: ['#134e4a', '#0f766e', '#0c3b38'], title: 'Turgen Gorge' },
  'tamgaly-tas': { sky: ['#92400e', '#fbbf24'], mtn: ['#78350f', '#a16207', '#451a03'], title: 'Tamgaly-Tas' }
};

const fleet = {
  'nissan-patrol-y61': { car: '#1f2937', title: 'Nissan Patrol Y61' },
  'toyota-prado-150': { car: '#374151', title: 'Land Cruiser Prado 150' },
  'honda-pilot': { car: '#334155', title: 'Honda Pilot' },
  'hyundai-santa-fe': { car: '#3f3f46', title: 'Hyundai Santa Fe' }
};

const fleetSky = ['#1e3a8a', '#38bdf8'];
const fleetMtn = ['#1e293b', '#475569', '#0f172a'];

async function run() {
  const root = path.join(process.cwd(), 'public', 'images');
  await fs.mkdir(path.join(root, 'tours'), { recursive: true });
  await fs.mkdir(path.join(root, 'fleet'), { recursive: true });

  for (const [name, cfg] of Object.entries(tours)) {
    await fs.writeFile(path.join(root, 'tours', `${name}.svg`), scene(cfg), 'utf8');
  }
  for (const [name, cfg] of Object.entries(fleet)) {
    await fs.writeFile(
      path.join(root, 'fleet', `${name}.svg`),
      scene({ sky: fleetSky, mtn: fleetMtn, car: cfg.car, title: cfg.title }),
      'utf8'
    );
  }
  console.log('Generated SVG scenes.');
}

run();
