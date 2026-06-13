'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n';
import { CpuIcon } from '@/components/icons';

type Option = { slug: string; label: string };

export default function BookingForm({
  locale,
  dict,
  tourOptions,
  vehicleOptions
}: {
  locale: Locale;
  dict: Dictionary;
  tourOptions: Option[];
  vehicleOptions: Option[];
}) {
  const search = useSearchParams();
  const preselect = search.get('tour') ?? '';
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      locale,
      name: String(fd.get('name') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      tourSlug: String(fd.get('tourSlug') ?? ''),
      vehicleSlug: String(fd.get('vehicleSlug') ?? ''),
      date: String(fd.get('date') ?? ''),
      guests: Number(fd.get('guests') ?? 1),
      message: String(fd.get('message') ?? '')
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="alert alert-ok">
        <strong>{dict.booking.successTitle}</strong>
        <p style={{ margin: '6px 0 0' }}>{dict.booking.successText}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">{dict.booking.name} *</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="phone">{dict.booking.phone} *</label>
        <input id="phone" name="phone" required inputMode="tel" autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="email">{dict.booking.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="date">{dict.booking.date}</label>
        <input id="date" name="date" type="date" />
      </div>
      <div className="field">
        <label htmlFor="tourSlug">{dict.booking.tour}</label>
        <select id="tourSlug" name="tourSlug" defaultValue={preselect}>
          <option value="">—</option>
          {tourOptions.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="vehicleSlug">{dict.booking.vehicle}</label>
        <select id="vehicleSlug" name="vehicleSlug" defaultValue="">
          <option value="">{dict.booking.anyVehicle}</option>
          {vehicleOptions.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="guests">{dict.booking.guests}</label>
        <input id="guests" name="guests" type="number" min={1} max={8} defaultValue={2} />
      </div>
      <div className="field full">
        <label htmlFor="message">{dict.booking.message}</label>
        <textarea id="message" name="message" placeholder={dict.booking.messagePlaceholder} />
      </div>
      <div className="field full">
        {status === 'error' && (
          <div className="alert alert-err" style={{ marginBottom: 12 }}>
            <strong>{dict.booking.errorTitle}</strong>
            <p style={{ margin: '6px 0 0' }}>{dict.booking.errorText}</p>
          </div>
        )}
        <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'}>
          {status === 'sending' ? dict.booking.submitting : dict.booking.submit}
        </button>
        <p className="note with-icon" style={{ marginTop: 10 }}>
          <CpuIcon size={16} /> {dict.booking.aiNote}
        </p>
      </div>
    </form>
  );
}
