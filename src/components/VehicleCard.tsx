import type { Locale } from '@/i18n/locales';
import type { Dictionary } from '@/i18n';
import type { Vehicle } from '@/data/vehicles';

export default function VehicleCard({
  vehicle,
  dict,
  locale
}: {
  vehicle: Vehicle;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <article className="card fleet-card">
      <div className="media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={vehicle.image} alt={`${vehicle.name} ${dict.fleet.onMountainBg}`} loading="lazy" />
      </div>
      <div className="body">
        <span className="gen">{vehicle.generation[locale]}</span>
        <h3>{vehicle.name}</h3>
        <p className="summary">{vehicle.blurb[locale]}</p>
        <div className="specs">
          <span>👥 {vehicle.seats} {dict.fleet.seats}</span>
          <span>⚙️ {vehicle.drivetrain}</span>
        </div>
      </div>
    </article>
  );
}
