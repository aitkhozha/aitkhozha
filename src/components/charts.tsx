import React from 'react';

export const CHART_COLORS = [
  '#f59e0b',
  '#38bdf8',
  '#34d399',
  '#a78bfa',
  '#f472b6',
  '#fb7185',
  '#facc15',
  '#22d3ee',
  '#4ade80'
];

const fmtM = (v: number) => `${(v / 1_000_000).toFixed(1)}M`;

export function BarChart({
  data,
  height = 260
}: {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 520;
  const H = height;
  const pad = { l: 48, r: 16, t: 16, b: 40 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;
  const bw = chartW / data.length;
  const ticks = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" style={{ width: '100%', height: 'auto' }}>
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const y = pad.t + (chartH * i) / ticks;
        const val = max - (max * i) / ticks;
        return (
          <g key={i}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#243352" strokeWidth={1} />
            <text x={pad.l - 6} y={y + 4} fill="#9fb0cc" fontSize={10} textAnchor="end">
              {fmtM(val)}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.value / max) * chartH;
        const x = pad.l + i * bw + bw * 0.18;
        const y = pad.t + chartH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw * 0.64} height={h} rx={6} fill={d.color ?? CHART_COLORS[i % CHART_COLORS.length]} />
            <text x={x + bw * 0.32} y={y - 6} fill="#eef2f9" fontSize={11} textAnchor="middle" fontWeight={700}>
              {fmtM(d.value)}
            </text>
            <text x={x + bw * 0.32} y={H - pad.b + 18} fill="#9fb0cc" fontSize={11} textAnchor="middle">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function LineChart({
  data,
  height = 260
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const values = data.map((d) => d.value);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const W = 520;
  const H = height;
  const pad = { l: 52, r: 16, t: 16, b: 40 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;
  const x = (i: number) => pad.l + (chartW * i) / Math.max(data.length - 1, 1);
  const y = (v: number) => pad.t + chartH - ((v - min) / range) * chartH;
  const zeroY = y(0);
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" style={{ width: '100%', height: 'auto' }}>
      <line x1={pad.l} y1={zeroY} x2={W - pad.r} y2={zeroY} stroke="#52607e" strokeDasharray="4 4" />
      <path d={path} fill="none" stroke="#34d399" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.value)} r={5} fill={d.value < 0 ? '#fb7185' : '#34d399'} />
          <text x={x(i)} y={y(d.value) + (d.value < 0 ? 20 : -12)} fill="#eef2f9" fontSize={11} textAnchor="middle" fontWeight={700}>
            {fmtM(d.value)}
          </text>
          <text x={x(i)} y={H - pad.b + 18} fill="#9fb0cc" fontSize={11} textAnchor="middle">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ColumnChart({
  data,
  height = 220,
  unit = ''
}: {
  data: { label: string; value: number }[];
  height?: number;
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 560;
  const H = height;
  const pad = { l: 24, r: 16, t: 16, b: 36 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;
  const bw = chartW / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" style={{ width: '100%', height: 'auto' }}>
      {data.map((d, i) => {
        const h = (d.value / max) * chartH;
        const x = pad.l + i * bw + bw * 0.15;
        const y = pad.t + chartH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw * 0.7} height={h} rx={4} fill={CHART_COLORS[1]} opacity={0.85} />
            <text x={x + bw * 0.35} y={H - pad.b + 16} fill="#9fb0cc" fontSize={10} textAnchor="middle">
              {d.label}
            </text>
          </g>
        );
      })}
      <text x={pad.l} y={12} fill="#9fb0cc" fontSize={10}>
        {unit}
      </text>
    </svg>
  );
}

export function PieChart({
  data,
  size = 240
}: {
  data: { label: string; value: number; color?: string }[];
  size?: number;
}) {
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const r = size / 2;
  const inner = r * 0.58;
  let angle = -Math.PI / 2;
  const arcs = data.map((d, i) => {
    const frac = d.value / total;
    const start = angle;
    const end = angle + frac * Math.PI * 2;
    angle = end;
    const x1 = r + r * Math.cos(start);
    const y1 = r + r * Math.sin(start);
    const x2 = r + r * Math.cos(end);
    const y2 = r + r * Math.sin(end);
    const large = end - start > Math.PI ? 1 : 0;
    const d2 = `M ${r} ${r} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    return { d: d2, color: d.color ?? CHART_COLORS[i % CHART_COLORS.length], pct: Math.round(frac * 100) };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" style={{ width: size, maxWidth: '100%', height: 'auto' }}>
      {arcs.map((a, i) => (
        <path key={i} d={a.d} fill={a.color} stroke="#16213a" strokeWidth={1.5} />
      ))}
      <circle cx={r} cy={r} r={inner} fill="#16213a" />
    </svg>
  );
}

export function Legend({ data }: { data: { label: string; value?: string; color?: string }[] }) {
  return (
    <div className="legend">
      {data.map((d, i) => (
        <span key={i}>
          <i style={{ background: d.color ?? CHART_COLORS[i % CHART_COLORS.length] }} />
          {d.label}
          {d.value ? ` — ${d.value}` : ''}
        </span>
      ))}
    </div>
  );
}
