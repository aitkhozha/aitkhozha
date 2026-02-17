'use client';

import { useEffect, useState } from 'react';

const initialData = {
  startAt: '', endAt: '', timezone: 'Europe/London', pickupTime: '08:00', returnTime: '10:00',
  contactName: '', contactEmail: '', contactPhone: '', productionName: '', productionType: '', logisticsMode: 'pickup',
  logisticsAddress: '', onSetContact: '', insuranceProvider: '', insurancePolicyNo: '', notes: '', items: [] as { equipmentId: string; qty: number }[]
};

export function EnquiryWizard({ equipment }: { equipment: { id: string; name: string }[] }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem('enquiryDraft');
    if (cached) setData(JSON.parse(cached));
  }, []);

  useEffect(() => { localStorage.setItem('enquiryDraft', JSON.stringify(data)); }, [data]);

  async function submit() {
    const res = await fetch('/api/enquiry/submit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    setMessage(json.message ?? 'Submitted');
  }

  return (
    <div className="grid">
      <p>Step {step} of 5</p>
      {step === 1 && <div className="card"><label>Start<input type="datetime-local" onChange={(e)=>setData({ ...data, startAt: new Date(e.target.value).toISOString() })} /></label><label>End<input type="datetime-local" onChange={(e)=>setData({ ...data, endAt: new Date(e.target.value).toISOString() })} /></label></div>}
      {step === 2 && <div className="card"><label>Name<input value={data.contactName} onChange={(e)=>setData({ ...data, contactName: e.target.value })} /></label><label>Email<input value={data.contactEmail} onChange={(e)=>setData({ ...data, contactEmail: e.target.value })} /></label></div>}
      {step === 3 && <div className="card"><label>Logistics<select value={data.logisticsMode} onChange={(e)=>setData({ ...data, logisticsMode: e.target.value })}><option value="pickup">Pickup</option><option value="delivery">Delivery</option></select></label></div>}
      {step === 4 && <div className="card"><label>Insurance provider<input value={data.insuranceProvider} onChange={(e)=>setData({ ...data, insuranceProvider: e.target.value })} /></label></div>}
      {step === 5 && <div className="card"><h2>Review kit</h2>{equipment.map((e) => <label key={e.id}><input type="checkbox" onChange={(ev)=>setData({ ...data, items: ev.target.checked ? [...data.items, { equipmentId: e.id, qty: 1 }] : data.items.filter(i=>i.equipmentId!==e.id) })} />{e.name}</label>)}</div>}
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <button onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</button>
        {step < 5 ? <button onClick={() => setStep((s) => Math.min(5, s + 1))}>Next</button> : <button onClick={submit}>Submit</button>}
      </div>
      {message && <p role="status">{message}</p>}
    </div>
  );
}
