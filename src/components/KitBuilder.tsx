'use client';

import { useMemo, useState } from 'react';

type Equipment = { id: string; name: string; dayRate: number };

export function KitBuilder({ equipment }: { equipment: Equipment[] }) {
  const [lines, setLines] = useState<Record<string, number>>({});
  const total = useMemo(() => equipment.reduce((sum, e) => sum + (lines[e.id] ?? 0) * e.dayRate, 0), [equipment, lines]);

  return (
    <div className="grid">
      {equipment.map((e) => (
        <div key={e.id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{e.name} (£{(e.dayRate / 100).toFixed(2)}/day)</div>
          <input aria-label={`Quantity for ${e.name}`} type="number" min={0} value={lines[e.id] ?? 0}
            onChange={(ev) => setLines((s) => ({ ...s, [e.id]: Number(ev.target.value) }))} />
        </div>
      ))}
      <div className="card"><strong>Estimated day subtotal: £{(total / 100).toFixed(2)}</strong></div>
    </div>
  );
}
